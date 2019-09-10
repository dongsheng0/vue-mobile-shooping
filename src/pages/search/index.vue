<template>
  <!-- 搜索 -->
  <div>
    <van-search
      v-model="keyword"
      placeholder="请输入搜索关键词"
      :show-action="keyword? true: false"
      shape="round"
      @search="onSearch"
    >
      <div slot="action" @click="onSearch" class="home-search">搜索</div>
    </van-search>
    <template v-if="productList.length>0">
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
    </template>
    <div v-else class="empty">请换个关键词搜索</div>
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
    this.keyword = decodeURIComponent(this.$route.query.keyword)
    this.getListData()
  },
  methods: {
    onSearch () {
      this.getListData()
    },
    showProductDetail (item) {
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
    getListData () {
      serverHttp.searchApi({ key: this.keyword }).then(res => {
        this.productList = res.rs
        this.productList.forEach(item => {
          item.picUrl = item.pic_url
          item.price = item.minimumPrice
        })
      })
    },
  }
}
</script>

<style scoped>
.empty {
  font-size: 14px;
  padding: 15px;
  text-align: center;
}
</style>
