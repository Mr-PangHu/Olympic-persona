// node testConnectDb.js，测试数据库是否可以连接上
// https://blog.csdn.net/qq_42372031/article/details/133639714

// import * as tf from '@tensorflow/tfjs'
const tf = require('@tensorflow/tfjs-node')
let db = require('../db2/index')
const json = require('../data/labels.json');
const { log } = require('console');// 2,6
// var sql = 'select dynamometer_2000m,dynamometer_30min,vo2max,vo2max_rel,p4,dynamometer_5000m,dynamometer_6000m,bench_pull_1rm,dead_lift_1rm,bench_press_1rm,deep_squat_1rm,ck,hb,t,bnu,wbc,hct,c,rbc,fe from fatigue_predict';
// db.query(sql, (err, data) => {
//     if (err) {
//         return res.send('错误：' + err.message)
//     }
//     // 构建10行20列的数据
//     data = JSON.parse(JSON.stringify(data))
    
//     var _inputs = []
//     for (let j = 0; j < Math.floor(data.length / 10); j++) {
//         var single = []
//         for (let i = j * 10; i < j * 10 + 10; i++) {
//             var rows = [data[i]['dynamometer_2000m'], data[i]['dynamometer_30min'], data[i]['vo2max'], data[i]['vo2max_rel'], data[i]['p4'],
//             data[i]['dynamometer_5000m'], data[i]['dynamometer_6000m'], data[i]['bench_pull_1rm'], data[i]['dead_lift_1rm'], data[i]['bench_press_1rm'],
//             data[i]['deep_squat_1rm'], data[i]['ck'], data[i]['hb'], data[i]['t'], data[i]['bnu'],
//             data[i]['wbc'], data[i]['hct'], data[i]['c'], data[i]['rbc'], data[i]['fe']
//             ]
//             single.push(rows)
//         }
//         _inputs.push(single)
//         console.log(single)
//         break
//     }
// })

function convertTimeStringToSeconds (timeString) {
    console.log(timeString)
    if (typeof timeString == "undefined") {
        return 0
    }
    const parts = timeString.split("'"); // 拆分字符串为分钟和秒钟部分
    const minutes = parseInt(parts[0], 10); // 解析分钟部分为整数
    const seconds = parseFloat(parts[1]); // 解析秒钟部分为浮点数
    const totalSeconds = minutes * 60 + seconds; // 计算总秒数
    return totalSeconds;
}

sql = 'SELECT * FROM (SELECT a.id,a.athlete_id,e.name,e.gender,e.age,c.date,a.dynamometer_2000m,a.dynamometer_30min,b.vo2max_rel,b.p4,b.bench_pull_1rm,b.dead_lift_1rm,b.bench_press_1rm,b.deep_squat_1rm,c.ck,d.hb,c.t,c.bun,d.wbc,d.hct,c.c,d.rbc,c.fe FROM `fitness_pro` a INNER JOIN `vsdatamock` b on a.athlete_id=b.athlete_id INNER JOIN `function_blood_phase_test` c ON a.athlete_id=c.athlete_id INNER JOIN `function_blood_routine_test` d ON a.athlete_id=d.athlete_id INNER JOIN `person_info` e ON a.athlete_id=e.athlete_id) AS k ORDER BY k.athlete_id,k.date DESC';
db.query(sql, (err, data) => {
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
    console.log(_inputs)
    console.log(_athleteId_time)
    // for (let j = 0; j < Math.floor(data.length / 10); j++) {
    //     var single = []
    //     for (let i = j * 10; i < j * 10 + 10; i++) {
    //         var rows = [convertTimeStringToSeconds(data[i]['dynamometer_2000m']), convertTimeStringToSeconds(data[i]['dynamometer_30min']), data[i]['vo2max_rel'], data[i]['p4'],
    //         convertTimeStringToSeconds(data[i]['dynamometer_5000m']), data[i]['bench_pull_1rm'], data[i]['dead_lift_1rm'], data[i]['bench_press_1rm'],
    //         data[i]['deep_squat_1rm'], data[i]['ck'], data[i]['hb'], data[i]['t'], data[i]['bnu'],
    //         data[i]['wbc'], data[i]['hct'], data[i]['c'], data[i]['rbc'], data[i]['fe']
    //         ]
    //         single.push(rows)
    //     }
    //     _inputs.push(single)
    //     console.log(single)
    //     break
    // }
})
// const mysql = require('mysql')
// let conn = mysql.createConnection({
//   host: '127.0.0.1',
//   user: 'root',
//   password: 'xiehou',
//   database: 'persona_test'
// })
// conn.connect(err => {
//   if (err) throw err
//   console.log('connect success')
// })

// conn.end((err) => {
//   if (err) throw err
//   console.log('connect close')
// })

// const json = require('../labels.json')
// console.log(json)

// let sleep = (time)=> new Promise((resolve)=>{
//   setTimeout(resolve,time)
// })
// async function modelPredict(inputs) {
//   const model = await tf.loadLayersModel('file://D:/Python/project/Olympic-persona/src/server/data/model/model.json')
//   sleep(3000).then(
//     // 编译模型
//     model.compile({
//       optimizer: 'adam',
//       loss: 'binaryCrossentropy',
//       metrics: ['accuracy']
//     }))
//     var res = model.predict(inputs).dataSync()
//     return res
// }

// // 计算向量的内积
// function dotProduct(vector1, vector2) {
//   let result = 0;
//   for (let i = 0; i < vector1.length; i++) {
//     result += vector1[i] * vector2[i];
//   }
//   return result;
// }

// // 计算向量的模
// function vectorMagnitude(vector) {
//   let sum = 0;
//   for (let i = 0; i < vector.length; i++) {
//     sum += vector[i] * vector[i];
//   }
//   return Math.sqrt(sum);
// }

// // 计算两个矩阵的余弦相似度
// function cosineSimilarity(matrix1, matrix2) {
//   // 将矩阵转换为向量形式
//   const vector1 = matrix1.flat();
//   const vector2 = matrix2.flat();

//   // 计算向量的内积
//   const dot = dotProduct(vector1, vector2);

//   // 计算向量的模
//   const magnitude1 = vectorMagnitude(vector1);
//   const magnitude2 = vectorMagnitude(vector2);

//   // 计算余弦相似度
//   const similarity = dot / (magnitude1 * magnitude2);

//   return similarity;
// }

// exports.getLastTenData = (req, res) => {
//   var sql = 'select dynamometer_2000m,dynamometer_30min,vo2max,vo2max_rel,p4,dynamometer_5000m,dynamometer_6000m,bench_pull_1rm,dead_lift_1rm,bench_press_1rm,deep_squat_1rm,ck,hb,t,bnu,wbc,hct,c,rbc,fe from fatigue_predict where id>=1 and id<=10';
//   db.query(sql, (err, data) => {
//     if (err) {
//       return res.send('错误：' + err.message)
//     }
//     // 构建10行20列的数据
//     data = JSON.parse(JSON.stringify(data))
//     // console.log(data)
//     var inputs = []
//     for (let i = 0; i < 10; i++)
//     {
//       var rows = [data[i]['dynamometer_2000m'], data[i]['dynamometer_30min'], data[i]['vo2max'], data[i]['vo2max_rel'], data[i]['p4'],
//         data[i]['dynamometer_5000m'], data[i]['dynamometer_6000m'], data[i]['bench_pull_1rm'], data[i]['dead_lift_1rm'], data[i]['bench_press_1rm'],
//         data[i]['deep_squat_1rm'], data[i]['ck'], data[i]['hb'], data[i]['t'], data[i]['bnu'],
//         data[i]['wbc'], data[i]['hct'], data[i]['c'], data[i]['rbc'], data[i]['fe']
//       ]
//       inputs.push(rows)
//     }
//     console.log(inputs)
//     model_inputs = tf.tensor3d([inputs])
//     // model_inputs = tf.randomNormal([1, 10, 20])
//     // 调用模型预测结果
//     var res = modelPredict(model_inputs)
//     // 加载数据文件
//     console.log(res)
//     var labelsIndex=[]
//     for (let j = 0; j < res.length; j * 2)
//     {
//       if (res[j] < res[j + 1])
//       {
//         let maxSim = -1
//         let maxIndex = 0
//         for (let i = 0; i < json.length; i++)
//         {
//           let sim = cosineSimilarity(inputs, json[i])
//           if (sim > maxSim)
//           {
//             maxIndex = i
//             maxSim = sim
//           }
//         }
//         labelsIndex.push(maxIndex)
//       }
//     }
//     var data2 = []
//     for (let i = 0; i < labelsIndex.length; i++)
//     {
//       data2.push(json[labelsIndex[i]])
//     }
//     // res.send({'data1':inputs,'data2':data2})
//   })
// }
// this.getLastTenData()

// // var test = [[2, 3, 4], [5, 6, 7]]
// // var t = tf.tensor3d([test])
// // console.log(t.data);

