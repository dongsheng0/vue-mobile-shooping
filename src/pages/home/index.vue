<style lang="less">
.home-page {
  .h_title {
    line-height: 22px;
  }
  /deep/ .tab {
    margin: 0 auto;
  }
  .scenic {
    width: 52px;
    height: 52px;
    background: url(../../assets/img/icon/icon_scenic.png) no-repeat;
  }
  .hotel {
    width: 52px;
    height: 52px;
    background: url(../../assets/img/icon/icon_hotel.png) no-repeat;
  }
  .goods {
    width: 52px;
    height: 52px;
    background: url(../../assets/img/icon/icon_goods.png) no-repeat;
  }

  .content {
    padding: 15px;
    .top-border {
      height: 14px;
      background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.03) 0%,
        rgba(0, 0, 0, 0) 100%
      );
    }
  }
  /deep/.van-tabs--line .van-tabs__wrap {
    height: auto;
  }
  /deep/ .van-tabs__line {
    height: 3px;
    background: url(../../assets/img/tabs__line.png) no-repeat center;
    bottom: 3px;
  }
}
</style>
<template>
  <div class="home-page">
    <navigate />
    <!-- <imageAd :bannerList="bannerList"></imageAd> -->
    <!-- <search v-if="item.Code=='Search'" :data="item.ParameterDictionary"></search> -->
    <!-- <div class="content">
      <van-tabs v-model="active" title-active-color="#F37455" @click="tabClick" :border="false">
        <van-tab v-for="(item, index) in tabs" :key="index" :name="item.name">
          <div slot="title">
            <span class="tab" :class="item.name"></span>
            <p class="h_title">{{item.title}}</p>
          </div>
          <div class="top-border"></div>
          <div v-for="item in productList" :key="item.id">
            <product-card :product="item" @click="showProductDetail(item)" />
          </div>
        </van-tab>
      </van-tabs>
    </div>-->
  </div>
</template>
<script>
import serverHttp from '../../assets/js/api'
import "../../assets/style/index.css";
import search from "../../components/home/search.vue";
import navigate from '../../components/footer/navigate'
import imageAd from "../../components/home/imageAd.vue";
export default {
  name: "page",
  components: {
    search,
    navigate,
    [imageAd.name]: imageAd,
  },
  data: function () {
    return {
      bannerList: [],
      productList: [
        {
          id: '2',
          moneyNow: '299',
          price: '299',
          originPrice: '1000',
          title: '外滩',
          time: "12:00:00",
          "provinceCode": 110000,
          "cityCode": null,
          "address": '上海市中心黄浦区的黄浦江畔一带',
          "imageURL": "https://haitao.nosdn2.127.net/bc977ba46ed74158b6b3386eaf27f7f81530241584513jizebvc810863.jpg",
        }
      ],
      active: 'hotel',
      page: {},
      tabs: [
        { title: '景区', type: 1, name: 'scenic' },
        { title: '酒店', type: 2, name: 'hotel' },
        { title: '商品', type: 3, name: 'goods' }
      ]
    }
  },
  created: function () {
  },
  mounted () {
    this.getBannerData()
  },
  methods: {
    getBannerData () {
      let that = this
      serverHttp.bannerApi().then(res => {
        that.bannerList = res.rs
      })
    },
    tabClick (name, title) {
      console.log(name)
      console.log(title)
    },
    showProductDetail (product) {
      console.log(product)
      let route = ''
      switch (product.type) {
        case 0:
          route = 'scenic'
          break;
        case 1:
          route = 'hotel'
          break;
        case 2:
          route = 'goods'
          break;

        default: route = 'scenic'
          break;
      }
      this.$router.push(`/${route}/${product.id}`);
    }
  }
}
</script>
