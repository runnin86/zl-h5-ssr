<template>
  <div class="scrollTop">
    <marquee :scrollamount="scrollamount" :direction="direction" :height="height" v-text="content">
    </marquee>
  </div>
</template>

<script type="text/babel">
export default {
  name: 'wv-scroll-notice',
  props: {
    content: String,
    scrollamount: {
      type: Number
    },
    direction: {
      type: String
    },
    height: {
      type: String,
      default: '30'
    }
  }
}
</script>

<style scoped>
.scrollTop{
  height:1.28rem;
}
marquee{
  line-height: 2;
  background:#fff;
  font-size:0.512rem;
}
</style>
