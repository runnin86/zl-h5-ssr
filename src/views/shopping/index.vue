<template>
<div>
  <!-- 头部导航栏 -->
  <div class="row index-title">
    <div class="shop-name">
      <a class="contact_img clearfix" href="tel:0312-7333023">
        <img src="/static/images/lxkf_top.png"/>
        <p>客服</p>
      </a>
      <!-- <a class="contact_img clearfix" href="tel:0312-7333023" style="left:2.3rem">
        <img src="/static/images/lxdz_top.png"/>
        <p>店主</p>
      </a> -->
      <div class="user-img">
        <img :src="imgBase64" style="backgroundImage: url('/static/images/logo-new1.jpeg')">
      </div>
      <!-- <router-link to="/searchGoods" class="search-icon">
        <img src="/static/images/search_top.png" />
        <p>搜索</p>
      </router-link> -->
    </div>
    <div class="shop-detail clearfix">
      <div class="shop-info">
        <span class="nhh-store_name"><!--足力购--></span>
        <span class="info">终于等到了您的光临~</span>
      </div>
    </div>
  </div>
  <!-- 滑动菜单 -->
  <div class="row navbar-location" v-show="sortMenu.length>0">
    <div class="navbar-yzg-default">
      <wv-scroll-menu ref="menuComp" :sortMenu="sortMenu" :sortName="sortName" :fnName="'changeCid'" :activeId="-1"></wv-scroll-menu>
    </div>
  </div>
  <!--轮播图-->
  <div class="row slider-box" style="padding-bottom: 0.2167rem">
    <wv-swipe class="demo-swipe bannerImg" :auto="4000">
      <wv-swipe-item class="demo-swipe-item" v-for="bn in sliderlist" :key="bn.id">
        <router-link :to="bn.url">
          <img :src="img_domain + bn.img">
        </router-link>
      </wv-swipe-item>
    </wv-swipe>
  </div>
  <!-- <ul class="ul_box">
    <li class="one_article" v-for="(item, index) in lists" :key='index' @click="goArticle(item.id)">
      <img class="user_img" :src="item.author.avatar_url" alt="">
      <p>
        <span class="count">评论:{{ item.reply_count }} 阅读:{{ item.visit_count }}</span>&nbsp;
        <span>{{ item.title }}</span>
      </p>
    </li>
  </ul> -->
  <!--通知栏-->
  <div class="row notice-box" v-if="!content_text">
    <div class="notice">
      <img class="notice_img" src="/static/images/notice.png" />
      <span>
        <i>通知</i>
      </span>
    </div>
    <wv-scroll-notice :content="content_text" :scrollamount="1" :direction="'up'"></wv-scroll-notice>
    <div class="arrows">
      <img class="arrows_img" src="/static/images/arrows.png" />
    </div>
  </div>
  <!-- 楼层专场 -->
  <wv-floor-goods :composeFloorArr="floorList" @redirectTo="redirectTo"></wv-floor-goods>
</div>
</template>

<script type="text/babel">
import { mapState } from 'vuex'
import * as data from './../../data'

export default {
  /**
   * [SSR获取所有组件的asyncData并执行获得初始数据]
   * @param  {[Object]} store [Vuex Store]
   * 此函数会在组件实例化之前调用，所以它无法访问 this。需要将 store 和路由信息作为参数传递进去：
   */
  asyncData (store, route) {
    store.dispatch('fetchLists', { page: 1 })
    // 服务端渲染触发
    return store.dispatch('fetchSliderList')
  },
  data() {
    return {
      content_text: '为了商城能带给您更好的服务，于8月10日晚间9：30分至次日早间8：00商城进行系统升级，可能会对您的购物浏览造成不便，敬请谅解!',
      imgBase64: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIW2NkAAIAAAoAAggA9GkAAAAASUVORK5CYII=',
      turnsInfo: [],
      img_domain: 'http://img.zulibuy.com/banner/',
      sortMenu: data.menuList,
      sortName: data.menuList,
      floorList: []
    }
  },
  // 计算属性
  computed: {
    lists () {
      return this.$store.getters.getLists // 文章列表
    },
    sliderlist () {
      return this.$store.getters.getSliderList // 轮播列表
    },
    ...mapState({
      // 箭头函数可使代码更简练
      count: state => state.count,

      // 传字符串参数 'count' 等同于 `state => state.count`
      countAlias: 'count',

      // 为了能够使用 `this` 获取局部状态，必须使用常规函数
      countPlusLocalState (state) {
        return state.count + this.localCount
      }
    }, [
      // 映射 this.count 为 store.state.count
      'count'
    ])
  },
  mounted() {
    // 模板编译之后，代替了之前的ready*
  },
  activated() {
    this.sortMenu = [{id: -1, name: '首页'}]
    this.sortName = [{id: 0, name: '全部商品'}]
    for (let m of data.menuList) {
      // 组装菜单
      this.sortMenu.push({
        id: m.id,
        name: m.name
      })
      this.sortName.push({
        id: m.id,
        name: m.name
      })
    }
    // 滑动菜单不展开
    this.$refs.menuComp.subitemsExpanded = false
    this.$on('changeCid', function(id) {
      // 接受组件通知方法
      if (id !== -1) { // 当点击的id不是-1（首页），跳转到相应分类列表
        this.$router.push({
          name: 'Category',
          path: '/category',
          params: {cid: id}
        })
      }
    })
    // this.loadData()
    let _this = this
    $(document).ready(function() {
      $('.navbar-location').css({
        'position': 'relative',
        'width': 'auto'
      })
      $(window).scroll(function() {
        // 滑动菜单不展开
        _this.$refs.menuComp.subitemsExpanded = false
        let scrollT = $(window).scrollTop()
        if (scrollT < 44) {
          $('.navbar-location').css({
            'position': 'relative',
            'width': 'auto'
          })
        } else {
          $('.navbar-location').css({
            'position': 'fixed',
            'width': '100%'
          })
        }
      })
    })
    setTimeout(() => {
      let base = this.$router.options.base ? this.$router.options.base : ''
      // 自带分享相关
      let imgUrl = this.$parent.getShareImg()
      // 默认全局分享
      let desc = '【足力购】帅哥美女们，快来足力购逛逛，捧个场吧！'
      let link = window.location.origin + base + '/?#/index'
      this.initWechatShare(
        '足力购商城首页',
        desc,
        imgUrl,
        link)
    }, 300)
  },
  methods: {
    loadData() {
      // 获取轮播图数据
      this.$http.post('index/sliderList')
      .then(({data: {code, data, msg}}) => {
        // console.log(data)
        if (code === 1) {
          this.turnsInfo = data.slider
        } else {
          console.error('获取轮播图失败:' + msg)
        }
      }, (response) => {
        // error callback
        console.log(response)
      })
      // 获取楼层数据
      this.$http.post('index/floor')
      .then(({data: {code, data, msg}}) => {
        console.log(data)
        if (code === 1) {
          this.floorList = data.floor
        } else {
          console.error('获取轮播图失败:' + msg)
        }
      }, (response) => {
        // error callback
        console.log(response)
      })
    },
    /**
     * [redirectTo 页面跳转]
     * @param  {[type]} type [确定跳转页面是列表还是详情]
     * @param  {[type]} id   [携带参数id 列表页是cid, 详情是gid]
     */
    redirectTo(type, id) {
      if (type === 'category') {
        this.$router.push({
          name: 'Category',
          path: '/category',
          params: {
            cid: id
          }
        })
      } else {
        this.$router.push({
          path: 'shopping/goods',
          query: {
            gid: id
          }
        })
      }
    }
  },
  watch: {}
}
</script>

<style scoped>
/*轮播图*/
.demo-swipe-item img {
  width: 100%;
}

.arrows {
  width: 3rem;
  height: 1.28rem;
  text-align: center;
}

.arrows_img {
  width: 0.512rem;
  height: 0.512rem;
  display: inline-block;
  vertical-align: -webkit-baseline-middle;
}

/*影响其他导航条*/
.navbar-yzg-default ul li a:hover:before,
.navbar-yzg-default .active a:before {
  content: "";
  position: absolute;
  width: 100%;
  height: 2px;
  bottom: -11px;
  background: #ed3366;
}

.navbar-yzg-default ul li a:hover {
  color: #353a40;
  font-weight: bold;
}

.navbar-location {
  background: #f6f6f6;
}

.shopShare {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 501;
  text-align: center;
  height: 100%;
}

.shopShare .shopShareBg {
  position: absolute;
  width: 100%;
  background: rgba(0, 0, 0, .5);
  height: 100%;
  z-index: 501
}

.shopShare .shopShareCont {
  position: relative;
  width: 70%;
  left: 0;
  top: 0;
  margin: 0 auto;
  margin-top: 35%;
  z-index: 502;
}

.auction {
  margin-top: 0.2167rem;
}

.auction .auctionImg {
  position: relative;
  display: block;
  background-color: #fff;
}

.auctionImg>img {
  width: 100%;
  vertical-align: bottom;
}

.auctionImg .countUpNumber {
  position: absolute;
  bottom: 16px;
  left: 0;
  width: 100%;
}

.auctionImg .countUpNumber i {
  display: inline-block;
  background: url(/static/images/numberBg.png);
  width: 17px;
  height: 17px;
  background-size: 100%;
  text-align: center;
  line-height: 17px;
  font-style: normal;
  margin-right: 5px;
}

.auctionImg .countUpNumber i:last-child {
  margin-right: 0;
}

.auction .auctionContent {
  padding: 5px 0 5px 5px;
  background-color: #fff;
}

.auctionContent .goods {
  padding-left: 0;
  padding-right: 5px;
}

.goods .goodsImg {
  position: relative;
}

.goods .goodsImg img {
  width: 100%;
  height: 120px;
  vertical-align: bottom;
}

.goodsImg .goodsCountUpNumber {
  position: absolute;
  top: 0;
  left: 0;
  height: 18px;
  line-height: 18px;
  padding: 0 5px;
  color: #fff;
  font-size: 12px;
}

.goodsImg .goodsCountUpNumber.unstartBg {
  background-color: #5B7952;
}

.goodsImg .goodsCountUpNumber.doingBg {
  background-color: #E86A6A;
}

.goodsImg .goodsCountUpNumber.doneBg {
  background-color: #3D3D3D;
}

.goodsInfo .title {
  height: 34px;
  line-height: 17px;
  overflow: hidden;
}

.goodsInfo .number {
  margin-top: -3px;
}
</style>
