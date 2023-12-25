let mysql = require('mysql')

let db = mysql.createConnection({
  // host: '172.20.137.141', // 数据库IP地址
  host: '127.0.0.1', // 数据库IP地址
  user: 'root', // 数据库登录账号
  password: 'admin123', // 数据库登录密码
  database: 'olympic_all', // 要操作的数据库
  port: '3306'
})

module.exports = db
