<template>
  <div>
    <!--搜索结果展示-->
    <div class="row searchResult">
      <div class="yzg-title">
        <div class="col-xs-2 backBtn">
          <a @click="$parent.back()">
            <i class="iconfont-yzg icon-yzg-back"></i>
          </a>
        </div>
        <div class="col-xs-8 shop-name">
            <input type="text" name="" class="seaCont" v-model="searchCont" @click="$parent.back()">
        </div>
        <div class="col-xs-2 shop-bag">
        </div>
      </div>
      <div class="recommend-goods search-box">
        <div class="goods-lists clearfix"
          v-infinite-scroll="queryList"
          infinite-scroll-immediate-check="false"
          infinite-scroll-disabled="busy"
          infinite-scroll-distance="30">
          <a v-for="g in goods_list" class="sub-goods_list collect_list">
            <router-link :to="{ name: 'Goods',path: '/shopping/goods', query: { gid: g.upc_id }}">
              <div class="goods-img">
                <img :src="imgBase64"
                  :style="{backgroundImage: 'url(' + (g.master_img?img_domain+g.master_img:'/static/images/no_picture.jpg') + ')'}">
              </div>
            </router-link>
            <div class="goods-title" v-html="g.goods_name"></div>
            <div class="goods-price">{{g.shop_price}}</div>
          </a>
        </div>
      </div>
      <div class="weui-loadmore" v-if="showLoading&&pagenum>-1">
        <i class="weui-loading"></i>
        <span class="weui-loadmore__tips">正在加载</span>
      </div>
      <div class="weui-loadmore weui-loadmore_line" v-if="pagenum===-1">
        <span class="weui-loadmore__tips">暂无数据</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.search-box{
  padding-top:44px;
}
.search-box .search-bar{
  padding-top:10px;
}
.search-box .search-history_title{
  height:30px;
  line-height: 30px;
  margin-top:10px;
  /*border-bottom: 1px solid #ddd;*/
}
.search-history_title{ position:relative; }
.search-history_title .iconfont-yzg{ font-size: 22px; position: absolute; right: 0; }
.search-box .search-history_content{
  padding:4px 0;
}
.search-box .search-history_content ul li{
  display: inline-block;
  padding:4px 12px;
  border:1px solid #f1f1f1;
  border-radius:20px;
  margin:6px 10px;
  background:#f1f1f1;
}
.searchTitle .yzg-title,.searchResult .yzg-title{ background: #f1f1f1; }
.seaCont{ display:block; border:none; border-bottom:1px solid #999; height:30px; width:100%; background:none; font-size: 12px; padding-left:10px; margin-top:10px; margin-left:-10px; outline: none; color:#333;}
.searchBtn{background: -webkit-gradient(linear,0 0,0 100%,from(#d6244f),to(#D23AA2)); width:48px; height:28px; line-height: 28px; border-radius:10px; display: block; color:#fff; text-align: center; font-size:12px; margin-top:8px;}
.yzg-title .iconfont-yzg{ font-size: 22px; color:#333; }
</style>

<script>
import weui from 'weui.js'
export default {
  activated () {
    this.goods_list = []
    this.pagenum = 0
    this.searchCont = this.$route.query.searchCont
    this.queryList()
  },
  data () {
    return {
      imgBase64: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIW2NkAAIAAAoAAggA9GkAAAAASUVORK5CYII=',
      goods_list: [],
      searchCont: '',
      img_domain: '',
      title_name: '',
      pagenum: 0,
      showLoading: false,
      busy: true
    }
  },
  methods: {
    queryList () {
      // 查询前设置滚动为busy(禁止多次滚动进入方法);出现读取图标
      this.busy = this.showLoading = true
      // 页码加1，默认为0
      this.pagenum = this.pagenum + 1
      console.log(this.pagenum)
      if (this.pagenum === -1) {
        // 分页条码为负均不加载
        return
      }
      // 获取数据
      this.$http.get('search.php', {
        params: {
          keywords: this.searchCont,
          page: this.pagenum
        }
      }).then(({data: {data, errcode, msg}}) => {
        if (errcode === 0) {
          this.img_domain = data.img_domain
          this.title_name = data.title_name
          if (data.goods_list.length === 0 || data.pager.page_count < this.pagenum) {
            // 返回数据长度为0时,设置页码为-1
            this.pagenum = -1
            return
          }
          for (let m of data.goods_list) {
            this.goods_list.push(m)
          }
          console.log(this.goods_list)
        } else {
          weui.toast(msg, 2000)
          console.error('获取商品列表失败:' + msg)
        }
        this.busy = this.showLoading = false
      }, (response) => {
        // error callback
        console.log(response)
      })
    }
  }
}
</script>
