let db = require('../db2/index')

exports.getBasicTinengData = (req, res) => { // 获取全部体能数据
  db.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({ error: '数据库连接失败', details: err.message });
    }
    // var sql = 'SELECT * FROM fitness_basic_monishuju where athlete_id = ? ORDER BY date'
    var sql = 'SELECT * FROM fitness_basic where athlete_id = ? ORDER BY test_date'
    connection.query(sql, [req.query.id], (err, data) => {
      connection.release()
      if (err) {
        return res.send('错误：' + err.message)
      }
      res.send(data)
    })
  })
}
// exports.getBasicTinengData = (req, res) => { // 获取全部体能数据
//   var sql = 'SELECT * FROM fitness_basic where athlete_id = ? ORDER BY date'
//   db.query(sql, [req.query.id], (err, data) => {
//     if (err) {
//       return res.send('错误：' + err.message)
//     }
//     res.send(data)
//   })
// }

exports.getProTinengData = (req, res) => { // 获取全部体能数据
  db.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({ error: '数据库连接失败', details: err.message });
    }
    // var sql = 'SELECT * FROM fitness_pro_monishuju where athlete_id = ? ORDER BY date'
    var sql = 'SELECT * FROM fitness_pro where athlete_id = ? ORDER BY test_date'
    connection.query(sql, [req.query.id], (err, data) => {
      connection.release()
      if (err) {
        return res.send('错误：' + err.message)
      }
      res.send(data)
    })
  })
}
// exports.getProTinengData = (req, res) => { // 获取全部体能数据
//   var sql = 'SELECT * FROM fitness_pro where athlete_id = ? ORDER BY date'
//   db.query(sql, [req.query.id], (err, data) => {
//     if (err) {
//       return res.send('错误：' + err.message)
//     }
//     res.send(data)
//   })
// }
