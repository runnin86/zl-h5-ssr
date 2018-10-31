<template>
	<div>
		<div class="row nav-center">
        <div class="col-xs-2 backBtn">
        	 <a href="javascript:history.back(-1)"><i class="iconfont-yzg icon-yzg-back"></i></a>
        </div>
        <div  class="col-xs-8 loginTitle">提交订单成功</div>
  			<div class="col-xs-2">				
			  </div>
    </div>

    <div class="row mainContent">
      	<div class="receiverInfor payment">
        		<p class="title_p">支持以下支付平台付款</p>
        		<ul>
          			<li style="position: relative">
            				<label>
                        <input type="radio" name="paymentSel" value="alipay" checked="true" style="opacity:0"/>支付宝支付
                    </label>
        				    <i class="iconfont-yzg icon-yzg-duihao selectSign"></i>
          			</li>
        		</ul>
      	</div>
      	<div class="orderInfor">
        		<table>
          			<tr>
          				  <td>订单号：{{orderNumber}}</td>
          			</tr>
          			<tr>
          				  <td>订单总额：￥{{orderTotal}}元</td>
          			</tr>
          			<tr>
          				  <td>还需支付：￥{{otherPay}}元</td>
          			</tr>
          			<tr>
          				  <td><a href="#">查看详细信息</a></td>
          			</tr>
        		</table>
      	</div>
      	<div class="orderInfor totalMoney">
      		  <p>总金额：<span>￥{{totalMoney}}元</span></p>
      	</div>
      	<div class="placeOrder">
      		  <input type="submit" value="立即支付" class="btn btn-danger loginBtn"/>
      	</div>
    </div>
	</div>
</template>

<style>
@import '/static/style/orderfill.css';
body{ /*background: #eee;*/ color:#3a3a3a; }
p{ margin:0; }
.mainContent{ margin-top:44px;}
.mainContent table{ width:100%; }
.receiverInfor,.goodsDetail,.orderAccount,.fillNotice,.orderInfor{ background: #fff; padding:15px; margin-top:10px;}
.receiverInfor{ background:url(/static/images/icon_shoppingcat_mailer.png) no-repeat top center #fff; overflow:hidden; position:relative; }
.receiverInfor:after{ position:absolute; content:""; background: url(/static/images/icon_shoppingcat_mailer.png) no-repeat bottom center; height:4px; width:100%; bottom:1px; }
.title_p{ border-bottom:1px solid #eee; color:#3a3a3a; padding-bottom: 10px}
.inforShow td{ line-height: 28px; }
.lastTd{ width:30px; }
.redColor{ color:#d6244f; }
.imgDetails{ width:90px; }
.subDetails p{ line-height: 1.8;}
.imgDetails img{ width:80px; border:1px solid #eee; }
.goodsQuantity{ color:#aaa; }
.orderAccount table td{ text-align: right; line-height: 28px; color:#777; }
.fillNotice p{ color:#e4663a; }
.placeOrder{ padding:20px; }
.placeOrder .loginBtn{ height:38px; }
.goodsDetail table td{ padding:4px 0 7px; border-bottom:1px solid #eee;}

/*地址修改信息*/
.addressDetails h6{ font-weight: bold; }
.addFillIn tr td{ padding-bottom:10px; }
.addFillIn tr td:first-child{ width:160px; text-align: right; }
.addFillIn input{ width:70%; }
/*过渡效果*/
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .0s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-active {
  transform: translateY(10px);
  opacity: 0;
}

/*提交订单成功页面*/
.orderInfor table td{ padding:5px 0; }
.orderInfor a{ color:#d6244f; }
.payment ul{ margin:0; }
.payment ul li{ height:34px; line-height: 40px; }
.selectSign{ color:#2ecc71; position:absolute; right:15px; top:0}
.totalMoney span{ font-size:18px; color:#d6244f; font-weight: bold;}
</style>

<script>
export default {
  data () {
    return {
      orderNumber: 'y149041201496',  // 订单号
      orderTotal: '169.00',  // 订单总额
      otherPay: '169.00',    // 还需支付
      totalMoney: '169.00'   // 总金额
    }
  },
  methods: {
  },
  init () {
    console.log('初始化')
    // this.totalPrice()
  }
}
</script>
