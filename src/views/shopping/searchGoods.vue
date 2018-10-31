<template>
  <div>
    <!--搜索title-->
    <div class="row searchTitle">
      <div class="yzg-title">
        <div class="col-xs-2 backBtn">
          <a @click="$parent.back()">
            <i class="iconfont-yzg icon-yzg-back"></i>
          </a>
        </div>
        <div class="col-xs-8 shop-name">
            <input type="text" name="" class="seaCont" placeholder="爱仕达" v-model="searchContent">
        </div>
        <div class="col-xs-2 shop-bag" style="padding-left:0">
            <router-link :to="{ path: '/showSearch', query: {searchCont: searchContent}}" class="searchBtn">
                <a @click="searchGood(searchContent)" style="color:#fff">搜索</a>
            </router-link>
        </div>
      </div>
      <div class="col-xs-12 search-box">
        <div class="search-history" v-if = "hasHistory">
          <div class="search-history_title">历史搜索
            <i class="iconfont-yzg icon-yzg-shanchu" @click="delHis()"></i>
          </div>
          <div class="search-history_content">
            <ul>
              <li v-for = "s in searchHisList">
                <router-link :to="{ path: '/showSearch', query: {searchCont: s.text}}">
                  <a @click="searchGood(s.text)">{{s.text}}</a>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
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
  background:#f8f8f8;
}
/*.searchTitle .yzg-title,.searchResult .yzg-title{ background: #f1f1f1; }*/
.searchResult{ display:none; }
.seaCont{ display:block; border:none; border-bottom:1px solid #999; height:30px; width:100%; background:none; font-size: 12px; padding-left:10px; margin-top:10px; margin-left:-10px; outline: none; color:#333;}
.searchBtn{background: -webkit-gradient(linear,0 0,0 100%,from(#d6244f),to(#D23AA2)); width:48px; height:28px; line-height: 28px; border-radius:10px; display: block; color:#fff; text-align: center; font-size:12px; margin-top:8px;}
.yzg-title .iconfont-yzg{ font-size: 22px; color:#333; }
</style>

<script>
import weui from 'weui.js'
export default {
  activated () {
    this.searchHisList = JSON.parse(localStorage.getItem('searchHis'))
    if (this.searchHisList === null) {  // 如果没有历史搜索记录 则默认搜索爱仕达
      this.hasHistory = false
      this.searchContent = '爱仕达'
    } else {  // 如果存在则默认显示最近搜索记录
      this.searchContent = this.searchHisList[0].text
    }
  },
  data () {
    return {
      imgBase64: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIW2NkAAIAAAoAAggA9GkAAAAASUVORK5CYII=',
      searchType: 'searchTitle',
      searchContent: '',
      title_name: '',
      searchHisList: [],
      hasHistory: true
    }
  },
  methods: {
    searchGood(objCont) {
      if (objCont === '') {  // 如果当前
        // objCont = this.searchContent
        weui.alert('请输入你想搜索的商品')
        return
      }
      this.searchContent = objCont  // 搜索关键字
      this.hisSearch()   // 保存搜索历史
      this.hasHistory = true
    },
    /*
    * 添加历史搜索记录
    */
    hisSearch () {
      let timestamp = new Date().getTime()
      let addHis = true
      if (localStorage.getItem('searchHis') === null) {  // 如果没有搜索记录 则时间赋值
        this.searchHisList = []
        this.searchHisList.push({text: this.searchContent, time: timestamp})
        localStorage.setItem('searchHis', JSON.stringify(this.searchHisList))
      } else {
        this.searchHisList = JSON.parse(localStorage.getItem('searchHis'))
        this.searchHisList.forEach(function(item, index) {  // 判断当前插入历史记录是否已存在 已存在则只更新时间
          if (item.text === this.searchContent) {
            item.time = timestamp
            addHis = false  // 如果存在则不执行以下插入操作
            return false
          }
        }.bind(this))
        if (addHis) {
          this.searchHisList.push({text: this.searchContent, time: timestamp})
        }
        this.searchHisList = this.listSortBy(this.searchHisList, 'time', 'desc')
        localStorage.setItem('searchHis', JSON.stringify(this.searchHisList))
      }
    },
    /*
    * 对历史记录进行时间排序 并控制数量
    */
    listSortBy (arr, field, order) {  // 按时间排序
      var refer = []
      var result = []
      var index
      for (var i = 0; i < arr.length; i++) {
        refer[i] = arr[i][field] + ':' + i
      }
      refer.sort()
      if (order === 'desc') refer.reverse()
      for (i = 0; i < refer.length; i++) {
        index = refer[i].split(':')[1]
        result[i] = arr[index]
      }
      while (result.length > 10) {  // 控制历史记录承载数量 最多为10 否则删除
        result.splice('10', 1)
      }
      return result
    },
    /*
    * 清空历史记录
    */
    delHis() {
      weui.confirm('确定清空搜索历史记录吗', () => {
        localStorage.removeItem('searchHis')
        this.searchHisList = []   // 清空搜索记录 隐藏记录层
        this.hasHistory = false
      }, () => {
        // f
      })
    }
  }
}
</script>
