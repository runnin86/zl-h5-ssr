<template>
<div>
  <!-- <div class="row nav-center">
    <div class="col-xs-2 backBtn">
      <a href="javascript:history.back(-1)">
        <i class="iconfont-yzg icon-yzg-back"></i>
      </a>
    </div>
    <div class="col-xs-8 shop-name">
      <span>
        {{
          oneBuyType==='checkout'
          ?
          '填写订单':
          (oneBuyType==='submit' ? '提交订单成功' : '')}}
      </span>
    </div>
    <div class="col-xs-2"></div>
  </div> -->

  <div class="row mainContent" v-if="oneBuyType==='checkout'&&cartList.length>0">
    <div class="receiverInfor">
      <p class="title_p">收货人信息</p>
      <table class="inforShow" v-if="!isEditAddress&&addressList[choiceIndex]">
        <tr>
          <td class="td">
            <span>
              {{addressList[choiceIndex].consignee}} &nbsp;&nbsp;{{addressList[choiceIndex].mobile}}
            </span>
          </td>
          <td rowspan="5" class="lastTd">
            <a @click="editInfor" style="width:auto;">
              <i class="iconfont-yzg icon-yzg-chevron"></i>
            </a>
          </td>
        </tr>
        <tr>
          <td class="td">
            <span id="region_show">
              {{addressList[choiceIndex].country}} -
              {{addressList[choiceIndex].province}} -
              {{addressList[choiceIndex].city}} -
              {{addressList[choiceIndex].district}}
            </span>
          </td>
        </tr>
        <tr>
          <td class="td">
            <span id="address_show">{{addressList[choiceIndex].address}}</span>
          </td>
        </tr>
      </table>
      <div class="addressDetails" v-if="isEditAddress||addressList.length===0">
        <h6>请选择您的收货地址</h6>
        <div v-for="(item, itemIndex) in addressList">
          <div class="radio">
            <div>
              <label>
  					    <input type="radio" :value="itemIndex" v-model="choiceIndex"
                  @click="checkAddress(itemIndex)">{{item.consignee}}
    					</label>
              <a @click="deleteAdd(item.id)">[删除地址]</a>
            </div>
          </div>
          <table class="addFillIn" v-if="choiceIndex === itemIndex">
            <tr>
              <td>收 &nbsp;货 人：</td>
              <td>
                <input type="text" v-model="item.consignee" disabled="disabled" class="form-control" />
              </td>
            </tr>
            <tr>
              <td>省 &nbsp;市 区：</td>
              <td>
                <input type="text" disabled="disabled" class="form-control"
                  :value="item.province + ' ' + item.city + ' ' + item.district"/>
              </td>
            </tr>
            <tr>
              <td>详细地址：</td>
              <td>
                <input type="text" v-model="item.address" disabled="disabled" class="form-control" />
              </td>
            </tr>
            <tr>
              <td>手机号码：</td>
              <td>
                <input type="text" v-model="item.mobile" disabled="disabled" class="form-control" />
              </td>
            </tr>
          </table>
        </div>
        <div class="radio" v-if="addAddress">
          <label>
  					 <input type="radio" @click="addNewAddress">新增收货地址
  				</label>
        </div>
        <table class="addFillIn" v-if="choiceIndex=='add'">
          <tr>
            <td>*收 &nbsp;货 人：</td>
            <td>
              <input type="text" placeholder="请填写收货人信息" v-model="newAddName" class="form-control" />
            </td>
          </tr>
          <tr>
            <td>*省 市 区：</td>
            <td>
              <wv-city-picker title="居住地址" :location="location" @get-val="addressPick"></wv-city-picker>
            </td>
          </tr>
          <tr>
            <td>*详细地址：</td>
            <td>
              <input type="text" placeholder="请填写详细地址" v-model="newAddDetail" class="form-control" />
            </td>
          </tr>
          <tr>
            <td>*手机号码：</td>
            <td>
              <input type="tel" placeholder="请填写收货人手机号码" v-model="newAddTel" class="form-control" />
            </td>
          </tr>
        </table>
        <a @click="saveNext()" class="btn btn-danger">保存并下一步</a>
      </div>
    </div>

    <div class="goodsDetail">
      <p class="title_p">商品详情</p>
      <table>
        <tr v-for="good in cartList">
          <td class="imgDetails">
            <img :src="img_domain + good.img" />
          </td>
          <td class="subDetails">
            <p>{{good.pName}}</p>
            <p class="goodsQuantity">×{{good.num}}</p>
            <p class="redColor">¥{{good.price}}</p>
          </td>
        </tr>
      </table>
    </div>

    <!-- <div class="fillNotice">
      <p>注：跨境商品无法使用发票</p>
    </div> -->

    <div class="weui-cells">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <input class="weui-input" type="text"
            v-model="remarks" placeholder="选填: 给卖家留言(45字以内)"/>
          <a class="clear" style="margin-left: 83%;"
            :style="{display: remarks?'block':'none'}"
            @click="remarks=null"></a>
        </div>
      </div>
    </div>

    <div class="orderAccount">
      <p class="title_p">订单结算</p>
      <table>
        <tr>
          <td>商品总价：<span>￥{{totalPay}}</span></td>
        </tr>
        <tr v-if="shippingMoney>0">
          <td>运费：￥{{shippingMoney}}</td>
        </tr>
        <tr>
          <td>应付款金额：<span>￥{{totalPay + shippingMoney}}</span></td>
        </tr>
        <!-- <tr>
          <td class="redColor" style="text-align:right;">满99元包邮</td>
        </tr> -->
      </table>
    </div>

    <div class="placeOrder orderFillSub">
      <p>应付金额：<span>￥{{totalPay + shippingMoney}}</span></p>
      <input type="button" value="提交订单" class="btn btn-danger loginBtn" @click="submitting()" />
    </div>
  </div>

  <div class="row mainContent" v-if="oneBuyType==='submit'&&orderInfo">
    <!--提交订单成功-->
    <!-- <div class="receiverInfor payment">
      <p class="title_p">支持以下支付平台付款</p>
      <ul>
        <li style="position: relative">
          <label>
            <input type="radio" name="paymentSel" value="alipay" checked="true" style="opacity:0"/>微信支付
          </label>
          <i class="iconfont-yzg icon-yzg-zhifufangshi-weixinzhifu selectSign"></i>
        </li>
      </ul>
    </div> -->
    <div class="orderInfor" v-if="orderInfo">
      <table>
        <tr>
          <td>订单号：{{orderInfo.orderNo}}</td>
        </tr>
        <tr>
          <td>订单总额：{{orderInfo.totalPrice + orderInfo.shipmentMoney}}</td>
        </tr>
        <!-- <tr>
          <td>已优惠：￥{{item.order.offset}}</td>
        </tr> -->
        <tr>
          <td>待支付：{{orderInfo.totalPrice + orderInfo.shipmentMoney}}</td>
        </tr>
        <tr>
          <td>
            <router-link :to="{ name: 'ShopOrdDet',path: '/shopOrdDet', query: { orderNo: orderInfo.orderNo}}">
              <span class="redColor">查看详细信息</span>
            </router-link>
          </td>
        </tr>
      </table>
    </div>
    <div class="orderInfor totalMoney" v-if="orderInfo">
      <p>
        总&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;价：
        &nbsp;&nbsp;<span>{{orderInfo.totalPrice + orderInfo.shipmentMoney}}</span>
      </p>
      <p v-if="discount>0&&discountDesc">
        {{discountDesc}}：&nbsp;&nbsp;<span>- {{discount}}</span>
      </p>
      <p>应付金额：&nbsp;&nbsp;<span>¥ {{totalPay}}</span></p>
    </div>
    <div>
      <wv-radio title="选择支付方式" :fnName="'radioPay'"
        v-model="payType" :options="payOptions" class="fillTitle"></wv-radio>
    </div>
    <div class="placeOrder">
      <a @click="doPay" class="weui-btn weui-btn_primary">{{payType}}</a>
    </div>
  </div>

  <div v-if="cartList.length===0" class="errWarning">
    <div>
        <i class="iconfont-yzg icon-yzg-information"></i>
        <p>您的购物车中没有商品</p>
      <router-link :to = "{ path: 'category'}">
        随便逛逛
      </router-link>
    </div>
  </div>
  <div id="allmap"></div>
</div>
</template>

<script>
import $ from 'zepto'
import weui from 'weui.js'
import BMap from 'BMap'
import qs from 'qs'

let loading
// 配送范围(公里)
let distributionScope = 10
// 默认运费(元)
let shippingExpenses = 10

export default {
  activated() {
    loading = weui.loading('加载中')
    this.cartList = []
    this.payType = '微信支付'
    this.totalPay = this.brokerage = this.point = this.discount = 0
    this.orderInfo = this.discountDesc = null
    // 获取组件的事件通信
    this.$on('radioPay', function (v) {
      this.radioPay(v)
    })
    this.loadCart()
    // 获取账户
    this.getUseAccount()
    this.$store.commit('CHANGE_IS_INDEX', false)
    this.$parent.setTitle('填写订单')
  },
  data() {
    return {
      cartList: [],
      shippingMoney: 0,
      addressList: [],
      img_domain: 'http://img.zulibuy.com/images/',
      newAddName: '', // 新增收货人信息
      newAddProvince: '河北省-保定市-涞源县',
      newAddDetail: '',
      newAddTel: '',
      oneBuyType: 'checkout', // 购买类型
      choiceIndex: 0, // 地址选择状态  按照索引显示
      isEditAddress: false, // 是否编辑
      addAddress: true, // 是否显示新增按钮  当已经有新增时隐藏，默认只能添加一个新增地址
      remarks: '',
      // 提交订单成功页面
      orderInfo: null,
      location: {
        id: '130000 130600 130630',
        name: '河北省 保定市 涞源县'
      },
      totalPay: 0, // 微信支付金额
      brokerage: 0, // 佣金
      point: 0, // 积分
      discount: 0, // 抵扣数目
      discountDesc: null, // 抵扣说明
      payType: '微信支付',
      payOptions: [{
        label: '微 信',
        value: '微信支付'
      }, {
        label: '积 分',
        value: '积分支付',
        disabled: false
      }, {
        label: '佣 金',
        value: '佣金支付',
        disabled: false
      }]
    }
  },
  methods: {
    /*
     * 获取用户账户
     */
    getUseAccount (token) {
      this.$http.get('user/account', {
        headers: {
          'x-token': window.localStorage.getItem('zlToken')
        }
      }).then(({data: {code, data, msg}}) => {
        if (code === 1) {
          this.point = Number(data.point.replace(/,/gi, ''))
          this.brokerage = Number(data.brokerage.replace(/,/gi, ''))
          this.payOptions[1].label = '积 分(' + this.point + ')'
          this.payOptions[2].label = '佣 金(' + this.brokerage + ')'
        }
      }).catch((e) => {
        console.error('获取账户失败:' + e)
      })
    },
    addressPick(name, code) {
      name = name.split(' ')
      this.newAddProvince = name[0] + '-' + name[1] + '-' + name[2]
    },
    /*
     * 查询购物车信息
     */
    loadCart() {
      // 设置总金额和总数目为0
      this.totalPay = this.selectCounts = 0
      this.$http.get('/cart/cartList', {
        headers: {
          'x-token': window.localStorage.getItem('zlToken')
        }
      }).then(({data: {code, data, msg}}) => {
        // console.log(data)
        if (code === 1) {
          if (data.length > 0) {
            // 购物车有数据时去获取地址信息
            this.loadAddress()
          }
          // 计算总价和数量
          for (var i = 0; i < data.length; i++) {
            if (data[i].isCheck === 1) {
              this.cartList.push(data[i])
              this.totalPay += parseFloat(data[i].num) * parseFloat(data[i].price)
            }
          }
        } else {
          $.toast(msg, 'forbidden')
          console.warn('获取购物车失败:' + msg)
        }
        loading.hide()
      }).catch((e) => {
        console.error('获取购物车失败:' + e)
      })
    },
    radioPay(v) {
      // console.log(1, v, this.payType)
      // 初始化支付数目
      let orderPrice = this.orderInfo.totalPrice + this.orderInfo.shipmentMoney
      this.discount = 0
      if (v === '积分支付') {
        /*
         * 积分支付逻辑处理
         */
        this.discountDesc = '积分抵扣'
        let pointPay = parseInt(orderPrice / 1.1)
        if (this.point < pointPay) {
          weui.alert('积分不足', function() {
            this.payType = '微信支付'
            this.totalPay = orderPrice
          }.bind(this))
        } else {
          // 积分支付不允许组合支付
          this.discount = pointPay
          this.totalPay = 0
        }
      } else if (v === '佣金支付') {
        /*
         * 佣金支付逻辑处理
         */
        this.discountDesc = '佣金抵扣'
        if (this.brokerage === 0) {
          weui.alert('佣金不足', function() {
            this.payType = '微信支付'
            this.totalPay = orderPrice
          }.bind(this))
        } else if (this.brokerage >= orderPrice) {
          this.discount = orderPrice
          this.totalPay = 0
        } else if (this.brokerage < orderPrice) {
          // 佣金小于商品价格时,要组合支付
          this.discount = this.brokerage
          this.totalPay = orderPrice - this.brokerage
        }
      } else if (v === '微信支付') {
        /*
         * 微信支付时还原所有设置
         */
        this.discount = 0
        this.discountDesc = null
        this.totalPay = orderPrice
      }
    },
    /*
     * 查询用户地址信息
     */
    loadAddress() {
      this.$http.get('/user/addressList', {
        headers: {
          'x-token': window.localStorage.getItem('zlToken')
        }
      }).then(({data: {data, code, msg}}) => {
        // console.log(data)
        if (code === 1) {
          this.addressList = data.addressList
          if (data.addressList.length > 0) {
            this.baiduMapFuc(data.addressList[0])
          }
        } else {
          $.toast(msg, 'forbidden')
        }
      }, (response) => {
        console.log(response)
      })
    },
    // 添加新地址状态改变
    addNewAddress() {
      this.choiceIndex = 'add'
      this.location = {
        id: '130000 130600 130630',
        name: '河北省 保定市 涞源县'
      }
    },
    // 判断是否为编辑状态
    editInfor() {
      this.isEditAddress = true
      this.location.name = this.addressList[this.choiceIndex].province + ' ' +
        this.addressList[this.choiceIndex].city + ' ' +
        this.addressList[this.choiceIndex].district
    },
    checkAddress(i) {
      this.location.name = this.addressList[i].province + ' ' +
        this.addressList[i].city + ' ' +
        this.addressList[i].district
      // 去匹配距离
      this.baiduMapFuc(this.addressList[i])
    },
    // 保存并下一步
    saveNext() {
      var _this = this
      var validResult = ''
      validResult = this.dataValid(this.newAddName, this.newAddProvince, this.newAddDetail, this.newAddTel)
      if (validResult) {
        let saveParam = {
          pcd: this.newAddProvince,
          address: this.newAddDetail,
          consignee: this.newAddName,
          mobile: this.newAddTel
        }
        this.$http.post('/user/addAddress', qs.stringify(saveParam), {
          headers: {
            'x-token': window.localStorage.getItem('zlToken')
          }
        }).then(function({data: {data, code, msg}}) {
          if (code === 1) {
            _this.isEditAddress = false
            _this.choiceIndex = 0
            _this.loadAddress()
          } else {
            $.toast(msg, 'cancel')
          }
        }).catch(function(error) {
          console.log(error)
        })
      }
    },
    /*
     *地址删除操作
     */
    deleteAdd(objId) {
      weui.confirm('是否确认删除当前收货地址', () => {
        // 确认
        this.$http.delete('/user/delAddress', {
          params: {
            aid: objId
          },
          headers: {
            'x-token': window.localStorage.getItem('zlToken')
          }
        }).then(({data: {data, code, msg}}) => {
          if (code === 1) {
            // 重新获取数据
            this.loadAddress()
          } else {
            $.toast(msg, 'forbidden')
          }
        }).catch(function(error) {
          $.toast(error, 'forbidden')
          console.error('catch' + error)
        })
      }, () => {
        // 取消
      })
    },
    /*
     * 提交订单
     */
    submitting() {
      if (this.remarks.length > 45) {
        weui.alert('给卖家留言字数过长')
        return
      }
      if (this.addressList[this.choiceIndex]) {
        let orderParams = {
          aid: this.addressList[this.choiceIndex].id,
          shippingMoney: this.shippingMoney,
          remark: this.remarks
        }
        let zhis = this
        this.$http.post('/order/createOrder', qs.stringify(orderParams), {
          headers: {
            'x-token': window.localStorage.getItem('zlToken')
          }
        }).then(function({data: {data, code, msg}}) {
          if (code === 1) {
            console.log(data)
            zhis.oneBuyType = 'submit'
            zhis.orderInfo = data.info
            this.$parent.setTitle('提交订单成功')
          } else {
            weui.alert(msg)
            console.error('结算商品失败:' + msg)
          }
        }).catch(function(error) {
          console.log('catch' + error)
        })
      } else {
        weui.alert('请填写收货人信息')
      }
    },
    /*
     * 发起支付
     */
    doPay() {
      // 发送请求
      loading = weui.loading('加载中')
      let postData = {
        orderNo: this.orderInfo.orderNo,
        payType: this.payType
      }
      let zhis = this
      this.$http.post('order/orderPay', qs.stringify(postData), {
        headers: {
          'x-token': window.localStorage.getItem('zlToken')
        }
      }).then(({data: {data, code, msg}}) => {
        console.log(code, msg, data)
        if (code === 1) {
          if (data.weChatPrePay) {
            window.WeixinJSBridge.invoke('getBrandWCPayRequest', data.weChatPrePay.jsApiParameters,
            function(res) {
              // err_code,err_desc,err_msg
              if (res.err_msg === 'get_brand_wcpay_request:ok') {
                // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                $.toast('支付成功')
                setTimeout(() => {
                  zhis.$router.push({name: 'OrderList', query: {orderAct: 1}})
                }, 2000)
              } else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
                // 取消
                $.toast('用户取消支付', 'cancel')
              } else if (res.err_msg === 'get_brand_wcpay_request:fail') {
                // 支付失败
                $.toast(res.err_msg, 'forbidden')
              } else {
                weui.alert(!res.err_msg ? '支付回调错误,请刷新重试!' : res.err_msg)
              }
            })
          } else {
            $.toast(msg)
            setTimeout(() => {
              zhis.$router.push({name: 'OrderList', query: {orderAct: 1}})
            }, 2000)
          }
        } else {
          weui.alert(!msg ? '支付请求异常,请刷新重试!' : msg)
          console.error(msg)
        }
        loading.hide()
      }, (response) => {
        loading.hide()
        $.toast('服务器异常', 'forbidden')
        // error callback
        console.log(response)
      })
    },
    /*
     * 地址填写验证
     */
    dataValid(consignee, region, address, mobile) {
      if (consignee === '' || region === '' || address === '' || mobile === '') {
        weui.alert('请填写收货人信息')
        return false
      }
      if (!(/^1(3|4|5|7|8)\d{9}$/.test(mobile))) {
        weui.alert('手机号码填写不正确')
        return false
      }
      return true
    },
    /*
     * 百度地图方法
     */
    baiduMapFuc(to) {
      let zhis = this
      let toAddress = to.province
      if (to.city.indexOf('市辖区') === -1 && to.city.indexOf('县') === -1) {
        // 去除地址中的市辖区和县字段
        toAddress += to.city
      }
      toAddress += to.district
      // 计算两地的距离
      let map = new BMap.Map('allmap')
      map.centerAndZoom(new BMap.Point(114.720492, 39.341475), 12)
      // 河北省保定市涞源县广泉大街西神山村村委会
      let centerPoint = new BMap.Point(114.720492, 39.341475)
      // 获取目的地坐标
      let myGeo = new BMap.Geocoder()
      // 将地址解析结果显示在地图上,并调整地图视野
      myGeo.getPoint(toAddress, function(toPoint) {
        if (toPoint) {
          // 距离向上取整(四舍五入)distributionScope
          let distance = Math.ceil(map.getDistance(toPoint, centerPoint) / 1000)
          console.log(distance)
          if (distance > distributionScope) {
            weui.topTips('收货地址超出配送范围,默认收取' + shippingExpenses + '元快递费!')
            zhis.shippingMoney = shippingExpenses
          } else {
            zhis.shippingMoney = 0
          }
        } else {
          weui.alert('收货地址没有解析到结果<br/>默认收取' + shippingExpenses + '元快递费')
          zhis.shippingMoney = shippingExpenses
        }
      }, '保定市')
    }
  }
}
</script>

<style>
.weui-cells__title {
  background: #fff;
  height: 40px;
  line-height: 40px;
  padding: 0 10px;
  border-bottom: 1px solid #eee;
  color: #999;
  margin-top:10px;
  margin-bottom: -0.1em;
}
.weui-check__label {
  padding-left: 22px;
}
</style>
<style scoped>
@import '/static/style/orderfill.css';
body {
  /*background: #eee;*/
  color: #3a3a3a;
  font-size: 14px
}
.addFillIn .cell_box{ width:80%; }
.orderAccount table td span{ width:70px; }
.addNewPng{ text-align: center; margin-left: -0.8547rem}
.addNewPng img{ width: 1.88rem; margin-top: 0.512rem }
.addNewPng p{color: #333; font-size: 0.598rem; font-weight: bold; font-family: '微软雅黑'; padding-bottom: 0.5rem}
.orderFillSub{ position: fixed; max-width: 640px; min-width: 320px; width: 100%; bottom: 0; padding: 0; height: 2.1rem; background: #fff; text-align: left; padding-left: 0.8547rem; line-height: 2.1rem; font-size: 0.68376rem; border-top: 1px solid #f8f8f8}
.orderFillSub p span{color: #ed3366}
.orderFillSub input{position: absolute; right: 0; width: 5rem; height: 2.1rem; line-height: 2.1rem; bottom: 0; padding: 0; border: none; border-radius: 0; }
/* 样式冲突 */
.receiverInfor{ background: url(/static/images/icon_shoppingcat_mailer.png) no-repeat top center #fff; padding: 0.8547rem 0 0.8547rem 0.8547rem;}
.addFillIn input {
  width: 80%;
}
.addFillIn tr td:first-child {
  width: 85px;
  text-align: right;
}
.receiverInfor:after {
  position: absolute;
  content: "";
  background: url(/static/images/icon_shoppingcat_mailer.png) no-repeat bottom center;
  height: 4px;
  width: 100%;
  bottom: 1px; left: 0
}
.receiverInfor, .goodsDetail, .orderAccount, .fillNotice, .auctionAccount{ padding: 0.5rem 0 0.2rem 0.8547rem }
.orderAccount .remark{
  flex: 1;outline: none;border: none;text-align: right;
}
.addFillIn tr td{border-bottom: 1px solid #eee}
.addFillIn tr td input{border: none; box-shadow: none; outline: none}
.addFillIn tr td[data-v-36b56dfa]:first-child{ color: #666 }

.auctionAccount {background: #fff;margin-top: 10px;}
.auctionAccount table{width: 100%;}
.auctionAccount table td span{float: right;margin-right: 30px;}
</style>
