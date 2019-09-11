<template>
  <div class="swiper-img">
    <!-- <van-swipe :autoplay="3000000" style="height: 4rem;">
      <van-swipe-item v-for="(image,index) in bannerList" :key="index" @click="showProductDetail(image)">
        <img v-lazy="image.pic_url+''" style="width: 100%; height: 100%" />
      </van-swipe-item>
    </van-swipe>-->

    <swiper :options="swiperOption">
      <swiper-slide v-for="(image, index) in bannerList" :key="index">
        <img :src="image.pic_url" style="width: 100%; height: 100%" />
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>
<script>


import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
export default {
  name: 'imageAd',
  props: ['bannerList'],
  data () {
    return {
      swiperOption: {
        pagination: {
          el: '.swiper-pagination'
        },
        //根据slider的宽度自动分布
        slidesPerView: 'auto',
        // active下 居中显示
        centeredSlides: true,
        autoplay: true,
      }
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  methods: {
    showProductDetail (item) {
      console.log(item);
      let [type, id] = item.target_url.split(':')
      let target = ''
      switch (type) {
        case 'hotel':
          target = type
          break;
        case 'goods':
          target = type
          break;
        case 'scenic_spot':
          target = 'scenic'
          break;
        default:
          target = 'scenic'
          break;
      }
      this.$router.push(`/${target}/${id}`);
    },
  },
  created () {
    // if (this.imagelist.length == 0 || this.type != '1') {
    //   return;
    // }
    // var that = this;
    // var image = this.imagelist[0];
    // let img = new Image()
    // img.src = image.src;
    // var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    // img.onload = function () {
    //   that.height = Math.ceil(img.height / img.width * width);
    // }
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/style/global";
.swiper-img {
  .swiper-container {
    width: 100%;
    /* // 下面的padding 一定要加 （因为容器多余的部分被隐藏啦） */
    padding-top: 50px;
    padding-bottom: 50px;
  }
  .swiper-slide {
    width: 70% !important;
    height: 162px;
    border-radius: 20px;
    overflow: hidden;
    background-position: center;
    background-size: cover;
    transition: all 1s;

    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
    transform: scale(0.7);
  }
  .swiper-slide img {
    width: 100%;
  }
  /* // 激活的样式（选中的当前项） */
  .swiper-slide.swiper-slide-active {
    transform: scale(1.2);
    z-index: 2;
  }
  /deep/ .swiper-pagination-bullet-active {
    background: linear-gradient(
      135deg,
      rgba(242, 111, 84, 0.7) 100%,
      rgba(254, 167, 99, 0.5) 0%
    );
    width: 20px;
    border-radius: 4px;
  }
}
</style>
