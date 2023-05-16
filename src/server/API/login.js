let db = require('../db/index')

exports.login = (req, res) => {
  var sql = 'select * from user where name = ? and password = ?'
  db.query(sql, [req.body.params.name, req.body.params.password], (err, data) => {
    if (err) {
      return res.send({
        status: 400,
        message: '登录失败'
      })
    }
    if (data.length > 0) {
      res.send({
        status: 200,
        message: '登录成功',
        body: req.body,
        token: 'wzb12138'
      })
    } else {
      res.send({
        status: 202,
        message: '用户名或密码错误'
      })
    }
  })
}

exports.register = (req, res) => {
  const sql1 = 'select * from user where name = ?'
  const sql2 = 'insert into user (name, password) value (?, ?)'
  db.query(sql1, [req.body.params.name], (err, data) => {
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
      db.query(sql2, [req.body.params.name, req.body.params.password], (err, data) => {
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
  const sql1 = 'select * from user where name = ?'
  const sql2 = 'update user set password = ? where name = ?'
  db.query(sql1, [req.body.params.name], (err, data) => {
    if (err) {
      return res.send({
        status: 400,
        message: '操作失败'
      })
    }
    if (data.length > 0) {
      db.query(sql2, [req.body.params.password, req.body.params.name], (err, data) => {
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
