<template>
<div>
  <vue-qr :logoSrc="logo" dotScale="0.8"
    :size="2*size" margin="0" autoColor="true"
    :colorLight="bgColor" :colorDark="fgColor"
    :text="value" style=""></vue-qr>
</div>
</template>

/*
 text: 欲编码的内容
 size: 尺寸, 长宽一致, 包含外边距
 margin: 二维码图像的外边距, 默认 20px
 colorDark: 实点的颜色
 colorLight: 空白区的颜色
 bgSrc: 欲嵌入的背景图地址
 backgroundDimming: 叠加在背景图上的颜色, 在解码有难度的时有一定帮助
 logoSrc: 欲嵌入至二维码中心的 LOGO 地址
 logoScale: 用于计算LOGO大小的值, 过大将导致解码失败, 默认 0.2
 logoMargin: 标识周围的空白边框, 默认为0
 logoCornerRadius: 标识及其边框的圆角半径, 默认为0
 whiteMargin: 若设为true, 背景图外将绘制白色边框
 dotScale: (0 < scale < 1.0f) 数据区域点缩小比例
 autoColor: 若为 true, 背景图的主要颜色将作为实点的颜色, 即 colorDark
 binarize: 若为 true, 图像将被二值化处理, 未指定阈值则使用默认值
 binarizeThreshold:  (0 < threshold < 255) 二值化处理的阈值
 callback: 生成的二维码 Data URI 可以在回调中取得
 */
<script>
import VueQr from 'vue-qr'

export default {
  name: 'wv-qrcode',
  components: {
    VueQr
  },
  data() {
    return {
    }
  },
  props: {
    size: {
      type: Number
    },
    bgColor: {
      type: String,
      default: '#fff'
    },
    fgColor: {
      type: String,
      default: '#000'
    },
    value: {
      type: String
    },
    logo: {
      type: String
    }
  },
  methods: {
  },
  mounted() {
  }
}
</script>
