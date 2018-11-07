import api from '../api'

// initial state
const state = {
  cartBadge: 0,
  isIndex: true
}

// getters
const getters = {
  cartBadge: state => state.cartBadge,
  isIndex: state => state.isIndex
}

// actions(异步)
const actions = {
  getCartNum({commit}) {
    api.getCartNum(data => {
      commit('RECEIVE_CART_NUM', {data})
    })
  }
}

// mutations(同步)
const mutations = {
  RECEIVE_CART_NUM (state, cartData) {
    state.cartBadge = 0
    for (let i in cartData.data) {
      if (cartData.data[i].isCheck === 1) {
        // 购物车商品数量相加
        state.cartBadge += cartData.data[i].num ? cartData.data[i].num : 0
      }
    }
  },

  CHANGE_IS_INDEX (state, flag) {
    state.isIndex = flag
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
