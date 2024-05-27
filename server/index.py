import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
import json
import mysql.connector
import os
import datetime

mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="123456",
    database="uniapp-sql"
)

mycursor = mydb.cursor()
 
mycursor.execute("SELECT * FROM bszhangdan")
myresult = mycursor.fetchall()
data = []

for x in myresult:
    formatted_date = x[4].strftime("%Y-%m-%d-%H-%M")
    boolean_value = bool(int(x[2]))  # 将第三个数据转换为真假值
    record = {
        "userid": x[0],
        "goodsid": x[1],
        "isfavorite": str(boolean_value).lower(),  # 转换为小写的字符串形式
        "goodsrate": x[3],
        "ztime": formatted_date,
        "zamount": x[5]
    }
    data.append(record)

output = {"data": data}
current_time = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')

with open("zhangdan2.json", "w") as json_file:
    json.dump(output, json_file)


def load_data(file_path):
    with open(file_path) as f:
        data = json.load(f)
    return pd.DataFrame(data['data'])

def preprocess_data(df):
    df['ztime'] = pd.to_datetime(df['ztime'])
    df['zamount'] = pd.to_numeric(df['zamount'])
    df['goodsrate'] = pd.to_numeric(df['goodsrate'])
    df['user_id'] = df['userid'].astype(int)
    df['item_id'] = df['goodsid'].astype(int)
    df['behavior'] = df['isfavorite'].apply(lambda x: 'purchase' if x == 'true' else 'view')
    df['rating'] = (df['goodsrate'] * df['zamount']).astype(int)
    return df

def create_user_item_matrix(df):
    return df.pivot_table(index='user_id', columns='item_id', values='rating', fill_value=0)


def recommend_items(user_item_matrix, target_user_id):
    #计算了用户之间的相似度矩阵
    user_similarity_matrix = cosine_similarity(user_item_matrix)
    target_user_index = target_user_id - 1
    #获取目标用户的评分或交互向量。
    target_user_ratings = user_item_matrix.loc[target_user_id]
    #计算了目标用户与其他用户的相似度加权评分，用于预测目标用户对未交互物品的兴趣程度
    recommender_scores = np.dot(user_similarity_matrix[target_user_index], user_item_matrix) / np.sum(np.abs(user_similarity_matrix[target_user_index]))
    #根据预测评分对物品进行排序，返回排好序的物品索引。
    recommended_items_indices = np.argsort(recommender_scores)[::-1]
    #根据排好序的物品索引获取推荐物品的列名，并转换为列表格式。
    recommended_items = user_item_matrix.columns[recommended_items_indices].tolist()
    return recommended_items

# 加载数据
df = load_data("./zhangdan2.json")

# 数据预处理
df = preprocess_data(df)

# 构建用户-物品评分矩阵
user_item_matrix = create_user_item_matrix(df)

# 对目标用户进行推荐
target_user_id = 1
recommended_items = recommend_items(user_item_matrix, target_user_id)
recommended_items = ', '.join(map(str, recommended_items))

print(target_user_id, recommended_items,current_time)

sql = "INSERT INTO goodsshunxu (userid, shunxu, storagetime,tuijiantype) VALUES (%s, %s,%s,%s)"
val = (target_user_id, recommended_items, current_time,'特产商品')
mycursor.execute(sql, val)
mydb.commit()