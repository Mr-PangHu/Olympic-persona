// 用户登录信息的仓库
const state = {
  id: window.sessionStorage.getItem('id'),
  token: window.sessionStorage.getItem('token'),
  auth: window.sessionStorage.getItem('auth'),
  name: window.sessionStorage.getItem("name")
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
  SET_NAME: (state, data) => {
    state.name = data
    window.sessionStorage.setItem('name', data)
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
    window.sessionStorage.removeItem('name')
  }
}

const actions = {
}

// 对外暴露小仓库
export default {
  state,
  mutations,
  actions
}
