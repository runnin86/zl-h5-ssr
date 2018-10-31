<template>
<div>
  <!--头部标题-->
  <!-- <wv-header :showBack="(this.$parent.fromPath !== '/auction/goodsDetails')?true:false"
    @leftClick="$parent.back()"
    @rightClick="$router.push('/index')"
    rightIcon="icon-yzg-goods">
    <div slot="title" class="col-xs-8 shop-name" v-if="'goodData.upc'">
      <span class="double_title buyer_comment">商品详情</span>
      <router-link :to="{name: 'CommentList', path: '/commentList', query: {gid: 'goodData.upc.upc_id', goods_id: 'goodData.upc.g_id'}}"
        class="double_title" replace>
        买家评论
      </router-link>
    </div>
  </wv-header> -->
  <!--轮播图及内容-->
  <div class="goodsMain">
    <div style="position:relative; background:#f9f8fd" class="row">
      <div class="detail-img">
        <wv-swipe class="demo-swipe" :height="300" :auto="4000" :continuous="continuous">
          <wv-swipe-item class="demo-swipe-item" v-for="img in photo" :key="img.id">
            <img :src="imgBase64" :style="{backgroundImage: 'url(' + img_domain + img.resource + ')'}">
          </wv-swipe-item>
        </wv-swipe>
      </div>
      <span class="sale_done h5" v-if="goodsCount === '0'">抢光了</span>
    </div>
    <!--轮播完 -->
    <div class="row titleCont" style="margin:0px; margin-top:10px">
      <div class="col-xs-12 goodsTitle" v-if="main">
        <p>
          {{main.productName}}
        </p>
        <a @click="collect(goodData.id)" class="shoucang">
          <span v-bind:class="['iconfont-yzg', 'goodData.is_collect' ? 'icon-yzg-shoucang' : 'icon-yzg-shouc_no']"></span>
          <span style="color:#333;font-size:10px;display: block;margin-top:-10px;">收藏</span>
        </a>
        <div class="shop_price">
          ¥{{main.price}}
          <span class="shop_price_span_add">¥{{main.marketPrice}}</span>
        </div>
      </div>
    </div>

    <div class="row info_goods">
      <div class="col-xs-3" style="text-align:center;width:25%;"><img src="/static/images/zpbz.png" /><p>正品保证</p></div>
      <div class="col-xs-3" style="text-align:center;width:25%;"><img src="/static/images/qqzc.png" /><p>全球直采</p></div>
      <div class="col-xs-3" style="text-align:center;width:25%;"><img src="/static/images/gjjx.png" /><p>国际精选</p></div>
      <div class="col-xs-3" style="text-align:center;width:25%;"><img src="/static/images/jsfh.png" /><p>极速发货</p></div>
    </div>

    <div class="goodsTxt">
      <a class="col-xs-6" style="text-align:center">商品详情</a>
      <a class="col-xs-6" style="text-align:center">服务体系</a>
      <div class="blackLine"></div>
    </div>

    <div class="tab-content">
      <div class="goodsBrief" v-if="main" v-html="main.profile"></div>
      <!-- <div class="goodsTxt">
        <p class="redColor">#跨境贴士#</p>
      </div> -->
      <div class="serviceSystem" style="height:20rem;">
        <img src="/static/images/service_system_m.png"/>
      </div>
    </div>
    <span class="red-dot"></span>

    <div class="cartBottom">
      <div class="cartImg clearfix">
        <!-- 联系客服 -->
        <a id="contactPic" class="cart_png" style="border-right:1px solid #ededed;">
          <!-- <span v-bind:class="['iconfont-yzg', goodData.is_collect ? 'icon-yzg-shoucang' : 'icon-yzg-shouc_no']"></span> -->
          <img src="/static/images/lxkf.png">
          <span style="color:#333;font-size:10px;display: block;margin-top:-6px;">客服</span>
        </a>
        <!-- 购物车图标 -->
        <router-link :to="'/cart'">
          <a class="cart_png addCartPng">
            <span class="iconfont-yzg icon-yzg-msnui-cart"></span>
            <span class="quantity gaibanBg" v-show="$store.getters.cartBadge>0">
              {{$store.getters.cartBadge}}
            </span>
            <span style="color:#333;font-size:10px;display: block;margin-top:-10px;">购物车</span>
          </a>
        </router-link>
      </div>
      <div class="clearfix" style=" padding-left:40%;">
        <div class="tbl-cell">
          <a class="btn-cart gaibanBg" @click="addCartFn(pid)">
            <span class="iconfont-yzg icon-yzg-msnui-cart"></span>
            加入购物车
          </a>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import qs from 'qs'
import $ from 'zepto'
import weui from 'weui.js'
let loading

export default {
  init() {
    // console.log('初始化')
  },
  created() {},
  beforeDestroy() {},
  activated() {
    loading = weui.loading('加载中')
    this.main = this.photo = null
    this.buyNum = 1
    this.pid = this.$route.query.gid
    this.loadGood()
    this.$store.commit('CHANGE_IS_INDEX', false)
    $('.red-dot').css({
      'left': this.startX + 'px',
      'bottom': this.moveY + 'px'
    })
    /* 客服弹窗 */
    $(document).ready(function () {
      $('.goodsTxt a').each(function (index, item) {
        $(item).click(function () {
          console.log(index)
          var infoScrollH = $('.tab-content div').eq(index).offset().top
          console.log(infoScrollH)
          $(window).scrollTop(infoScrollH)
        })
      })
      $('.goodsTxt').css({'position': 'relative', 'width': 'auto'})
      var txtTop = $('.goodsTxt').offset().top
      $(document).on('scroll', function () {
        if ($(window).scrollTop() < txtTop) {
          $('.goodsTxt').css({'position': 'relative', 'width': 'auto', 'margin-left': '0px'})
        } else {
          $('.goodsTxt').css({'position': 'fixed', 'top': '0', 'width': '100%', 'margin-left': '-10px'})
        }
        if ($('.serviceSystem').offset().top - $(window).scrollTop() < 100) {
          $('.blackLine').animate({left: '75%'}, 'slow')
        } else {
          $('.blackLine').animate({left: '25%'}, 'slow')
        }
      })
    })
  },
  deactivated() {
    loading.hide()
  },
  data() {
    return {
      imgBase64: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIW2NkAAIAAAoAAggA9GkAAAAASUVORK5CYII=',
      pid: null,
      main: null,
      photo: null,
      img_domain: 'http://img.zulibuy.com/images/',
      buyNum: 1, // 购买数量
      startX: '',
      clientX: '',
      centerX: '',
      stopX: '',
      moveY: 20,
      vx: '',
      vy: 4,
      timer: 20,
      delTimer: null,
      addTimer: null
    }
  },
  methods: {
    loadGood() {
      this.$http.post('product/productDetail', qs.stringify({
        pid: this.pid
      })).then(({data: {data, code, msg}}) => {
        if (code === 1) {
          console.log(data)
          this.main = data.main
          this.photo = data.photo
          // 设置网页标题
          this.$parent.setTitle(data.main.productName)
          // 微信分享初始化->(title, desc, imgUrl, link)
          let desc = '【足力购】帅哥美女们，快来足力购逛逛，捧个场吧！'
          this.initWechatShare(
            data.main.productName + '-足力购商城',
            desc,
            this.img_domain + (data.photo.length > 0 ? data.photo[0].resource : ''),
            window.location.href)
        } else {
          $.toast(msg, 'forbidden')
          console.error('获取商品失败:' + msg)
        }
        loading.hide()
      }, (response) => {
        loading.hide()
        // error callback
        console.error(response)
      })
    },
    numberChange(opaeratType) { // 购买商品数量
      if (this.main.productType === '1') {
        weui.alert('新能源系列商品,请进店咨询!')
      } else {
        if (opaeratType === 'add') {
          if (this.main.numbers > 1) {
            this.buyNum = this.buyNum - (-1)
            this.main.numbers -= 1
          } else {
            weui.alert('库存不足，请选择其他商品')
          }
        } else {
          if (this.buyNum > 1) {
            this.buyNum -= 1
          } else {
            weui.alert('购买最小数量为1')
          }
        }
      }
    },
    addCartFn(pid) {
      let userInfo = JSON.parse(window.localStorage.getItem('zlUser'))
      if (!userInfo.parentId) {
        $.toast('您还没有关联推荐人!', 'forbidden')
        return
      }
      if (this.main.productType === '1') {
        weui.alert('新能源系列商品,请进店咨询!')
      } else {
        let token = window.localStorage.getItem('zlToken')
        if (token) {
          this.$http.get('cart/addToCart', {
            params: {
              pid: pid,
              num: this.buyNum
            },
            headers: {
              'x-token': token
            }
          }).then(({data: {code, data, msg}}) => {
            if (code === 1) {
              this.moveCart()
              // 获取购物车数量
              this.$store.dispatch('getCartNum')
            } else {
              $.toast(msg, 'forbidden')
            }
          }).catch((e) => {
            console.error('商品选中状态更改失败:' + e)
          })
        } else {
          $.toast('您还没有登录', 'forbidden')
        }
      }
    },
    collect() {
      weui.alert('商品收藏建设中,敬请期待....', function() {
        this.counter = 0
      }.bind(this))
    },
    /*
     * 加入购物车动画效果
     */
    moveCart() {
      this.startX = ($('.btn-cart').width() / 2) + $('.btn-cart').offset().left
      this.clientX = this.startX
      this.centerX = ((this.startX - $('body').offset().left) / 2) + $('body').offset().left
      this.stopX = ($('.cartImg').offset().left + ($('.icon-all').width() / 2)) + ($('.addCartPng').width() / 2)
      this.vx = (this.startX - $('body').offset().left) / 20
      // $('#cart_goods_count').val(cart_goods_count)
      $('.quantity').removeClass('addAnimate')
      clearTimeout(this.addTimer)
      clearTimeout(this.delTimer)
      this.startX = this.clientX
      this.moveY = 20
      $('.red-dot').css({
        'left': this.startX + 'px',
        'bottom': this.moveY + 'px',
        'display': 'block'
      })
      this.addMove()
    },
    delMove() {
      this.startX -= this.vx
      this.moveY -= this.vy
      $('.red-dot').css({
        'left': this.startX + 'px',
        'bottom': this.moveY + 'px'
      })
      if ((this.startX - $('body').offset().left) >= this.stopX) {
        this.delTimer = setTimeout(this.delMove, this.timer)
      } else {
        clearTimeout(this.addTimer)
        $('.red-dot').css('display', 'none')
        // var cart_goods_count = parseInt($('#cart_goods_count').val())
        $('.quantity').css('display', 'block')
        $('.quantity').addClass('addAnimate')
      }
    },
    addMove() {
      this.startX -= this.vx
      this.moveY += this.vy
      $('.red-dot').css({
        'left': this.startX + 'px',
        'bottom': this.moveY + 'px'
      })
      if (this.startX <= this.centerX) {
        clearTimeout(this.delTimer)
        this.delMove()
      } else {
        this.addTimer = setTimeout(this.addMove, this.timer)
      }
    }
  }
}
</script>

<style scoped>
@import '/static/style/goods.css';
.container-content{ background: #fff}
.demo-swipe-item{
  text-align: center;
}
/*倒计时样式*/
.time-count_down{color:#666;  padding:0 0.21333333rem; border-radius:0.41333333rem; text-align:center; height: auto; line-height: 1.8;margin-left:10px;}
.seckill{ background: #ed3366;position: fixed; margin-left: -15px; bottom: 0; z-index: 99; max-width: 640px; min-width: 320px; padding: 5px 0; width: 100%;}
.seckill-btn{ display: block; height: 35px; margin: 0 5px; line-height: 35px; color: #fff; text-align: center;  }
.shopShare{position: fixed; top: 0; left: 0; z-index: 501; text-align: center; height: 100%;}
.shopShare .shopShareBg { position: absolute; width: 100%; background: rgba(0,0,0,.5); height: 100%; z-index: 501}
.shopShare .shopShareCont { position:relative; width: 78%; left: 0; top: 0; margin: 0 auto; margin-top: 25%; z-index: 502}
.maskShade{ position:absolute; width:35%; height:100%; bottom:40px;}
.maskShade:before{position: absolute; content: ''; width: 100%; height: 30%;}
.maskShade_left{left: 0}
.maskShade_right{right: 0}
.maskShade_left:before{ top: 0; left: 100%; height: 50%}
.maskShade_right:before{ bottom: 0; right: 100%}
.dial_phone{position: absolute; width: 100%; height: 50px; bottom: 20px; display: block;}
.timeSale{ padding: 11px 0px;padding-left:15px;border-top:5px solid #f8f8f8; }
.timeSale i{ display: block; width: 100%; color: #fff; text-align: center; background: #000; font-size: 12px; padding: 4px; font-style: normal;}
#recom{font-size: 0.512rem;color: #202020;padding: 0.42666667rem 0;line-height: 1.28rem;}
.evaluatOrder {margin:0 -0.64rem;    border-bottom: 0.2133rem solid #f8f8f8;}
.evaluatOrder .row div:last-child {text-align: right;font-size: 0.512rem;color: #adadad; position: relative;top: 3px;}
.evaluatOrder .row span {color: #ff3000;font-size: 0.512rem;}
.evaTop {margin: 0;border-bottom: 1px solid #ddd;padding:0.64rem 0;}
.red-star{display: inline-block;background: url(/static/images/star2.png) no-repeat scroll left center; background-size: 15px;height: 15px;width: 15px;margin-right: 3px;
}
.slider{ width: 100%;height:200px;position: relative;user-select: none;}
.slider .content{position: absolute;left: 0;right: 0;top: 0;bottom: 0;background:green;z-index: 100;transition: 0.3s;}
.slider .remove{position: absolute; width:200px;  height:200px; background:red; right: 0;top: 0;color:#fff; text-align: center;font-size: 40px;line-height: 200px;}
  .layer{
  position: fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  z-index: 100;
  background: url(/static/images/layer_two.png) no-repeat;
  background-size: 100% 100%;
}
</style>

<style type="text/css">
  .shopShare img{border-radius: 4px 4px 0 0}
  .titleCont .time-count_down span:last-child, .titleCont .time-count_down span:nth-child(3), .titleCont .time-count_down span:nth-child(4){ color: #fff; background: none; padding: 0; border-radius: 0; margin: 0 }
  .goodsBrief iframe,.serviceSystem iframe{width:100%;}
  .serviceSystem img{max-width: 100%}
  .goodsTxt{height:40px;background: #fff;position: relative;}
  .blackLine{position: absolute;width: 18px; height: 3px; background: #333; bottom: 0px; left: 25%; margin-left: -9px}
  .timeSale .time-count_down .timeSpan{color:#fff;background: #333 !important;}
  .titleCont .time-count_down span{margin:0 5px;padding:3px 4px;border-radius: 4px;}
</style>
