<template>
  <div>
    <!-- 轮播图 -->
    <wv-swipe class="demo-swipe" :height="130" :auto="4000">
      <wv-swipe-item class="demo-swipe-item" style="background-color: #f44336">1</wv-swipe-item>
      <wv-swipe-item class="demo-swipe-item" style="background-color: #ffc107">2</wv-swipe-item>
      <wv-swipe-item class="demo-swipe-item" style="background-color: #03a9f4">3</wv-swipe-item>
    </wv-swipe>

    <!-- 九宫格 -->
    <div class="weui-grids">
      <a class="weui-grid js_grid">
        <div class="weui-grid__icon">
          <img src="static/weui/images/icon_nav_button.png" alt="">
        </div>
        <p class="weui-grid__label">
          Button
        </p>
      </a>
      <a class="weui-grid js_grid">
        <div class="weui-grid__icon">
          <img src="static/weui/images/icon_nav_cell.png" alt="">
        </div>
        <p class="weui-grid__label">
          List
        </p>
      </a>
      <a class="weui-grid js_grid">
        <div class="weui-grid__icon">
          <img src="static/weui/images/icon_nav_cell.png" alt="">
        </div>
        <p class="weui-grid__label">
          List
        </p>
      </a>
      <a class="weui-grid js_grid">
        <div class="weui-grid__icon">
          <img src="static/weui/images/icon_nav_cell.png" alt="">
        </div>
        <p class="weui-grid__label">
          List
        </p>
      </a>
      <a class="weui-grid js_grid">
        <div class="weui-grid__icon">
          <img src="static/weui/images/icon_nav_cell.png" alt="">
        </div>
        <p class="weui-grid__label">
          List
        </p>
      </a>
      <a class="weui-grid js_grid">
        <div class="weui-grid__icon">
          <img src="static/weui/images/icon_nav_cell.png" alt="">
        </div>
        <p class="weui-grid__label">
          List
        </p>
      </a>
      <a class="weui-grid js_grid">
        <div class="weui-grid__icon">
          <img src="static/weui/images/icon_nav_cell.png" alt="">
        </div>
        <p class="weui-grid__label">
          List
        </p>
      </a>
      <a class="weui-grid js_grid">
        <div class="weui-grid__icon">
          <img src="static/weui/images/icon_nav_cell.png" alt="">
        </div>
        <p class="weui-grid__label">
          List
        </p>
      </a>
      <a class="weui-grid js_grid" @click="toast">
        <div class="weui-grid__icon">
          <img src="static/weui/images/icon_nav_cell.png" alt="">
        </div>
        <p class="weui-grid__label">
          List
        </p>
      </a>
    </div>

    <!-- 文章 -->
    <article class="weui-article">
      <h1>大标题</h1>
      <section>
        <h2 class="title">章标题</h2>
        <section>
          <h3>1.1 节标题</h3>
          <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat.
          </p>
          <p>
              <img src="static/weui/images/pic_article.png" alt="">
              <img src="static/weui/images/pic_article.png" alt="">
          </p>
        </section>
        <section>
          <h3>1.2 节标题</h3>
          <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
              proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </section>
      </section>
    </article>

    <!-- 列表 -->
    <div style="padding-bottom:100px;">
      <wv-group title="新消息提示跟摘要信息后，统一在列表右侧">
        <wv-cell title="单行列表" is-link to="/demo/goods">
          <span slot="ft" style="vertical-align: middle; font-size: 17px;">详细信息</span>
          <wv-badge :is-dot="true" slot="ft" style="margin-left: 5px; margin-right: 5px;"></wv-badge>
        </wv-cell>
      </wv-group>

      <wv-group title="未读数红点跟在主题信息后，统一在列表左侧">
        <wv-cell class="cell-big-thumb">
          <div slot="icon" style="position: relative;margin-right: 10px;">
            <img :src="thumb" style="width: 50px; height: 50px;display: block">
            <wv-badge style="position: absolute;top: -.4em;right: -.4em;">2</wv-badge>
          </div>
          <template slot="bd">
            <p>联系人名称</p>
            <p style="font-size: 13px;color: #888888;">摘要信息</p>
          </template>
        </wv-cell>
        <wv-cell is-link>
          <span slot="bd" style="vertical-align: middle;">单行列表</span>
          <wv-badge slot="bd" style="margin-left: 5px;">2</wv-badge>
        </wv-cell>
        <wv-cell value="详细信息" is-link>
          <span slot="bd" style="vertical-align: middle;">单行列表</span>
          <wv-badge slot="bd" style="margin-left: 5px;">8</wv-badge>
        </wv-cell>
        <wv-cell is-link>
          <span slot="bd" style="vertical-align: middle;">单行列表</span>
          <wv-badge slot="bd" style="margin-left: 5px;">New</wv-badge>
        </wv-cell>
      </wv-group>

      <wv-group title="带说明的列表项">
        <wv-cell title="标题文字" value="说明文字"></wv-cell>
      </wv-group>

      <wv-group title="带图标、说明的列表项">
        <wv-cell title="标题文字" value="说明文字">
          <img :src="imgIcon" alt="" slot="icon" class="cell-icon">
        </wv-cell>
        <wv-cell title="标题文字" value="说明文字">
          <img :src="imgIcon" alt="" slot="icon" class="cell-icon">
        </wv-cell>
      </wv-group>

      <wv-group title="带跳转的列表项">
        <wv-cell title="标题文字" is-link to="/"></wv-cell>
        <wv-cell title="标题文字" is-link to="/"></wv-cell>
      </wv-group>

      <wv-group title="带说明、跳转的列表项">
        <wv-cell title="标题文字" value="说明文字" is-link to="/"></wv-cell>
        <wv-cell title="标题文字" value="说明文字" is-link to="/"></wv-cell>
      </wv-group>

      <wv-group title="带图标、说明、跳转的列表项">
        <wv-cell title="标题文字" value="说明文字" is-link to="/">
          <img :src="imgIcon" alt="" slot="icon" class="cell-icon">
        </wv-cell>
        <wv-cell title="标题文字" value="说明文字" is-link to="/">
          <img :src="imgIcon" alt="" slot="icon" class="cell-icon">
        </wv-cell>
      </wv-group>
    </div>
  </div>
</template>

<script>
// import weui from 'weui'
import imgIcon from 'static/weui/images/icon_tabbar.png'
import thumb from 'static/weui/images/icon_nav_button.png'

export default {
  name: 'demo',
  data() {
    return {
      imgIcon,
      thumb
    }
  },
  beforeCreate() {
    // 在实例初始化之后，数据观测 (data observer) 和 event/watcher 事件配置之前被调
    console.log('创建之前')
  },
  created() {
    console.log('创建')
  },
  beforeMount() {
    // 在挂载开始之前被调用：相关的 render 函数首次被调用。该钩子在服务器端渲染期间不被调用。
    console.log('挂载之前')
  },
  mounted() {
    console.log('挂载完成', this)
  },
  beforeUpdate() {
    console.log('更新之前')
  },
  updated() {
    console.log('更新')
  },
  activated() {
    console.log('keep-alive 组件激活时调用', process.env.BASE_API)
    $.toast('会话失效<br/>即将重新登录', 'forbidden')
    // weui.alert('普通的alert')
    // weui.toast('操作成功', 3000)
  },
  deactivated() {
    console.log('keep-alive 组件停用时调用')
  },
  beforeDestroy() {
    console.log('实例销毁之前')
  },
  destoryed() {
    console.log('实例销毁')
  },
  methods: {
    toast() {
      // weui.topTips('请填写正确的字段')
      // weui.alert('普通的alert')
      // weui.toast('操作成功', 3000)
    }
  }
}
</script>

<style scoped>
  .demo-swipe {
    margin-bottom: 40px;
  }

  .demo-swipe .demo-swipe-item {
    font-size: 1.2rem;
    color: white;
    font-weight: bold;
    text-align: center;
    line-height: 130px;
  }

  .cell-icon {
    display: block;
    width: 20px;
    margin-right: 5px;
  }
</style>
