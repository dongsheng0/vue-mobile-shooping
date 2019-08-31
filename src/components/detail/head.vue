<template>
  <!-- 详情页的头部 -->
  <!-- 3个页面都用，包括图片查看 -->
  <div class="head-img">
    <van-swipe :autoplay="3000" class="head-swipe">
      <!-- <van-swipe-item v-for="(image,index) in detail.pics" :key="index" @click="click">
        <img v-lazy="image.pic_url+''" style="width: 100%;" />
      </van-swipe-item> -->
    </van-swipe>

    <div class="head-content">
      <h3 class="head-content-title">{{detail.name}}</h3>
      <div class="head-content-address">{{detail.address}}</div>
      <div v-if="detail.tags">
        <span v-for="(item , index) in detail.tags" :key="index" class="detail-tags">{{item}}</span>
      </div>
      <slot name="footer"></slot>
    </div>
    <div class="border-split"></div>
  </div>
</template>

<script>
import { ImagePreview } from 'vant';
export default {
  name: 'headImg',
  props: ['detail'],
  data () {
    return {

    }
  },
  components: {

  },
  methods: {
    click (e) {
      ImagePreview({
        images: [
          'https://haitao.nos.netease.com/f3kJUUtkrDbsiU1LtopkHcBGgT1809182243_960_480.jpg',
          'https://haitao.nos.netease.com/f3kJUUtkrDbsiU1LtopkHcBGgT1809182243_960_480.jpg'
        ],
        startPosition: 1,
        onClose () {
          // do something
        }
      });
    }
  }
}
</script>

<style lang="less">
.head-img {
  .head-swipe {
    height: 4rem;
  }
  .head-content {
    border-radius: 20px 20px 0 0;
    background-color: #fff;
    padding: 15px 10px;
    &-title {
      font-size: 18px;
      font-weight: 500;
      color: #424242;
      padding: 3px 0;
    }
    &-address {
      font-size: 13px;
      color: #666;
      padding-left: 25px;
      margin-top: 10px;
      background: url(../../assets/img/icon/icon_address.png) no-repeat left;
    }
    .detail-tags {
      padding: 3px 7px;
      line-height: 22px;
      font-size: 12px;
      border-radius: 10px;
      + .detail-tags {
        margin-left: 8px;
      }
      &:nth-child(2n) {
        color: #96da47;
        border: 1px solid #96da47;
      }
      &:nth-child(2n-1) {
        color: #fc995f;
        border: 1px solid #fc995f;
      }
    }
  }
  h3 {
  }
  .address {
  }
}
</style>
