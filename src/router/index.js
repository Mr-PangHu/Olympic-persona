import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/login/index'
import Register from '@/components/register/index'
// import UserPwd from '@/components/user/UserPwd'
import store from '@/store'

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location, resolve, reject) {
  if (resolve || reject) return originalPush.call(this, location, resolve, reject)
  return originalPush.call(this, location).catch((e) => { })
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
          path: 'tiredpredict2',
          name: 'tiredpredict2',
          component: () => import('@/components/tiredpredict/home2.vue'),
        },
        {
          path: 'tiredpredict2/specialIndex',
          name: 'specialIndex2',
          component: () => import('@/components/tiredpredict/index2.vue')
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
