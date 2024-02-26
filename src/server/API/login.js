let db = require('../db2/index')

exports.login = (req, res) => {
  var name = req.body.name
  var password = req.body.password
  var auth = req.body.role
  var sql = 'select * from user where name = ?'
  db.query(sql, name, (err, data) => {
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
          res.send({
            status: 200,
            message: '登录成功',
            data: data[0],
            token: 'wzb12138'
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
}

exports.register = (req, res) => {
  const sql1 = 'select * from user where name = ?'
  const sql2 = 'insert into user (name, password) value (?, ?)'
  db.query(sql1, [req.body.name], (err, data) => {
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
      db.query(sql2, [req.body.name, req.body.password], (err, data) => {
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
}

exports.updatePwd = (req, res) => {
  const sql1 = 'select name from user where id = ?'
  const sql2 = 'update user set password = ? where id = ?'
  var password = req.body.password
  var id = req.body.id
  db.query(sql1, [id], (err, data) => {
    if (err) {
      return res.send({
        status: 400,
        message: '操作失败'
      })
    }
    if (data.length > 0) {
      db.query(sql2, [password, id], (err, data) => {
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
}
