<style lang="less" scoped>
@import "../../../assets/style/global";
</style>
<template>
  <!-- 提交订单-商品 -->
  <div class="order">
    <ticket :ticket="details" />
    <div class="left-bar">购买数量</div>
    <div class="order-num">
      <van-stepper v-model="creatOrderForm.buyNum" integer input-width="60px" @change="changeOrderNum" />
    </div>
    <div class="left-bar">快递信息</div>
    <div class="order-userinfo">
      <div class="field-label">收件人</div>
      <van-field v-model="creatOrderForm.name" placeholder="请输入住人姓名" />
      <div class="field-label">手机号</div>
      <van-field v-model="creatOrderForm.mobile" placeholder="请输入接收信息的手机号" />
      <div class="field-label">收货地址</div>
      <van-field v-model="creatOrderForm.address" placeholder="请输入收货地址" />
      <div class="field-label">备注信息</div>
      <van-field v-model="value" type="textarea" rows="1" autosize placeholder="请输入备注信息" />
    </div>
    <!-- 提交订单 -->
    <div class="save-order">
      <van-row type="flex" justify="space-between" align="center">
        <van-col span="6" class>{{allPrice | price}}</van-col>
        <van-col span="18" class="save-order-btn">
          <span @click="saveOrder">提交订单</span>
        </van-col>
      </van-row>
    </div>
    <!-- 提交订单 -->
  </div>
</template>

<script>
import serverHttp from '../../../assets/js/api'
import ticket from "../../../components/detail/ticket";
import WXPay from '../../../assets/js/wxpay'

export default {
  data () {
    return {
      unitPrice: this.$route.query.unitPrice,
      details: {},
      detailId: this.$route.params.id, // 商品规格id
      value: ' ',
      creatOrderForm: {
        goodsSpecId: this.$route.params.id,	// 是	int	商品规格ID
        buyNum: this.$route.query.buyNum, //	是	int	购买数量
        name: "", //姓名
        mobile: '', //手机号
        address: '', //地址
      },
    }
  },
  computed: {
    // 总价
    allPrice () {
      return this.creatOrderForm.buyNum * this.unitPrice
    }
  },
  components: {
    ticket
  },
  mounted () {
    this.preorder()
  },
  methods: {
    // 提交订单
    saveOrder () {
      if (!this.creatOrderForm.name) {
        this.$toast('请填写收件人姓名')
      } else if (!this.creatOrderForm.mobile) {
        this.$toast('请填写手机号')
      } else {
        this.creatOrder()
        // console.log('提交');
      }
    },
    creatOrder () {
      let data = Object.assign({}, this.creatOrderForm)
      console.log(data)
      serverHttp.goodsCreateOrderApi(data).then(res => {
        WXPay(res.rs.orderNo)
        // orderNo: "S-190906-10"
        // orderNo: "G-190906-12"
      })
    },
    // 数量改变
    changeOrderNum (e) {
      console.log(e)
    },
    // 获取订单详情
    preorder () {
      serverHttp.goodsPreorderApi({ id: this.detailId }).then(res => {
        let result = res.rs
        this.details = {
          name: result.goodsName,
          type: 'goods',
          picUrl: result.picUrl
        }
        console.log(this.details);
      })
    },
  }
}
</script>