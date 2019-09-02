<template>
  <!-- 搜索 -->
  <div>
    <van-search ref="search" placeholder="请输入搜索关键词" shape="round" @search="onSearch">
      <div slot="action" @click="onSearch">搜索</div>
    </van-search>
    <div v-for="item in productList" :key="item.id">
      <product-card :product="item" @click="showProductDetail(item)">
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
          </div>-->
        </template>
      </product-card>
    </div>
  </div>
</template>

<script>
import serverHttp from '../../assets/js/api'

export default {
  data () {
    return {
      productList: [],
      keyword: ''
    }
  },
  components: {

  },
  mounted () {
    this.getListData()
    this.keyword = decodeURIComponent(this.$route.query.keyword)
    console.log(this.keyword)
  },
  methods: {
    onSearch () { },
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
  }
}
</script>

<style>
</style>
