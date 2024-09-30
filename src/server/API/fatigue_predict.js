let db = require('../db2/index')
const json = require('../data/labels.json')
const json2 = require('../data/labels2.json')
const tf = require('@tensorflow/tfjs-node')
const { log } = require('console')

let sleep = (time)=> new Promise((resolve)=>{
  setTimeout(resolve,time)
})
async function modelPredict (inputs) {
  let model_dir = __dirname.replace("API", "data/model/model.json")
  model_dir = model_dir.replace("\\", "/")
  const model = await tf.loadLayersModel('file://'+model_dir)
  sleep(3000).then(
    // 编译模型
    model.compile({
      optimizer: 'adam',
      loss: 'binaryCrossentropy',
      metrics: ['accuracy']
    }))
  var res = model.predict(inputs).dataSync()
  return res
}

async function modelPredict2 (inputs) {
  let model_dir = __dirname.replace("API", "data/model2/model.json")
  model_dir = model_dir.replace("\\", "/")
  const model = await tf.loadLayersModel('file://'+model_dir)
  sleep(3000).then(
    // 编译模型
    model.compile({
      optimizer: 'adam',
      loss: 'binaryCrossentropy',
      metrics: ['accuracy']
    }))
  var res = model.predict(inputs).dataSync()
  return res
}

// 计算向量的内积
function dotProduct(vector1, vector2) {
  let result = 0;
  for (let i = 0; i < vector1.length; i++) {
    result += vector1[i] * vector2[i];
  }
  return result;
}

// 计算向量的模
function vectorMagnitude(vector) {
  let sum = 0;
  for (let i = 0; i < vector.length; i++) {
    sum += vector[i] * vector[i];
  }
  return Math.sqrt(sum);
}

// 计算两个矩阵的余弦相似度
function cosineSimilarity(matrix1, matrix2) {
  // 将矩阵转换为向量形式
  const vector1 = matrix1.flat();
  const vector2 = matrix2.flat();
  // 计算向量的内积
  const dot = dotProduct(vector1, vector2);
  // 计算向量的模
  const magnitude1 = vectorMagnitude(vector1);
  const magnitude2 = vectorMagnitude(vector2);
  // 计算余弦相似度
  const similarity = dot / (magnitude1 * magnitude2);
  return similarity;
}

// 转置二维数组/矩阵
function transposeArray(array) {
  const numRows = array.length;
  const numCols = array[0].length;
  const result = [];

  for (let j = 0; j < numCols; j++) {
    result[j] = [];
    for (let i = 0; i < numRows; i++) {
      result[j][i] = array[i][j];
    }
  }
  return result;
}
function findMinAndMaxIndexes(array) {
  let minValue = array[0];
  let minIndex = 0;
  let maxValue = array[0];
  let maxIndex = 0;

  for (let i = 1; i < array.length; i++) {
    if (array[i] < minValue) {
      minValue = array[i];
      minIndex = i;
    }
    if (array[i] > maxValue) {
      maxValue = array[i];
      maxIndex = i;
    }
  }
  return {
    minIndex: minIndex,
    maxIndex: maxIndex
  };
}

function getTime()
{
  var startDate = new Date(); // 获取当前日期
  var datesArray = [1,2,3,4,5,6,7,8,9,10]; // 创建一个空数组来存储日期
  // for (var i = 0; i < 10; i++) {
  //   var currentDate = new Date(startDate.getTime() - (i * 24 * 60 * 60 * 1000)) // 计算当前日期的后续日期
  //   var year = currentDate.getFullYear() // 获取年份
  //   var month = String(currentDate.getMonth() + 1).padStart(2, '0') // 获取月份，并补零
  //   var day = String(currentDate.getDate()).padStart(2, '0') // 获取日期，并补零
  //   var timeString = year + '-' + month + '-' + day // 格式化为字符串
  //   datesArray.push(timeString) // 将具体时间插入数组
  // }
  // datesArray.reverse()

  return datesArray
}

function getFatiguePredictDecision(data) {
  // 该函数用于获取运动员第几天状态开始不对，比如说成绩开始下降，部分血液指标开始出现问题
  var exceptionIndex = []
  for (let i = 0; i < data.length; i++)
  {
    if (i == 0 || i == 1 || i == 5 || i == 6 || i == 11 || i == 14 || i == 15 || i == 19)
    {
      exceptionIndex.push(findMinAndMaxIndexes(data[i]).minIndex)
    }
    else
    {
      exceptionIndex.push(findMinAndMaxIndexes(data[i]).maxIndex)
    }
  }
  exceptionIndex.sort()
  // 直接获取中位数，也就是索引值
  return exceptionIndex[10]
}

function convertTimeStringToSeconds (timeString) {
    if (typeof timeString == "undefined") {
        return 0
    }
    const parts = timeString.split("'"); // 拆分字符串为分钟和秒钟部分
    const minutes = parseInt(parts[0], 10); // 解析分钟部分为整数
    const seconds = parseFloat(parts[1]); // 解析秒钟部分为浮点数
    const totalSeconds = minutes * 60 + seconds; // 计算总秒数
    return totalSeconds;
}

exports.getAllFatigueData = (req, res) => {
  db.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({ error: "数据库连接失败", details: err.message });
    }
    var sql = 'select dynamometer_2000m,dynamometer_30min,vo2max,vo2max_rel,p4,dynamometer_5000m,dynamometer_6000m,bench_pull_1rm,dead_lift_1rm,bench_press_1rm,deep_squat_1rm,ck,hb,t,bnu,wbc,hct,c,rbc,fe from fatigue_predict';
    connection.query(sql, (err, data) => {
      connection.release()
      if (err) {
        return res.send('错误：' + err.message)
      }
      // 构建10行20列的数据
      data = JSON.parse(JSON.stringify(data))
      
      var _inputs = []
      for (let j = 0; j < Math.floor(data.length / 10); j++)
      {
        var single = []
        for (let i = j * 10; i < j * 10 + 10; i++)
        {
          var rows = [data[i]['dynamometer_2000m'], data[i]['dynamometer_30min'], data[i]['vo2max'], data[i]['vo2max_rel'], data[i]['p4'],
            data[i]['dynamometer_5000m'], data[i]['dynamometer_6000m'], data[i]['bench_pull_1rm'], data[i]['dead_lift_1rm'], data[i]['bench_press_1rm'],
            data[i]['deep_squat_1rm'], data[i]['ck'], data[i]['hb'], data[i]['t'], data[i]['bnu'],
            data[i]['wbc'], data[i]['hct'], data[i]['c'], data[i]['rbc'], data[i]['fe']
          ]
          single.push(rows)
        }
        _inputs.push(single)
      }
      // console.log(_inputs);
      model_inputs = tf.tensor3d(_inputs)
      var model_predict_results = []
      modelPredict(model_inputs).then((result) => {
        var labelsIndex = []
        for (let j = 0; j < result.length; j = j + 2)
        {  
          if (result[j] < result[j + 1])
          {  
            let maxSim = -1
            let maxIndex = 0
            for (let i = 0; i < json.length; i++)
            {
              let sim = cosineSimilarity(_inputs[Math.floor(j/2)], json[i])
              if (sim > maxSim)
              {
                maxIndex = i
                maxSim = sim
              }
            }
            labelsIndex.push(maxIndex)
            model_predict_results.push(1)
          }
          else
          {
            model_predict_results.push(0)
          }
        }
        let mostSimIndex = 0
        var return_res=[]
        for (let k = 0; k < model_predict_results.length; k++)
        {
          if (model_predict_results[k] == 1)
          {
            temp = transposeArray(_inputs[k])
            let exceptionDataIndex = getFatiguePredictDecision(temp) + 1
            return_res.push({ name: 'name-' + k, sex: 'sex-' + k, date: 'time-' + k, reason: '第'+exceptionDataIndex+'天出现疲劳', message: '第'+exceptionDataIndex+'天运动员训练状态和身体状态逐渐出现异常，请教练员引起重视', input:temp, mostSim: labelsIndex[mostSimIndex], simData: transposeArray(json[labelsIndex[mostSimIndex]]),times: getTime()})
            mostSimIndex++
          }
        }
        res.send({'res':return_res})
      })
    })
  })
  
}

exports.getAllFatigueData2 = (req, res) => {
  
  // sql = 'SELECT * FROM (SELECT a.id,a.athlete_id,e.name,e.gender,e.age,c.date,a.dynamometer_2000m,a.dynamometer_30min,b.vo2max_rel,b.p4,b.bench_pull_1rm,b.dead_lift_1rm,b.bench_press_1rm,b.deep_squat_1rm,c.ck,d.hb,c.t,c.bun,d.wbc,d.hct,c.c,d.rbc,c.fe FROM `fitness_pro` a INNER JOIN `vsdatamock` b on a.athlete_id=b.athlete_id INNER JOIN `function_blood_phase_test` c ON a.athlete_id=c.athlete_id INNER JOIN `function_blood_routine_test` d ON a.athlete_id=d.athlete_id INNER JOIN `person_info` e ON a.athlete_id=e.athlete_id) AS k ORDER BY k.athlete_id,k.date DESC';
  db.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({ error: '数据库连接失败', details: err.message });
    }
    // sql = 'SELECT * FROM (SELECT a.athlete_id,e.name,e.gender,e.age,c.date,a.dynamometer_2000m,a.dynamometer_30min,b.vo2max_rel,b.p4,b.bench_pull_1rm,b.dead_lift_1rm,b.bench_press_1rm,b.deep_squat_1rm,c.ck,d.hb,c.t,c.bun,d.wbc,d.hct,c.c,d.rbc,c.fe FROM `fitness_pro` a INNER JOIN `vsdatamock` b on a.athlete_id=b.athlete_id AND a.date=b.date INNER JOIN `function_blood_phase_test` c ON a.athlete_id=c.athlete_id and a.date=c.date INNER JOIN `function_blood_routine_test` d ON a.athlete_id=d.athlete_id and a.date=d.date INNER JOIN `person_info` e ON a.athlete_id=e.athlete_id) AS k ORDER BY k.athlete_id,k.date DESC';
    // new sql
    // 'SELECT * FROM 
    //   (SELECT a.athlete_id, e.name, e.gender, e.age, c.date, a.dynamometer_2000m, a.dynamometer_30min,
    //     b.vo2max_rel, b.p4, b.bench_pull_1rm, b.dead_lift_1rm, b.bench_press_1rm, b.deep_squat_1rm,
    //     c.ck, d.hb, c.t, c.bun, d.wbc, d.hct, c.c, d.rbc, c.fe 
    //     FROM`fitness_pro` a INNER JOIN`vsdatamock` b on a.athlete_id = b.athlete_id AND a.date = b.date 
    //     INNER JOIN`function_blood_phase_test` c ON a.athlete_id = c.athlete_id and a.date = c.date 
    //     INNER JOIN`function_blood_routine_test` d ON a.athlete_id = d.athlete_id and a.date = d.date 
    //     INNER JOIN`person_info` e ON a.athlete_id = e.athlete_id) AS k ORDER BY k.athlete_id, k.date DESC';
    sql = 'SELECT * FROM (SELECT a.athlete_id,e.name,e.gender,e.age,c.date,a.cgy2000m_score,a.cgy30min20str_score,b.vo2max_rel,b.p4,b.bench_pull_1rm,b.dead_lift_1rm,b.bench_press_1rm,b.deep_squat_1rm,c.ck,d.hb,c.t,c.bun,d.wbc,d.hct,c.c,d.rbc,c.fe FROM `fitness_pro` a INNER JOIN `vsdatamock` b on a.athlete_id=b.athlete_id AND a.test_date=b.date INNER JOIN `function_blood_phase_test` c ON a.athlete_id=c.athlete_id and a.test_date=c.date INNER JOIN `function_blood_routine_test` d ON a.athlete_id=d.athlete_id and a.test_date=d.date INNER JOIN `person_info` e ON a.athlete_id=e.athlete_id) AS k ORDER BY k.athlete_id,k.date DESC';
    connection.query(sql, (err, data) => {
      connection.release()
      if (err) {
        return res.send('错误：' + err.message)
      }
      // 构建10行20列的数据
      data = JSON.parse(JSON.stringify(data))
      
      var _inputs = []
      var _athleteId_time=[]
      var index = 0
      while (index < data.length - 10) {
          var single = []
          if (data[index]['athlete_id'] == data[index + 10]['athlete_id']) {
              for (let i = index; i < index + 10; i++) {
                  var rows = [convertTimeStringToSeconds(data[i]['dynamometer_2000m']), convertTimeStringToSeconds(data[i]['dynamometer_30min']), data[i]['vo2max_rel'], data[i]['p4'],
                  convertTimeStringToSeconds(data[i]['dynamometer_5000m']), data[i]['bench_pull_1rm'], data[i]['dead_lift_1rm'], data[i]['bench_press_1rm'],
                  data[i]['deep_squat_1rm'], data[i]['ck'], data[i]['hb'], data[i]['t'], data[i]['bun'],
                  data[i]['wbc'], data[i]['hct'], data[i]['c'], data[i]['rbc'], data[i]['fe']
                  ]
                  single.push(rows)
              }
              _inputs.push(single)
              _athleteId_time.push([data[index]['athlete_id'],data[index]['name'],data[index]['gender'],data[index]['date'],data[index]['age']])
          }
          ++index
          while (index<data.length-10 && data[index]['athlete_id'] == data[index - 1]['athlete_id']) {
              ++index
          }
      }
      // console.log(_inputs)
      if(_inputs.length!=0){
        model_inputs = tf.tensor3d(_inputs)
        var model_predict_results = []
        modelPredict2(model_inputs).then((result) => {
          var labelsIndex = []
          for (let j = 0; j < result.length; j = j + 2)
          {  
            if (result[j] < result[j + 1])
            {  
              let maxSim = -1
              let maxIndex = 0
              for (let i = 0; i < json2.length; i++)
              {
                let sim = cosineSimilarity(_inputs[Math.floor(j/2)], json2[i])
                if (sim > maxSim)
                {
                  maxIndex = i
                  maxSim = sim
                }
              }
              labelsIndex.push(maxIndex)
              model_predict_results.push(1)
            }
            else
            {
              model_predict_results.push(0)
            }
          }
          // console.log(model_predict_results)
          let mostSimIndex = 0
          var return_res=[]
          for (let k = 0; k < model_predict_results.length; k++)
          {
            if (model_predict_results[k] == 1)
            {
              temp = transposeArray(_inputs[k])
              let exceptionDataIndex = getFatiguePredictDecision(temp) + 1
              return_res.push({
                name: _athleteId_time[k][1],
                sex: _athleteId_time[k][2],
                date: _athleteId_time[k][3], reason: '第' + exceptionDataIndex + '天出现疲劳',
                message: '第' + exceptionDataIndex + '天运动员训练状态和身体状态逐渐出现异常，请教练员引起重视',
                input: temp,
                mostSim: labelsIndex[mostSimIndex],
                simData: transposeArray(json2[labelsIndex[mostSimIndex]]),
                times: getTime()
              })
              mostSimIndex++
            }
          }
          // console.log(return_res)
          res.send({'res':return_res})
        })
      }
      else {
        res.send({'info':[{message:"数据库查询为空，请检查数据库中数据是否符合请求！"}]})
      }
    })
  })
}

// exports.getSimilarityData = (req,res) => {
//   // console.log('getSimilarityData')
//   var sql = 'select dynamometer_2000m,dynamometer_30min,vo2max,vo2max_rel,p4,dynamometer_5000m,dynamometer_6000m,bench_pull_1rm,dead_lift_1rm,bench_press_1rm,deep_squat_1rm,ck,hb,t,bnu,wbc,hct,c,rbc,fe from fatigue_predict where id>=1 and id<=10';
//   db.query(sql, (err, data) => {
//     if (err) {
//       return res.send('错误：' + err.message)
//     }
//     // 构建10行20列的数据
//     data = JSON.parse(JSON.stringify(data))
//     // console.log(data)
//     var _inputs = []
//     for (let i = 0; i < 10; i++)
//     {
//       var rows = [data[i]['dynamometer_2000m'], data[i]['dynamometer_30min'], data[i]['vo2max'], data[i]['vo2max_rel'], data[i]['p4'],
//         data[i]['dynamometer_5000m'], data[i]['dynamometer_6000m'], data[i]['bench_pull_1rm'], data[i]['dead_lift_1rm'], data[i]['bench_press_1rm'],
//         data[i]['deep_squat_1rm'], data[i]['ck'], data[i]['hb'], data[i]['t'], data[i]['bnu'],
//         data[i]['wbc'], data[i]['hct'], data[i]['c'], data[i]['rbc'], data[i]['fe']
//       ]
//       _inputs.push(rows)
//     }
//     // console.log(inputs)
//     model_inputs = tf.tensor3d([_inputs])
//     // model_inputs = tf.randomNormal([1, 10, 20])
//     // 调用模型预测结果
//     // var result =await modelPredict(model_inputs)
//     modelPredict(model_inputs).then((result) => {
//       // 加载数据文件
//       // console.log(result)
//       var labelsIndex = []
//       for (let j = 0; j < result.length; j = j + 2)
//       {  
//         if (result[j] < result[j + 1])
//         {  
//           let maxSim = -1
//           let maxIndex = 0
//           for (let i = 0; i < json.length; i++)
//           {
//             let sim = cosineSimilarity(_inputs, json[i])
//             if (sim > maxSim)
//             {
//               maxIndex = i
//               maxSim = sim
//             }
//           }
//           labelsIndex.push(maxIndex)
//         }
//       }
//       var data2 = []
//       for (let i = 0; i < labelsIndex.length; i++)
//       {
//         data2.push(transposeArray(json[labelsIndex[i]]))
//       }
//       _inputs = transposeArray(_inputs)
//       let exceptionDataIndex = getFatiguePredictDecision(_inputs) + 1
//       let messages = '第'+exceptionDataIndex+'天运动员训练状态和身体状态逐渐出现异常，请教练员引起重视'
//       res.send({'data1':[_inputs],'data2':data2,'msg':messages,'times':getTime()})
//     })
//   })
// }