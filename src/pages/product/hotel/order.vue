<style lang="less" scoped>
@import "../../../assets/style/global";
</style>
<template>
  <!-- 提交订单-酒店 -->
  <div class="order">
    <ticket />
    <room-date v-model="selectValue" @change="changeRoomDate" :hotelId="detailId" />
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
      selectValue: [], // 入住日期
      detailId: this.$route.params.id,
      value1: '',
      userName: '',
      value: '',
      details: {}, // 详情
    }
  },
  components: {
    selectPicker,
    ticket,
    roomDate
  },
  mounted () {
    this.preorder()
  },
  methods: {
    // 提交订单
    saveOrder () {

    },
    changeRoomDate (e) {

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
      // 房型ID（不是酒店ID）
      serverHttp.hotelPreorderApi({ id: this.detailId }).then(res => {
        let result = res.rs
        this.details = {
          name: result.hotelName,
          source: 'hotel'
        }
        console.log(this.details);
      })
    },
  }
}
</script>