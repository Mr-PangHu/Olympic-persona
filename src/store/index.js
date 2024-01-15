import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const state = {
  id: window.sessionStorage.getItem('id'),
  token: window.sessionStorage.getItem('token'),
  auth: window.sessionStorage.getItem('auth')
}
const mutations = {
  // 将token保存到sessionStorage里，token表示登陆状态
  SET_TOKEN: (state, data) => {
    state.token = data
    window.sessionStorage.setItem('token', data)
  },
  // 保存用户权限
  SET_AUTH: (state, data) => {
    state.auth = data
    window.sessionStorage.setItem('auth', data)
  },
  // 获取用户名
  SET_ID: (state, data) => {
    state.id = data
    window.sessionStorage.setItem('id', data)
  },
  // 登出
  LOGOUT: (state) => {
  // 登出的时候要清除token
    state.token = null
    state.id = null
    state.auth = null
    window.sessionStorage.removeItem('token')
    window.sessionStorage.removeItem('id')
    window.sessionStorage.removeItem('auth')
  }
}
const actions = {
}
// 配置为 vuex 的插件
const plugins = [createPersistedState({
  storage: sessionStorage
})]

export default new Vuex.Store({
  state,
  mutations,
  actions,
  plugins
})
