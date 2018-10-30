<template>
<div>
  <div v-if="floor.productList.length>0" class="row recommend-goods" v-for="floor in composeFloorArr">
    <div class="floor_title">
      <span>
        <img src="/static/images/floor_title.png"/>
        {{floor.name}}
      </span>
    </div>
    <img v-if="floor.img" :src="'http://img.zulibuy.com/floor/' + floor.img" @click="redirectTo('category', 0)">
    <div class="goods-lists clearfix">
      <div class="sub-goods_list" v-for="g in floor.productList" :key="g.product_id" @click="redirectTo('goods', g.product_id)">
        <div class="goods-img">
          <img :src="g.img?'http://img.zulibuy.com/images/'+g.img:'/static/images/no_picture.jpg'">
        </div>
        <div class="goods-price">
          ¥{{g.price}}&nbsp;
          <span class="goods-price_origin">¥{{g.market_price}}</span>
        </div>
        <div class="goods-brief">{{g.product_name}}</div>
        <div class="goods-title">{{g.product_desc}}</div>
      </div>
      <div @click="redirectTo('category', 0)" class="sub-goods_list">
        <div class="goods-more_list">
          <img src="/static/images/lettle_bg.png">
          <p class="see_more">
            <img src="/static/images/more.jpg">
            <span>查看更多</span>
            <span class="eng_more">See More</span>
          </p>
          <div class="space"></div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script type="text/babel">
export default {
  name: 'wv-floor-goods',
  props: {
    composeFloorArr: Array,
    img_domain: 'http://img.zulibuy.com/floor/'
  },
  methods: {
    redirectTo(type, id) {
      this.$emit('redirectTo', type, id)
    }
  }
}
</script>

<style>
.floor_title {
  text-align: center;
  background: #fff;
  color: #444;
  height: 1.92rem;
  line-height: 1.92rem;
}

.floor_title span {
  display: inline-block;
  position: relative;
  padding-left: 1rem;
  font-size: 0.6837rem
}

.floor_title span>img {
  position: absolute;
  width: 1.1rem;
  left: -0.2rem;
  top: 0.38rem;
}
</style>
