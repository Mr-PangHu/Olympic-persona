let mysql = require('mysql')

// let db = mysql.createPool({
//   host: '127.0.0.1', // 数据库IP地址
//   user: 'root', // 数据库登录账号
//   password: 'admin123', // 数据库登录密码
//   database: 'olympic' // 要操作的数据库
// })

let db = mysql.createConnection({
  host: '127.0.0.1', // 数据库IP地址
  user: 'root', // 数据库登录账号
  password: 'xiehou', // 数据库登录密码
  database: 'persona_test' // 要操作的数据库
})

module.exports = db
