// 唯一可以修改仓库数据地方【工人】
import { reqDishesName } from '@/utils/interface'

const state = {}

const mutations = {
  GETDISHESNAME (state, dishesName) {
    state.dishesName = dishesName
  }
}

// 可以处理业务逻辑【if、异步语句等等】
let actions = {
  // 获取食物的数据
  async getDishesName ({ commit }) {
    let result = await reqDishesName()
    if (result.code === 200) {
      commit('GETDISHESNAME', result.data)
    }
  }
}

// 仓库计算属性
let getters = {}

// 对外暴露小仓库
export default {
  state,
  mutations,
  actions,
  getters
}
