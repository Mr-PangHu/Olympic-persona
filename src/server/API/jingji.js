let db = require('../db2/index')

exports.getCompData = (req, res) => { // 获取全部体能数据
  var sql = 'SELECT * FROM competition_results_monishuju where athlete_id = ?'
  db.query(sql, [req.query.id], (err, data) => {
    if (err) {
      return res.send('错误：' + err.message)
    }
    res.send(data)
  })
}