// router.js
import Vue from 'vue'
import Router from 'vue-router'

import Home from '../pages/Home'
import Detail from '../pages/Detail'

Vue.use(Router)

export function createRouter() {
  return new Router({
    mode: 'history', // SSR必须使用history模式
    scrollBehavior: () => ({ y: 0 }),
    routes: [{
      path: '/',
      component: Home
    }, {
      path: '/detail',
      component: Detail
    }, {
      path: '/demo',
      meta: {requiresAuth: true, title: '演示'},
      component(resolve) { require(['@/views/demo/demo'], resolve) }
    }]
  })
}
