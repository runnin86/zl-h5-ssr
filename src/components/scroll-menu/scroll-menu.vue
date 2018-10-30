<template>
<div class="allSort">
  <div class="sortMenu clearfix">
    <ul class="sortMenu-ul" :style="{'min-width': sortMenu.length*89+'px'}">
      <li class="cell" v-for="(item, index) in sortMenu" :key="item.id"
        :style="{'padding-right': (index===sortMenu.length-1&&isSortName?60:0)+'px'}"
        :class="item.id===activeId?'active':''"
        @click="$parent.$emit(fnName, item.id)">
        <a>{{item.name}}</a>
      </li>
    </ul>
    <div class="all" v-show="isSortName" @click="subitemsExpanded=!subitemsExpanded">
      <img :src="'/static/images/' + (subitemsExpanded?'up.png':'down.png')" alt="">
    </div>
    <div v-show="subitemsExpanded" class="pull-down">
      <ul class="pull-down-sort">
        <li class="" v-for="(pulldow, index) in sortName">
          <a @click="$parent.$emit(fnName, pulldow.id),scrollPosition(index)"
            :style="{color: pulldow.id===activeId?'#353a40':''}">
            {{pulldow.name}}
          </a>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script type="text/babel">
import $ from 'zepto'

export default {
  name: 'wv-scroll-menu',
  props: {
    sortMenu: Array,
    sortName: Array,
    activeId: Number,
    isSortName: {
      type: Boolean,
      default: true
    },
    fnName: {
      type: String,
      default: 'changeCid'
    }
  },
  data() {
    return {
      subitemsExpanded: false
    }
  },
  methods: {
    scrollPosition(i) {
      // $('.sortMenu').css('left', (i * 82 * -1) + 'px')
      // $('.sortMenu').animate({scrollLeft: i * 82}, 500)
      $('.sortMenu').scrollLeft(i * 82)
    }
  }
}
</script>

<style scoped>
/* 分类菜单*/
.sortMenu {
  width: 100%;
  background-color: #fff;
  overflow-x: scroll;
  -webkit-overflow-x: scroll;
}

.sortMenu::-webkit-scrollbar {
  width: 0;
  height: 0;
  background-color: #fff;
}

.sortMenu-ul {
  display: flex;
  justify-content: flex-start;
}

.sortMenu .cell {
  display: inline-block;
  font-size: 14px;
  margin: 0px 1em;
  height: 44px;
  line-height: 44px;
  text-align: center;
  position: relative;
  text-overflow: ellipsis;
  word-break: keep-all;
}

.sortMenu .cell.special a {
  color: #ff474c;
}

.sortMenu .cell.special:before {
  content: '';
  height: 2px;
  width: 100%;
  background: #ff474c;
  position: absolute;
  bottom: 0px;
}

.sortMenu .all {
  right: 0;
  top: -2px;
  height: 45px;
  width: 40px;
  position: absolute;
  background: #fff;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow:2px -6px 10px #aaa;
}

.sortMenu .all:before {
  content: '';
  height: 28px;
  width: 1px;
  position: absolute;
  /*box-shadow: 1px 0px 1px #e0e0e0;*/
  left: 0px;
}

.sortMenu .all img {
  display: block;
  width: 16px;
}

.sortMenu .pull-down {
  position: absolute;
  top: 44px;
  height: auto;
  width: 100%;
  background: #fff;
  z-index: 1;
  border-top: 1px solid #f2f2f2;
}

.pull-down-sort {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  align-content: space-around;
  flex-wrap: wrap;
  flex-direction: row
}

.pull-down-sort li {
  float: left;
  padding: .1rem
}

.pull-down-sort li a:hover {
  color: #ff474c;
}
</style>
