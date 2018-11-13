import qs from 'qs'
import axios from 'axios'
// 配置基础域名
axios.defaults.baseURL = process.env.BASE_API

// initial state
const state = {
  lists: [], // 文章列表
  sliderList: [], // 轮播列表
  floorList: [], // 楼层列表
  product: null, // 单个商品数据
  productProfile: null // 单个商品的详情
}

// getters
const getters = {
  getLists: state => { return state.lists },
  getSliderList: state => state.sliderList,
  getFloorList: state => state.floorList,
  getProductProfile: state => state.productProfile
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
  // 获取首页数据
  async fetchIndexData ({ dispatch, commit }) {
    await dispatch('fetchSlider') // 去加载轮播图
    await dispatch('fetchFloor') // 去加载楼层
  },
  // 首页轮播图获取
  async fetchSlider ({ commit }, data) {
    return axios.post('index/sliderList').then(({data: {code, data, msg}}) => {
      if (code === 1) {
        // 获取数据,设置在state中
        commit('SET_SLIDER', data.slider)
      }
    })
  },
  // 首页楼层获取
  async fetchFloor ({ commit }, data) {
    return axios.post('index/floor').then(({data: {code, data, msg}}) => {
      if (code === 1) {
        commit('SET_FLOOR', data.floor)
      }
    })
  },
  // 获取商品明细(主信息和轮播图)
  fetchProduct ({ commit }, pid) {
    // let loading = weui && weui.loading('加载中')
    return axios.post('product/productInfo2Img', qs.stringify({
      pid: pid
    })).then(({data: {code, data, msg}}) => {
      if (code === 1) {
        commit('SET_PRODUCT', data)
      } else {
        // $.toast(msg, 'forbidden')
      }
      // loading.hide()
    }, (response) => {
      // loading.hide()
      // error callback
      console.error(response)
    })
  },
  // 获取商品详情
  fetchProductProfile ({ commit }, pid) {
    return axios.post('product/productProfile', qs.stringify({
      pid: pid
    })).then(({data: {code, data, msg}}) => {
      if (code === 1) {
        commit('SET_PRODUCT_PROFILE', data.profile)
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
  },
  SET_FLOOR (state, data) {
    state.floorList = data
  },
  SET_PRODUCT (state, data) {
    state.product = data
  },
  SET_PRODUCT_PROFILE (state, data) {
    state.productProfile = data
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
