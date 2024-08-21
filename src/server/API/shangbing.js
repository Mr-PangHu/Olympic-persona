let db = require('../db2/index')

exports.getFMSData = (req, res) => { // 获取全部伤病数据
  db.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({ error: '数据库连接失败', details: err.message });
    }
    var sql = 'SELECT * FROM injury_fms_monishuju where athlete_id = ?'
    connection.query(sql, [req.query.id], (err, data) => {
      connection.release()
      if (err) {
        return res.send('错误：' + err.message)
      }
      res.send(data)
    })
  })
}
// exports.getFMSData = (req, res) => { // 获取全部伤病数据
//   var sql = 'SELECT * FROM injury_fms where athlete_id = ?'
//   db.query(sql, [req.query.id], (err, data) => {
//     if (err) {
//       return res.send('错误：' + err.message)
//     }
//     res.send(data)
//   })
// }
