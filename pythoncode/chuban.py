import pandas as pd 
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
import json

with open("./chuban.json") as f:
  data = json.load(f)

df = pd.DataFrame(data['data'])
df['ztime'] = pd.to_datetime(df['ztime'])
df['zamount'] = pd.to_numeric(df['zamount'])
df['goodsrate'] = pd.to_numeric(df['goodsrate'])


# 'item_id': df['goodsid'].apply(lambda x: chr(64+int(x))).tolist(), 
# 将数据转换为你需要的格式
data = {
    'user_id': df['userid'].astype(int).tolist(),
    'item_id': df['goodsid'].apply(int).tolist(),  
    'behavior': df['isfavorite'].apply(lambda x: 'purchase' if x == 'true' else 'view').tolist(),  # 根据isfavorite字段确定用户行为
    'rating': df['goodsrate'].astype(int).tolist(),
    'timestamp': df['ztime'].dt.strftime('%Y-%m-%d').tolist()
}

df = pd.DataFrame(data)

# 将用户-物品评分数据转换成用户-物品评分矩阵
user_item_matrix = df.pivot_table(index='user_id', columns='item_id', values='rating', fill_value=0)

# 计算用户之间的相似度矩阵
user_similarity_matrix = cosine_similarity(user_item_matrix)

# 对目标用户进行推荐
target_user = 1
target_user_ratings = user_item_matrix.loc[target_user]  # 目标用户的评分
recommender_scores = np.dot(user_similarity_matrix[target_user-1], user_item_matrix) / np.sum(np.abs(user_similarity_matrix[target_user-1]))  # 计算推荐得分
recommended_items = np.argsort(recommender_scores)[::-1]  # 推荐物品的排序

print("推荐给用户{}的物品是：{}".format(target_user, recommended_items))