/*eslint-disable */
import wx from 'wx'
// import weui from 'weui.js'
import axios from 'axios'

export default {
  /**
	 * 存储localStorage
	 */
  setStore(name, content) {
    if (!name) return
    if (typeof content !== 'string') {
      content = JSON.stringify(content)
    }
    window.localStorage.setItem(name, content)
  },

  /**
	 * 获取localStorage
	 */
  getStore(name) {
    if (!name) return
    return window.localStorage.getItem(name)
  },

  /**
	 * 删除localStorage
	 */
  removeStore(name) {
    if (!name) return
    window.localStorage.removeItem(name)
  },

  getQueryString(str, name) {
		var reg = new RegExp('(^|&)'+ name + '=([^&]*)(&|$)')
		var r = str.substr(1).match(reg)
		if(r !== null) {
			return  unescape(r[2])
		} else {
			return null
		}
	},

  /**
	 * 判断微信浏览器
	 */
	is_weixin() {
		let ua = window.navigator.userAgent.toLowerCase()
		if (ua.indexOf('micromessenger') !== -1) {
			return true
		} else {
			return false
		}
	},

  /**
	 * 重新授权
	 */
	reOauth() {
		if (window.localStorage.getItem('zlUser') !== null) {
			// 清除用户对象
			window.localStorage.removeItem('zlUser')
			setTimeout(function () {
				location.reload()
			}, 200)
		}
	},

	/**
	 * 微信jssdk分享初始化
	 */
  wxShareReady({title, desc, imgUrl, link}, success, cancel, fail) {
    if (link.indexOf('/#/') !== -1) {
			// 解决微信支付多路径问题,分享出去的hash地址必须在#前加？
			let sLink = link.split('/#/')
			link = sLink[0] + '/?#/' + (sLink[1] ? sLink[1] : '')
		}
    let u = navigator.userAgent
    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 // android终端
    let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
    // 默认使用
    let url = location.href.split('#')[0]
    // console.log(title, desc, imgUrl, link)
    // console.log('android->' + isAndroid, 'ios->' + isiOS)
    // 去后台获取签名等信息
    axios.get('weChat/wxJssdkConfig', {
      params: {
        reqUrl: url
      }
    }).then(({data: {data, code, msg}}) => {
      // weui.topTips(data.signature)
      if (code === 1) {
        // 微信jssdk配置
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出
          appId: data.appId, // 必填，公众号的唯一标识
          timestamp: data.timestamp, // 必填，生成签名的时间戳
          nonceStr: data.nonceStr, // 必填，生成签名的随机串
          signature: data.signature, // 必填，签名，见附录1
          jsApiList: [ // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'onMenuShareQZone',
            'chooseImage',
            'uploadImage',
            'chooseWXPay'
          ],
          success: function (res) {
						console.log("检测通过：", JSON.stringify(res))
					},
					fail: function (res) {
						console.log("检测失败：", JSON.stringify(res))
					},
					complete: function (res) {
						console.log("检测结束：", res)
					},
					error: function (e) {
						console.error("检查错误:", e)
					}
        })
        // 微信jssdk初始化
        wx.ready(function() {
          // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
          wx.onMenuShareTimeline({
            title: title,
            link: link,
            imgUrl: imgUrl,
            trigger: function(res) {
              // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
            },
            success: success,
            cancel: cancel,
            fail: fail
          })
          // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
          wx.onMenuShareAppMessage({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: link, // 分享链接
            imgUrl: imgUrl, // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: success,
            cancel: cancel,
            fail: fail
          })
        })
        // 微信jssdk错误
        wx.error(function(res) {
          console.error('微信jssdk错误', res)
        })
      } else {
        console.error('jssdk配置失败:' + msg)
        // weui.alert('jssdk配置失败')
      }
    }, (response) => {
      // weui.alert('请求异常!!!')
      console.error(response)
    })
  }
}
/*eslint-enable */
