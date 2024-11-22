let db = require('../db2/index')

exports.getTableData = (req, res) => { // 获取用户基本数据
  db.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({ error: '数据库连接失败', details: err.message });
    }
    const ids = req.query.ids
    var sql = `SELECT b.athlete_id,b.name,b.test_date,b.bench_press_1rm,b.press_score,b.deep_squat_1rm,b.squat_score,b.bench_pull_1rm, b.pull_score,b.strength_score,p.cgy500m_result,p.cgy500m_score,p.cgy500m_pace,p.cgy2000m_result,p.cgy2000m_score,p.cgy2000m_pace,p.cgy5000m_score,p.cgy5000m_result,p.cgy5000m_pace,p.cgy30min20str_score,p.cgy30min20str_tresult,p.cgy30min20str_pace,p.cgy10str_score,p.cgy10str_result,p.cgy10str_pace FROM fitness_basic b, fitness_pro p WHERE p.athlete_id = b.athlete_id and p.test_date = b.test_date and b.athlete_id IN  (${ids.join(',')})`
    connection.query(sql, [ids], (err, data) => {
      connection.release()
      if (err) {
        return res.send('错误：' + err.message)
      }
      res.send(data)
    })
  })
}

exports.getAllTableData = (req, res) => { // 获取用户基本数据
  db.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({ error: '数据库连接失败', details: err.message });
    }
    const ids = req.query.ids
    var sql = `SELECT b.athlete_id,b.name,b.test_date,b.bench_press_1rm,b.press_score,b.deep_squat_1rm,b.squat_score,b.bench_pull_1rm, b.pull_score,b.strength_score,p.cgy500m_result,p.cgy500m_score,p.cgy500m_pace,p.cgy2000m_result,p.cgy2000m_score,p.cgy2000m_pace,p.cgy5000m_score,p.cgy5000m_result,p.cgy5000m_pace,p.cgy30min20str_score,p.cgy30min20str_tresult,p.cgy30min20str_pace,p.cgy10str_score,p.cgy10str_result,p.cgy10str_pace FROM fitness_basic b, fitness_pro p WHERE p.athlete_id = b.athlete_id and p.test_date = b.test_date`
    connection.query(sql, [ids], (err, data) => {
      connection.release()
      if (err) {
        return res.send('错误：' + err.message)
      }
      res.send(data)
    })
  })
}
