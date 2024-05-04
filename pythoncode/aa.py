import numpy as np

# 基于评分的协同过滤算法

class CollaborativeFiltering:
    def __init__(self, ratings):
        self.ratings = ratings
        self.num_users, self.num_items = ratings.shape

    def compute_user_similarity(self):
        self.user_similarity = np.zeros((self.num_users, self.num_users))
        for i in range(self.num_users):
            for j in range(self.num_users):
                if i == j:
                    continue
                # 计算用户i和用户j的皮尔逊相关系数
                mask = np.logical_and(self.ratings[i] != 0, self.ratings[j] != 0)
                if np.sum(mask) == 0:
                    self.user_similarity[i][j] = 0
                else:
                    x = self.ratings[i][mask]
                    y = self.ratings[j][mask]
                    self.user_similarity[i][j] = np.corrcoef(x, y)[0, 1]

    def predict_user_based(self, user_id, item_id):
        # 找出与目标用户最相似的K个用户
        similar_users = np.argsort(self.user_similarity[user_id])[::-1][:self.k]
        numerator = 0
        denominator = 0
        for i in similar_users:
            if self.ratings[i][item_id] != 0:
                similarity = self.user_similarity[user_id][i]
                rating = self.ratings[i][item_id]
                numerator += similarity * rating
                denominator += np.abs(similarity)
        if denominator == 0:
            return 0
        else:
            return numerator / denominator

    def fit(self, k=3):
        self.k = k
        self.compute_user_similarity()

    def predict(self, user_id, item_id):
        return self.predict_user_based(user_id, item_id)

# 示例数据
ratings = np.array([
    [5, 3, 0, 1],
    [4, 0, 0, 1],
    [1, 1, 0, 5],
    [1, 0, 0, 4],
    [0, 1, 5, 4],
])

# 创建协同过滤对象并进行训练
cf = CollaborativeFiltering(ratings)
cf.fit()

# 预测用户4对项目3的评分
user_id = 4
item_id = 3
predicted_rating = cf.predict(user_id - 1, item_id - 1)
print(f"用户{user_id}对项目{item_id}的预测评分为：{predicted_rating:.2f}")
