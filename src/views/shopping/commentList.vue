<template>
  <div>
    <div class="row yzg-title">
      <div class="col-xs-2 backBtn">
        <a @click="$parent.back()">
          <i class="iconfont-yzg icon-yzg-back"></i>
        </a>
      </div>
      <div class="col-xs-8 shop-name">
        <router-link :to="{ name: 'Goods',path: '/shopping/goods', query: { gid: this.goods_id }}"
          class="double_title">
          商品详情
        </router-link>
        <span class="double_title buyer_comment">买家评论</span>
      </div>
      <div class="col-xs-2"></div>
    </div>

    <div class="row comment-box">
      <div class="have-comment_box" v-if="this.all_comment_count != 0">
        <div class="comment-navigation clearfix">
          <ul class="navigation-list clearfix">
            <li>
              <a href="" class="active">
                全部评价
                <span class="comment-num">{{all_comment_count}}</span>
              </a>
            </li>
            <li>
              <a href="">
                好评
                <span class="comment-num">{{great_comment_count}}</span>
              </a>
            </li>
            <li>
              <a href="">
                中评
                <span class="comment-num">{{general_comment_count}}</span>
              </a>
            </li>
            <li>
              <a href="">
                差评
                <span class="comment-num">{{bad_comment_count}}</span>
              </a>
            </li>
          </ul>
        </div>
        <div class="comment-lists" v-for="eva in comment_list">
          <div class="comment-list_content">
            <div class="comment-header clearfix">
              <div class="comment-nickname">
                <span>{{eva.user_name}}</span>
              </div>
              <div class="comment-time">
                <span>{{eva.add_time}}</span>
              </div>
            </div>
            <div class="comment-body">
              <div class="evaluate-star" v-html="eva.comment_rank"></div>
              <div class="comment-text">
                <p class="show-text">{{eva.content}}</p>
                <div class="show-pic" v-for="evaImg in eva.img">
                  <a href="">
                    <img :src="evaImg.goods_img" alt="晒单评价">
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="none-comment_box" v-if="this.all_comment_count === '0'">
        <div class="goods-alert_title">
          <div class="goods-alert_pic">
            <img src="static/images/noGoods.png">
          </div>
          <div class="goods-alert_content">
            <p class="no-goods_cart">此商品还没有评论</p>
            <a href="/category" class="random-stroll_shop">
              随便逛逛
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import weui from 'weui.js'

export default {
  /*
   * 激活
   */
  activated () {
    // 去获取购物车数据
    this.getQuery()
    this.loadComment()
    // this.$store.commit('isIndex', false)
  },
  data () {
    return {
      all_comment_count: '',
      great_comment_count: '',
      general_comment_count: '',
      bad_comment_count: '',
      comment_list: '',
      goods_id: ''
    }
  },
  methods: {
    getQuery () {
      this.goods_id = this.$route.query.gid
      console.log(this.goods_id)
    },
    loadComment () {
      this.$http.get('comment_goods.php', {
        params: {
          act: 'list',
          goods_id: this.goods_id
        }
      })
      .then(({data: {data, errcode, msg}}) => {
        if (errcode === 0) {
          this.all_comment_count = data.all_comment_count
          this.great_comment_count = data.all_comment_count1
          this.general_comment_count = data.all_comment_count2
          this.bad_comment_count = data.all_comment_count3
          this.comment_list = data.comment_list
          console.log(data)
        } else {
          console.error('获取评论列表失败:' + msg)
        }
      }, (response) => {
        // error callback
        console.error(response)
      })
    }
  },
  // 监听事件，当商品全部选中时，全选选中，否则不选中
  watch: {
  },
  beforeCreate () {
    // 组件实例刚刚被创建，属性都没有
  },
  created () {
    // 组件实例创建完毕，属性已经绑定
  },
  beforeMount () {
    // 模板编译之前
  },
  mounted () {
    // 模板编译之后，代替了之前的ready*
  },
  beforeUpdate () {
    // 组件更新之前
  },
  updated () {
    // 组件更新完毕
  },
  beforeDestroy () {
    // 组件销毁之前
  },
  destroyed () {
    // 组件销毁后
  }
}
</script>

<style>

.comment-navigation{text-align: center;font-size:12px;padding-top: 10px}
.comment-navigation .navigation-list{
  background: #fff;
  padding:7px 0;
  margin-bottom:0;
}
.comment-navigation .navigation-list .active{
  color:#d6244f;
}
.comment-navigation .navigation-list .comment-num{
  display: block;
}
.comment-navigation ul li{
  float: left;
  width:25%;
}
.comment-lists .comment-list_content{
  background: #fff;
  margin-top: 7px;
}
.comment-lists .comment-header{
  font-size: 12px;
  border-bottom: 1px solid rgb(238, 238, 238);
  padding:0 15px 0 7px;
  height:40px;
  line-height: 40px;
}
.comment-lists .comment-header .comment-nickname{
  float: left;
}
.comment-lists .comment-header .comment-time{
  float: right;
  color:#aaa;
}
.comment-lists .comment-body{
  padding:10px 7px 7px;
}
.comment-lists .comment-body .red-star{
  display: inline-block;
  background: url(/static/images/star2.png) no-repeat scroll left center;
  background-size: 15px;
  height: 15px;
  width: 15px;
  margin-right: 3px;
}
.comment-lists .comment-body .comment-text .show-text{
  padding:4px 0 10px;
}
.comment-lists .comment-body .comment-text .show-pic{
  margin: 4px auto;
}
.comment-lists .comment-body .comment-text .show-pic a{
  width:60px;
  margin: 3px;
  border-radius: 4px;
  display: inline-block;
}
.comment-lists .comment-body .comment-text .show-pic img{
  width:100%;
}
.have-comment_box, .none-comment_box{padding-top:44px;}
</style>
