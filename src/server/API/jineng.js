let db = require('../db2/index')

exports.getBloodData = (req, res) => { // 获取血液数据
  db.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({ error: '数据库连接失败', details: err.message });
    }
    var sql = 'SELECT name,date,wbc,rbc,hb,hct,mcv FROM function_blood_routine_test where athlete_id = ? ORDER BY date '
    connection.query(sql, [req.query.id], (err, data) => {
      connection.release()
      if (err) {
        return res.send('错误：' + err.message)
      }
      res.send(data)
    })
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
  db.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({ error: '数据库连接失败', details: err.message });
    }
    var sql = 'SELECT name,date,t,c,fe,bun,ck,iga,igm,igg FROM function_blood_phase_test where athlete_id = ? ORDER BY date'
    connection.query(sql, [req.query.id], (err, data) => {
      connection.release()
      if (err) {
        return res.send('错误：' + err.message)
      }
      res.send(data)
    })
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
  db.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({ error: '数据库连接失败', details: err.message });
    }
    var sql = 'SELECT name,date,vo2max,vo2max_rel FROM function_aerobic_capacity where athlete_id = ? ORDER BY date '
    connection.query(sql, [req.query.id], (err, data) => {
      connection.release()
      if (err) {
        return res.send('错误:' + err.message)
      }
      res.send(data)
    })
  })
}
exports.getBodyData = (req, res) => {
  db.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({ error: '数据库连接失败', details: err.message });
    }
    var sql = 'SELECT name,date,weight,fat_ratio,body_fat_mass,free_fat_mass FROM function_body_composition where athlete_id = ? ORDER BY date'
    connection.query(sql, [req.query.id], (err, data) => { // 身体成分
      connection.release()
      if (err) {
        return res.send('错误' + err.message)
      }
      res.send(data)
    })
  })
}
