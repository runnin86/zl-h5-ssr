import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import { mutations } from './mutations'
import cart from './modules/cart'
import user from './modules/user'
import shop from './modules/shop'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export function createStore () {
  return new Vuex.Store({
    modules: {
      cart,
      user,
      shop
    },
    actions, // 根级别的 action
    getters, // 获取
    mutations, // 根级别的 mutation
    strict: debug
  })
}
