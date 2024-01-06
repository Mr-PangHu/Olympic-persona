from PIL import Image
import io
import mysql.connector

# 连接到数据库
cnx = mysql.connector.connect(
    host='172.20.137.141',
    user='root',
    password='123456',
    database='persona_test',
    port='3306'
)

# 创建游标对象
cursor = cnx.cursor()

# 执行查询语句
query = "SELECT image FROM person_info WHERE athlete_id = %s"
athlete_id = 27  # 图像的唯一标识符
cursor.execute(query, (athlete_id,))

# 检索结果
result = cursor.fetchone()
if result is not None:
    image_data = result[0]
    # 将二进制数据转换为图像对象
    image = Image.open(io.BytesIO(image_data))
    # 显示图像
    image.show()
else:
    print("未找到对应的图像")

# 关闭游标和连接
cursor.close()
cnx.close()