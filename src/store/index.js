import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import foodtrack from '@/store/foodtrack'
import meals from '@/store/meals'
import mealsVage from '@/store/meals_vage'
import food from '@/store/food'
import user from '@/store/user'
Vue.use(Vuex)
// 创建vuex实例
export default new Vuex.Store({
  // 配置为 vuex 的插件
  plugins: [createPersistedState()],
  modules: {
    foodtrack,
    meals,
    mealsVage,
    food,
    user
  }
})
