let db = require('../db/index')
const tf = require('@tensorflow/tfjs-node')
const async = require('async');

async function modelPredict (inputs) {
  const model = await tf.loadLayersModel('file://mpmodel/model.json')
  model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' })
  var res = model.predict(inputs).dataSync()
  return res
}

// 查找所有运动员的历史数据并训练
exports.getPlayersHisDataAll = (req, res) => { // 通过赛事项目获取成绩预测
  var sql = 'SELECT fitness_basic_monishuju.id,fitness_basic_monishuju.athlete_id,fitness_basic_monishuju.name,fitness_basic_monishuju.date,' +
  'fitness_basic_monishuju.sprint_run_30m,fitness_basic_monishuju.bench_press_1rm,fitness_basic_monishuju.deep_squat_1rm,' +
  'fitness_basic_monishuju.standing_jump_both_legs,fitness_basic_monishuju.pull_up,fitness_pro_monishuju.dynamometer_2000m,' +
  'fitness_pro_monishuju.dynamometer_30min' +
   ' FROM fitness_basic_monishuju LEFT JOIN fitness_pro_monishuju ON fitness_basic_monishuju.athlete_id = fitness_pro_monishuju.athlete_id ' +
  ' AND fitness_basic_monishuju.date = fitness_pro_monishuju.date'
  db.query(sql, '', (err, data) => {
    if (err) {
      return res.send('错误：' + err.message)
    }
    // 使用data训练
    var _inputs = []
    for (let i = 0; i < data.length; i++) {
      var rows = [convertToSeconds(data[i]['dynamometer_2000m']), data[i]['bench_press_1rm'],
        data[i]['deep_squat_1rm'], data[i]['standing_jump_both_legs'], data[i]['pull_up'],
        convertToMiniSeconds(data[i]['sprint_run_30m']), convertToSeconds(data[i]['dynamometer_30min'])
      ]
      _inputs.push(rows)
    }
    const xs = tf.tensor2d(_inputs.map(row => row.slice(1)))
    const ys = tf.tensor2d(_inputs.map(row => [row[0]]))
    // 定义模型
    const model = tf.sequential()
    model.add(tf.layers.dense({ units: 1, inputShape: [6] }))
    // 定义损失函数和优化器
    model.compile({ loss: 'meanSquaredError', optimizer: tf.train.adam(0.1) })
    // model.summary()
    // 训练模型
    model.fit(xs, ys, { epochs: 100 }).then(() => {
      // 保存模型
      model.save('file://mpmodel')
      // 输出模型参数
      const weights = model.getWeights()
      console.log('Weights:')
      for (let i = 0; i < weights.length; i++) {
        console.log(weights[i].dataSync())
      }
    })
    return res.send(data)
  })
}

// 根据运动员id获取数据并推理
exports.predictByID = (req, res) => { // 通过赛事项目获取成绩预测
  var id = req.query.id
  var sql = 'SELECT fitness_basic_monishuju.id,fitness_basic_monishuju.athlete_id,fitness_basic_monishuju.name,fitness_basic_monishuju.date,' +
  'fitness_basic_monishuju.sprint_run_30m,fitness_basic_monishuju.bench_press_1rm,fitness_basic_monishuju.deep_squat_1rm,' +
  'fitness_basic_monishuju.standing_jump_both_legs,fitness_basic_monishuju.pull_up,fitness_pro_monishuju.dynamometer_2000m,' +
  'fitness_pro_monishuju.dynamometer_30min' +
   ' FROM fitness_basic_monishuju LEFT JOIN fitness_pro_monishuju ON fitness_basic_monishuju.athlete_id = fitness_pro_monishuju.athlete_id ' +
  'AND fitness_basic_monishuju.date = fitness_pro_monishuju.date' +
  ' where fitness_basic_monishuju.athlete_id=(?)  ORDER BY date desc Limit 1;'
  db.query(sql, id, (err, data) => {
    if (err) {
      return res.send('错误：' + err.message)
    }
    // 使用data训练
    var _inputs = []
    for (let i = 0; i < data.length; i++) {
      var rows = [convertToSeconds(data[i]['dynamometer_2000m']), data[i]['bench_press_1rm'],
        data[i]['deep_squat_1rm'], data[i]['standing_jump_both_legs'], data[i]['pull_up'],
        convertToMiniSeconds(data[i]['sprint_run_30m']), convertToSeconds(data[i]['dynamometer_30min'])
      ]
      _inputs.push(rows)
    }
    if ((_inputs).length !== 1) {
      res.send('no data')
    } else {
      if (!checkArray(_inputs[0])) {
        res.send('data not enough')
      } else {
        const xs = tf.tensor2d(_inputs.map(row => row.slice(1)))
        modelPredict(xs).then((result) => {
          // 加载数据文件
          res.send(result)
        })
      }
    }
  })
}

// 根据id查找某一个运动员的历史数据
exports.getPlayersHisData = (req, res) => { // 通过赛事项目获取成绩预测
  var id = req.query.id
  var sql = 'SELECT fitness_basic_monishuju.id,fitness_basic_monishuju.athlete_id,fitness_basic_monishuju.name,fitness_basic_monishuju.date,' +
  'fitness_basic_monishuju.sprint_run_30m,fitness_basic_monishuju.bench_press_1rm,fitness_basic_monishuju.deep_squat_1rm,' +
  'fitness_basic_monishuju.standing_jump_both_legs,fitness_basic_monishuju.pull_up,fitness_pro_monishuju.dynamometer_2000m,' +
  'fitness_pro_monishuju.dynamometer_30min' +
   ' FROM fitness_basic_monishuju LEFT JOIN fitness_pro_monishuju ON fitness_basic_monishuju.athlete_id = fitness_pro_monishuju.athlete_id ' +
  'AND fitness_basic_monishuju.date = fitness_pro_monishuju.date' +
  ' where fitness_basic_monishuju.athlete_id=(?)  ORDER BY date desc Limit 5;'
  db.query(sql, id, (err, data) => {
    if (err) {
      return res.send('错误：' + err.message)
    }
    return res.send(data)
  })
}

exports.getPredictMark = (req, res) => {
  var sql = 'select * from person_info'
  db.query(sql, (err, data) => {
    if (err) {
      return res.send('错误：' + err.message)
    }
    const tmp = data
    let needList = []
    if (tmp.length > 0) {
      var sql2 = 'SELECT fitness_basic_monishuju.id,fitness_basic_monishuju.athlete_id,fitness_basic_monishuju.name,fitness_basic_monishuju.date,' +
      'fitness_basic_monishuju.sprint_run_30m,fitness_basic_monishuju.bench_press_1rm,fitness_basic_monishuju.deep_squat_1rm,' +
      'fitness_basic_monishuju.standing_jump_both_legs,fitness_basic_monishuju.pull_up,fitness_pro_monishuju.dynamometer_2000m,' +
      'fitness_pro_monishuju.dynamometer_30min' +
      ' FROM fitness_basic_monishuju LEFT JOIN fitness_pro_monishuju ON fitness_basic_monishuju.athlete_id = fitness_pro_monishuju.athlete_id ' +
      'AND fitness_basic_monishuju.date = fitness_pro_monishuju.date' +
      ' where fitness_basic_monishuju.athlete_id=(?)  ORDER BY date desc Limit 2;'
      async.forEachOf(tmp, function (item, i, callback) {
        db.query(sql2, item['athlete_id'], function (err, tmp2) {
          // 执行 SQL 语句失败
          if (err) return err
          var _inputs = []
          var _his = []
          for (let i = 0; i < tmp2.length; i++) {
            var rows = [convertToSeconds(tmp2[i]['dynamometer_2000m']), tmp2[i]['bench_press_1rm'],
              tmp2[i]['deep_squat_1rm'], tmp2[i]['standing_jump_both_legs'], tmp2[i]['pull_up'],
              convertToMiniSeconds(tmp2[i]['sprint_run_30m']), convertToSeconds(tmp2[i]['dynamometer_30min'])
            ]
            if (_inputs.length === 0) {
              _inputs.push(rows)
            } else {
              _his.push(rows)
            }
          }
          if ((_inputs).length !== 1) {
            needList.push({project: '2000m', id: item['athlete_id'], name: item['name'], sex: item['gender'], lastmark: '暂无数据', premark: '暂无数据', reason: get暂无数据Reason(), date: getTodayDate()})
          } else {
            if (!checkArray(_inputs[0])) {
              needList.push({project: '2000m', id: item['athlete_id'], name: item['name'], sex: item['gender'], lastmark: '暂无数据', premark: '暂无数据', reason: get暂无数据Reason(), date: getTodayDate()})
            } else {
              const xs = tf.tensor2d(_inputs.map(row => row.slice(1)))
              modelPredict(xs).then((result) => {
                needList.push({project: '2000m',
                  id: item['athlete_id'],
                  name: item['name'],
                  sex: item['gender'],
                  lastmark: secondsToMinutesAndSeconds(floatToInteger(_inputs[0][0])),
                  premark: secondsToMinutesAndSeconds(floatToInteger(result[0])),
                  reason: getReason(secondsToMinutesAndSeconds(floatToInteger(_inputs[0][0])), secondsToMinutesAndSeconds(floatToInteger(result[0])), _his, _inputs),
                  date: getTodayDate()})
              })
            }
          }
          callback();
        });
      }, function (err) {
        if (err) {
          return err
        } else {
          // whatever you wanna do after all the iterations are done
          return res.send(needList)
        }
      });
    }
  })
}

function convertToSeconds (str) {
  // 去除字符串尾部的 \r
  str = str.trim()
  // 将分和秒分别提取出来
  const [minutes, seconds] = str.split("'")
  // 计算总秒数
  const totalSeconds = parseInt(minutes * 60) + parseInt(seconds)
  return totalSeconds
}

function convertToMiniSeconds (str) {
  // 去除字符串尾部的 \r
  str = str.trim()
  // 将分和秒分别提取出来
  const seconds = str.replace(/"/g, '.')
  // 计算总秒数
  const totalSeconds = parseFloat(seconds)
  return totalSeconds
}

function checkArray(arr) {
  let count = 0;
  for (const element of arr) {
    if (isNumeric(element)) {
      count++;
    } else {
      return false; // 如果有非数字元素，直接返回 false
    }
  }
  return count === 7;
}

function isNumeric(value) {
  return typeof value === 'number' && !isNaN(value);
}

// 浮点数转整数
function floatToInteger(number) {
  return Math.round(number);
}

// 秒转字符串
function secondsToMinutesAndSeconds(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
  return `${formattedMinutes}分${formattedSeconds}秒`;
}

function getTodayDate() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // 注意：月份从 0 开始，所以要加 1
  const day = currentDate.getDate();
  return year + '-' + month + '-' + day
}

function getReason (before, after, his, inputs) {
  let rea = ''
  if (his[0][0] > inputs[0][0]) {
    // 成绩提升
    rea += '成绩有所提升；'
    if (his[0][1] < inputs[0][1]) {
      rea += '卧推成绩提升；'
    }
    if (his[0][2] < inputs[0][2]) {
      rea += '深蹲成绩提升；'
    }
    if (his[0][3] < inputs[0][3]) {
      rea += '立定跳远成绩提升；'
    }
    if (his[0][4] < inputs[0][4]) {
      rea += '立定跳远成绩提升；'
    }
    if (his[0][5] < inputs[0][5]) {
      rea += '引体向上成绩提升；'
    }
    if (his[0][6] > inputs[0][6]) {
      rea += '30m冲刺成绩提升；'
    }
    if (his[0][7] < inputs[0][7]) {
      rea += '测功仪30min成绩提升；'
    }
  } else {
    // 成绩下降
    rea += '成绩有所下降；'
    if (his[0][1] > inputs[0][1]) {
      rea += '卧推成绩下降；'
    }
    if (his[0][2] > inputs[0][2]) {
      rea += '深蹲成绩下降；'
    }
    if (his[0][3] > inputs[0][3]) {
      rea += '立定跳远成绩下降；'
    }
    if (his[0][4] > inputs[0][4]) {
      rea += '立定跳远成绩下降；'
    }
    if (his[0][5] > inputs[0][5]) {
      rea += '引体向上成绩下降；'
    }
    if (his[0][6] < inputs[0][6]) {
      rea += '30m冲刺成绩下降；'
    }
    if (his[0][7] > inputs[0][7]) {
      rea += '测功仪30min成绩下降；'
    }
  }
  return rea
}

function get暂无数据Reason () {
  return '数据不足，暂时无法预测'
}
