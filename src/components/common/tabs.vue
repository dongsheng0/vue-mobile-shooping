<template>
  <div class="x-van-tabs">
    <van-tabs v-model="active" @click="tabClick" :border="false">
      <van-tab v-for="(item, index) in tabs" :key="index" :name="item.name">
        <div slot="title">
          <p class="tab-title">{{item.title}}</p>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: 'x-tabs',
  props: ['active', 'tabs'],
  methods: {
    tabClick (e) {
      this.$emit('click', e)
    }
  }
}
</script>
<style lang="less">
.x-van-tabs {
  .tab-title {
    background: #fff;
    color: #555;
    border-radius: 10px 10px 0 10px;
    height: 30px;
    line-height: 30px;
  }
  /deep/.van-tabs__line {
    width: 16px !important;
    height: 6px;
    border-radius: 3px;
    background: linear-gradient(left, #fea763, #f26f54);
  }
  .van-tab--active {
    .tab-title {
      background: linear-gradient(left, #fea763, #f26f54);
      color: #fff;
    }
  }
}
</style>
