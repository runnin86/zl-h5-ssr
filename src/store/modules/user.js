const state = {
  userInfo: null, // 用户信息
  shopId: null // 商铺id
}

// getters
const getters = {
  userInfo: state => state.userInfo,
  shopId: state => state.shopId
}

// actions(异步)
const actions = {
}

// mutations(同步)
const mutations = {
  // 记录用户信息
  RECORD_USERINFO(state, info) {
    state.userInfo = {...info}
    let validity = 30 // cookie失效天数
    let now = new Date()
    now.setTime(now.getTime() + validity * 24 * 60 * 60 * 1000)
    document.cookie = 'USERID_NHH=' + info.user_id + ';expires=' + now.toGMTString()
  }

}

export default {
  state,
  getters,
  actions,
  mutations
}
