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
          <p class="date-time">8月8日</p>
        </van-col>
        <van-col span="12">
          <p class="date-time">8月8日</p>
        </van-col>
        <span class="date-split"></span>
      </van-row>
    </div>

    <van-action-sheet v-model="showCalendar" title="标题">
      <inlineCalendar mode="during" @change="changeCalendar" :minDate="minDate" />
      <div class="save" v-show="showSave" @click="handelSave">完成</div>
    </van-action-sheet>
  </div>
</template>
<script>
export default {
  name: 'room-date',
  model: {
    prop: "selectValue"
  },
  props: {
    columns: {
      type: Array
    },
    selectValue: {
      type: String
    }
  },
  data () {
    return {
      minDate: new Date(),
      showSave: false, // 保存按钮
      showCalendar: false, // 日历
      result: this.selectValue, // 选中的最终结果
      selectResult: [] // 选中后未保存结果
    };
  },
  methods: {
    selectData () {
      console.log(0)
      this.showCalendar = true
    },
    // 选中时间
    handelSave () {
      this.showCalendar = false
      this.result = this.selectResult;
    },
    // 选择时间
    changeCalendar (e) {
      this.showSave = e.length > 1 ? true : false
      this.selectResult = e
    },
  },
  watch: {
    selectValue: function (newVal) {
      this.result = newVal;
    },
    result (newVal) {
      this.$emit("select", newVal);
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