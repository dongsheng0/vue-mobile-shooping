
<template>
  <div class="order-list">
    <!-- <headerNav title="我的订单" /> -->
    <tabs :tabs="tabs" active="0" @click="tabClick"></tabs>
    <div v-for="item in orderList" :key="item.id">
      <product-card :product="item" @click="showProductDetail(item)">
        <template slot="footer">
          <!-- 未支付 -->
          <van-row type="flex" justify="space-between" v-if="item.status == 0">
            <van-col span="12" class="bottom-content">
              <span class="point active">请在 <van-count-down :time="item.dead_line | countDown" /> 内付款</span>
            </van-col>
            <van-col span="12">
              <span class="order-cancel">取消</span>
              <span class="order-pay">支付</span>
            </van-col>
          </van-row>

          <van-row type="flex" justify="end" v-if="item.can_exchange == 1">
            <van-col>
              <span class="order-cancel">退款</span>
              <span class="order-confirm">确认收货</span>
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
export default {
  components: {
    tabs
  },
  data () {
    return {
      active: 1,
      // 0待支付1待使用3已完成
      tabs: [
        { title: '未支付', type: 0, name: '1' },
        { title: '待使用', type: 1, name: '2' },
        { title: '已完成', type: 2, name: '3' }
      ],
      orderList: [],
      orderListDefault: [
      ]
    }
  },
  methods: {
    tabClick (e) {
      console.log(e)
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
        that.orderList.forEach(item=> {
          item.name = item.title
          item.price = item.order_money
          item.address = ""
        })
        // "order_no": "H-190901-8",//订单号
        //         "order_date": "2019-09-01 18:13:46",//下单日期
        //         "order_money": 336,//订单金额
        //         "can_exchange": 0,//0不可退1可退
        //         "title": "7天酒店-北京上地店——自主大床房",//标题
        //         "order_type": 1,//订单类型0景区1酒店2商品
        //         "dead_line": "2019-09-04 20:22:56"//支付截止时间


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
  /deep/ .price-style {
    display: none;
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
}
</style>