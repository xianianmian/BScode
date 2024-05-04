import json
import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

# 读取数据
with open("./chuban.json") as f:
    data = json.load(f)

# 将数据转换为 DataFrame
df = pd.DataFrame(data['data'])

# 将数据格式转换
df['ztime'] = pd.to_datetime(df['ztime'])
df['zamount'] = pd.to_numeric(df['zamount'])
df['goodsrate'] = pd.to_numeric(df['goodsrate'])

# 将商品ID转换成字母，A对应1，B对应2，依此类推

df['item_id'] = df['goodsid'].apply(lambda x: chr(64 + int(x)))


# 根据isfavorite字段确定用户行为
df['behavior'] = df['isfavorite'].apply(lambda x: 'purchase' if x == 'true' else 'view')

# 构建数据字典
data = {
    'user_id': df['userid'].astype(int),
    'item_id': df['item_id'],
    'behavior': df['behavior'],
    'rating': df['goodsrate'].astype(int).tolist(),
    'timestamp': df['ztime'].dt.strftime('%Y-%m-%d')
}
df = pd.DataFrame(data)
# 将用户-物品评分数据转换成用户-物品评分矩阵
user_item_matrix = df.pivot_table(index='user_id', columns='item_id', values='rating', fill_value=0)

# 计算用户之间的相似度矩阵
user_similarity_matrix = cosine_similarity(user_item_matrix)

# 对目标用户进行推荐
target_user = 1
target_user_ratings = user_item_matrix.loc[target_user]  # 目标用户的评分
recommender_scores = np.dot(user_similarity_matrix[target_user], user_item_matrix) / np.sum(np.abs(user_similarity_matrix[target_user]))  # 计算推荐得分
recommended_items = np.argsort(recommender_scores)[::-1]  # 推荐物品的排序

# 过滤掉目标用户已经购买或浏览过的物品
filtered_recommended_items = [item for item in recommended_items if item not in user_item_matrix.loc[target_user].values]

# 将推荐结果转换为对应的物品ID
recommended_items_with_goodsid = [chr(64 + item) for item in filtered_recommended_items]

print("推荐给用户{}的物品是：{}".format(target_user, recommended_items_with_goodsid))
