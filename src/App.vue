<template>
<div id="app">
  <Head></Head>
  <transition name="fade" mode="out-in">
    <main id="main">
      <router-view class="view"></router-view>
    </main>
  </transition>
</div>
</template>
<script>
import Head from './components/head.vue'

export default {
  name: 'app',
  // 数据
  data() {
    return {}
  },
  // 计算属性
  computed: {

  },
  mounted() {

  },
  // 方法
  methods: {
    test() {

    }
  },
  // 子组件
  components: {
    Head
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
