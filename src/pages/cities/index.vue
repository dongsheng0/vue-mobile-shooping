<template>
  <!-- 城市 -->
  <div class="city">
    <van-index-bar :highlight-color="'#F7875A'">
      <div class="left-bar">定位城市</div>
      <div class="address">北京</div>
      <div class="left-bar">热门城市</div>
      <div class="hot">
        <van-row gutter="20">
          <van-col :span="7" v-for="item in hotCites" :key="item.provinceCode">
            <span class="hot-city" @click="selectCity(item)">{{item.name}}</span>
          </van-col>
        </van-row>
      </div>
      <template v-for="(value, key) in dictCites">
        <van-index-anchor :index="key" :key="key" />
        <van-cell v-for="item in value" :title="item.name" :key="item.provinceCode" @click="selectCity(item)" />
      </template>
    </van-index-bar>
  </div>
</template>

<script>
import serverHttp from '../../assets/js/api'
export default {
  data () {
    return {
      hotCites: [],
      dictCites: {},
    }
  },
  mounted () {
    this.requireData()
  },
  methods: {
    selectCity (item) {
      this.backHomePage(item)
    },
    backHomePage(item) {
     let { cityCode, name, provinceCode } = item
     this.$router.push({path:'/home', query: { cityCode, name, provinceCode}})
     localStorage.setItem('city', JSON.stringify(item))
    },
    requireData () {
      serverHttp.cityApi().then(res => {
        this.hotCites = res.rs.hotCites
        this.dictCites = res.rs.dictCites
      })
    }
  },
}
</script>

<style lang="less">
.hot-city {
  display: inline-block;
  min-width: 100px;
  line-height: 38px;
  background: rgba(247, 247, 247, 1);
  border-radius: 19px;
  font-size: 12px;
  text-align: center;
}
</style>
