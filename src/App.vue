<template>
  <div id="app" class="page__bd">
    <!-- <Head></Head> -->
    <transition :name="$router.options.transitionName" mode="out-in">
      <keep-alive>
        <router-view class="container container-content viewStyle"></router-view>
      </keep-alive>
    </transition>

    <wv-tabbar :isShow="true" v-bind:itemList="tabbarList" fixed></wv-tabbar>

    <!-- 悬浮导航 -->
    <div class="quickIcon" v-if = "$route.path!=='/shopGoods/goodsInfo' && $route.path!=='/shopping/goods'">
      <img v-if="showQuickIcon!=='show'" src="/static/images/smallIcon/entry.png" alt="" @click="showQuickIcon='show'">
      <div :class="showQuickIcon === 'default' ? 'quickCont' : (showQuickIcon === 'show' ? 'quickCont quickContAni' : 'quickCont quickHideAni')">
        <!-- back -->
        <img class="quickBack" @click="back" src="/static/images/smallIcon/back.png" alt="">
        <!-- classify -->
        <!-- <router-link :to="{path: '/classify'}" v-if = "$route.path!=='/classify'">
          <img class="quickCat" src="/static/images/smallIcon/category.png" alt="">
        </router-link>
        <img class="quickCat" v-else @click="showQuickIcon='hide'" src="/static/images/smallIcon/category.png" alt=""> -->
        <!-- home -->
        <router-link :to="{path: '/index'}" v-if = "$route.path!=='/index'">
          <img class="quickHome" src="/static/images/smallIcon/home.png" alt="">
        </router-link>
        <img v-else @click="showQuickIcon='hide'" class="quickHome" src="/static/images/smallIcon/home.png" alt="">
        <!-- close -->
        <img class="quickClose" src="/static/images/smallIcon/close.png" alt="" @click="showQuickIcon='hide'">
        <!-- search -->
        <!-- <router-link :to="{path: '/userCenter/myCollect'}" v-if = "$route.path!=='/userCenter/myCollect'">
          <img class="quickSearch" src="/static/images/smallIcon/collect.png" alt="">
        </router-link>
        <img class="quickSearch" v-else @click="showQuickIcon='hide'" src="/static/images/smallIcon/collect.png" alt=""> -->
        <!-- share or collect -->
        <!-- <img v-if ="$route.path==='/index'" class="quickQrcode" src="/static/images/smallIcon/share.png" alt="" @click="freshQRCodeShow">
        <router-link v-else-if="$route.path!=='/searchGoods'" :to="{path: '/searchGoods'}">
          <img class="quickQrcode" src="/static/images/smallIcon/search_index.png" alt="">
        </router-link>
        <img v-else @click="showQuickIcon='hide'" class="quickQrcode" src="/static/images/smallIcon/search_index.png" alt=""> -->
      </div>
    </div>
  </div>
</template>
<script>
import Head from './components/head.vue'
import {mapGetters} from 'vuex'
import thumbSmall from 'static/weui/images/icon_tabbar.png'

const menuList = [
  {title: '商城', path: '/index', icon: '/static/images/sale_c.png', activeIcon: '/static/images/sale.png', activePath: ['/index', '/category']},
  {title: '购物车', path: '/cart', icon: '/static/images/shop_c.png', activeIcon: '/static/images/shop.png', cartBadgeNum: 0},
  {title: '我的', path: '/userCenter', icon: '/static/images/user_c.png', activeIcon: '/static/images/user.png'}
]

export default {
  name: 'app',
  // 数据
  data() {
    return {
      thumbSmall,
      toPath: null,
      fromPath: null,
      showQuickIcon: 'default',  // 快捷按钮是否打开
      imgBase64: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIW2NkAAIAAAoAAggA9GkAAAAASUVORK5CYII=',
      tabbarList: menuList
    }
  },
  // 计算属性
  computed: {
    ...mapGetters({
      // 键为在当前页面展示,值为modules中getters中定义的键
      products: 'cartProducts',
      checkoutStatus: 'checkoutStatus',
      cartBadgeNum: 'cartBadge',
      showIndex: 'isIndex'
    }),
    total () {
      return this.products.reduce((total, p) => {
        return total + p.price * p.quantity
      }, 0)
    }
  },
  mounted() {
    let self = this
    setTimeout(function() {
      self.showQuickIcon = 'show'
      setTimeout(function() {
        self.showQuickIcon = 'hide'
      }, 500)
    }, 1000)
  },
  // 方法
  methods: {
    /**
     * 判断微信浏览器
     */
    is_weixn() {
      let ua = window.navigator.userAgent.toLowerCase()
      if (ua.indexOf('micromessenger') !== -1) {
        return true
      } else {
        return false
      }
    },
    gotoAddress (path, query) {
      this.$router.push({path: path, query: query})
    },
    back () {
      this.$router.back()
      // window.history.back()
      // window.history.go(-1)
    },
    randomString (len) {
      // 默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1
      let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
      let maxPos = $chars.length
      let pwd = ''
      for (let i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
      }
      return pwd
    },
    getShareImg () {
      // 分享图片地址
      let imgUrl = window.location.origin + '/static/images/logo-new1.jpeg'
      if (window.localStorage.getItem('zlUser') !== null) {
        // 默认展示用户头像
        imgUrl = JSON.parse(window.localStorage.getItem('zlUser')).headImgUrl
      }
      return imgUrl
    },
    setTitle(t) {
      document.title = t
      var i = document.createElement('iframe')
      // i.src = '//m.baidu.com/favicon.ico'
      i.style.display = 'none'
      i.onload = function() {
        setTimeout(function() {
          i.remove()
        }, 9)
      }
      document.body.appendChild(i)
    }
  },
  // 子组件
  components: {
    Head
  },
  // dynamically set transition based on route change
  watch: {
    '$route' (to, from) {
      this.toPath = to.path
      this.fromPath = from.path
      // 页面需要滚动到顶部
      if (to.matched.some(m => m.meta.scrollToTop)) {
        setTimeout(_ => {
          document.body.scrollTop = 0
        }, 300)
      }
      this.showQuickIcon = 'default'
      // 默认全局分享
      let ignoreUrl = [
        '/index',
        '/index/sevenPanicBuy',
        '/shopping/goods',
        '/userCenter/shareQRCode',
        '/oauth',
        '/favicon.ico'
      ]
      if (!ignoreUrl.includes(to.path)) {
        let base = this.$router.options.base ? this.$router.options.base : ''
        // 分享图片地址
        let imgUrl = this.getShareImg()
        // 默认全局分享
        let desc = '【足力购】帅哥美女们，快来足力购逛逛，捧个场吧！'
        let link = window.location.origin + base + '/?#/category'
        this.initWechatShare(
          '足力购商城欢迎您',
          desc,
          imgUrl,
          link
        )
      }
    }
  }
}
</script>

<!--样式 -->
<style>
/*[
  slide-fade:慢速平滑切入
  fade:平滑切入
  bounce:从右至左切入
  pushtop:从下至上切入
]*/
@import '/static/style/transition.css';
@import '/static/style/store.css';
@import '/static/style/public.css';
/*@import '/static/style/progressive.css';*/

[v-cloak] {
  display: none;
}

[v-cloak] {
  display: none;
}

.tab-panel {
  box-sizing: border-box;
  height: 100%;
  padding-bottom: 50px;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}

.viewScroll {
  position: absolute;
  overflow: auto;
}
.loading {
  margin-left:-20px;
}
.loading .weui-loading {
  width: 40px;
  height: 40px;
}

html,
body {
  background-color: #eee;
  user-select: none;
}

a,
img {
  -webkit-touch-callout: none;
}

.page__hd {
  padding: 40px;

  .page__title {
    text-align: left;
    font-size: 20px;
    font-weight: 400;
  }

  .page__desc {
    margin-top: 5px;
    color: #888;
    text-align: left;
    font-size: 14px;
  }
}

.page-with-padding {
  padding: 0 .7rem;
}

.page {
  margin-bottom: 50px;
}
.container-content {
  max-width:640px;
  min-width:320px;
  right:0;
  left:0;
  margin:auto;
}

.viewStyle{ box-sizing:border-box; padding-bottom:50px;}

.weui-badge_dot {
  padding: .4em;
  min-width: 0 ;
}
/*.weui-tabbar__item.weui-bar__item_on > span > i {
  color: #09bb07;
}*/
.weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon, .weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon>i, .weui-tabbar__item.weui-bar__item_on .weui-tabbar__label{ color:#666; }
.weui-tabbar__item img{ width:26px; }
.botMenu{display: inline-block; position: relative; height:30px; padding-top:5px}
</style>
