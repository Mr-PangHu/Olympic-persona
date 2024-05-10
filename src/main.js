// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '@/assets/global.less' // 全局初始化样式
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import less from 'less'
import store from './store'
import Vuex from 'vuex'
import * as echarts from 'echarts'
import myAxios from '@/utils/request'
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(less)
Vue.use(Vuex)

// 清除 token
// store.commit('LOGOUT')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created() {
    // Vue实例创建时添加全局事件监听
    window.addEventListener('beforeunload', this.handleBeforeUnload);
  },
  mounted () {
    setInterval(this.handleBeforeUnload, 10800000);
  },
  beforeDestroy() {
    // Vue实例销毁前移除全局事件监听
    window.removeEventListener('beforeunload', this.handleBeforeUnload);
  },
  methods: {
    handleBeforeUnload(event) {
      const name = window.sessionStorage.getItem('name')
      // 调用你的接口
      myAxios.post('/updateLoginoutTime', {
        params: {
          name
        }
      }).then(res => {
        this.$store.commit('LOGOUT')
        // 2. 跳转到登录页面
        // this.$router.push('/login')
      }).catch(err => {
        // console.log("*************")
        console.log(err)
      })
    }
  }
})
