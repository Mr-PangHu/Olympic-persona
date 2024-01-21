let db = require('../db2/index')

exports.getTestPersonInfo = (req, res) => { // 获取用户基本数据
  var sql = `SELECT * FROM test_monishuju WHERE athlete_id = ? ORDER BY test_date DESC`
  db.query(sql, [req.query.id], (err, data) => {
    if (err) {
      return res.send('错误：' + err.message)
    }
    res.send(data)
  })
}
exports.getTestInfoByDate = (req, res) => { // 获取用户基本数据
  var sql = `SELECT * FROM test_monishuju WHERE athlete_id = ? and test_date = ?`
  db.query(sql, [req.query.id, req.query.test_date], (err, data) => {
    if (err) {
      return res.send('错误：' + err.message)
    }
    res.send(data)
  })
}
