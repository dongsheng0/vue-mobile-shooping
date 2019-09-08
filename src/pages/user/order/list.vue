
<template>
  <div class="order-list">
    <!-- <headerNav title="我的订单" /> -->
    <tabs :tabs="tabs" class="tab" :active="tabActive" @click="tabClick"></tabs>
    <div class="border-split"></div>
    <div v-for="item in orderList" :key="item.id">
      <product-card :product="item">
        <template slot="footer">
          <!-- 未支付 -->
          <van-row type="flex" justify="space-between" v-if="tabActive == 0">
            <van-col span="12" class="bottom-content">
              <span class="point active" v-if="item.dead_line">
                请在
                <van-count-down :time="item.dead_line | countDown" />内付款
              </span>
            </van-col>
            <van-col span="12">
              <!-- <span class="order-cancel">取消</span> -->
              <span class="order-pay" @click="pay(item.order_no)">支付</span>
            </van-col>
          </van-row>
          <!-- 未支付 end -->
          <van-row type="flex" justify="end" v-if="tabActive == 1">
            <van-col>
              <span class="order-cancel" v-if="item.pay_status == 1" @click="cancelOrder(item.order_no)">退款</span>
              <span class="order-confirm" v-if="item.shipping_status == 1" @click="confirmReceipt(item.order_no)">确认收货</span>
            </van-col>
          </van-row>
        </template>
      </product-card>
    </div>
  </div>
</template>

<script>
import tabs from '../../../components/common/tabs'
import serverHttp from '../../../assets/js/api'
import WXPay from '../../../assets/js/wxpay'
  // "shipping_status": null, //0待发货1已发货2已收货
  // "pay_status": 0, //0未支付1已支付2已取消3已完成4已退款
export default {
  components: {
    tabs
  },
  data () {
    return {
      tabActive: 0,
      // 0待支付1待使用3已完成
      tabs: [
        { title: '未支付', type: 0, name: '0' },
        { title: '待使用', type: 1, name: '1' },
        { title: '已完成', type: 2, name: '2' }
      ],
      orderList: [],
      orderListDefault: [
      ]
    }
  },
  methods: {
    // 确认收货
    confirmReceipt(orderNo){
      serverHttp.userConfirmReceiptApi({ orderNo}).then(res=> {
        this.$toast(res.msg)
      })
    },
    // 取消支付
    cancelOrder(orderNo){
      serverHttp.userCancelOrderApi({ orderNo}).then(res=> {
        this.$toast(res.msg)
      })
    },
    // 点击支付
    pay (id) {
      alert('点击支付按钮')
      WXPay(id)
    },
    tabClick (e) {
      this.tabActive = e.type
      this.getOrderLists(e.type)
      // this.orderList = this.orderListDefault.filter(i=> i.status==e.type)
    },
    getOrderLists (state, pageNum = 1) {
      let that = this
      serverHttp.userOrdersApi({
        state,
        pageNum
      }).then(res => {
        let result = res.rs
        that.orderList = result.list
        that.orderList.forEach(item => {
          item.name = item.title
          item.price = item.order_money
          item.address = " "
          item.picUrl = item.pic_url
        })
        // {
        // "order_no": "G-190906-12", //订单号
        // "order_date": "2019-09-06 17:13:23",//订单日期 
        // "pay_status": 0, //0未支付1已支付2已取消3已完成4已退款
        // "order_money": 0.01, //订单金额
        // "can_exchange": 0, //0不可退款1可以退款
        // "target_id": 1,
        // "title": "大山楂——红色", //订单标题
        // "pic_url": "http://storage.roztop.com/goods/2019-09-02/1567405500366.jpg", //订单图片
        // "order_type": 2, //0景区订单1酒店订单2商品订单
        // "shipping_status": null, //0待发货1已发货2已收货
        // "dead_line": "2019-09-06 17:13:23"//可支付截止时间
        // }
        console.log(that.orderList);
      })
    },
  },
  mounted () {
    // this.orderList = this.orderListDefault
    this.orderList = this.getOrderLists(0)
  }
}
</script>
<style lang="less" scoped>
@import "../../../assets/style/global.less";
.order-list {
  margin-top: 5px;
  /deep/ .price-style {
    display: none;
  }
  .tab{
    margin-bottom: 15px;
  }
  .bottom-content {
    text-align: left !important;
    line-height: 30px;
  }
  .order-cancel {
    .button("white");
    margin-right: 15px;
  }
  .order-pay {
    .button("red");
  }
  .order-confirm {
    .button("red", 80px);
  }
  /deep/ .van-card__footer {
    margin-top: 6px;
  }
  /deep/ .van-card__desc{
    height: 30px;
  }
}
</style>