let db = require('../db/index')

exports.getPlayerData = (req, res) => { // 获取远动员冠军数据
  var sql = 'SELECT * FROM vsdatamock where athlete_id = ?'
  db.query(sql, [req.query.id], (err, data) => {
    if (err) {
      return res.send('错误：' + err.message)
    }
    res.send(data)
  })
}
