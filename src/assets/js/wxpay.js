import serverHttp from './api'

// 微信支付，需要先进入微信页面
const WXPay = (orderNo) => {
  wx.miniProgram.getEnv(function (res) {
    if (res.miniprogram) {
      serverHttp.userPayApi({
        orderNo
      }).then(result => {
        if (result) {
          let {
            timeStamp,
            paySign,
            signType,
            nonceStr
          } = result.rs
          let params = `?timestamp=${encodeURIComponent(timeStamp)}&nonceStr=${encodeURIComponent(nonceStr)}&package=${encodeURIComponent(result.rs.package)}&signType=${encodeURIComponent(signType)}&paySign=${encodeURIComponent(paySign)}&orderNo=${encodeURIComponent(orderNo)}`
          let path = '/pages/wxpay/wxpay' + params;
          //通过JSSDK的api使小程序跳转到指定的小程序页面
          wx.miniProgram.navigateTo({
            url: path
          });
        }
      })
    }
  })


}
export default WXPay