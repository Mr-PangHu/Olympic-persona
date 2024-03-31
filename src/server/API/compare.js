let db = require('../db2/index')

exports.getTableData = (req, res) => { // 获取用户基本数据
  const ids = req.query.ids
  var sql = `SELECT * FROM test_monishuju WHERE athlete_id IN (${ids.join(',')})`
  db.query(sql, [ids], (err, data) => {
    if (err) {
      return res.send('错误：' + err.message)
    }
    res.send(data)
  })
}
// exports.getTableData = (req, res) => { // 获取用户基本数据
// const ids = req.query.ids
// //两个sql都可以
// var sql = 'SELECT b.*,p.dynamometer_500m,p.dynamometer_5000m,p.dynamometer_30min,p.dynamometer_2000m FROM fitness_basic b,fitness_pro p WHERE b.athlete_id=p.athlete_id and b.date=p.date and p.athlete_id IN (${ids.join(',')}) and b.athlete_id IN (${ids.join(',')})'
// var sql = 'SELECT b.*,p.dynamometer_500m,p.dynamometer_5000m,p.dynamometer_30min,p.dynamometer_2000m FROM fitness_basic b JOIN fitness_pro p on b.athlete_id=p.athlete_id and b.date=p.date and p.athlete_id IN (${ids.join(',')}) and b.athlete_id IN (${ids.join(',')}) '
// //var sql = `SELECT * FROM fitness_basic,fitness_pro WHERE athlete_id IN (${ids.join(',')})`
// db.query(sql, [ids], (err, data) => {
//   if (err) {
//     return res.send('错误：' + err.message)
//   }
//   res.send(data)
// })
// }

exports.getAllTableData = (req, res) => { // 获取用户基本数据
  const ids = req.query.ids
  var sql = `SELECT * FROM test_monishuju`
  db.query(sql, [ids], (err, data) => {
    if (err) {
      return res.send('错误：' + err.message)
    }
    res.send(data)
  })
}
// exports.getAllTableData = (req, res) => { // 获取用户基本数据
//   //const ids = req.query.ids
//   //var sql = `SELECT * FROM test_monishuju`
//   var sql = 'SELECT b.athlete_id,b.name,b.date from fitness_basic b,fitness_pro p where b.athlete_id = p.athlete_id and b.date = p.date'
//   var sql  = 'SELECT b.athlete_id,b.name,b.date from fitness_basic b join fitness_pro p on b.athlete_id = p.athlete_id and b.date = p.date'
//   db.query(sql,(err, data) => {
//     if (err) {
//       return res.send('错误：' + err.message)
//     }
//     res.send(data)
//   })
// }
// exports.getTableData = (req, res) => { // 获取用户基本数据
//   const ids = req.query.ids
//   var sql = `SELECT test_date,athlete_name,test_rank,cgy500m_result,cgy500m_pace,cgy2000m_result,cgy2000m_pace,cgy5000m_result,cgy5000m_pace,cgy30min20str_result,cgy30min20str_pace,cgy10str_result,cgy10str_pace,squat_result,press_result,pull_result FROM test_monishuju WHERE athlete_id IN (${ids.join(',')})`
//   db.query(sql, [ids], (err, data) => {
//     if (err) {
//       return res.send('错误：' + err.message)
//     }
//     res.send(data)
//   })
// }
