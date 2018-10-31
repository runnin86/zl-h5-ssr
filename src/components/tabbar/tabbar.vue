<template>
	<div v-if="isShow" class="weui-tabbar container container-content tabbar1" :style="{position: fixed ? 'fixed' : 'absolute'}">
		<wv-tabbar-item v-for="item in itemList" :key="item.path"
		  :to="item.path" :is-on="item.activePath ? item.activePath.includes(item.path) : $route.path===item.path">
      <span slot="icon" class="botMenu">
				<!-- 菜单图标 -->
        <img :src="$route.path===item.path?item.activeIcon:item.icon"/>
				<!-- 购物图标 -->
				<wv-badge v-show="item.cartBadgeNum" class="badge">{{item.cartBadgeNum}}</wv-badge>
      </span>
      {{item.title}}
    </wv-tabbar-item>
	</div>
</template>

<script type="text/babel">
export default {
  name: 'wv-tabbar',

  props: {
    fixed: Boolean,
    isShow: Boolean,
    itemList: Array
  }
}
</script>

<style>
.tabbar1 {
	table-layout: fixed;
	box-shadow:0 -5px 30px rgba(0,0,0,0.1);
	margin-bottom: -0.1rem;
}
.badge {
	position: absolute;
	top: 0;
	right: -10px;
	padding:.10em .43em;
}
</style>
