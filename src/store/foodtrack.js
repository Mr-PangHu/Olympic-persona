// foodtrack模块专属的小仓库
// 引入请求函数
import { reqDishesName } from '@/utils/interface'

// 仓库存储数据的地方const state = {
const state = {
  // 商品分类的数据,仓库里面数据起始数值不要瞎写【服务器返回的是啥】根据接口的返回值初始化
  dishesName: []
}

// 唯一可以修改仓库数据地方【工人】
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
