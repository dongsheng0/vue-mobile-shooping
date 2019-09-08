

<template>
  <!-- 酒店详情 -->
  <div class="detail">
    <!-- <head-img :detail="details"></head-img> -->
    <room-date v-model="selectValue" @change="changeRoomDate" :hotelId="detailId" />
    <div class="detail-list">
      <van-list v-model="loading" :error.sync="error" error-text="请求失败，点击重新加载" @load="onLoad">
        <van-cell v-for="item in productList" :key="item.id">
          <product-card :product="item" source="hotelDetail" @clickThumb="handelPreorder('room',item.id)">
            <template slot="tags">
              <div>
                <span class="card-tag" v-for="(tag,i) in item.attributes" :key="i">{{tag}}</span>
              </div>
            </template>
            <span slot="bottom" class="hotel-time-end" v-if="item.specialOfferTimeLimit">
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
                  <span class="share" @click="share">推广</span>
                  <span
                    class="preorder"
                    @click="handelPreorder('order',item.id)"
                  >预定</span>
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
import moment from 'moment'
export default {
  data () {
    return {
      selectValue: [],
      detailId: this.$route.params.id,
      productList: [],
      list: [],
      details: {},
      error: false,
      loading: true
    }
  },
  computed: {
    
  },
  components: {
    headImg,
    roomDate
  },
  mounted () {
    this.getDetail()
  },
  methods: {
    handelPreorder(path, id) {
      if (this.selectValue.length > 0) {
        this.$router.push({ 'path': `/hotel/${path}/${id}`, query: { startDay: this.selectValue[0], endDay: this.selectValue[1] } })
      } else {
        this.$toast('请选择入住日期')
      }
    },
     // 推广
    share() {
      this.$toast('敬请期待')
    },
    // 选择日期，帅选酒店
    changeRoomDate (e) {
      this.mapDetailsdata(e)
    },
    onLoad () {
      console.log(0)
      this.loading = false
    },
    // 二次处理数据
    mapDetailsdata (list) {
      list.forEach(item => {
        item.picUrl = item.pic_url
        // 有限时特价
        if (item.specialOfferTimeLimit) {
          item.minimumPrice = item.price
          item.price = item.specialOfferPrice
        }
      })
      this.productList = list
    },
    getDetail () {
      serverHttp.hotelDetailApi({ id: this.detailId }).then(res => {
        console.log(res.rs);
        let result = res.rs
        this.details = result || {}
        this.pic = result.pics[0]
        this.mapDetailsdata(result.rooms)
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

