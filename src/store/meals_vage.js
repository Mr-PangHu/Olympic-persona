import { reqGetAllMeals } from '../utils/interface'
// import { reqDishesVageName } from '@/utils/interface';

const state = {
  searchResults: [], // 存储搜索结果
  selectedResult: null // 存储用户选择的结果
}

const mutations = {
  SET_KEYWORD (state, keyword) {
    state.keyword = keyword
  },
  SET_SEARCH_RESULTS (state, results) {
    state.searchResults = results
  },
  SET_SELECTED_RESULT (state, result) {
    state.selectedResult = result
  }
}

let actions = {
  async search () {
    await reqGetAllMeals()
  }
}

const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}
