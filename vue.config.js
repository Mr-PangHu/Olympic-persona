const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 关闭eslint校验
  lintOnSave: false,
  devServer:{
    host: 'localhost',
    port: 8080,
    proxy: {
      // 第一台服务器配置
      '/api':{
        target:'http://172.20.137.141:8080',
        changeOrigin: true,
        // pathRewrite:{'^/api':''}
      },
      // 第二台服务器
      '/' : {
        target: 'http://127.0.0.1',
        changeOrigin: true,
      }
    }
  },
})
