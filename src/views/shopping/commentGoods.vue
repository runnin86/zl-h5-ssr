<template>
  <div>
    <div class="row yzg-title">
      <div class="col-xs-2 backBtn">
        <a @click="$parent.back()">
          <i class="iconfont-yzg icon-yzg-back"></i>
        </a>
      </div>
      <div class="col-xs-8 shop-name">
        <span>评价晒单</span>
      </div>
      <div class="col-xs-2 comment-submit">
        <a @click="loadComment()">提交</a>
      </div>
    </div>

    <div class="row comment-box">
      <div class="comment-content">
        <div class="comment-title clearfix">
          <div class="default_pic">
            <img src="static/images/user_default.jpg">
          </div>
          <div class="comment_score">
            <span>评分</span>
            <div id="rating-star">
              <a href="#">0</a>
              <a href="#">1</a>
              <a href="#">2</a>
              <a href="#">3</a>
              <a href="#">4</a>
            </div>
          </div>
        </div>
        <div class="comment-text">
          <textarea name="content" id="content" placeholder="长度在500字之间写下购买体会或使用过程中带来的帮助可以为其他小伙伴提供参考哦~" v-model="content" class="comment_input" type="text"></textarea>
        </div>

        <div class="weui-cells weui-cells_form comment-pic" id="uploader">
          <div class="weui-cell">
            <div class="weui-cell__bd">
              <div class="weui-uploader">
                <div class="weui-uploader__hd">
                  <p class="weui-uploader__title">图片上传</p>
                  <div class="weui-uploader__info">
                    <span id="uploadCount">0</span>/5
                  </div>
                </div>
                <div class="weui-uploader__bd">
                  <ul class="weui-uploader__files" id="uploaderFiles"></ul>
                  <div class="weui-uploader__input-box">
                    <input id="uploaderInput" class="weui-uploader__input" type="file"
                      accept="image/*" capture="camera" multiple="" />
                  </div>
                </div>
                <p class="showTips">商品图片（至少1张，最多5张图片,图片大小不超过2MB)</p>
              </div>
            </div>
          </div>
        </div>

        <div class="comment-way">
          <div class="weui-cells weui-cells_checkbox comment-way_checkbox">
            <label class="weui-cell weui-check__label comment-way_label">
              <div class="weui-cell__hd">
                <input type="checkbox" class="weui-check">
                <i class="weui-icon-checked"></i>
              </div>
              <div class="weui-cell__bd">
                <p>匿名评价</p>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
import $ from 'zepto'
import weui from 'weui.js'
import wx from 'wx'

export default {
  data () {
    return {
      goods_id: '',
      content: '',
      goods_imgs: '',
      comment_rank: 4,
      type: 'image',
      media_id: '',
      order_id: ''
    }
  },
  /*
   * 激活
   */
  activated () {
    this.getQuery()
    let _this = this
    $('#rating-star').on('click', 'a', function () {
      $('#rating-star').data('star', this.innerHTML)
      _this.comment_rank = this.innerHTML
    }).on('mouseenter', 'a', function () {
      _this.setStar(this)
    }).on('mouseleave', 'a', function () {
      var $r_star = $('#rating-star')
      var level = $r_star.data('star')
      var $stars = $r_star.find('a')
      if (level) {
        _this.setStar($stars[level])
      } else {
        $stars.css('background-position', '0 0px')
      }
    })
    /*eslint-disable */
    /* 图片自动上传 */
    // https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=config.appId&secret=config.appSecret
    var uploadCount = 0, uploadList = [];
    var uploadCountDom = document.getElementById("uploadCount");
    let token = 'F_sxlLYzzQvf1S4k7IkLOFQle4sEjwqZmDO48YXeImu65ghdXXMnsXhZOLkfEat9f3NiQK9SFCglEr7N3CZQHgzNo6e0FE0MmTnLU9Mwe-ATEQ3U6611VWWnupuR7vjDSDKgAGAHSZ';
    weui.uploader('#uploader', {
        url: 'http://file.api.weixin.qq.com/cgi-bin/media/upload?access_token=' + token + '&type=image',
        auto: true,
        type: 'file',
        fileVal: 'fileVal',
        compress: {
            width: 1600,
            height: 1600,
            quality: .8
        },
        onBeforeQueued: function(files) {
            if(["image/jpg", "image/jpeg", "image/png", "image/gif"].indexOf(this.type) < 0){
                weui.alert('请上传图片');
                return false;
            }
            if(this.size > 10 * 1024 * 1024){
                weui.alert('请上传不超过10M的图片');
                return false;
            }
            if (files.length > 5) { // 防止一下子选中过多文件
                weui.alert('最多只能上传5张图片，请重新选择');
                return false;
            }
            if (uploadCount + 1 > 5) {
                weui.alert('最多只能上传5张图片');
                return false;
            }

            ++uploadCount;
            uploadCountDom.innerHTML = uploadCount;
        },
        onQueued: function(){
            uploadList.push(this);
            console.log(this);
        },
        onBeforeSend: function(data, headers){
            console.log(this, data, headers);
            // $.extend(data, { test: 1 }); // 可以扩展此对象来控制上传参数
            // $.extend(headers, { Origin: 'http://127.0.0.1' }); // 可以扩展此对象来控制上传头部

            // return false; // 阻止文件上传
        },
        onProgress: function(procent){
            console.log(this, procent);
        },
        onSuccess: function (ret) {
            console.log(this, ret);
        },
        onError: function(err){
            console.log(this, err);
        }
    });
    // 缩略图预览
    document.querySelector('#uploaderFiles').addEventListener('click', function(e){
        var target = e.target;

        while(!target.classList.contains('weui-uploader__file') && target){
            target = target.parentNode;
        }
        if(!target) return;

        var url = target.getAttribute('style') || '';
        var id = target.getAttribute('data-id');

        if(url){
            url = url.match(/url\((.*?)\)/)[1].replace(/"/g, '');
        }
        var gallery = weui.gallery(url, {
            className: 'custom-name',
            onDelete: function(){
                weui.confirm('确定删除该图片？', function(){
                    --uploadCount;
                    uploadCountDom.innerHTML = uploadCount;


                    for (var i = 0, len = uploadList.length; i < len; ++i) {
                        var file = uploadList[i];
                        if(file.id == id){
                            file.stop();
                            break;
                        }
                    }
                    target.remove();
                    gallery.hide();
                });
            }
        });
    });
    /*eslint-enable */
  },
  methods: {
    getQuery () {
      this.order_id = this.$route.query.order_id
      this.goods_id = this.$route.query.goods_id
    },
    chooseImage() {
      wx.chooseImage({
        count: 5, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          console.log(res)
        }
      })
    },
    loadComment () {
      let eva = {
        content: this.content,
        goods_imgs: this.goods_imgs,
        goods_id: this.goods_id,
        order_id: this.order_id,
        comment_rank: this.comment_rank
      }
      this.$http.post('comment_goods.php?act=save', qs.stringify(eva))
      .then(({data: {data, errcode, msg}}) => {
        if (errcode === 0 && this.content) {
          alert('评论成功，请等待审核')
          console.log(this.goods_id)
          this.$router.push({name: 'CommentList', path: '/commentList', query: {gid: this.goods_id}})
          console.log(data)
        } else {
          this.comment_submit()
          console.error('评论失败:' + msg)
        }
      }, (response) => {
        // error callback
        console.error(response)
      })
    },
    // 上传图片接口
    // loadPic () {
    //   let timestamp = Date.parse(new Date()) / 1000
    //   let md5Str = md5('116' + timestamp + 'NhH$ApI')
    //   let evaPic = {
    //     timestamp: timestamp,
    //     sign: md5Str,
    //     type: '',
    //     media_id: ''
    //   }
    //   this.$http.get('comment_goods.php?act=upload_wx_media', qs.stringify(evaPic))
    //   .then(({data: {data, errcode, msg}}) => {
    //     if (errcode === 0) {
    //       alert('图片上传成功')
    //       console.log(data)
    //     } else {
    //       // weui.toast('失败')
    //       console.error('图片上传失败:' + msg)
    //     }
    //   }, (response) => {
    //     // error callback
    //     console.error(response)
    //   })
    // },
    setStar (star) {
      var level = $(star).html()
      var n
      if (level === '0' || level === '1' || level === '2' || level === '3' || level === '4') {
        n = '0 0'
      }
      $('#rating-star a').each(function(index, item) {
        if (index <= level) {
          $(item).css('background-position', n)
        } else {
          $(item).css('background-position', '0 -90px')
        }
      })
    },
    // 评论提示
    comment_submit () {
      var window_height = $(window).scrollTop() + ($(window).height() / 2)
      this.showTips('评论内容不能为空！', window_height, '2')
    },
    showTips(tips, height, time) {
      var windowWidth = document.documentElement.clientWidth
      var tipsDiv = '<div class="tipsClass">' + tips + '</div>'
      $('body').append(tipsDiv)
      $('div.tipsClass').css({
        'top': height + 'px',
        'left': (windowWidth / 2) - (tips.length * 13 / 2) + 'px',
        'position': 'absolute',
        'padding': '5px 10px',
        'background': '#222',
        'border-radius': '4px',
        'font-size': 14 + 'px',
        'margin': '0 auto',
        'text-align': 'center',
        'width': 'auto',
        'color': '#fff',
        'opacity': '0.8'
      }).show()
      setTimeout(function() {
        // $('div.tipsClass').fadeOut()
        $('div.tipsClass').remove()
      }, (time * 800))
    }
  },
  watch: {
  },
  beforeCreate () {
    // 组件实例刚刚被创建，属性都没有
  },
  created () {
    // 组件实例创建完毕，属性已经绑定
  },
  beforeMount () {
    // 模板编译之前
    // 去后台获取签名等信息
    this.$http.get('http://127.0.0.1:8090/api/v1/weChat/wxConfig')
    .then(({data: {data, code, msg}}) => {
      // 微信配置
      wx.config({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出
        appId: process.env.APP_ID, // 必填，公众号的唯一标识
        timestamp: data.timestamp, // 必填，生成签名的时间戳
        nonceStr: data.nonceStr, // 必填，生成签名的随机串
        signature: data.signature, // 必填，签名，见附录1
        jsApiList: [ // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          'chooseImage',
          'previewImage',
          'uploadImage'
        ]
      })
    }, (response) => {
      // error callback
      console.error(response)
    })
  },
  mounted () {
    // 模板编译之后，代替了之前的ready*
  },
  beforeUpdate () {
    // 组件更新之前
  },
  updated () {
    // 组件更新完毕
  },
  beforeDestroy () {
    // 组件销毁之前
  },
  destroyed () {
    // 组件销毁后
  }
}
</script>

<style>
.yzg-title .comment-submit{
  font-size: 14px;
  font-weight: bold;
  padding-left: 0;
  padding-right: 10px;
  text-align: right;
}
.yzg-title .comment-submit a{
  color:#fff;
}
.comment-content{
  padding:54px 15px 0 15px;
  background:#fff;
}
.comment-content .comment-title{
  padding:10px 0;
}
.comment-content .weui-cells:before{
  border:none;
}
.comment-content .comment-title .default_pic{
  float: left;
  width: 40px;
}
.comment-content .comment-title .comment_score{
  padding-left:50px;
}
.comment-content .comment-title .comment_score #rating-star a{
  background: url(/static/images/star.png) no-repeat 0 0;
  display: inline-block;
  height: 23px;
  text-indent: -999em;
  width: 23px;
  outline: none;
}
.comment-content .comment-title .default_pic img{
  border-radius:50%;
  width:100%;
}
.comment-content .comment-text .comment_input{
  width: 100%;
  height: 150px;
  resize: none;
  border: 1px solid #eee;
  padding: 8px 5px;
  border-radius: 4px;
  vertical-align: middle;
}
.comment-content .comment-pic{
  border-bottom:1px solid #ddd;
  margin-top: 0;
  font-size:14px;
}
.comment-content .comment-pic .weui-cell{
  padding:10px 0;
}
.comment-content .comment-pic ul{
  margin-bottom:0;
}
.comment-content .comment-pic .pic-box{
  padding:10px 0;
}
.comment-content .comment-pic .pic-box .pic-cells{
  margin-bottom:0;
}
.comment-content .comment-pic .up-load_pic{
  display:inline-block;
  border: 1px solid #ccc;
  font-size: 35px;
  color: #ccc;
  width: 60px;
  height: 60px;
  line-height:60px;
  text-align:center;
  margin-right:5px;
}
.comment-content .comment-pic .showTips{
  color: #aaa;
  margin-top: 4px;
  font-size:14px;
}
.comment-content .comment-way .comment-way_checkbox{
  margin-top:0;
  font-size: 14px;
}
.comment-content .comment-way .weui-cells:before,.comment-content .comment-way .weui-cells:after{
  border:none;
}
.comment-content .comment-way .comment-way_label{
  padding:10px 0;
}
</style>
