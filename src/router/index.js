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

// // 重写路由方法 这里是解决重复点击路由不能跳转的问题， 但是vuerouter 有个新属性:router可以直接index跳转
// const originPush = Router.prototype.push
// const originReplace = Router.prototype.replace
// // 重写push|replace
// // arg1：告诉原来push方法，往哪里跳转，需要传递哪些参数
// Router.prototype.push = function (location, resolve, reject) {
//   if (resolve && reject) {
//     originPush.call(this, location, resolve, reject)
//   } else {
//     originPush.call(this, location, () => {}, () => {})
//   }
// }

// Router.prototype.replace = function (location, resolve, reject) {
//   if (resolve && reject) {
//     // 这样的话调用原来的push方法
//     originReplace.call(this, location, resolve, reject)
//   } else {
//     // 因为保存的时候 在window里面 所以要改变this指向 这里相当于 修改了一下原方法
//     originReplace.call(this, location, () => {}, () => {})
//   }
// }
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, resolve, reject) {
    if ( resolve || reject ) return originalPush.call(this, location, resolve, reject)
    return originalPush.call(this, location).catch((e)=>{})
}

const router = new Router({
  routes: [
    {
      path: '/',
      // component: () => import('@/components/layout/index'),
      component: () => import('@/components/home/index'),
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
          path: 'champion/:id',
          name: 'champion-model',
          component: () => import('@/components/champion/index')
        },
        {
          path: 'player-one/:id',
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
          component: () => import('@/components/user/userPwd')
        },
        {
          path: 'worldhighlevel',
          name: 'worldhighlevel',
          component: () => import('@/components/worldhighlevel')
        },
        {
          path: 'markpredict',
          name: 'markpredict',
          component: () => import('@/components/markpredict')
        },
        {
          path: 'tiredpredict',
          name: 'tiredpredict',
          component: () => import('@/components/tiredpredict/home.vue')
        },
        {
          path: 'tiredpredict/specialIndex',
          name: 'specialIndex',
          component: () => import('@/components/tiredpredict/index.vue')
        },
        {
          path: '/search',
          name: 'search',
          component: () => import('@/components/knowledge/search'),
          children: [
            {
              path: '/search/searchDetail/:foodId?',
              name: 'searchDetail',
              component: () => import('@/components/knowledge/search/searchDetail')
            }
          ]
        },
        {
          path: '/foodtrack',
          name: 'foodtrack',
          component: () => import('@/components/knowledge/weight/foodtrack')
        },
        {
          path: '/display',
          name: 'display',
          component: () => import('@/components/knowledge/display')
        },
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
  const token = store.state.user.token
  if (token) {
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
