// main.js
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import WeVue from './components'
// import FastClick from 'fastclick'

import { createRouter } from './route/index'
// import { createStore } from './store/index'
import store from './store/index'
import { sync } from 'vuex-router-sync' // 把当VueRouter状态同步到Vuex中

// 创建 router 实例
const router = createRouter()
// 创建 store 实例
// const store = createStore()

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

// axios全局配置
axios.defaults.baseURL = process.env.BASE_API
// axios.defaults.headers.common['Authorization'] = 'AUTH_TOKEN'
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// axios请求拦截器
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  // let uid = 0
  // if (util.getStore('zlUser')) {
  //   uid = JSON.parse(util.getStore('zlUser')).user_id
  // }
  // let timestamp = Date.parse(new Date()) / 1000
  // let md5Str = md5(uid + '' + timestamp + 'NhH$ApI')
  // let param = {
  //   // XDEBUG_SESSION_START: 17258,
  //   uid: uid,
  //   timestamp: timestamp,
  //   sign: md5Str
  // }
  // if (!config.params) {
  //   config.params = {}
  // }
  // // 组装请求默认需要携带的参数
  // Object.assign(config.params, param)
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// axios响应拦截器
axios.interceptors.response.use(function (response) {
  // Do something with response data
  // console.log('response:' + response.config.url, '状态:' + response.status + '->' + response.statusText)
  if (response.data.msg === '用户未登录或登录已失效') {
    $.toast('会话失效<br/>即将重新登录', 'forbidden')
    // 清空再次鉴权
    // util.reOauth()
  }
  return response
}, function (error) {
  // $.toast('网络错误', 'forbidden')
  // Do something with response error
  return Promise.reject(error)
})

const app = new Vue({
  // 注入 router store 到根 Vue 实例
  router,
  store,
  render: h => h(App)
})

/**
 * 导出 router and store.
 */
export {
  app,
  router,
  store
}
