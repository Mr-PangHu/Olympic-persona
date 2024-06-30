const tf = require('@tensorflow/tfjs-node')
let db = require('../db2/index')

exports.getYear = (req, res) => { // 获取全部年份
  var sql = 'SELECT comp_name FROM comp_perf_intl_comp'
  db.query(sql, (err, data) => {
    if (err) {
      return res.send('错误：' + err.message)
    }
    const tmp = data.map(item => {
      return item.comp_name.substring(0, 4)
    })
    const ne = [...new Set(tmp)]
    ne.sort((a, b) => b - a)
    res.send(ne)
  })
}

exports.getCompByYear = (req, res) => { // 通过年份获取赛事名
  var year = req.query.year
  var sql = `SELECT comp_name FROM comp_perf_intl_comp WHERE comp_name LIKE '%${year}%'`
  db.query(sql, (err, data) => {
    if (err) {
      return res.send('错误：' + err.message)
    }
    res.send(data)
  })
}

exports.getEventById = (req, res) => { // 通过id获取赛事项目
  var comp = req.query.comp
  var sql1 = `SELECT id FROM comp_perf_intl_comp WHERE comp_name = ?`
  db.query(sql1, [comp], (err, data) => {
    if (err) {
      return res.send('错误：' + err.message)
    }
    if (data.length !== 0) {
      const id = data[0].id
      var sql2 = `SELECT id,event_type FROM comp_perf_intl_event WHERE comp_perf_intl_comp_id = ?`
      db.query(sql2, [id], (err, data) => {
        if (err) {
          return res.send('错误：' + err.message)
        }
        res.send(data)
      })
    }
  })
}

exports.getResultsByEvent = (req, res) => { // 通过赛事项目获取成绩
  var event = req.query.event
  var id = req.query.id
  var sql1 = `SELECT id FROM comp_perf_intl_event WHERE id = ? and event_type = ?`
  db.query(sql1, [id, event], (err, data) => {
    if (err) {
      return res.send('错误：' + err.message)
    }
    if (data.length !== 0) {
      const id = data[0].id
      var sql2 = `SELECT * FROM comp_perf_intl_result WHERE comp_perf_intl_event_id = ?`
      db.query(sql2, [id], (err, data) => {
        if (err) {
          return res.send('错误：' + err.message)
        }
        res.send(data)
      })
    }
  })
}

exports.getResultsByEventPre = (req, res) => { // 通过赛事项目获取成绩预测
  var event = "U23 Men_s Coxed Four"
  var id = 311
  let md = require('../ml/markmodel')
  md.predict(tf.tensor2d([5], [1, 1])).print()
  var sql1 = `SELECT id FROM comp_perf_intl_event WHERE id = ? and event_type = ?`
  db.query(sql1, [id, event], (err, data) => {
    console.log(err)
    if (err) {
      return res.send('错误：' + err.message)
    }
    console.log(data)
    if (data.length !== 0) {
      const id = data[0].id
      var sql2 = `SELECT * FROM comp_perf_intl_result WHERE comp_perf_intl_event_id = ?`
      db.query(sql2, [id], (err, data) => {
        if (err) {
          return res.send('错误：' + err.message)
        }
        console.log(data)
        res.send(data)
      })
    }
  })
}
