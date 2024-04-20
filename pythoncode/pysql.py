import mysql.connector
 
mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  passwd="123456",
  database="uniapp-sql"
)
 
mycursor = mydb.cursor()

mycursor.execute("SELECT * FROM products")
 
myresult = mycursor.fetchall()     # fetchall() 获取所有记录
 
for x in myresult:
  print(x)
