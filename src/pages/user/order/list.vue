
<template>
  <div class="order-list">
    <!-- <headerNav title="我的订单" /> -->
    <tabs :tabs="tabs" class="tab" :active="tabActive" @click="tabClick"></tabs>
    <div class="border-split"></div>
    <!-- 列表 -->
    <van-list :finished="finished" :finished-text="finishedText" v-model="loading" :offset="10" @load="getorderList">
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
                <span
                  class="order-confirm"
                  v-if="item.order_type == 2 && item.shipping_status == 1"
                  @click="confirmReceipt(item.order_no)"
                >确认收货</span>
              </van-col>
            </van-row>
          </template>
        </product-card>
      </div>
    </van-list>
    <!-- 列表 end-->
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
      // 列表参数
      orderList: [],
      finishedText: "没有更多了",
      finished: false,
      pageNum: 1,
      pageSize: 20,
      loading: false
    }
  },
  methods: {
    // 确认收货
    confirmReceipt (orderNo) {
      serverHttp.userConfirmReceiptApi({ orderNo }).then(res => {
        this.$toast(res.msg)
      })
    },
    // 取消支付
    cancelOrder (orderNo) {
      serverHttp.userCancelOrderApi({ orderNo }).then(res => {
        this.$toast(res.msg)
      })
    },
    // 点击支付
    pay (id) {
      WXPay(id)
    },
    // 切换菜单
    tabClick (e) {
      this.tabActive = e.type
      this.pageNum = 1
      this.getorderList()
    },
    async getorderList () {
      let toast = this.$toast.loading({
        mask: true,
        message: "加载中..."
      });
      const { pageNum, tabActive: state, pageSize } = this;
      let params = {
        state,
        pageSize,
        pageNum
      };
      let result = await serverHttp.userOrdersApi(params);
      let res = result.rs
      this.loading = false;
      toast.close();
      if (res) {
        let list = res.list || [];
        list.forEach(item => {
          item.name = item.title
          item.price = item.order_money
          item.address = " " // 设置为空，是为了让中间的高度撑开
          item.picUrl = item.pic_url
        })
        if (pageNum > 1) {
          this.orderList = [...this.orderList, ...list];
        } else {
          this.orderList = list;
        }
        // 如果最后一页
        if (res.lastPage) {
          this.finished = true;
          this.finishedText = "没有更多了";
        } else {
          this.pageNum++;
        }
      }
    }
  },
  mounted () {

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
  .tab {
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
  /deep/ .van-card__desc {
    height: 30px;
  }
}
</style>