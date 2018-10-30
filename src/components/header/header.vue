<template>
  <div class="row yzg-title"
    :style="{ 'background-color': backgroundColor, 'position': position}">
    <!-- 左侧图标 -->
    <div class="col-xs-2 backBtn">
      <a @click.stop="$emit('leftClick')">
        <i class="iconfont-yzg icon-yzg-back" v-show="leftIcon"></i>
      </a>
    </div>
    <!-- 默认title -->
    <div class="col-xs-8 shop-name" v-if="title">
      <span v-text="title">头部标题</span>
    </div>
    <!-- 定制化title -->
    <slot name="title" v-else></slot>
    <!-- 右侧图标 -->
    <div class="col-xs-2 shop-bag">
      <a @click.stop="$emit('rightClick')">
        <slot name="rightEdit"></slot>
        <span class="iconfont-yzg" :class="rightIcon"></span>
      </a>
    </div>
  </div>
</template>

<script type="text/babel">
export default {
  name: 'wv-header',
  props: {
    title: String,
    leftIcon: {
      type: Boolean,
      default: true
    },
    rightIcon: String,
    backgroundColor: {
      type: String,
      default: '#F8F8F8'
    },
    position: {
      type: String,
      default: 'fixed'
    }
  }
}
</script>

<style scoped>
.shop-name{
  padding:0;
  overflow:hidden;
}
</style>
