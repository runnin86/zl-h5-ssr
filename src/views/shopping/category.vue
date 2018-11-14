<template>
<div class="container container-content">
  <!-- <div class="row yzg-title" style="position:relative;width:auto;margin-bottom: 4px;">
    <div class="col-xs-2 backBtn">
      <a @click="$parent.back()">
        <i class="iconfont-yzg icon-yzg-back"></i>
      </a>
    </div>
    <div class="col-xs-8 shop-name">
      <span>{{title_name}}</span>
    </div>
    <div class="col-xs-2 shop-bag">
      <router-link :to="{ name: 'Index',path: '/index'}">
        <span class="iconfont-yzg icon-yzg-goods"></span>
      </router-link>
    </div>
  </div> -->

  <!-- 滑动菜单 -->
  <div class="row navbar-location" v-show="sortMenu.length>0">
    <div class="navbar-yzg-default">
      <wv-scroll-menu ref="menuComp" :sortMenu="sortMenu" :sortName="sortName"
        :isSortName="true" :fnName="'changeCid'" :activeId="cid">
      </wv-scroll-menu>
    </div>
  </div>
  <!--滑动区域-->
  <mescroll-vue ref="mescroll" :up="mescrollUp" @init="mescrollInit" class="mescroll recommend-goods row">
    <ul id="dataList" class="goods-lists data-list clearfix">
      <li v-for="g in categoryList" :key="g.productId">
        <router-link :to="{name: 'Goods',  path: '/shopping/goods', query: { gid: g.productId }}">
          <div class="goods-img">
            <!-- <img :src="g.img?(img_domain+g.img):'/static/images/no_picture.jpg'"> -->
            <img :imgurl="g.img&&(img_domain+g.img)" src="/static/images/no_picture.jpg"/>
          </div>
        </router-link>
        <div class="goods-price">
          {{g.price}}&nbsp;
          <span class="goods-price_origin">
            ￥{{g.marketPrice}}
          </span>
        </div>
        <div class="goods-title" v-html="g.productName+(g.productDesc?'('+g.productDesc+')':'')"></div>
      </li>
    </ul>
  </mescroll-vue>
</div>
</template>

<script>
import qs from 'qs'
import { mapGetters } from 'vuex'
import * as data from './../../utils/data.js'
// 引入mescroll的vue组件
import MescrollVue from 'static/mescroll/mescroll.vue'

export default {
  // asyncData (store, route) {
  //   return store.dispatch('fetchCategory', {
  //     type: 0,
  //     pagenum: 1,
  //     pagesize: 10
  //   }) // 服务端渲染触发
  // },
  components: {
    MescrollVue
  },
  data () {
    return {
      goods_list: [],
      img_domain: 'http://img.zulibuy.com/images/',
      title_name: '全部商品',
      cid: 0,
      sortMenu: data.menuList,
      sortName: data.menuList,
      scrollTop: 0,
      mescroll: null, // mescroll实例对象
      mescrollUp: {
        // 上拉回调
        callback: this.upCallback,
        // 如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
        noMoreSize: 5,
        page: {
          num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
          size: 10 // 每页数据的数量
        },
        htmlLoading: '<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">努力加载..</p>',
        htmlNodata: '<p class="upwarp-nodata">-- 没有更多啦 --</p>',
        // 列表滑动监听
        onScroll: this.scrollFn,
        scrollbar: {
          use: true,
          barClass: 'mescroll-bar'
        },
        // 回到顶部按钮的图片路径,支持网络图
        toTop: {
          src: 'static/mescroll/mescroll-totop.png',
          warpClass: 'mescroll-totop',
          showClass: 'mescroll-fade-in',
          hideClass: 'mescroll-fade-out'
        },
        empty: {
          // 列表第一页无任何数据时,显示的空提示布局; 需配置warpId才生效;
          warpId: 'dataList', // 父布局的id;
          icon: 'static/mescroll/mescroll-empty.png',
          tip: '亲,暂无相关商品哦~' // 提示
          // btntext: '去逛逛 >', // 按钮,默认""
          // btnClick () { // 点击按钮的回调,默认null
          //   alert('点击了按钮,具体逻辑自行实现')
          // }
        },
        lazyLoad: {
          use: true // 是否开启懒加载,默认false
        }
      },
      categoryList: [], // 列表数据
      pdType: 0 // 菜单
    }
  },
  // 计算属性
  computed: {
    ...mapGetters({
      // 键为在当前页面展示,值为modules中getters中定义的键
      categoryList: 'getCategoryList'
    })
  },
  mounted () {
    // 模板编译之后，代替了之前的ready*
    this.$nextTick(function() {
      if (this.$parent.fromPath !== '/shopping/goods' || this.goods_list.length === 0) {
        // 非详情页或数据为空要加载数据
        // this.initScroll()
      }
    })
    // 获取滑动菜单组件的事件通信
    this.$on('changeCid', function (id) {
      this.changeCid(id)
    })
  },
  /*
   * 激活
   */
  activated () {
    // 当组件在 <keep-alive> 内被切换，
    // 它的 activated(激活) 和 deactivated(解散) 这两个生命周期钩子函数将会被对应执行。
    // 设置网页标题
    this.$parent.setTitle('全部商品')
    this.sortMenu = [{id: 0, name: '全部商品'}]
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
    if (this.$route.params.cid) {
      this.changeCid(this.$route.params.cid)
    }
    if (this.mescroll && this.$parent.fromPath === '/shopping/goods') {
      // 回到列表滚动到之前的位置
      this.mescroll.scrollTo(this.scrollTop, 0)
    }
  },
  beforeRouteEnter (to, from, next) { // 如果没有配置回到顶部按钮或isBounce,则beforeRouteEnter不用写
    next(vm => {
      vm.$refs.mescroll && vm.$refs.mescroll.beforeRouteEnter() // 进入路由时,滚动到原来的列表位置,恢复回到顶部按钮和isBounce的配置
    })
  },
  beforeRouteLeave (to, from, next) { // 如果没有配置回到顶部按钮或isBounce,则beforeRouteLeave不用写
    this.$refs.mescroll.beforeRouteLeave() // 退出路由时,记录列表滚动的位置,隐藏回到顶部按钮和isBounce的配置
    next()
  },
  methods: {
    /*
     * 分类点击
     */
    changeCid (cid) {
      // this.title_name = this.sortMenu[value = cid]
      this.title_name = this.sortMenu[cid].name
      this.cid = cid
      this.goods_list = []
      // 重置列表数据
      this.mescroll && this.mescroll.resetUpScroll()
      // 隐藏回到顶部的按钮
      this.mescroll && this.mescroll.hideTopBtn()
      // 菜单展开合并
      this.$refs.menuComp.subitemsExpanded = false
      // 设置网页标题
      this.$parent.setTitle(this.title_name)
    },
    getListDataFromNet(pdType, pageNum, pageSize, successCallback, errorCallback) {
      // 加载数据
      // let self = this
      // this.$store.dispatch('fetchCategory', {type: this.cid, pagenum: page.num, pagesize: page.size}).then((data) => {
      //   // data = [] // 打开本行注释,可演示列表无任何数据empty的配置

      //   // 如果是第一页需手动制空列表
      //   if (page.num === 1) self.goods_list = []

      //   // 更新列表数据
      //   self.goods_list = self.goods_list.concat(data)

      //   // 加载成功的回调,隐藏下拉刷新和上拉加载的状态;
      //   // 传参:数据的总数; mescroll会自动判断列表是否有无下一页数据,如果数据不满一页则提示无更多数据;
      //   self.mescroll.endSuccess(data.length)
      //   console.log(self.goods_list, self.categoryList)
      // }, (msg) => {
      //   $.toast(msg, 'forbidden')
      //   // 加载失败的回调,隐藏下拉刷新和上拉加载的状态;
      //   self.mescroll.endErr()
      // })
      // 获取数据
      let p = {
        type: this.cid,
        pagenum: pageNum,
        pagesize: pageSize
      }
      this.$http.post('product/productList', qs.stringify(p))
      .then(({data: {code, data, msg}}) => {
        if (code === 1) {
          console.log(p, data)
          // 成功回调
          successCallback && successCallback(data)
        } else {
          $.toast(msg, 'forbidden')
          console.error('获取商品列表失败:' + msg)
          // 失败回调
          errorCallback && errorCallback()
        }
      }, (response) => {
        // error callback
        console.log(response)
      })
    },
    /*
     * 滚动事件监听
     */
    scrollFn(mescroll, y) {
      // console.log(mescroll, y)
      // 记录距离顶部的距离
      this.scrollTop = y
      this.$refs.menuComp.subitemsExpanded = false
    },
    // mescroll组件初始化的回调,可获取到mescroll对象
    mescrollInit (mescroll) {
      this.mescroll = mescroll
      // 初始化vue后,显示vue模板布局
      document.getElementById('dataList').style.display = 'block'
      // 禁止PC浏览器拖拽图片,避免与下拉刷新冲突;如果仅在移动端使用,可删除此代码
      document.ondragstart = function() {
        return false
      }
    },
    /*
     * 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
     */
    upCallback (page, mescroll) {
      // 模拟联网
      this.getListDataFromNet(this.pdType, page.num, page.size, (arr) => {
        // 如果是第一页需手动制空列表
        if (page.num === 1) this.categoryList = []
        // 把请求到的数据添加到列表
        this.categoryList = this.categoryList.concat(arr)
        // 数据渲染成功后,隐藏下拉刷新的状态
        this.$nextTick(() => {
          mescroll.endSuccess(arr.length)
        })
      }, () => {
        // 联网异常,隐藏上拉和下拉的加载进度
        mescroll.endErr()
      })
    }
  }
}
</script>

<style scoped>
@import '/static/mescroll/mescroll.css';
.shop-bag {
  text-align: right;
}
.shop-bag span {
  font-size: 26px;
}

.sortMenu-ul li:last-child {
  padding-right: 0 !important;
  margin-right: 60px !important
}

.mescroll {
  position: fixed;
  top: 1.8rem;
  padding-bottom: 4.2rem;
  /* width: 100%; */
  /*height: auto;*/
}

/*展示上拉加载的数据列表*/
.data-list {
  display: none;
}

.data-list li {
  position: relative;
  border-bottom: 1px solid #eee;
  float: left;
}

.data-list .pd-img {
  position: absolute;
  left: 18px;
  top: 18px;
  width: 80px;
  height: 80px;
}

.data-list .pd-name {
  font-size: 16px;
  line-height: 20px;
  height: 40px;
  overflow: hidden;
}

.data-list .pd-price {
  margin-top: 8px;
  color: red;
}

.data-list .pd-sold {
  font-size: 12px;
  margin-top: 8px;
  color: gray;
}

.goods-lists li {
  width: 50%;
  overflow: hidden;
  border: 1px solid #f1f1f1;
  border-top: none;
  border-left: none;
}
.mescroll-totop {
  bottom: 80px !important;
}
</style>
