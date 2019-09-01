<style lang="less" scoped>
@import "../../../assets/style/global";
.detail {
  
  &-list {
    .hotel-time-end{
        float: right;
        color: @primary;
    }
    .bottom-content{
         text-align: left !important;
         line-height: 30px;
    }
  }
}
</style>

<template>
  <!-- 酒店详情 -->
  <div class="detail">
    <head-img :detail="details"></head-img>
    <room-date @select="handelSelect" />
    <div class="detail-list">
      <van-list v-model="loading" :error.sync="error" error-text="请求失败，点击重新加载" @load="onLoad">
        <van-cell v-for="item in productList" :key="item.id">
          <product-card :product="item" source="hotelDetail">
            <template slot="tags">
              <div>
                <span class="card-tag" v-for="(tag,i) in item.tags" :key="i">{{tag}}</span>
              </div>
            </template>
            <span slot="bottom" class="hotel-time-end">限时：{{item.time}}</span>
            <template slot="footer">
              <van-row type="flex" justify="space-between">
                <van-col span="12" class="bottom-content">
                  <span class="point">使用前3日可退</span>
                  <span class="point active">奖励3.5</span>
                </van-col>
                <van-col span="12">
                  <span class="share">推广</span>
                  <router-link class="preorder"  :to="`/hotel/order/${detailId}`">预定</router-link>
                </van-col>
              </van-row>
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
    onLoad() {
      console.log(0)
      this.loading = false
    },
    handelSelect(e) {
      console.log('选中后的结果')
      console.log(e)
    },
    getDetail() {
      serverHttp.scenicSpotsDetailApi({ id: this.detailId }).then(res => {
        this.details = res.rs
        this.pic = res.rs.pics[0]
        this.tabs = res.rs.ticketTypes.map(item => { return { title: item.name, "name": 0 } })
        this.ticketTypes = res.rs.ticketTypes
        this.productList = this.ticketTypes[0].tickets
        this.productList.forEach(item => {
          item.picUrl='http://pw4gcfw3i.bkt.clouddn.com/scenicSpots/2019-08-17/1566053528010.jpg'
          item.tags=['大床', '大床', '大床就']
        })
        this.details.tags = ['24小时前台', '24小时前台', '24小时前台']
      })
    }
  }
}
</script>

