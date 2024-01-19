/**
 * request.js用于正式与后台联调发送的请求，这个配置的baseURL应该与mockRequest.js的baseURL不同
 */
import axios from 'axios'

// 利用axios对象的create方法，去创建一个axios实例
// requests就是axios，只不过稍微配置一下
const requests = axios.create({
  // 配置对象
  // 基础路径，发请求的时候，路径当中会出现api
  baseURL: 'http://172.20.137.141:8080/api/',
  timeout: 5000
})

// 请求拦截器，在发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use((config) => {
  // config配置对象，对象里面有一个属性很重要，headers请求头
  config.headers={}
  return config
})

// 响应拦截器
requests.interceptors.response.use(
  (res) => {
    return res.data
  },
  (error) => {
    console.log(error)
    return Promise.reject(new Error('failed'))
  }
)

export default requests
