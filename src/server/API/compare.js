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
//   const ids = req.query.ids
//   var sql = `SELECT test_date,athlete_name,test_rank,cgy500m_result,cgy500m_pace,cgy2000m_result,cgy2000m_pace,cgy5000m_result,cgy5000m_pace,cgy30min20str_result,cgy30min20str_pace,cgy10str_result,cgy10str_pace,squat_result,press_result,pull_result FROM test_monishuju WHERE athlete_id IN (${ids.join(',')})`
//   db.query(sql, [ids], (err, data) => {
//     if (err) {
//       return res.send('错误：' + err.message)
//     }
//     res.send(data)
//   })
// }
