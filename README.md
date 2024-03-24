# olympic_project

> A Vue.js project

## Build Setup

``` bash
# install dependencies
第一步！！npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

开发目录——src

——assets 存放静态文件资源（图片、全局css样式等）

——components 构成页面的各个组件

——router 配置路由信息

——server 配置本地数据库信息

——store 配置vuex，统一管理状态

——main.js 入口文件


一般的开发流程是，如果要新建组件，需要在components文件夹下创建新的对应的.vue文件；如果需要设置跳转逻辑，需要在router文件夹中添加路由信息；如果需要设置公共的状态（多个页面都需要用到的变量，如用户id等），可以在store文件夹中设置对应state，并设计mutation、action等。

2024.02.04 更新日志
从服务器dump了最新的数据库，并把疲劳预测模拟数据进行添加进去，数据库sql在 Olympic-persona\src\server\db2\olympic_all.sql，在使用前建议更新一下数据库，否则部分内容无法显示全部。
使用前需要需要更改自己的数据库密码（本地数据库密码，使用服务器数据库则统一不用更改）。
目前后端js数据库均更新使用db2/index.js配置，如果没有更新完毕请及时更新！！！防止后期部署服务器数据库不统一。

## 崇明服务器

目前主要github上版本代码主要以能部署的为主，所以如果在学校开发测试，需要将以下代码继续修改，不然无法正常启动。修改主要是将未注释的需要注释。
`src/server/db2/index.js`
```
let db = mysql.createPool({
  // 崇明
  limit: 100,
  host: '112.64.134.154', // 数据库IP地址
  user: 'root', // 数据库登录账号
  password: 'Ecust2023', // 数据库登录密码
  database: 'persona_test', // 要操作的数据库
  port: '3308',
  timezone: 'Asia/Shanghai'
  // 远程
  // host: '172.20.137.141', // 数据库IP地址
  // user: 'root', // 数据库登录账号
  // password: '123456', // 数据库登录密码
  // database: 'persona_test', // 要操作的数据库
  // port: '3306',
  // timezone: 'Asia/Shanghai'
  // 本地
  // host: '127.0.0.1', // 数据库IP地址
  // user: 'root', // 数据库登录账号
  // password: 'admin123', // 数据库登录密码
  // database: 'olympic_all', // 要操作的数据库
  // timezone: 'Asia/Shanghai'
})
```
`config/index.js` 16~19行
```
// host: 'localhost', // can be overwritten by process.env.HOST
// port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
host: '0.0.0.0',
port: 10443,
```
`src/server/app.js` 
```
// app.listen(80, () => {
//   console.log('服务器启动成功')
// })

app.listen(30032, () => {
  console.log('服务器启动成功')
})
```
`src/utils/request.js`
```
// export const baseURL = 'http://127.0.0.1'
export const baseURL = 'http://112.64.134.154:30032'
const myAxios = axios.create({
  baseURL
})
```