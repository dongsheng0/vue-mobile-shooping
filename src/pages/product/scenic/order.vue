<template>
  <!-- 提交订单-景区 -->
  <div class="order">
    <div class="ticket"></div>
    <div class="left-bar">使用日期</div>
    <div class="date">
      <div>
        <p>今天7/7</p>
        <p>269.00元</p>
      </div>
      <div>更多日期</div>
    </div>
    <div class="left-bar">
      购买数量
      <span class="tips">每个证件号码购买一次</span>
    </div>
    <div>
      <van-stepper v-model="value" integer input-width="100px" @change="change" />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: ''
    }
  },
  components: {

  },
  methods: {
    // 数量改变
    change () {

    }
  }
}
</script>

<style>
</style>
