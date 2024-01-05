let db = require('../db2/index')

exports.getTestDataById = (req, res) => { // 获取用户基本数据
  const ids = req.query.ids
  var sql = `SELECT * FROM person_info WHERE athlete_id IN (${ids.join(',')})`
  db.query(sql, [ids], (err, data) => {
    if (err) {
      return res.send('错误：' + err.message)
    }
    res.send(data)
  })
}
