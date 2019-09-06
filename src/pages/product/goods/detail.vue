
<template>
  <!-- 商品详情 -->
  <div class="detail">
    <head-img :detail="details">
      <van-row type="flex" justify="space-between" slot="footer" class="right">
        <van-col span="6" class="type">
          <span class="price">￥0000</span>
          <span class="origin">333</span>
        </van-col>
        <van-col span="18">
          <span class="time">限时：0000</span>
        </van-col>
      </van-row>
    </head-img>
    <div class="detail-content">
      <!-- 详情介绍 -->
      <introduce :detail="details.detail" :pic="pic"></introduce>
    </div>
    <div class="preorder-btn">
      <div class="share">
        推广
        <span class="money">赚￥2.00</span>
      </div>
      <router-link class="preorder" :to="`/goods/order/${detailId}`">预定</router-link>
    </div>
  </div>
</template>

<script>
import headImg from "../../../components/detail/head";
import introduce from '../../../components/detail/introduce'
import serverHttp from '../../../assets/js/api'

export default {
  data () {
    return {
      detailId: this.$route.params.id,
      pic: '',
      details: {},
    }
  },
  components: {
    headImg,
    introduce,
  },
  methods: {
    getDetail () {
      serverHttp.goodsDetailApi({ id: this.detailId }).then(res => {
        this.details = res.rs
        this.pic = res.rs.pics[0]
        this.details.name = '商品详情'
      })
    }
  },
  mounted () {
    this.getDetail()
  }
}
</script>
<style lang="less">
@import "../../../assets/style/global";

.detail {
  padding-bottom: 50px;
  .type {
    font-size: 17px;
    font-weight: 600;
    color: #555;
  }
  .right {
    line-height: 43px;
    text-align: right;
  }
  .price {
    height: 21px;
    font-size: 15px;
    font-weight: 500;
    color: #ff4728;
  }
  .origin {
    font-size: 11px;
    color: rgba(121, 121, 121, 1);
    margin: 0 14px;
    text-decoration: line-through;
  }
  .time {
    height: 16px;
    font-size: 11px;
    color: rgba(255, 71, 40, 1);
  }

  &-content {
    padding: 0 15px;

    .list {
      border-bottom: 1px solid #ebebeb;
      padding: 0.15rem 0;
      /deep/ .van-row {
        align-items: center;
      }
    }
  }
}
</style>