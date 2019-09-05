<style lang="less" scoped>
  @import "../../../assets/style/global.less";
  .order-list {
    /deep/ .price-style{
      display: none;
    }
    .bottom-content{
         text-align: left !important;
         line-height: 30px;
    }
    .order-cancel{
      .button('white');
      margin-right: 15px;
    }
    .order-pay{
      .button('red');
    }
    .order-confirm{
      .button('red', 80px);
    }
    /deep/ .van-card__footer{
      margin-top: 6px;
    }
  }
</style>
<template>
  <div class="order-list">
    <headerNav title="我的订单" />
    <tabs :tabs="tabs" active="0" @click="tabClick"></tabs>
      <div v-for="item in orderList" :key="item.id">
        <product-card :product="item.products" @click="showProductDetail(item)">
          <template slot="footer">
            <van-row type="flex" justify="space-between" v-if="item.status == 1">
              <van-col span="12" class="bottom-content">
                <span class="point active">请在 02:15:47 内付款</span>
              </van-col>
              <van-col span="12">
                <span class="order-cancel">取消</span>
                <span class="order-pay">支付</span>
              </van-col>
            </van-row>

            <van-row type="flex" justify="end" v-if="item.status == 3">
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
    data() {
      return {
        active: 1,
        // 0待支付1待使用3已完成
        tabs: [
          { title: '未支付', type: 0, name: '1' },
          { title: '待使用', type: 1, name: '2' },
          { title: '已完成', type: 2, name: '3' }
        ],
        orderList:[],
        orderListDefault: [
        ]
      }
    },
    methods: {
      tabClick(e) {
        console.log(e)
        this.getOrderLists(e.type,)
        // this.orderList = this.orderListDefault.filter(i=> i.status==e.type)
      },
      getOrderLists(state, pageNum=1) {
        serverHttp.userOrdersApi({
            state,
            pageNum
          }).then(res=> {
          let result = res.rs
          this.orderList = result.list
        })
      },
    },
    mounted () {
      // this.orderList = this.orderListDefault
      this.orderList=this.getOrderLists(0)
    }
  }
</script>