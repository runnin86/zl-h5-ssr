<template>
	<div class="weui-tabbar container container-content" :style="{ position: fixed ? 'fixed' : 'absolute' }">
		<slot></slot>
	</div>
</template>

<script type="text/babel">
export default {
  name: 'wv-tabbar',

  props: {
    fixed: Boolean
  }
}
</script>
