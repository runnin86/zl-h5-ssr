<template>
  <div>
    <div class="row yzg-title">
      <div class="col-xs-2 backBtn">
        <a @click="$parent.back()">
          <i class="iconfont-yzg icon-yzg-back"></i>
        </a>
      </div>
      <div class="col-xs-8 shop-name">
        <span>全部分类</span>
      </div>
      <div class="col-xs-2"></div>
    </div>
    <div class="row classify_content">
      <div class="col-xs-12" v-for="item in parent_cat">
        <div class="title" v-if="item.parent_id === '0'">
          <div class="title-name">
          {{item.cat_name}}
          </div>
        </div>
        <div class="list-grid_themes" v-for="sec in parent_cat" v-if="sec.parent_id === item.cat_id">
          <router-link :to="{name: 'Category', path: '/category', params: {cid: sec.cat_id}}">
            <div class="col-xs-3" >
              <img :src="imgBase64" :style="{backgroundImage: 'url(' + (sec.cat_banner ? img_domain + sec.cat_banner : '/static/images/no_picture.jpg)')}">
              <span>{{sec.cat_name}}</span>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        imgBase64: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIW2NkAAIAAAoAAggA9GkAAAAASUVORK5CYII=',
        parent_cat: [],
        img_domain: ''
      }
    },
    activated () {
      this.loadData()
    },
    methods: {
      loadData () {
        this.$http.get('get_category.php')
        .then(({data: {data, errcode, msg}}) => {
          if (errcode === 0) {
            this.parent_cat = data.parent_cat
            this.img_domain = data.img_domain
            console.log(data)
          } else {
            console.log('获取数据失败' + msg)
          }
        }, (response) => {
          console.log(response)
        })
      }
    }
  }
</script>

<style>
  .list-grid_themes{
      text-align: center;
  }
  .list-grid_themes .col-xs-3{
      padding: 8px 15px;
  }
  .list-grid_themes a:nth-child(n+5) .col-xs-3 {
      padding-top: 0;
  }
  .list-grid_themes span{
      display: block;
      font-size:10px;
  }
  .list-grid_themes img{
      height:38px;
      -webkit-background-size: cover;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
  }
  .title{
      background:#f1f1f1;
      padding:5px 15px 0;
      border-bottom: 1px solid #eee;
  }
  .title-name{
      height:24px;
      font-size:12px;
      line-height: 24px;
      color:#ed3366;
  }
  .classify_content{
      margin-top:44px;
      background:#fff;
  }
  .classify_content .col-xs-12{
      padding:0;
  }
</style>
