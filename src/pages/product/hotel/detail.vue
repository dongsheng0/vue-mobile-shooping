<style lang="less">
</style>

<template>
  <!-- 酒店详情 -->
  <div>
    <div class="detail-c">
      <tabs :tabs="tabs" active="hotel"></tabs>
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
import tabs from '../../../components/common/tabs'
export default {
  data () {
    return {
      show: false,
      minDate: new Date(),
      isShowSave: false,
      tabs: [
        { title: '景区', type: 1, name: 'scenic' },
        { title: '酒店', type: 2, name: 'hotel' },
        { title: '商品', type: 3, name: 'goods' }
      ]
    }
  },
  components: {
    tabs
  },
  methods: {
    selectData () {
      this.show = true
    },
    save () {
      this.show = false
    },
    change (e) {
      console.log('日期改变');
      console.log(e);
      this.isShowSave = e.length > 1 ? true : false
    }
  }
}
</script>

