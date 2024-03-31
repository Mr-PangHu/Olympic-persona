let mysql = require('mysql')

let db = mysql.createPool({
  // 崇明
  limit: 100,
  host: '112.64.134.154', // 数据库IP地址
  user: 'root', // 数据库登录账号
  password: 'Ecust2023', // 数据库登录密码
  database: 'persona_test', // 要操作的数据库
  port: '3308',
  timezone: 'Asia/Shanghai'
  // 远程
  // host: '172.20.137.141', // 数据库IP地址
  // user: 'root', // 数据库登录账号
  // password: '123456', // 数据库登录密码
  // database: 'persona_test', // 要操作的数据库
  // port: '3306',
  // timezone: 'Asia/Shanghai'
  // 本地
  // host: '127.0.0.1', // 数据库IP地址
  // user: 'root', // 数据库登录账号
  // password: 'admin123', // 数据库登录密码
  // database: 'olympic_all', // 要操作的数据库
  // timezone: 'Asia/Shanghai'
})

module.exports = db
