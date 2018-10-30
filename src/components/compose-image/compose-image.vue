<template>
<div>
  <img :src="imgPath" style="width: 100%;">
  <canvas ref="imgCanvas" v-show="false"></canvas>
  <vue-qr ref="qrVue" :bgSrc='null' :logoSrc="null" v-show="false" dotScale="0.8"
    :autoColor='true' size="400" margin="0" colorLight="white" colorDark="black"
    :text="qrValue"></vue-qr>
</div>
</template>

<script>
import $ from 'zepto'
import VueQr from 'vue-qr'
// 圆角矩形
CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, r) {
  this.lineWidth = 8
  this.strokeStyle = '#fff'
  var min_size = Math.min(w, h)
  if (r > min_size / 2) r = min_size / 2
  // 开始绘制
  this.beginPath()
  this.moveTo(x + r, y)
  this.arcTo(x + w, y, x + w, y + h, r)
  this.arcTo(x + w, y + h, x, y + h, r)
  this.arcTo(x, y + h, x, y, r)
  this.arcTo(x, y, x + w, y, r)
  this.closePath()
  return this
}

export default {
  name: 'wv-compose-image',
  components: {
    VueQr
  },
  props: {
    width: {
      type: Number
    },
    height: {
      type: Number
    },
    bgColor: {
      type: String,
      default: '#fff'
    },
    qrValue: {
      type: String,
      default: window.location.href
    },
    qrLeft: {
      type: Number
    },
    qrTop: {
      type: Number
    },
    qrSize: {
      type: Number
    },
    imageArr: {
      type: Array,
      default: function() {
        return []
      }
    },
    textArr: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      imgPath: null
    }
  },
  methods: {
    draw() {
      const c = this.$refs.imgCanvas
      c.width = this.width
      c.height = this.height

      if (c.getContext) {
        let ctx = c.getContext('2d')
        ctx.rect(0, 0, c.width, c.height)
        ctx.fillStyle = this.bgColor
        ctx.fill()
        this.drawingImg(0, ctx, c)

        // 分割线
        // ctx.fillStyle = '#fff'
        // ctx.strokeStyle = '#dfdfdf'
        // ctx.roundRect(0, 566, c.width, 0, 0)
        // ctx.fill()
        // ctx.stroke()

        // 底部内容
        // ctx.font = 'bold 28px 宋体'
        // ctx.fillStyle = '#000'
        // ctx.textAlign = 'center'
        // ctx.fillText('ATM🐯 向您推荐了', 212, 644)
        //
        // ctx.font = 'bold 30px 宋体'
        // ctx.fillStyle = '#333'
        // ctx.textAlign = 'left'
        // this.canvasTextAutoLine('澳洲 Blackmores澳佳天然维生素E润肤霜冰冰霜 50g*2支',
        //   ctx, c.width, 36, 710, 42)
        //
        // ctx.font = 'bold 42px PingFang SC'
        // ctx.fillStyle = '#E34E4E'
        // ctx.textAlign = 'left'
        // ctx.fillText('¥ 110', 38, 820)
        //
        // ctx.font = '24px PingFang SC'
        // ctx.fillStyle = '#999999'
        // ctx.textAlign = 'left'
        // ctx.fillText('市场价 ¥ 159', 38, 870)
        //
        // ctx.font = '20px PingFang SC'
        // ctx.fillStyle = '#999999'
        // ctx.textAlign = 'left'
        // this.canvasTextAutoLine('范冰冰，李小璐都在用的润肤霜。面霜届中的断货王，不含人工色素和芳香剂，敏感肌肤的福音。',
        //   ctx, c.width, 38, 920, 32)

        // // 绘制会话框
        // ctx.fillStyle = '#fff'
        // ctx.strokeStyle = '#dfdfdf'
        // ctx.roundRect(150, 1020, 470, 100, 6)
        // ctx.fill()
        // ctx.stroke()
        // ctx.beginPath()
        // ctx.moveTo(151, 1040)
        // ctx.lineTo(140, 1048)
        // ctx.lineTo(151, 1056)
        // ctx.fill()
        // ctx.stroke()
        // // 会话框内字体
        // ctx.font = '28px 宋体'
        // ctx.fillStyle = '#333'
        // ctx.fillText('我是', 170, 1060)
        // ctx.fillStyle = '#f5c158'
        // ctx.fillText('可以写定制的数据在这里', 230, 1060)
      }
    },
    /*
     * 绘制方法
     */
    drawingImg(n, ctx, c) {
      if (n < this.imageArr.length) {
        let img = new Image()
        img.setAttribute('crossOrigin', 'anonymous') // 解决跨域,可选值：Anonymous|*
        let im = this.imageArr[n]

        img.src = im.src + '?r=' + Math.random(100)
        // 图片加载错误
        img.onerror = function(e) {
          if (im.isCircular) {
            // 圆形
            ctx.roundRect(im.x, im.y, im.width, im.height, im.width / 2)
            ctx.fill()
            ctx.stroke()
          } else {
            // 矩形
            ctx.fillRect(im.x, im.y, im.width, im.height)
            ctx.strokeRect(im.x, im.y, im.width, im.height)
            ctx.strokeStyle = '#fff'
          }
          // 标记图片说明
          ctx.font = '20px 微软雅黑'
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillStyle = '#53FF53'
          ctx.fillText(n, im.x + im.width / 2, im.y + im.height / 2)
          // 递归
          this.drawingImg(n + 1, ctx, c)
        }.bind(this)
        // 图片加载
        img.onload = function() {
          if (im.isCircular) {
            // 保存当前ctx的状态
            ctx.save()
            // 画出圆
            ctx.roundRect(im.x, im.y, im.width, im.height, im.width / 2)
            ctx.fill()
            ctx.stroke()
            // 裁剪上面的圆形
            ctx.clip()
            ctx.drawImage(img, im.x, im.y, im.width, im.height)
            // 还原状态
            ctx.restore()
          } else {
            ctx.drawImage(img, im.x, im.y, im.width, im.height)
          }
          // 递归
          this.drawingImg(n + 1, ctx, c)
        }.bind(this)
      } else {
        // 绘制二维码
        ctx.drawImage($('#' + this.$refs.qrVue.uuid)[0],
          this.qrLeft,
          this.qrTop,
          this.qrSize,
          this.qrSize)
        // 渲染文字
        for (let i in this.textArr) {
          let t = this.textArr[i]
          ctx.font = t.font
          ctx.fillStyle = t.style
          ctx.textAlign = t.align
          this.canvasTextAutoLine(t.text, ctx, c.width, t.x, t.y, t.h)
        }
        // 保存生成作品图片
        this.imgPath = c.toDataURL('image/png', 0.8)
      }
    },
    /*
     * 字符串自动换行
     * str:要绘制的字符串
     * ctx:canvas的context对象
     * canvasWidth:canvas宽带
     * initX:绘制字符串起始x坐标
     * initY:绘制字符串起始y坐标
     * lineHeight:字行高
     */
    canvasTextAutoLine(str, ctx, canvasWidth, initX, initY, lineHeight) {
      var lineWidth = 0
      var lastSubStrIndex = 0
      for (let i = 0; i < str.length; i++) {
        lineWidth += ctx.measureText(str[i]).width
        if (lineWidth > canvasWidth / 8 * 7) {
          ctx.fillText(str.substring(lastSubStrIndex, i), initX, initY)
          initY += lineHeight
          lineWidth = 0
          lastSubStrIndex = i
        }
        if (i === str.length - 1) {
          ctx.fillText(str.substring(lastSubStrIndex, i + 1), initX, initY)
        }
      }
    },
    getPixelRatio(ctx) {
      return ctx.webkitBackingStorePixelRatio || ctx.backingStorePixelRatio || 1
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.draw()
    })
  }
}
</script>
