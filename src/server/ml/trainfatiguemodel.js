let db = require('../db2/index')
// 引入tensorflow.js库
const tf = require('@tensorflow/tfjs-node')
const json = require('../data/labels.json')

// const model = tf.sequential()

// // // 添加一个全连接层，输入形状为[10]，输出单元为32，激活函数为relu
// model.add(tf.layers.dense({inputShape: [5], units: 32, activation: 'relu'}))

// // // 添加一个全连接层，输出单元为1，激活函数为linear
// model.add(tf.layers.dense({units: 1, activation: 'linear'}))

// // // 编译模型，指定优化器为sgd，损失函数为meanSquaredError，指标为meanAbsoluteError
// model.compile({optimizer: tf.train.adam(), loss: tf.losses.meanSquaredError, metrics: ['acc']})
// model.fit(xTrain, yTrain, { batchSize: 32, epochs: 50, validationSplit: 0.2 })
// //   // 在测试集上评估模型
// model.evaluate(xTest, yTest)
// // // const saveResult = model.save('file:///home/webpractice/project/Olympic-persona/my-model');
// module.exports = model
let sleep = (time)=> new Promise((resolve)=>{
    setTimeout(resolve,time)
})
async function asyncFunction(inputs) {
    const model = await tf.loadLayersModel('file://D:/Python/project/Olympic-persona/src/server/data/model/model.json')
    // sleep(3000).then(
    //     // 编译模型
    //     model.compile({
    //         optimizer: 'adam',
    //         loss: 'binaryCrossentropy',
    //         metrics: ['accuracy']
    //     }))
    model.compile({
        optimizer: 'adam',
        loss: 'binaryCrossentropy',
        metrics: ['accuracy']
    })
    var res = model.predict(inputs).dataSync()
    console.log(res)
    return res
}

const inputs = tf.randomNormal([2, 10, 20])
asyncFunction(inputs).then((res) => {
    console.log('666', res)
    result = res;
})


// console.log(res)