<style lang="less">
@import "../../../assets/style/global";
</style>

<template>
  <!-- 酒店详情 -->
  <div>
    <div>
      <van-field v-model="value" placeholder="请输入用户名" />
    </div>
    <!-- <div class="point active"></div>
    <van-button @click="selectData" type="warning">警告按钮</van-button>
    <van-action-sheet v-model="show" title="标题">
      <inlineCalendar mode="during" @change="change" :minDate="minDate" />
      <van-button @click="save" type="warning" v-show="isShowSave">完成</van-button>
    </van-action-sheet>-->
  </div>
</template>
<script>
export default {
  data () {
    return {
      show: false,
      minDate: new Date(),
      isShowSave: false
    }
  },
  components: {
  },
  methods: {
    selectData () {
      this.show = true
    },
    save () {
      this.show = false
    },
    change (e) {
      this.isShowSave = e.length > 1 ? true : false
    }
  }
}
</script>

