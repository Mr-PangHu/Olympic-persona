let db = require('../db/index')

exports.all = (req, res) => { // 获取info表全部数据
  var sql = 'select * from label_sys'
  db.query(sql, (err, data) => {
    if (err) {
      return res.send('错误：' + err.message)
    }
    res.send(data)
  })
}

exports.add = (req, res) => { // 向info表添加数据
  var sql = 'insert into label_sys (name,age,gender,level,event,height,shoulder,weight,VO2MAX,WYF,WL,SD,CGY,power,NL,perform,SBBW,SBtime,ZLZK,ZLtime) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)'
  db.query(sql, [req.query.name, req.query.age, req.query.gender, req.query.level, req.query.event, req.query.height, req.query.shoulder, req.query.weight, req.query.VO2MAX, req.query.WYF, req.query.WL, req.query.SD, req.query.CGY, req.query.power, req.query.NL, req.query.perform, req.query.SBBW, req.query.SBtime, req.query.ZLZK, req.query.ZLtime], (err, data) => {
    if (err) {
      return res.send('错误：' + err.message)
    }
    res.send({
      status: 200,
      message: '添加成功'
    })
  })
}

exports.del = (req, res) => { // 通过id删除数据
  var sql = 'delete from label_sys where id = ?'
  db.query(sql, [req.query.id], (err, data) => {
    if (err) {
      return res.send('错误：' + err.message)
    }
    res.send({
      status: 200,
      message: '删除成功'
    })
  })
}

exports.update = (req, res) => { // 通过id更新数据
  var sql = 'update label_sys set name = ?,age = ?,gender = ?,level = ?,event = ?,height = ?,shoulder = ?,weight = ?,VO2MAX = ?,WYF = ?,WL = ?,SD = ?,CGY = ?,power = ?,NL = ?,perform = ?,SBBW = ?,SBtime = ?,ZLZK = ?,ZLtime = ? where id = ?'
  db.query(sql, [req.query.name, req.query.age, req.query.gender, req.query.level, req.query.event, req.query.height, req.query.shoulder, req.query.weight, req.query.VO2MAX, req.query.WYF, req.query.WL, req.query.SD, req.query.CGY, req.query.power, req.query.NL, req.query.perform, req.query.SBBW, req.query.SBtime, req.query.ZLZK, req.query.ZLtime, req.query.id], (err, data) => {
    if (err) {
      return res.send('错误：' + err.message)
    }
    res.send({
      status: 200,
      message: '修改成功'
    })
  })
}
