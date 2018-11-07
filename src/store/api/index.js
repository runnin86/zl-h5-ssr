import axios from 'axios'

export default {
  // 获取购物车数量
  getCartNum(cb) {
    if (window.localStorage.getItem('zlUser')) {
      axios.get('cart/cartList', {
        headers: {
          'x-token': window.localStorage.getItem('zlToken')
        }
      }).then(({data: {code, data, msg}}) => {
        // console.log(data)
        if (code === 1) {
          // 获取购物车数据,回调给调用者
          cb(data)
        } else {
          cb(null)
        }
      }).catch((e) => {
        console.error('获取购物车失败:' + e)
      })
    }
  },
  // 获取轮播图数据
  getSlider(cb) {
    axios.post('index/sliderList').then(({data: {code, data, msg}}) => {
      if (code === 1) {
        // 获取数据,回调给调用者
        cb(data)
      } else {
        cb(null)
      }
    }).catch((e) => {
      console.error('获取轮播图数据失败:' + e)
    })
  }
}
