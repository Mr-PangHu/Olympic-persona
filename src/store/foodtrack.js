// foodtrack模块专属的小仓库
// 引入请求函数
import { reqDishesName, reqGetAllMeals, reqDishes } from '@/utils/interface'
import { v4 as uuidv4 } from 'uuid'

// 仓库存储数据的地方const state = {
const state = {
  // 商品分类的数据,仓库里面数据起始数值不要瞎写【服务器返回的是啥】根据接口的返回值初始化
  dishesName: [],
  allMeals: [],
  dialogVisible: false
}

// 唯一可以修改仓库数据地方【工人】
const mutations = {
  GETDISHESNAME (state, dishesName) {
    state.dishesName = dishesName
  },
  GETALLMEALS (state, allMeals) {
    state.allMeals = allMeals
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
  },
  async addMeals ({ commit }, formData) {
    console.log('111', formData)
    const intakeRecord = formData.dishes.map(item => {
      return {
        dishId: item.id,
        num: item.intake_num
      }
    })
    console.log('111', intakeRecord)
    let date = new Date(formData.date)
    let year = date.getFullYear()
    let month = (date.getMonth() + 1).toString().padStart(2, '0')
    let day = date.getDate().toString().padStart(2, '0')
    let outputDate = year + month + day
    const params = {
      id: uuidv4(),
      // id: 123456789,
      dishIds: intakeRecord, // intakeRecord,
      date: outputDate,
      userId: window.sessionStorage.getItem('id')
    }
    let result = await reqDishes(params)
    if (result.code === 200) {
      console.log('result', result)
    }
  },
  //  获取全部食物
  async getAllMeals ({ commit }) {
    let result = await reqGetAllMeals('')
    commit('GETALLMEALS', result)
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
