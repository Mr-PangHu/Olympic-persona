let db = require('../db2/index')

exports.getTestPersonInfo = (req, res) => { // 获取用户基本数据
  db.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({ error: '数据库连接失败', details: err.message });
    }
    // var sql = `SELECT * FROM test_monishuju WHERE athlete_id = ? ORDER BY test_date DESC`
    var sql = 'SELECT b.athlete_id,b.`name`,b.test_date,b.bench_press_1rm,b.press_score,b.deep_squat_1rm,b.squat_score,b.bench_pull_1rm, b.pull_score,b.strength_score,p.cgy500m_result,p.cgy500m_score,p.cgy500m_pace,p.cgy2000m_result,p.cgy2000m_score,p.cgy2000m_pace,p.cgy5000m_score,p.cgy5000m_result,p.cgy5000m_pace,p.cgy30min20str_score,p.cgy30min20str_result,p.cgy30min20str_tresult,p.cgy30min20str_pace,p.cgy10str_score,p.cgy10str_result,p.cgy10str_pace FROM fitness_basic b, fitness_pro p WHERE p.athlete_id = b.athlete_id and p.test_date = b.test_date and b.athlete_id = ? ORDER BY test_date DESC'
    connection.query(sql, [req.query.id], (err, data) => {
      connection.release()
      if (err) {
        return res.send('错误：' + err.message)
      }
      res.send(data)
    })
  })
}

exports.getTestInfoByDate = (req, res) => { // 获取用户基本数据
  db.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({ error: '数据库连接失败', details: err.message });
    }
    // var sql = `SELECT * FROM test_monishuju WHERE athlete_id = ? and test_date = ?`
    var sql = 'SELECT b.athlete_id,b.`name`,b.test_date,b.bench_press_1rm,b.press_score,b.deep_squat_1rm,b.squat_score,b.bench_pull_1rm, b.pull_score,b.strength_score,p.cgy500m_result,p.cgy500m_score,p.cgy500m_pace,p.cgy2000m_result,p.cgy2000m_score,p.cgy2000m_pace,p.cgy5000m_score,p.cgy5000m_result,p.cgy5000m_pace,p.cgy30min20str_score,p.cgy30min20str_result,p.cgy30min20str_tresult,p.cgy30min20str_pace,p.cgy10str_score,p.cgy10str_result,p.cgy10str_pace FROM fitness_basic b, fitness_pro p WHERE p.athlete_id = b.athlete_id and p.test_date = b.test_date and b.athlete_id = ? and b.test_date = ?'
    connection.query(sql, [req.query.id, req.query.test_date], (err, data) => {
      connection.release()
      if (err) {
        return res.send('错误：' + err.message)
      }
      res.send(data)
    })
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
