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

