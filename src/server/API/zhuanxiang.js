let db = require('../db2/index')

exports.getAthleteData = (req, res) => { // 获取全部水上专项运动员
  db.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({ error: '数据库连接失败', details: err.message });
    }
    var sql = 'SELECT * FROM training_water_athlete where athlete_id = ?'
    // var sql = 'SELECT stroke_rate, max_force, rowing_power, work_per_stroke, legs_max_speed, legs_max_speed  FROM training_water_metrics WHERE athlete_training_id IN (SELECT id FROM training_water_athlete WHERE athlete_id = ?)'
    // console.log(req.query.id)
    connection.query(sql, [req.query.id], (err, data) => {
      connection.release()
      if (err) {
        return res.send('错误：' + err.message)
      }
      res.send(data)
    })
  })
}

exports.getSummaryData = (req, res) => { // 获取全部水上专项总结数据
  db.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({ error: '数据库连接失败', details: err.message });
    }
    var sql = 'SELECT * FROM training_water_summary WHERE id IN (SELECT training_id FROM training_water_athlete WHERE athlete_id = ?)'
    connection.query(sql, [req.query.id], (err, data) => {
      connection.release()
      if (err) {
        return res.send('错误：' + err.message)
      }
      res.send(data)
    })
  })
}

exports.getMetricsData = (req, res) => { // 获取全部水上专项指标数据
  db.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({ error: '数据库连接失败', details: err.message });
    }
    var sql = 'SELECT *  FROM training_water_metrics WHERE athlete_training_id IN (SELECT id FROM training_water_athlete WHERE athlete_id = ?)'
    connection.query(sql, [req.query.id], (err, data) => {
      connection.release()
      if (err) {
        return res.send('错误：' + err.message)
      }
      res.send(data)
    })
  })
}

exports.getGroundData = (req, res) => { // 获取全部陆地专项指标数据
  db.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({ error: '数据库连接失败', details: err.message });
    }
    var sql = 'SELECT *  FROM training_ground_training_monishuju WHERE athlete_id = ?'
    connection.query(sql, [req.query.id], (err, data) => {
      connection.release()
      if (err) {
        return res.send('错误：' + err.message)
      }
      res.send(data)
    })
  })
}
// exports.getGroundData = (req, res) => { // 获取全部水上专项指标数据
//   var sql = 'SELECT *  FROM training_ground_training WHERE athlete_id = ?'
//   db.query(sql, [req.query.id], (err, data) => {
//     if (err) {
//       return res.send('错误：' + err.message)
//     }
//     res.send(data)
//   })
// }
