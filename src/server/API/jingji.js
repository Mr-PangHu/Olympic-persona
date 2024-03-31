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
// exports.getCompData = (req, res) => { // 获取全部体能数据
//   var sql = 'SELECT * FROM (SELECT athlete.id,athlete.athlete_name,comp.comp_name,e.date,e.event_type,e.event_name,result.country,result.rank,result.d500m,result.d1000m,result.d1500m,result.d2000m FROM comp_perf_intl_comp as comp,comp_perf_intl_event as e,comp_perf_intl_result as result,comp_perf_intl_athlete as athlete,comp_perf_result_athlete as ra WHERE e.comp_perf_intl_comp_id = comp.id and result.comp_perf_intl_event_id = e.id and ra.comp_perf_intl_result_id = result.id and ra.comp_perf_intl_athlete_athlete_name = athlete.athlete_name) res WHERE res.id = ?'
//   db.query(sql, [req.query.id], (err, data) => {
//     if (err) {
//       return res.send('错误：' + err.message)
//     }
//     res.send(data)
//   })
// }
