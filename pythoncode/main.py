import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
import json

# 读取数据
with open("./zhangdan.json") as f:
    data = json.load(f)

# 数据预处理
df = pd.DataFrame(data['data'])
df['ztime'] = pd.to_datetime(df['ztime'])
df['zamount'] = pd.to_numeric(df['zamount'])
df['goodsrate'] = pd.to_numeric(df['goodsrate'])

# 数据格式转换
data = {
    'user_id': df['userid'].astype(int).tolist(),
    'item_id': df['goodsid'].apply(lambda x: chr(64+int(x))).tolist(),
    'behavior': df['isfavorite'].apply(lambda x: 'purchase' if x == 'true' else 'view').tolist(),
    'rating': (df['goodsrate'] * df['zamount']).astype(int).tolist(),  # 使用购买数量和评分相乘作为评分
    'timestamp': df['ztime'].dt.strftime('%Y-%m-%d').tolist()
}
df = pd.DataFrame(data)

# 构建用户-物品评分矩阵
user_item_matrix = df.pivot_table(index='user_id', columns='item_id', values='rating', fill_value=0)

# 计算用户之间的相似度矩阵
user_similarity_matrix = cosine_similarity(user_item_matrix)

# 对目标用户进行推荐
target_user = 1
target_user_ratings = user_item_matrix.loc[target_user]
recommender_scores = np.dot(user_similarity_matrix[target_user-1], user_item_matrix) / np.sum(np.abs(user_similarity_matrix[target_user-1]))
recommended_items = np.argsort(recommender_scores)[::-1]


print("推荐给用户{}的物品是：{}".format(target_user, recommended_items))
# 输出推荐结果
print("推荐给用户 {} 的物品列表：".format(target_user))
# for item_index in recommended_items:
#     print("物品 {}，评分：{}".format(user_item_matrix.columns[item_index], recommender_scores[item_index]))
