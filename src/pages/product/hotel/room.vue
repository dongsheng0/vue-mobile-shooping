
<template>
  <!-- 房型介绍 -->
  <div class="room">
    <head-img :detail="details"></head-img>
    <div class="room-detail">
      <h4 class="title">{{details.name}}</h4>
      <van-cell title="房间面积" :value="details.dimension" />
      <van-cell title="床型" :value="details.bed_type" />
      <van-cell title="床型尺寸" :value="details.bed_size" />
      <van-cell title="加床规则" v-if="details.extra_bed_rule" :value="details.extra_bed_rule" />
      <van-cell title="早餐" :value="details.breakfast_type" />
      <van-cell title="窗户" :value="details.with_window" />
      <van-cell title="最多入住人数" :value="details.maximum_entry" />
      <van-cell title="房间设施" :value="details.facilities" />
      <van-cell>
        <template slot="title">
          <span class="price">{{details.price | price}}</span>
          <template v-if="details.specialOfferTimeLimit"> 
            
            <span class="origin">原价:{{details.specialOfferPrice | price}}</span>
            <span class="time" v-if="details.specialOfferTimeLimit">限时:<van-count-down :time="details.specialOfferTimeLimit | countDown" /></span>
          </template>
        </template>
      </van-cell>
      <van-cell>
        <template slot="title">
          <!-- <span class="point">使用前3日可退</span> -->
        </template>
      </van-cell>
    </div>
    <div class="preorder-btn">
      <div class="share">
        推广
        <!-- <span class="money">赚￥2.00</span> -->
      </div>
      <span class="preorder" @click="$router.push({'path':`/hotel/order/${detailId}`, query: {startDay, endDay}})">预定</span>
    </div>
  </div>
</template>

<script>
import headImg from "../../../components/detail/head";
import serverHttp from '../../../assets/js/api'

export default {
  data () {
    return {
      startDay: this.$route.query.startDay,
      endDay: this.$route.query.endDay,
      detailId: this.$route.params.id, // 房型id
      details: {},
    }
  },
  components: {
    headImg
  },
  mounted () {
    this.getDetail()
  },
  methods: {
    getDetail () {
      serverHttp.hotelRoomTypeDetailApi({ id: this.detailId, startDay: this.startDay, endDay: this.endDay }).then(res => {
        this.details = res.rs
        // this.pic = res.rs.pics[0]
        // this.productList.forEach(item => {
        //   item.picUrl = 'http://pw4gcfw3i.bkt.clouddn.com/scenicSpots/2019-08-17/1566053528010.jpg'
        //   item.tags = ['大床', '大床', '大床就']
        // })
        console.log(this.details);
        
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import "../../../assets/style/global";
.room {
  background: #fff;
  padding-bottom: 50px;
  &-detail {
    position: relative;
    z-index: 4;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.09);
    margin: -15px 15px 20px 15px;
    .title {
      font-size: 18px;
      font-weight: 500;
      color: rgba(85, 85, 85, 1);
      line-height: 1.8rem;
      padding: 0 16px;
    }
    .van-cell:nth-child(2n) {
      background: rgba(250, 250, 250, 1);
    }
    .van-cell__value {
      color: #424242;
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
      float: right;
    }
  }
}
</style>


 