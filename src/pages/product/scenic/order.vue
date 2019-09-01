<style lang="less" scoped>
  @import "../../../assets/style/global";
  .order{
    .date{
      color: #424242;
      margin: .5rem 0;
      
      &-btn{
        margin-left: 10px;
        padding: 10px 0;
        display: block;
        line-height: 18px;
        text-align: center;
        box-shadow:0px 6px 12px 0px rgba(0,0,0,0.08);
        border-radius:13px;
        background: #fff;
        &.active{
          color: #fff;
           background: linear-gradient(-90deg, rgba(254, 167, 99, 0.5) 0%, rgba(242, 111, 84, 1) 100%);
        }
      }
      &-btn-last{
        border-radius:13px 0 0 13px;
        height: 100%;
        box-sizing: border-box;
        line-height: 36px;
      }
    }
    .tips{
      float: right;
      color:rgba(254,163,98,1);
      line-height:17px;
      font-size:12px;
    }
  }
</style>

<template>
  <!-- 提交订单-景区 -->
  <div class="order">
    <ticket />
    <div class="left-bar">使用日期</div>
    <div class="date">
      <van-row type="flex" justify="space-between">
        <van-col span="6" v-for="(item, i) in date" :key="i">
          <div class="date-btn active">
            <p>今天7/7</p>
            <p>269.00元</p>
          </div>
        </van-col>
        <van-col span="6" @click="handelDatetimePicker">
          <div class="date-btn date-btn-last">
            <p>更多日期</p>
          </div>
        </van-col>
      </van-row>
    </div>
    <div class="left-bar">
      购买数量
      <span class="tips">每个证件号码购买一次</span>
    </div>
    <div class="order-num">
      <van-stepper v-model="value" integer input-width="60px" @change="changeOrderNum" />
    </div>
    <div class="left-bar">预订人信息</div>
    <div class="order-userinfo">
        <div class="field-label">联系人</div>
        <van-field v-model="value" placeholder="请输入用户名" />
        <div class="field-label">手机号</div>
        <van-field v-model="value" placeholder="请输入接收信息的手机号" />
        <div class="field-label">证件类型</div>
        <select-picker  placeholder="请选择证件类型" v-model="value1" :columns="[1, 2, 3]" />
        <div class="field-label">证件号</div>
        <van-field v-model="value" placeholder="请输入接收信息的手机号" />
        <div class="field-label">备注信息</div>
        <van-field v-model="value" type="textarea" rows="1" autosize placeholder="请输入备注信息" />
    </div>
    <!-- 提交订单 -->
    <div class="save-order">
      <van-row type="flex" justify="space-between" align="center">
        <van-col span="6" class="">￥10000.00</van-col>
        <van-col span="18" class="save-order-btn"><span @click="saveOrder">提交订单</span></van-col>
      </van-row>
    </div>
    <!-- 提交订单 -->
    <van-popup v-model="showDatetimePicker" position="bottom">
        <van-datetime-picker v-model="currentDate" type="date" :min-date="minDate" @cancel="show = !show"  @confirm="onConfirmDatetimePicker" />
    </van-popup>
  </div>
</template>

<script>
import serverHttp from '../../../assets/js/api'
import selectPicker from '../../../components/common/selectpicker'
import ticket from "../../../components/detail/ticket";
export default {
  data () {
    return {
      ticket: '房子类型', // 房子类型
      showDatetimePicker: false,
      minDate: new Date(),
      currentDate: new Date(),
      value1:'',
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
    ticket
  },
  methods: {
    // 提交订单
    saveOrder() {

    },
    handelDatetimePicker() {
      this.showDatetimePicker = true
    },
    // 选择日期-确定
    onConfirmDatetimePicker(value) {
      this.result = value;
      this.showDatetimePicker = !this.show;
      console.log(value)
    },
    // 数量改变
    changeOrderNum () {

    },
    // 获取订单详情
    preorder() {
      serverHttp.scenicSpotsPreorderApi({}).then(res=> {
          console.log(res)
      })
    },
  }
}
</script>