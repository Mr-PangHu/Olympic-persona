let mysql = require('mysql')

let db = mysql.createConnection({
  host: '172.20.137.141', // 数据库IP地址
  user: 'root', // 数据库登录账号
  password: '123456', // 数据库登录密码
  database: 'persona_test', // 要操作的数据库
  port: '3306'
})

module.exports = db
