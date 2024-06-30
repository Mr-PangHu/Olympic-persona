let db = require('../db2/index')

exports.getTableData = (req, res) => { // 获取用户基本数据
  const ids = req.query.ids
  // var sql = `SELECT * FROM test_monishuju WHERE athlete_id IN (${ids.join(',')})`
  var sql = `SELECT b.athlete_id,b.name,b.test_date,b.bench_press_1rm,b.press_score,b.deep_squat_1rm,b.squat_score,b.bench_pull_1rm, b.pull_score,b.strength_score,p.cgy500m_result,p.cgy500m_score,p.cgy500m_pace,p.cgy2000m_result,p.cgy2000m_score,p.cgy2000m_pace,p.cgy5000m_score,p.cgy5000m_result,p.cgy5000m_pace,p.cgy30min20str_score,p.cgy30min20str_result,p.cgy30min20str_pace,p.cgy10str_score,p.cgy10str_result,p.cgy10str_pace FROM fb b, fp p WHERE p.athlete_id = b.athlete_id and p.test_date = b.test_date and b.athlete_id IN  (${ids.join(',')})`
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
// 'SELECT b.athlete_id,b.`name`,b.test_date,b.bench_press_1rm,b.press_score,b.deep_squat_1rm,b.squat_score,b.bench_pull_1rm, b.pull_score,b.strength_score,p.cgy500m_result,p.cgy500m_score,p.cgy500m_pace,p.cgy2000m_result,p.cgy2000m_score,p.cgy2000m_pace,p.cgy5000m_score,p.cgy5000m_result,p.cgy5000m_pace,p.cgy30min20str_score,p.cgy30min20str_result,p.cgy30min20str_pace,p.cgy10str_score,p.cgy10str_result,p.cgy10str_pace FROM fb b, fp p WHERE p.athlete_id = b.athlete_id and p.test_date = b.test_date and b.athlete_id = ? ORDER BY test_date DESC
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
  // var sql = `SELECT * FROM test_monishuju`
  var sql = `SELECT b.athlete_id,b.name,b.test_date,b.bench_press_1rm,b.press_score,b.deep_squat_1rm,b.squat_score,b.bench_pull_1rm, b.pull_score,b.strength_score,p.cgy500m_result,p.cgy500m_score,p.cgy500m_pace,p.cgy2000m_result,p.cgy2000m_score,p.cgy2000m_pace,p.cgy5000m_score,p.cgy5000m_result,p.cgy5000m_pace,p.cgy30min20str_score,p.cgy30min20str_result,p.cgy30min20str_pace,p.cgy10str_score,p.cgy10str_result,p.cgy10str_pace FROM fb b, fp p WHERE p.athlete_id = b.athlete_id and p.test_date = b.test_date`
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
