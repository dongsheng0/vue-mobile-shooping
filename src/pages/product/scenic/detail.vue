
<template>
  <!-- 景区详情 -->
  <div class="detail">
    <head-img :detail="details"></head-img>
    <div class="detail-tabs">
      <tabs :tabs="tabs" active="0" @click="tabClick"></tabs>
    </div>
    <div class="detail-content">
      <ul>
        <li v-for="(item, index) in list" class="list" :key="index">
          <van-row type="flex" justify="space-between">
            <van-col span="6" class="type">{{item.specName}}</van-col>
            <van-col span="18" class="right">
              <span class="price">{{(item.specialOfferTimeLimit? item.specialOfferPrice:item.minimumPrice) | price}}</span>
              <span class="origin" v-if="item.specialOfferTimeLimit">原价:{{item.specialOfferPrice}}</span>
              <span class="time" v-if="item.specialOfferTimeLimit">
                限时:
                <van-count-down :time="item.specialOfferTimeLimit | countDown" />
              </span>
            </van-col>
          </van-row>
          <div class="desc">
            <p class="point" v-for="(rule, i) in item.useRules" :key="i">{{rule}}</p>
          </div>
          <div class="desc last">
            <van-row type="flex" justify="space-between">
              <van-col span="6">
                <span class="point active">奖励:{{item.minimumRakeOff | price}}</span>
              </van-col>
              <van-col span="18" class="right">
                <span class="share" @click="share">推广</span>
                <router-link class="preorder" :to="`/scenic/order/${item.id}`">预定</router-link>
              </van-col>
            </van-row>
          </div>
        </li>
      </ul>
      <!-- 详情介绍 -->
      <introduce :detail="details.detail" title="景区"></introduce>
    </div>
  </div>
</template>

<script>
import headImg from "../../../components/detail/head";
import introduce from '../../../components/detail/introduce'
import tabs from '../../../components/common/tabs'
import serverHttp from '../../../assets/js/api'

export default {
  data () {
    return {
      detailId: this.$route.params.id,
      tabs: [],
      list: [],
      details: {},
    }
  },
  components: {
    headImg,
    introduce,
    tabs
  },
  methods: {
    // 推广
    share () {
      this.$toast('敬请期待')
    },
    // 切换tab
    tabClick (e) {
      this.list = this.ticketTypes[e.name].tickets
    },
    getDetail () {
      serverHttp.scenicSpotsDetailApi({ id: this.detailId }).then(res => {
        this.details = res.rs
        this.tabs = res.rs.ticketTypes.map((item, index) => { return { title: item.name, name: index } })
        this.ticketTypes = res.rs.ticketTypes
        this.list = this.ticketTypes[0].tickets
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
  &-tabs {
    width: 50%;
    height: 45px;
    border-bottom: 1px solid #ebebeb;
  }

  &-content {
    padding: 0 15px;
    .list {
      border-bottom: 1px solid #ebebeb;
      padding: 0.15rem 0;
      /deep/ .van-row {
        align-items: center;
      }
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
      .desc {
        font-size: 12px;
        color: rgba(85, 85, 85, 1);
        padding: 6px 0 6px 8px;
      }
      .share {
        .button("green");
        margin-right: 0.5rem;
      }
      .preorder {
        .button("red");
      }
    }
  }
}
</style>


