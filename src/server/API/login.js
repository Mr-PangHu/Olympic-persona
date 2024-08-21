let db = require('../db2/index')
const jwt = require('jsonwebtoken');

function getCurrentDateTimeForDatabase() {
  var date = new Date();
  var year = date.getFullYear();
  var month = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth()是0-based
  var day = date.getDate().toString().padStart(2, '0');
  var hours = date.getHours().toString().padStart(2, '0');
  var minutes = date.getMinutes().toString().padStart(2, '0');
  var seconds = date.getSeconds().toString().padStart(2, '0');

  // 格式化为 YYYY-MM-DD HH:MM:SS
  var dateTimeString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return dateTimeString;
}
function getCurrentDateTimeForDatabase1() {
  var date = new Date();
  var year = date.getFullYear();
  var month = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth()是0-based
  var day = date.getDate().toString().padStart(2, '0');
  var hours = (date.getHours() + 3).toString().padStart(2, '0');
  var minutes = date.getMinutes().toString().padStart(2, '0');
  var seconds = date.getSeconds().toString().padStart(2, '0');

  // 格式化为 YYYY-MM-DD HH:MM:SS
  var dateTimeString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return dateTimeString;
}

exports.login = (req, res) => {
  db.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({ error: '数据库连接失败', details: err.message });
    }
    var name = req.body.name
    var password = req.body.password
    var auth = req.body.role
    var sql = 'select * from user where name = ?'
    connection.query(sql, name, (err, data) => {
      // connection.release()
      if (err) {
        return res.send({
          status: 400,
          message: err
        })
      }
      if (data.length === 0) {
        res.send({
          status: 401,
          message: '用户名不存在'
        })
      } else {
        if (data[0].password === password) {
          if (data[0].auth === Number(auth)) {
            var loginTime = getCurrentDateTimeForDatabase();
            var outTime = getCurrentDateTimeForDatabase1();
            var logSql = 'INSERT INTO user_log (name, login_time,out_time) VALUES (?, ?, ?)';
            console.log(loginTime, outTime);
            connection.query(logSql, [name, loginTime, outTime], (logErr, logData) => {
              connection.release()
              if (logErr) {
                console.error('Error logging login time:', logErr);
                // You can choose whether to continue or send an error response
              }
            });
            const token = jwt.sign({ name, auth }, 'ecust2023', { expiresIn: '3h' });
            res.send({
              status: 200,
              message: '登录成功',
              data: data[0],
              token: token
            })
          } else {
            res.send({
              status: 403,
              message: '角色权限错误'
            })
          }
        } else {
          res.send({
            status: 402,
            message: '密码错误'
          })
        }
      }
    })
  })
}

exports.updateLoginoutTime = (req, res) => {
  db.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({ error: '数据库连接失败', details: err.message });
    }
    var name = req.body.params.name
    const sql1 = 'select id from user_log where name = ? order by id desc'
    connection.query(sql1, [name], (err, result) => {
      // connection.release()
      // console.log("defe")
      if (err) {
        // console.log("2222222")
        return res.send({
          status: 400,
          message: err
        });
      }
      // console.log("1111")
      // console.log(result)
      if (result.length === 0) {
        // console.log("33333333")
        return res.send({
          status: 404,
          message: '未找到与该用户名相关的登录记录'
        });
      }
      // console.log("edugue")
      const logId = result[0].id;
      // console.log(logId)
      // console.log("__oooq")
      // 获取当前时间
      const currentTime = getCurrentDateTimeForDatabase();
      console.log(currentTime)
      // SQL 更新语句2
      const sql2 = 'update user_log set out_time = ? where id = ?'
      connection.query(sql2, [currentTime, logId], (updateErr, updateResult) => {
        connection.release()
        if (updateErr) {
          return res.send({
            status: 500,
            message: '更新登出时间时出错',
            error: updateErr
          });
        }
        res.send({
          status: 200,
          message: '成功更新登出时间'
        });
      });
    });
  })
}

exports.register = (req, res) => {
  db.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({ error: '数据库连接失败', details: err.message });
    }
    const sql1 = 'select * from user where name = ?'
    const sql2 = 'insert into user (name, password) value (?, ?)'
    connection.query(sql1, [req.body.name], (err, data) => {
      if (err) {
        return res.send({
          status: 400,
          message: '操作失败'
        })
      }
      if (data.length > 0) {
        return res.send({
          status: 202,
          message: '用户名已存在'
        })
      } else {
        connection.query(sql2, [req.body.name, req.body.password], (err, data) => {
          connection.release()
          if (err) {
            return res.send({
              status: 400,
              message: '注册失败'
            })
          }
          res.send({
            status: 200,
            message: '注册成功'
          })
        })
      }
    })
  })
}

exports.updatePwd = (req, res) => {
  db.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({ error: '数据库连接失败', details: err.message });
    }
    const sql1 = 'select name from user where id = ?'
    const sql2 = 'update user set password = ? where id = ?'
    var password = req.body.password
    var id = req.body.id
    connection.query(sql1, [id], (err, data) => {
      if (err) {
        return res.send({
          status: 400,
          message: '操作失败'
        })
      }
      if (data.length > 0) {
        connection.query(sql2, [password, id], (err, data) => {
          connection.release()
          if (err) {
            res.send({
              status: 202,
              message: '用户名不存在'
            })
          } else {
            return res.send({
              status: 200,
              message: '修改成功'
            })
          }
        })
      }
    })
  })
}
