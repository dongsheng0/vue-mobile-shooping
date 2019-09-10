<template>
  <div>
    <van-swipe :autoplay="3000" style="height: 4rem;">
      <van-swipe-item v-for="(image,index) in bannerList" :key="index" @click="showProductDetail(image)">
        <img v-lazy="image.pic_url+''" style="width: 100%; height: 100%" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
<script>

export default {
  name: 'imageAd',
  props: ['bannerList'],
  data () {
    return {
      height: 0
    }
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

<style>
</style>
