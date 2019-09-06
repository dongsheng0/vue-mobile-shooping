<template>
  <div class="room-date">
    <div class="date">
      <van-row>
        <van-col span="12" @click="selectData">
          <span class="date-in">入住日期</span>
        </van-col>
        <van-col span="12">
          <span class="date-in">离店日期</span>
        </van-col>
      </van-row>
      <van-row class="date-content" @click="selectData">
        <van-col span="12">
          <p class="date-time">{{start}}</p>
        </van-col>
        <van-col span="12">
          <p class="date-time">{{end}}</p>
        </van-col>
        <span class="date-split"></span>
      </van-row>
    </div>

    <van-action-sheet v-model="showCalendar" title="标题">
      <inlineCalendar mode="during" @change="changeCalendar" :minDate="minDate" :defaultDate="defaultDate" />
      <div class="save" v-show="showSave" @click="handelSave">完成</div>
    </van-action-sheet>
  </div>
</template>
<script>
import serverHttp from '../../assets/js/api'
import moment from 'moment'
export default {
  name: 'room-date',
  model: {
    prop: "selectValue",
    event: 'input'
  },
  props: {
    hotelId: {
      type: String || Number
    },
    selectValue: {
      type: Array
    },
    startDay: {
      type: String
    },
    endDay: {
      type: String
    }
  },
  data () {
    return {
      defaultDate: [new Date(), new Date()],
      start: '请选择',
      end: '请选择',
      minDate: new Date(),
      showSave: false, // 保存按钮
      showCalendar: false, // 日历
      result: [], // 选中的最终结果 ["20190212", "20190212"]
      roomList: [], // 接口返回时间段内的房间数
      resultTemp: [] // 日历选中后，保存按钮点击前的结果
    };
  },
  mounted () {
    if (this.$route.query.startDay) {
      this.start = `${moment(this.$route.query.startDay).get('month') + 1}月${moment(this.$route.query.startDay).get('date')}日`
      this.end = `${moment(this.$route.query.endDay).get('month') + 1}月${moment(this.$route.query.endDay).get('date')}日`
    }
  },
  methods: {
    selectData () {
      console.log(0)
      this.showCalendar = true
    },
    // 弹框点击完成-最终选中时间
    async handelSave () {
      await this.gethotelRoomsApi(moment(this.resultTemp[0].$d).format('YYYYMMDD'), moment(this.resultTemp[1].$d).format('YYYYMMDD'))
      this.showCalendar = false
      this.result = [moment(this.resultTemp[0].$d).format('YYYYMMDD'), moment(this.resultTemp[1].$d).format('YYYYMMDD')]
      this.start = `${this.resultTemp[0].$M + 1}月${this.resultTemp[0].$D}日`
      this.end = `${this.resultTemp[1].$M + 1}月${this.resultTemp[1].$D}日`
    },
    // 根据日期获取房间
    gethotelRoomsApi (startDay, endDay) {
      let data = { id: this.hotelId, startDay, endDay }
      serverHttp.hotelRoomsApi(data).then(res => {
        this.$emit("change", res.rs);
      })
    },
    // 日历-选择完时间
    changeCalendar (e) {
      this.showSave = e.length > 1 ? true : false
      this.resultTemp = e
    },
  },
  watch: {
    selectValue: function (newVal) {
      this.result = newVal;
    },
    result (newVal) {
      this.$emit("input", newVal);
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/style/global";
.room-date {
  .date {
    position: relative;
    text-align: center;
    font-size: 14px;
    margin: 10px 0;
    font-weight: 500;
    color: rgba(66, 66, 66, 1);
    line-height: 20px;
    .date-in {
      background: url("../../assets/img/hotel_in.png") no-repeat left center;
      padding-left: 19px;
    }
    &-out {
      background: url("../../assets/img/hotel_out.png") no-repeat left center;
      padding-left: 19px;
    }
    .date-content {
      position: relative;
    }
    &-time {
      width: 110px;
      height: 48px;
      margin: 10px auto;

      background: rgba(255, 249, 246, 1);
      box-shadow: 0px 8px 8px 0px rgba(253, 157, 101, 0.14);
      border-radius: 15px;
      line-height: 48px;
    }
    &-split {
      position: absolute;
      left: 50%;
      margin-left: -14px;
      bottom: 30px;
      width: 28px;
      height: 2px;
      background-color: @primary;
    }
  }
  .save {
    .button("red", @width:70%);
    display: block;
    margin: 10px auto;
  }
  /deep/
    .m-calendar
    .m-months-container
    .m-months-wrapper
    .m-months
    .m-row
    .m-day
    .m-during {
    background-color: @primary;
  }
}
</style>