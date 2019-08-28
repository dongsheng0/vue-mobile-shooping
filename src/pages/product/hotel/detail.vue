<style lang="less">
@import "../../../assets/style/global";
.detail {
  .date {
    position: relative;
    text-align: center;
    font-size: 14px;
    margin: 10px 0;
    font-weight: 500;
    color: rgba(66, 66, 66, 1);
    line-height: 20px;
    .date-in {
      background: url("../../../assets/img/hotel_in.png") no-repeat left center;
      padding-left: 19px;
    }
    &-out {
      background: url("../../../assets/img/hotel_out.png") no-repeat left center;
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
}
</style>

<template>
  <!-- 酒店详情 -->
  <div class="detail">
    <!-- <head-img :detail="details"></head-img> -->
    <div class="date">
      <van-row>
        <van-col span="12">
          <span class="date-in" @click="selectData">入住日期</span>
        </van-col>
        <van-col span="12">
          <span class="date-in" @click="selectData">离店日期</span>
        </van-col>
      </van-row>
      <van-row class="date-content">
        <van-col span="12">
          <p class="date-time" @click="selectData">8月8日</p>
        </van-col>
        <van-col span="12">
          <p class="date-time" @click="selectData">8月8日</p>
        </van-col>
        <span class="date-split"></span>
      </van-row>
    </div>

    <div v-for="item in productList" :key="item.id">
      <product-card :product="item" />
    </div>

    <van-action-sheet v-model="show" title="标题">
      <inlineCalendar mode="during" @change="change" :minDate="minDate" />
      <div class="save" v-show="isShowSave">完成</div>
    </van-action-sheet>
  </div>
</template>
<script>
import headImg from "../../../components/detail/head";

export default {
  data () {
    return {
      productList: [],
      show: false,
      minDate: new Date(),
      isShowSave: false,
      details: {}
    }
  },
  components: {
    headImg
  },
  methods: {
    selectData () {
      console.log(0)
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

