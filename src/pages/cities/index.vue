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
    selectCity (index) {
      console.log(index)
    },
    requireData () {
      let res = {
        "hotCites": [ //热门城市
          {
            "provinceCode": 340000, //省代码
            "cityCode": null, //市代码
            "name": "安徽"//城市名称
          },
          {
            "provinceCode": 110000,
            "cityCode": null,
            "name": "北京"
          },
          {
            "provinceCode": 340000,
            "cityCode": 340800,
            "name": "安庆市"
          }
        ],
        "dictCites": { //字母分类下的城市A-Z
          "A": [
            {
              "provinceCode": 820000, //省代码
              "cityCode": null, //市代码
              "name": "澳门"//城市名称
            },
            {
              "provinceCode": 510000,
              "cityCode": 513200,
              "name": "阿坝藏族羌族自治州"
            },
            {
              "provinceCode": 650000,
              "cityCode": 652900,
              "name": "阿克苏地区"
            },
            {
              "provinceCode": 650000,
              "cityCode": 659002,
              "name": "阿拉尔市"
            },
            {
              "provinceCode": 150000,
              "cityCode": 152900,
              "name": "阿拉善盟"
            }
          ],
          "B": [
            {
              "provinceCode": 110000,
              "cityCode": null,
              "name": "北京"
            },
            {
              "provinceCode": 220000,
              "cityCode": 220800,
              "name": "白城市"
            },
            {
              "provinceCode": 450000,
              "cityCode": 451000,
              "name": "百色市"
            }
          ]
        }
      }
      this.hotCites = res.hotCites
      this.dictCites = res.dictCites
    }
  },
}
</script>

<style lang="less">
.hot-city {
  display: inline-block;
  min-width: 100px;
  height: 38px;
  background: rgba(247, 247, 247, 1);
  border-radius: 19px;
  font-size: 12px;
  text-align: center;
}
</style>
