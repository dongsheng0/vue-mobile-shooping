

<template>
  <!-- 提交订单-景区 -->
  <div>
    <div class="order">
      <ticket :ticket="details" />
      <div class="left-bar">使用日期</div>
      <div class="date">
        <van-row type="flex" justify="space-between">
          <van-col span="6" v-for="(item, i) in details.priceAndStock" :key="i">
            <div
              class="date-btn"
              :class="{'active': activeDate==i? true: false, 'disabled':   item.stock_num== '0'? true: false}"
              @click="handelDatetime(item,i)"
            >
              <p>{{item.dateFromNow}}{{item.date}}</p>
              <p>{{item.price}}元</p>
            </div>
          </van-col>
          <van-col span="6" @click="handelDatetimePicker">
            <div class="date-btn date-btn-last" :class="{'active': datetimePicker? true: false}">
              <p>{{datetimePicker? datetimePicker : '更多日期'}}</p>
            </div>
          </van-col>
        </van-row>
      </div>
      <div class="left-bar">购买数量</div>
      <div class="order-num">
        <van-stepper
          v-model="creatOrderForm.buyNum"
          :max="details.maxPerOrder"
          integer
          input-width="60px"
          @change="changeOrderNum"
        />
        <div class="tips">
          <p v-for="(item, i) in details.useRules" :key="i">{{item}}</p>
        </div>
      </div>
      <div class="left-bar">预订人信息</div>
      <div class="order-userinfo">
        <div class="field-label">联系人</div>
        <van-field v-model="creatOrderForm.fillInfo.name" placeholder="请输入用户名" />
        <div class="field-label">手机号</div>
        <van-field v-model="creatOrderForm.fillInfo.mobile" placeholder="请输入接收信息的手机号" />
        <div class="field-label">证件类型</div>
        <select-picker placeholder="请选择证件类型" v-model="cardType" :columns="cardTypeOptions" />
        <div class="field-label">证件号</div>
        <van-field v-model="creatOrderForm.fillInfo.cardNo" placeholder="请输入证件号" />
        <div class="field-label">备注信息</div>
        <van-field type="textarea" rows="1" autosize placeholder="请输入备注信息" />
      </div>
      <!-- 提交订单 -->
      <div class="save-order">
        <van-row type="flex" justify="space-between" align="center">
          <van-col span="6" class>￥{{allPrice}}</van-col>
          <van-col span="18" class="save-order-btn">
            <span @click="saveOrder">提交订单</span>
          </van-col>
        </van-row>
      </div>
      <!-- 提交订单 end-->
      <van-popup v-model="showDatetimePicker" position="bottom">
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          :min-date="minDate"
          @cancel="showDatetimePicker = !showDatetimePicker"
          @confirm="onConfirmDatetimePicker"
        />
      </van-popup>
    </div>
  </div>
</template>

<script>
import serverHttp from '../../../assets/js/api'
import selectPicker from '../../../components/common/selectpicker'
import ticket from "../../../components/detail/ticket";
import WXPay from '../../../assets/js/wxpay'
import moment from 'moment'
export default {
  data () {
    return {
      activeDate: -1,
      unitPrice: '', // 单价
      showDatetimePicker: false,
      datetimePicker: '', // 更多日期
      minDate: new Date(new Date().getTime() + 3 * 86400000),
      currentDate: new Date(new Date().getTime() + 3 * 86400000),
      detailId: this.$route.params.id,
      details: {},
      // 提交数据
      creatOrderForm: {
        ticketId: +this.$route.params.id,	// 是	int	门票ID
        preorderDate: '', 	// 是	int	预定日期 yyyyMMdd格式
        buyNum: 1, //	是	int	购买数量
        fillInfo: {
          "name": "", //姓名
          "mobile": '', //手机号
          "cardType": '',
          "cardNo": "" //证件号
        }
      },
      // 下拉选择数据
      cardType: { text: '身份证', type: 0 },
      cardTypeOptions: [
        { text: '身份证', type: 0 },
        { text: '台胞证', type: 1 },
        { text: '港澳通行证', type: 2 },
        { text: '护照', type: 3 },
      ]
    }
  },
  computed: {
    // 总价
    allPrice () {
      return this.creatOrderForm.buyNum * this.unitPrice
    }
  },
  components: {
    selectPicker,
    ticket
  },
  mounted () {
    this.preorder()
  },
  methods: {
    // 提交订单
    saveOrder () {
      // creatOrderForm
      // infoRules": { //必填信息规则
      //       "needAllGuestInfo": false, //是否需要所有游客的信息
      //       "checkName": true, //填写姓名
      //       "checkMobile": true, //填写手机号
      //       "checkSfz": true, //填写身份证号
      //       "checkTbz": false, //填写台胞证
      //       "checkGatxz": false, //填写港澳通行证
      //       "checkHz": false//填写护照
      //   }
      this.creatOrderForm.fillInfo.cardType = this.cardType.type
      if (!this.creatOrderForm.preorderDate) {
        this.$toast('请选择日期')
        return
      } else if (!this.creatOrderForm.fillInfo.name) {
        this.$toast('请填写姓名')
        return
      } else if (!this.creatOrderForm.fillInfo.mobile) {
        this.$toast('请填写手机号')
        return
      } else {
        if (this.creatOrderForm.fillInfo.cardType == 0 && !this.creatOrderForm.fillInfo.cardNo) {
          this.$toast('请填写身份证号')
        } else {
          this.creatOrder()
          console.log('提价')
        }
      }
    },
    // 支付
    creatOrder () {
      let data = Object.assign({}, this.creatOrderForm)
      data.fillInfo = JSON.stringify([data.fillInfo])
      console.log(data)
      serverHttp.scenicSpotsCreateOrderApi(data).then(res => {
        WXPay(res.rs.orderNo)
        // orderNo: "S-190906-10"
      })
      //   let backH5hash = window.location.hash.substring(1)
      // let path = '/pages/login/login'
      // wx.miniProgram.navigateTo({
      //   url: `${path}?backH5hash=${backH5hash}`
      // });
    },
    // 点击更多日期
    handelDatetimePicker () {
      this.showDatetimePicker = true
    },
    // 选择按钮-今天，明天，后天
    handelDatetime (item, i) {
      if (item.stock_num == 0) {
        this.$toast('当天暂无库存，请选择其它日期')
      } else {
        this.activeDate = i
        this.creatOrderForm.preorderDate = item.stock_date
        this.datetimePicker = ''
        this.unitPrice = item.price
      }
    },
    // 更多日期-选择日期-确定
    async onConfirmDatetimePicker (value) {
      this.showDatetimePicker = !this.showDatetimePicker
      this.datetimePicker = this.creatOrderForm.preorderDate = moment(value).format('MM-DD')
      this.activeDate = -1
      await this.getPriceAndStock(moment(value).format('YYYYMMDD'))

    },
    getPriceAndStock (startDay) {
      serverHttp.scenicGetPriceAndStockApi({ ticketId: this.detailId, startDay }).then(res => {
        this.unitPrice = res.rs[0].price
      })
    },
    // 数量改变
    changeOrderNum () {

    },
    // 获取订单详情
    preorder () {
      serverHttp.scenicSpotsPreorderApi({ id: parseInt(this.detailId) }).then(res => {
        this.details = res.rs
        this.details.type = 'scenic'
        let dateName = ['今天', '明天', '后天']
        this.details.priceAndStock.forEach((item, i) => {
          item.dateFromNow = dateName[i]
          // item.date = `${moment(item.stock_date, "YYYYMMDD").get('month') + 1}/${moment(item.stock_date, "YYYYMMDD").get('day')}`
        });
      })
    },
  }
}
</script>
<style lang="less" scoped>
@import "../../../assets/style/global";
.order {
  .date {
    color: #424242;
    margin: 0.5rem 0;

    &-btn {
      margin-left: 10px;
      padding: 10px 0;
      display: block;
      line-height: 18px;
      text-align: center;
      box-shadow: 0px 6px 12px 0px rgba(0, 0, 0, 0.08);
      border-radius: 13px;
      background: #fff;
      &.active {
        color: #fff;
        background: linear-gradient(
          -90deg,
          rgba(254, 167, 99, 0.5) 0%,
          rgba(242, 111, 84, 1) 100%
        );
      }
      &.disabled {
        background: #555;
        color: #fff;
      }
    }
    &-btn-last {
      border-radius: 13px 0 0 13px;
      height: 100%;
      box-sizing: border-box;
      line-height: 36px;
      &.active {
        color: #fff;
        background: linear-gradient(
          -90deg,
          rgba(254, 167, 99, 0.5) 0%,
          rgba(242, 111, 84, 1) 100%
        );
      }
    }
  }
  .tips {
    text-align: left;
    padding-bottom: 5px;
    font-size: 12px;
    padding-left: 15px;
    p {
      color: rgba(254, 163, 98, 1);
    }
  }
}
</style>