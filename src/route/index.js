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
      redirect: '/index'
    }, {
      path: '/index',
      name: 'Index',
      component(resolve) {
        require(['@/views/shopping/index'], resolve)
      }
    }, {
      path: '/category',
      name: 'Category',
      component(resolve) {
        require(['@/views/shopping/category'], resolve)
      }
    }, {
      path: '/shopping/goods',
      meta: {requiresAuth: true, scrollToTop: true},
      name: 'Goods',
      component(resolve) {
        require(['@/views/shopping/goods'], resolve)
      }
    }, {
      path: '/home',
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
