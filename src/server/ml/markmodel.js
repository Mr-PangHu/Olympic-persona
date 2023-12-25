let db = require('../db2/index')

// // 引入tensorflow.js库
const tf = require('@tensorflow/tfjs-node');

// const model = tf.loadLayersModel('file:///home/webpractice/project/Olympic-persona/my-model/model.json');

// 定义一个函数，接受一个字符串作为参数
function stringToSecond (str) {
  // 去掉字符串中的 \r 字符
  str = str.replace(/\r/g, '')
  // 判断字符串中是否有 ' 字符，表示分钟
  if (str.includes("'")) {
    // 用 ' 字符分割字符串，得到分钟和秒
    let [minute, second] = str.split("'")
    // 将分钟和秒转换为数字，并计算总秒数
    return Number(minute) * 60 + Number(second)
  }
  // 判断字符串中是否有 " 字符，表示小数秒
  else if (str.includes('"')) {
    // 用 " 字符分割字符串，得到整数秒和小数秒
    let [intSecond, decSecond] = str.split('"')
    // 将整数秒和小数秒转换为数字，并计算总秒数
    return Number(intSecond) + Number(decSecond) / 100
  }
  // 否则，直接将字符串转换为数字，返回秒数
  else {
    return Number(str)
  }
}

const getmd = function (id) {
  id = 16
  var sql = `select * from fitness_basic_monishuju left join fitness_pro_monishuju 
   on fitness_basic_monishuju.athlete_id = fitness_pro_monishuju.athlete_id 
   and fitness_basic_monishuju.date = fitness_pro_monishuju.date 
   where fitness_basic_monishuju.athlete_id = ?`
  db.query(sql, id, (err, data) => {
    if (err) {
      console.log(err)
    }
    // console.log(data)
    var arr = []
    data.forEach(element => {
      // date,bench_press_1rm,deep_squat_1rm,standing_jump_both_legs,pull_up,sprint_run_30m
      // console.log(element)
      arr.push([element['date'], element['bench_press_1rm'], element['deep_squat_1rm'], element['standing_jump_both_legs'], element['pull_up'], stringToSecond(element['sprint_run_30m']), stringToSecond(element['dynamometer_2000m'])])
    })
    let model = require('../ml/trainmarkmodel')
    
    // // 训练模型，指定批次大小为32，周期数为50，验证集为0.2
    // model.fit(xTrain, yTrain, {batchSize: 32, epochs: 50, validationSplit: 0.2}).then(() => {
    //   // 在测试集上评估模型
    //   model.evaluate(xTest, yTest)
    //   // 预测一个新的数据
    //   const xNew = tf.randomNormal([1, 10])
    //   preds = model.predict(xNew)
    //   res = preds.dataSync()
    //   console.log(res[0])
    // });
    // const split = tf.split(arr, [8, 2], 0)
    // console.log(split)
    // split[0].slice([0, 0], [8, 5])
    const tarr = arr.slice(0, arr.length).map(row => row.slice(1, arr[0].length))
    // const tarr = arr.slice([0, 1], [arr.length, arr[0].length])
    const arrten = tf.tensor(tarr)
    // console.log(arrten)
    arrten.print()
    const trainnum = Math.floor(arr.length * 0.8)
    const testnum = arr.length - trainnum
    const split = tf.split(arrten, [trainnum, testnum], 0)
    const trainData = split[0]
    const testData = split[1]
    const xTrain = trainData.slice([0, 0], [8, 5])
    const yTrain = trainData.slice([0, 5], [8, 1])
    const xTest = testData.slice([0, 0], [2, 5])
    const yTest = testData.slice([0, 5], [2, 1])
    // console.log(xTrain, yTrain)
    trainData.print()
    xTrain.print()
    xTest.print()
    yTrain.print()
    yTest.print()

    // 训练模型，指定批次大小为32，周期数为50，验证集为0.2
    model.fit(xTrain, yTrain, {batchSize: 4, epochs: 50, validationSplit: 0.2}).then(() => {
      // 在测试集上评估模型
      model.evaluate(xTest, yTest)
      // // 预测一个新的数据
      const xNew = tf.randomNormal([1, 5])
      const preds = model.predict(xNew)
      const res = preds.dataSync()
      console.log(res[0])
    })
  })
  console.log(sql)
}

getmd(16)

// export const model = model
// module.exports = {model,getmd}
module.exports = getmd
