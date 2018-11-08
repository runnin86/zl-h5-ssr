import axios from 'axios'
// 配置基础域名
axios.defaults.baseURL = process.env.BASE_API

// initial state
const state = {
  lists: [], // 文章列表
  sliderList: [] // 轮播列表
}

// getters
const getters = {
  getLists: state => {
    return state.lists
  },
  getSliderList: state => state.sliderList
}

// actions(异步)
const actions = {
  // 获取文章列表
  fetchLists ({ commit }, data) {
    return axios.get('https://cnodejs.org/api/v1/topics?page=' + data.page)
    .then((res) => {
      if (res.data.success) {
        commit('setLists', res.data.data)
      }
    })
  },
  // 获取轮播数据
  fetchSliderList ({ commit }, data) {
    return axios.post('index/sliderList').then(({data: {code, data, msg}}) => {
      if (code === 1) {
        // 获取数据,回调给调用者
        commit('SET_SLIDER', data.slider)
      }
    })
  }
}

// mutations(同步)
const mutations = {
  setLists (state, data) {
    state.lists = data
  },
  SET_SLIDER (state, data) {
    state.sliderList = data
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
