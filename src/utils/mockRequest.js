// 引入axios
import axios from 'axios'
// 引入进度条
// import nprogress from 'nprogress'
// start:进度条开始 done：进度条结束
// 引入进度条的样式
// import 'nprogress/nprogress.css'

// requests就是axios实例，只不过稍微配置一下
const requests = axios.create({
  // 配置对象
  // 基础路径 发送请求的时候，路径当中会出现api 可以根据不同的生产环境 来更改比较方便
  baseURL: '/mock',
  // 代表请求超时的时间5S
  timeout: 5000
})

// 请求拦截器： 在发送请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use((config) => {
  // config：配置对象，对象里面有一个属性很重要，header请求头
  // 进度条开始动

  // nprogress.start();
  return config
}, error => {
  // 失败的信息
  return Promise.error(error)
})

// 响应拦截器
requests.interceptors.response.use((res) => {
  // 成功的回调函数：服务器相应数据回来以后。响应拦截器可以检测到，可以做一些事情
  // 进度条结束
  // nprogress.done();
  // 请求成功 响应数据 返回获得的数据
  return res.data
}, (error) => {
  // 响应失败的回调函数
  console.log(error)
  return Promise.reject(new Error('fail'))
})

export default requests
