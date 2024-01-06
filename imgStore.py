import base64
import mysql.connector

# 连接到MySQL数据库
cnx = mysql.connector.connect(
    host='172.20.137.141',
    user='root',
    password='123456',
    database='persona_test',
    port='3306'
)

# 读取图片文件的二进制数据
with open('/Users/cx/Downloads/MyGit/Olympic-persona/personImages/27.jpg', 'rb') as image_file:
    image_data = image_file.read()

# 插入图片数据到数据库
query = "UPDATE person_info SET image = %s WHERE athlete_id = 27"
cursor = cnx.cursor()
cursor.execute(query, (image_data,))

# 提交更改并关闭连接
cnx.commit()
cursor.close()
cnx.close()



# def image_to_base64(image_path):
#     with open(image_path, "rb") as image_file:
#         encoded_string = base64.b64encode(image_file.read())
#         return encoded_string.decode("utf-8")

# # 示例用法
# image_path = "/Users/cx/Downloads/MyGit/1.jpg"  # 替换为你的图片路径
# base64_data = image_to_base64(image_path)
# print(base64_data)