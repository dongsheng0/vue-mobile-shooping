<style lang="less" scoped>
@import "../../../assets/style/global";
</style>
<template>
  <!-- 提交订单-酒店 -->
  <div class="order">
    <ticket />
    <room-date @select="handelSelect" />
    <div class="left-bar">房间数量</div>
    <div class="order-num">
      <van-stepper v-model="value" integer input-width="60px" @change="changeOrderNum" />
    </div>
    <div class="left-bar">预订人信息</div>
    <div class="order-userinfo">
      <div class="field-label">入住人</div>
      <van-field v-model="value" placeholder="请输入住人姓名" />
      <div class="field-label">手机号</div>
      <van-field v-model="value" placeholder="请输入接收信息的手机号" />
      <div class="field-label">备注信息</div>
      <van-field v-model="value" type="textarea" rows="1" autosize placeholder="请输入备注信息" />
    </div>
    <!-- 提交订单 -->
    <div class="save-order">
      <van-row type="flex" justify="space-between" align="center">
        <van-col span="6" class>￥10000.00</van-col>
        <van-col span="18" class="save-order-btn">
          <span @click="saveOrder">提交订单</span>
        </van-col>
      </van-row>
    </div>
    <!-- 提交订单 -->
  </div>
</template>

<script>
import serverHttp from '../../../assets/js/api'
import selectPicker from '../../../components/common/selectpicker'
import ticket from "../../../components/detail/ticket";
import roomDate from "../../../components/detail/roomDate";

export default {
  data () {
    return {
      detailId: this.$route.params.id,
      value1: '',
      userName: '',
      date: [{
        name: '今天',
        date: '7/20'
      },
      {
        name: '明天',
        date: '7/21'
      },
      {
        name: '后天',
        date: '7/22'
      }],
      value: ''
    }
  },
  components: {
    selectPicker,
    ticket,
    roomDate
  },
  methods: {
    // 提交订单
    saveOrder () {

    },
    // 数量改变
    changeOrderNum (e) {
      console.log(e)
    },
    // 选择入住时间
    handelSelect (e) {
      console.log(e)
    },
    // 获取订单详情
    preorder () {
      serverHttp.scenicSpotsPreorderApi({}).then(res => {
        console.log(res)
      })
    },
  }
}
</script>