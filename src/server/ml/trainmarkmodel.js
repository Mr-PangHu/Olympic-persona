let db = require('../db2/index')

// 引入tensorflow.js库
const tf = require('@tensorflow/tfjs-node')

// 生成一些随机数据，每个样本有10个输入变量和1个输出值
// const data = tf.randomNormal([10, 6])
// console.log(data)
// 划分数据为训练集和测试集，比例为8:2
// const split = tf.split(data, [8, 2], 0)
// const trainData = split[0]
// console.log(trainData)
// const testData = split[1]

// 提取输入变量和输出值
// const xTrain = trainData.slice([0, 0], [8, 5])
// xTrain.print()
// trainData.print()
// const yTrain = trainData.slice([0, 10], [-1, 1]);
// const xTest = testData.slice([0, 0], [-1, 10]);
// const yTest = testData.slice([0, 10], [-1, 1]);
// console.log(xTrain)
// // 创建一个顺序模型
const model = tf.sequential()

// // 添加一个全连接层，输入形状为[10]，输出单元为32，激活函数为relu
model.add(tf.layers.dense({inputShape: [5], units: 32, activation: 'relu'}))

// // 添加一个全连接层，输出单元为1，激活函数为linear
model.add(tf.layers.dense({units: 1, activation: 'linear'}))

// // 编译模型，指定优化器为sgd，损失函数为meanSquaredError，指标为meanAbsoluteError
model.compile({optimizer: tf.train.adam(), loss: tf.losses.meanSquaredError, metrics: ['mse']})

// // const saveResult = model.save('file:///home/webpractice/project/Olympic-persona/my-model');
module.exports = model
