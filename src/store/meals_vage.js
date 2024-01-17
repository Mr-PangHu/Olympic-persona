import axios from 'axios'
// import { reqDishesVageName } from '@/utils/interface';

const state = {
  keyword: '',
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
  search ({ commit, state }) {
    axios
      .get('/api/search', {
        params: {
          keyword: state.keyword
        }
      })
      .then(response => {
        const results = response.data
        commit('SET_SEARCH_RESULTS', results)
      })
      .catch(error => {
        console.error(error)
      })
  }
}

const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}
