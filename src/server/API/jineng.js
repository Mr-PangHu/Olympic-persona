let db = require('../db2/index')

exports.getBloodData = (req, res) => { // 获取血液数据
  var sql = 'SELECT * FROM blood_monishuju where athlete_id = ?'
  db.query(sql, [req.query.id], (err, data) => {
    if (err) {
      return res.send('错误：' + err.message)
    }
    res.send(data)
  })
}
exports.getAerobicData = (req, res) => { // 有氧能力
  var sql = 'SELECT * FROM function_aerobic_capacity where athlete_id = ?'
  db.query(sql, [req.query.id], (err, data) => {
    if (err) {
      return res.send('错误:' + err.message)
    }
    res.send(data)
  })
}
exports.getBodyData = (req, res) => {
  var sql = 'SELECT * FROM function_body_composition where athlete_id = ?'
  db.query(sql, [req.query.id], (err, data) => { // 身体成分
    if (err) {
      return res.send('错误' + err.message)
    }
    res.send(data)
  })
}
