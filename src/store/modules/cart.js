import axios from 'axios'

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
    if (window.localStorage.getItem('zlUser')) {
      axios.get('cart/cartList', {
        headers: {
          'x-token': window.localStorage.getItem('zlToken')
        }
      }).then(({data: {code, data, msg}}) => {
        // console.log(data)
        if (code === 1) {
          // 获取购物车数据,回调给调用者
          commit('RECEIVE_CART_NUM', {data})
        }
      }).catch((e) => {
        console.error('获取购物车失败:' + e)
      })
    }
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
