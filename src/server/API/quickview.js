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
// exports.getTestPersonInfo = (req, res) => { // 获取用户基本数据
//   var sql = 'SELECT * FROM (SELECT b.*,p.dynamometer_500m,p.dynamometer_5000m,p.dynamometer_30min,p.dynamometer_2000m FROM fitness_basic b JOIN fitness_pro p on b.athlete_id=p.athlete_id and b.date=p.date and p.athlete_id =? and b.athlete_id = ?) as temp
// WHERE temp.athlete_id = 57 ORDER BY temp.date DESC'
//   //var sql = `SELECT * FROM test_monishuju WHERE athlete_id = ? ORDER BY test_date DESC`
//   db.query(sql, [req.query.id], (err, data) => {
//     if (err) {
//       return res.send('错误：' + err.message)
//     }
//     res.send(data)
//   })
// }
// exports.getTestInfoByDate = (req, res) => { // 获取用户基本数据
//   //var sql = `SELECT * FROM test_monishuju WHERE athlete_id = ? and test_date = ?`
//   var sql = 'SELECT * FROM (SELECT b.*,p.dynamometer_500m,p.dynamometer_5000m,p.dynamometer_30min,p.dynamometer_2000m FROM fitness_basic b JOIN fitness_pro p on b.athlete_id=p.athlete_id and b.date=p.date and p.athlete_id =? and b.athlete_id = ?) as temp
// WHERE temp.athlete_id = ? and temp.date =?'
//   db.query(sql, [req.query.id, req.query.test_date], (err, data) => {
//     if (err) {
//       return res.send('错误：' + err.message)
//     }
//     res.send(data)
//   })
// }
