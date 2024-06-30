let db = require('../db2/index')

exports.getBloodData = (req, res) => { // 获取血液数据
  var sql = 'SELECT name,date,wbc,rbc,hb,hct,mcv FROM function_blood_routine_test where athlete_id = ? ORDER BY date '
  db.query(sql, [req.query.id], (err, data) => {
    if (err) {
      return res.send('错误：' + err.message)
    }
    res.send(data)
  })
}
// exports.getBloodData = (req, res) => { // 获取常规测试数据
//   var sql = 'SELECT name,date,wbc,rbc,hb,hct,mcv FROM function_blood_routine_test where athlete_id = ? ORDER BY date '
//   db.query(sql, [req.query.id], (err, data) => {
//     if (err) {
//       return res.send('错误：' + err.message)
//     }
//     res.send(data)
//   })
// }
exports.getTestData = (req, res) => { // 获取血液数据
  var sql = 'SELECT name,date,t,c,fe,bun,ck,iga,igm,igg FROM function_blood_phase_test where athlete_id = ? ORDER BY date'
  db.query(sql, [req.query.id], (err, data) => {
    if (err) {
      return res.send('错误：' + err.message)
    }
    res.send(data)
  })
}
// exports.getTestData = (req, res) => { // 获取阶段测试数据
//   var sql = 'SELECT name,date,t,c,fe,bun,ck,iga,igm,igg FROM function_blood_phase_test where athlete_id = ? ORDER BY date'
//   db.query(sql, [req.query.id], (err, data) => {
//     if (err) {
//       return res.send('错误：' + err.message)
//     }
//     res.send(data)
//   })
// }
exports.getAerobicData = (req, res) => { // 有氧能力
  var sql = 'SELECT name,date,vo2max,vo2max_rel FROM function_aerobic_capacity where athlete_id = ? ORDER BY date '
  db.query(sql, [req.query.id], (err, data) => {
    if (err) {
      return res.send('错误:' + err.message)
    }
    res.send(data)
  })
}
exports.getBodyData = (req, res) => {
  var sql = 'SELECT name,date,weight,fat_ratio,body_fat_mass,free_fat_mass FROM function_body_composition where athlete_id = ? ORDER BY date'
  db.query(sql, [req.query.id], (err, data) => { // 身体成分
    if (err) {
      return res.send('错误' + err.message)
    }
    res.send(data)
  })
}
