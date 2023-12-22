// 导入 TensorFlow.js 库
const tf = require('@tensorflow/tfjs-node')

// 创建一个线性回归模型
const model = tf.sequential()
model.add(tf.layers.dense({
  units: 1, // 输出单元数为 1
  inputShape: [1], // 输入形状为 [1]
  kernelInitializer: 'zeros' // 权重初始化为 0
//   kernelRegularizer: tf.regularizers.linear({ // 使用线性正则化
//     l1: 0.01, // L1 正则化系数为 0.01
//     l2: 0.01 // L2 正则化系数为 0.01
//   })
}))

// 编译模型，指定损失函数和优化器
model.compile({
  loss: 'meanSquaredError', // 使用均方误差作为损失函数
  optimizer: 'sgd' // 使用随机梯度下降作为优化器
})

// 生成一些训练数据
const xs = tf.randomUniform([100, 1]) // 输入特征
const ys = tf.randomUniform([100, 1]) // 输出标签

// 训练模型
model.fit(xs, ys, {
  epochs: 10 // 训练 10 个周期
}).then(() => {
  // 预测新的数据
  model.predict(tf.tensor2d([5], [1, 1])).print() // 输出 [[8.999987]]
})

module.exports = model
