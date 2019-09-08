import serverHttp from './api'

const WXPay = (orderNo) => {
  wx.miniProgram.getEnv(function (res) {
    alert('判断微信环境' + res.miniprogram)
    if (res.miniprogram) {
      serverHttp.userPayApi({
        orderNo
      }).then(result => {
        alert('获取微信支付所需参数成功')

        if (result) {
          let {
            timeStamp,
            paySign,
            signType,
            nonceStr
          } = result.rs
          let params = `?timestamp=${encodeURIComponent(timeStamp)}&nonceStr=${encodeURIComponent(nonceStr)}&package=${encodeURIComponent(result.rs.package)}&signType=${encodeURIComponent(signType)}&paySign=${encodeURIComponent(paySign)}&orderNo=${encodeURIComponent(orderNo)}`
          let path = '/pages/wxpay/wxpay' + params;
          alert('跳转小程序路径' + path)
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