

<template>
  <!-- 酒店详情 -->
  <div class="detail">
    <!-- <head-img :detail="details"></head-img> -->
    <room-date @select="handelSelect" />
    <div class="detail-list">
      <van-list v-model="loading" :error.sync="error" error-text="请求失败，点击重新加载" @load="onLoad">
        <van-cell v-for="item in productList" :key="item.id">
          <product-card :product="item" source="hotelDetail">
            <template slot="tags">
              <div>
                <span class="card-tag" v-for="(tag,i) in item.attributes" :key="i">{{tag}}</span>
              </div>
            </template>
            <span slot="bottom" class="hotel-time-end">
              限时：
              <van-count-down :time="item.specialOfferTimeLimit | countDown" />
            </span>
            <template slot="footer">
              <van-row type="flex" justify="space-between">
                <van-col span="12" class="bottom-content">
                  <!-- <span class="point">使用前3日可退</span> -->
                  <span class="point active">奖励{{item.rakeOff | price}}</span>
                </van-col>
                <van-col span="12">
                  <span class="share">推广</span>
                  <router-link class="preorder" :to="`/hotel/order/${item.id}`">预定</router-link>
                </van-col>
              </van-row>
              <div class="useRules">
                <p class="point" v-for="(item, i) in item.useRules" :key="i">{{item}}</p>
              </div>
            </template>
          </product-card>
        </van-cell>
      </van-list>
    </div>
  </div>
</template>
<script>
import headImg from "../../../components/detail/head";
import roomDate from "../../../components/detail/roomDate";
import serverHttp from '../../../assets/js/api'

export default {
  data () {
    return {
      detailId: this.$route.params.id,
      productList: [],
      list: [],
      details: {},
      error: false,
      loading: true
    }
  },
  components: {
    headImg,
    roomDate
  },
  mounted () {
    this.getDetail()
  },
  methods: {
    onLoad () {
      console.log(0)
      this.loading = false
    },
    handelSelect (e) {
      console.log('选中后的结果')
      console.log(e)
    },
    getDetail () {
      serverHttp.hotelDetailApi({ id: this.detailId }).then(res => {
        console.log(res.rs);
        let result = res.rs
        this.details = result || {}
        this.pic = result.pics[0]
        this.productList = result.rooms
        this.productList.forEach(item => {
          item.picUrl = item.pic_url
          // 有限时特价
          if (item.specialOfferTimeLimit) {
            item.minimumPrice = item.price
            item.price = item.specialOfferPrice
          }
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import "../../../assets/style/global";
.detail {
  &-list {
    .hotel-time-end {
      float: right;
      color: @primary;
    }
    .bottom-content {
      text-align: left !important;
      line-height: 30px;
    }
  }
  .useRules {
    text-align: left;
  }
}
</style>

