<style lang="less" scoped>
.home-page {
  .search{
    margin: 15px;
    height:35px;
    border-radius:20px;
    border:1px solid rgba(240,240,240,1);
    text-align: center;
    /deep/ a{
      display: block;
      width: 100%;
    }
    .van-icon-search{
      vertical-align: middle
    }
  }
  .home-city{
    margin-left: 15px;
  }
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
    <div>
      <van-search v-model="searchvalue" placeholder="请输入搜索关键词" show-action shape="round" @search="onSearch">
        <div slot="action" @click="onSearch">搜索</div>
      </van-search>
    </div>
    <span class="address home-city">北京</span>
    <!-- <imageAd :bannerList="bannerList"></imageAd> -->
    <div class="content">
      <!-- 菜单-->
      <van-tabs v-model="active" title-active-color="#F37455" @click="tabClick" :border="false">
        <van-tab v-for="(item, index) in tabs" :key="index" :name="item.name">
          <div slot="title">
            <span class="tab" :class="item.name"></span>
            <p class="h_title">{{item.title}}</p>
          </div>
        </van-tab>
      </van-tabs>
      <!-- 列表 -->
      <div class="top-border"></div>
      <div v-for="item in productList" :key="item.id">
        <product-card :product="item" @click="showProductDetail(item)" >
         <template slot="bottom">
            <div class="p-tag">
              <span class="p-tag-icon"></span>
              <span class="p-tag-price">￥{{item.minimumPrice}}</span>
            </div>
            <!-- <div class="p-time">
              <span class="p-time-end">限时：{{item.time}}</span>
              <div class="p-tag">
                <span class="p-tag-icon"></span>
                <span class="p-tag-price">￥{{item.price}}</span>
              </div>
            </div> -->
         </template>
        </product-card>
      </div>
    </div>
  </div>
</template>
<script>
import serverHttp from '../../assets/js/api'
import "../../assets/style/index.css";
import navigate from '../../components/footer/navigate'
import imageAd from "../../components/home/imageAd.vue";
export default {
  name: "page",
  components: {
    navigate,
    [imageAd.name]: imageAd,
  },
  data: function () {
    return {
      searchvalue: '',
      bannerList: [],
      productList: [],
      active: 'scenic',
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
    this.getListData()
    this.getHotelListData()
  },
  methods: {
    onSearch(e) {
      console.log(e)
    },
    getBannerData () {
      let that = this
      serverHttp.bannerApi().then(res => {
        that.bannerList = res.rs
      })
    },
    getHotelListData() {
      let data = {
        provinceCode: 110000,
        lat: 116.33664,
        lng: 39.94228,
        pageNum: 1
      }
      serverHttp.hotelListApi(data).then(res => {
        console.log()
        this.productList = res.rs.list
      })
    },
    getListData () {

      // 参数名称	必选	类型及范围	说明
      // provinceCode	 是	int	省代码
      // cityCode	否	int	市代码
      // lat	是	double	纬度 116.33664
      // lng	是	double	经度
      // pageNum	否	int	当前页，默认1
      // pageSize	否	int	分页大小，默认20
      let data = {
        provinceCode: 110000,
        lat: 116.33664,
        lng: 39.94228,
        pageNum: 1
      }
      serverHttp.scenicSpotsApi(data).then(res => {
        console.log()
        this.productList = res.rs.list
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
