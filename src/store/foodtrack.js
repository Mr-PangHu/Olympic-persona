// foodtrack模块专属的小仓库
// 引入请求函数
import { reqDishesName, reqGetAllMeals, reqDishes, reqMain } from '@/utils/interface'
import { v4 as uuidv4 } from 'uuid'

// 仓库存储数据的地方const state = {
const state = {
  // 商品分类的数据,仓库里面数据起始数值不要瞎写【服务器返回的是啥】根据接口的返回值初始化
  dishesName: [],
  allMeals: [],
  dialogVisible: false,
  addMealsResults:{},
  mainIngredient: {}
}

// 唯一可以修改仓库数据地方【工人】
const mutations = {
  GETDISHESNAME (state, dishesName) {
    state.dishesName = dishesName
  },
  GETADDMEALS (state, addMeals) {
    state.addMealsResults = addMeals
  },
  GETALLMEALS (state, allMeals) {
    state.allMeals = allMeals
  },
  GETMAIN (state, mainIngredient) {
    state.mainIngredient = mainIngredient
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
    console.log('intake_record', formData)
    const intakeRecord = []
    formData.dishIds.items.forEach(item => {
      const transformedItem = {
        dishId: item.id,
        num: item.intake_num
      }
      intakeRecord.push(transformedItem)
    })
    console.log('修改后的intakeRecord:', intakeRecord)
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
    console.log('addMeals的result', result)
    if (result.code === 200) {
      console.log('addMeals的result', result)
    }
    const mergedData = {
      ...result.ingredient,  // 将storeTableData的属性复制到mergedData中
      date: outputDate,  // 添加date属性
      meals: formData.meals  // 添加meals属性
    }
    console.log('mergedData:', mergedData) 
    commit('GETADDMEALS',mergedData)
    
  },
  //  获取全部食物
  async getAllMeals ({ commit }) {
    let result = await reqGetAllMeals('')
    console.log('GetAllMealsresult', result)
    commit('GETALLMEALS', result)
  },
  //  获取主要营养素和维生素
  // async getMain ({ commit }, userDate) {
  async getMain ({ commit }) {
    const currentDate = new Date() // 获取当前日期

    const yearnow = currentDate.getFullYear() // 获取当前年份
    const monthnow = (currentDate.getMonth() + 1).toString().padStart(2, '0') // 获取当前月份，并补零
    const daynow = currentDate.getDate().toString().padStart(2, '0') // 获取当前日期，并补零
    const formattedDate = yearnow + monthnow + daynow // 格式化为20230128形式

    const params = {
      date: formattedDate,
      id: window.sessionStorage.getItem('id')
    };
    console.log('reqMain的params', params)
    let result = await reqMain(params)
    console.log('reqMain的result', result)
    commit('GETMAIN', result)
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
