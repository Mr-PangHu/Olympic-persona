let mysql = require('mysql')

let dbTest = mysql.createPool({
  // 崇明
  limit: 100,
  host: '112.64.134.154', // 数据库IP地址
  user: 'root', // 数据库登录账号
  password: 'Ecust2023', // 数据库登录密码
  database: 'persona_test', // 要操作的数据库
  port: '3308',
  timezone: 'Asia/Shanghai'
})

module.exports = dbTest
