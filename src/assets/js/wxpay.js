import serverHttp from './api'

const WXPay = (orderNo) => {
  wx.miniProgram.getEnv(function (res) {
    if (res.miniprogram) {
      serverHttp({
        orderNo
      }).then(result => {
        if (result) {
          let {
            timeStamp,
            paySign,
            signType,
            nonceStr
          } = result.rs
          let params = `?timestamp=${timeStamp}&nonceStr=${nonceStr}&package=${result.rs.package}&signType=${signType}&paySign=${paySign}&orderNo=${orderNo}`
          let path = '/page/wxpay/wxpay' + params;
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