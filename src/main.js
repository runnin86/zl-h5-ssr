// main.js
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import WeVue from './components'
// import FastClick from 'fastclick'

import { createRouter } from './route/index'
import { createStore } from './store/index'
import { sync } from 'vuex-router-sync' // 把当VueRouter状态同步到Vuex中

// 创建 router 实例
const router = createRouter()
// 创建 store 实例
const store = createStore()

// 将路由状态添加到vuex中
sync(store, router)

// if ('addEventListener' in document) {
//   document.addEventListener('DOMContentLoaded', function () {
//     FastClick.attach(document.body)
//   }, false)
// }

Vue.config.debug = true
Vue.config.productionTip = false

Vue.use(WeVue)
Vue.prototype.$weChatShareDesc = () => {
  let desc = '【足力购】帅哥美女们，快来足力购逛逛，捧个场吧！'
  return desc
}
Vue.prototype.$http = axios
Vue.prototype.initWechatShare = (title, desc, imgUrl, link) => {
  // util.wxShareReady({
  //   title, desc, imgUrl, link
  // }, (res) => {
  //   console.log('分享完成')
  // }, (res) => {
  //   console.log('取消分享')
  // }, (res) => {
  //   console.error(JSON.stringify(res))
  // })
}

// Vue.directive('infiniteScroll', infiniteScroll)

const app = new Vue({
  // 注入 router store 到根 Vue 实例
  router,
  store,
  render: h => h(App)
}) // .$mount('#app')

/**
 * 导出 router and store.
 */
export {
  app,
  router,
  store
}
