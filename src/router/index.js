import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
// import Home from '@/components/home/index'
// import Labelsys from '@/components/labelsys'
import Login from '@/components/login/index'
import Register from '@/components/register/index'
// import UserPwd from '@/components/user/UserPwd'
import store from '@/store'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: () => import('@/components/layout/index'),
      redirect: '/home', // 默认显示首页的二级路由
      children: [
        {
          path: 'home',
          name: 'my-home',
          component: () => import('@/components/home/index')
        },
        {
          path: 'label',
          name: 'my-label',
          component: () => import('@/components/labelsys/index')
        },
        {
          path: 'player-one',
          name: 'playergroup-one',
          component: () => import('@/components/playergroup/one')
        },
        {
          path: 'player-groups',
          name: 'playergroup-groups',
          component: () => import('@/components/playergroup/groups')
        },
        {
          path: 'updatepwd',
          name: 'UserPwd',
          component: () => import('@/components/user/UserPwd')
        }
      ]
    },
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    }
  ]
})

// 无需验证token的页面
const whiteList = ['/login', '/register']

router.beforeEach((to, from, next) => {
  const token = store.state.token
  if (token) {
    // 如果有token, 证明已登录
    // if (!store.state.userInfo.username) {
    //   // 有token但是没有用户信息, 才去请求用户信息保存到vuex里
    //   // 调用actions里方法请求数据
    //   store.dispatch('initUserInfo')
    //   // 下次切换页面vuex里有用户信息数据就不会重复请求用户信息
    // }
    next() // 路由放行
  } else {
    // 如果无token
    // 如果去的是白名单页面, 则放行
    if (whiteList.includes(to.path)) {
      next()
    } else {
      // 如果其他页面请强制拦截并跳转到登录页面
      next('/login')
    }
  }
})

export default router
