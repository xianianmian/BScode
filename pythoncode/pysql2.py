import mysql.connector
import json

# 连接到MySQL数据库
mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="123456",
    database="uniapp-sql"
)

# 创建一个游标对象
mycursor = mydb.cursor()

# 获取表的字段信息
mycursor.execute("DESC Products")
columns = [column[0] for column in mycursor.fetchall()]

# 查询数据
mycursor.execute("SELECT * FROM Products")
rows = mycursor.fetchall()

# 将数据转换为字典列表
data = []
for row in rows:
    row_dict = dict(zip(columns, row))
    # 将 tlove 的值从布尔型转换为相应的 JSON 格式
    row_dict['tlove'] = bool(row_dict['tlove'])  # 转换为布尔型
    data.append(row_dict)

# 将数据转换为JSON格式
json_data = json.dumps(data, indent=4)

# 打印JSON数据
print(json_data)

# 关闭连接
mydb.close()
