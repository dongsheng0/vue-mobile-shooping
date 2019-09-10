<template>
  <div class="home-page">
    <navigate />
    <!-- <div> -->
      <!-- <van-search v-model="searchvalue" placeholder="请输入搜索关键词" show-action shape="round" @search="onSearch">
        <div slot="action" @click="onSearch">搜索</div>
      </van-search>
    </div> -->
    <span class="address home-city" @click="$router.push({path:'/city', query: {city:'北京'}})">{{city.name}}</span>
    <imageAd :bannerList="bannerList"></imageAd>
    <div class="content">
      <!-- 菜单-->
      <van-tabs v-model="tabActive" title-active-color="#F37455" @click="tabClick" :border="false">
        <van-tab v-for="(item, index) in tabs" :key="index" :name="item.name">
          <div slot="title">
            <span class="tab" :class="item.name"></span>
            <p class="h_title">{{item.title}}</p>
          </div>
        </van-tab>
      </van-tabs>
      <!-- 菜单 end-->
      <div class="top-border"></div>
      <!-- 列表 -->
      <van-list
        :finished="finished"
        :finished-text="finishedText"
        v-model="loading"
        :offset="10"
        @load="getProductList"
      >
        <div v-for="item in productList" :key="item.id">
          <product-card :product="item" @click="showProductDetail(item)">
            <template slot="bottom">
              <div class="p-tag">
                <span class="p-tag-icon"></span>
                <span class="p-tag-price">￥{{item.minimumRakeOff}}</span>
              </div>
              <!-- <div class="p-time">
              <span class="p-time-end">限时：{{item.time}}</span>
              <div class="p-tag">
                <span class="p-tag-icon"></span>
                <span class="p-tag-price">￥{{item.price}}</span>
              </div>
              </div>-->
            </template>
          </product-card>
        </div>
      </van-list>
      <!-- 菜单 end-->
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
      city: { cityCode: null, name: '北京', provinceCode: 110000 },
      tabActive: 'scenic',
      page: {},
      tabs: [
        { title: '景区', type: 1, name: 'scenic' },
        { title: '酒店', type: 2, name: 'hotel' },
        { title: '商品', type: 3, name: 'goods' }
      ],
      // 列表加载
      finishedText: "没有更多了",
      finished: false,
      pageNum: 1,
      pageSize: 20,
      loading: false
    }
  },
  computed: {
    mapInfo () {
      return {
        provinceCode: this.city.provinceCode,  // provinceCode	 是	int	省代码
        cityCode: this.city.cityCode,  // cityCode	否	int	市代码
        lat: 116.33664, // lat	是	double	纬度 116.33664
        lng: 39.94228  // lng	是	double	经度
      }
    }
  },
  mounted () {
    this.setCity()
    this.getBannerData()
    // this.getGeolocation()
  },

  methods: {
    getGeolocation () {
      if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(function (pos) {

          // 成功回调函数，接受一个地理位置的对象作为参数。  

          // https://developer.mozilla.org/cn/docs/Web/API/Position 参数说明  

          alert(pos.coords.latitude + '  ' + pos.coords.longitude);

        }, function (err) {

          // 错误的回调  

          // https://developer.mozilla.org/cn/docs/Web/API/PositionError 错误参数  

        }, {

            enableHighAccuracy: true, // 是否获取高精度结果  

            timeout: 5000, //超时,毫秒  

            maximumAge: 0 //可以接受多少毫秒的缓存位置  

            // 详细说明 https://developer.mozilla.org/cn/docs/Web/API/PositionOptions  

          });

      } else {

        alert('抱歉！您的浏览器无法使用地位功能');

      }
    },
    // 搜索
    onSearch (e) {
      this.$router.push(`/search?keyword=${encodeURIComponent(e)}`)
    },
    // 获取banner数据
    getBannerData () {
      let that = this
      serverHttp.bannerApi().then(res => {
        that.bannerList = res.rs
      })
    },
    // 获取当前及选择的城市
    setCity () {
      let city = localStorage.getItem('city')
      if (city && JSON.parse(city)) {
        this.city = JSON.parse(city)
      }
    },
    async getProductList () {
      let toast = this.$toast.loading({
        mask: true,
        message: "加载中..."
      });
      const { pageNum, tabActive, pageSize } = this;
      let params = { ...{ pageSize, pageNum }, ...this.mapInfo }
      let API = `${tabActive}ListApi`
      let result = await serverHttp[API](params);
      let res = result.rs
      this.loading = false;
      toast.close();
      if (res) {
        let list = res.list || [];
        list.forEach(item => {
          item.price = item.minimumPrice
        })
        if (pageNum > 1) {
          this.productList = [...this.productList, ...list];
        } else {
          this.productList = list;
        }
        // 如果最后一页
        if (res.lastPage) {
          this.finished = true;
          this.finishedText = "没有更多了";
        } else {
          this.pageNum++;
        }
      }
    },
    // tab菜单切换
    tabClick () {
      this.getProductList()
    },
    // 点击进入详情
    showProductDetail (product) {
      console.log(product)
      this.$router.push(`/${this.tabActive}/${product.id}`);
    }
  }
}
</script>
<style lang="less" scoped>
.home-page {
  .search {
    margin: 15px;
    height: 35px;
    border-radius: 20px;
    border: 1px solid rgba(240, 240, 240, 1);
    text-align: center;
    /deep/ a {
      display: block;
      width: 100%;
    }
    .van-icon-search {
      vertical-align: middle;
    }
  }
  .home-city {
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
  .van-card__bottom {
    line-height: 26px;
  }
}
</style>
