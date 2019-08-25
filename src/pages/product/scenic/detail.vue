<style lang="less">
  .detail {

    &-tabs {
      height: 45px;
      border-bottom: 1px solid #EBEBEB;
    }

    &-content {
      padding:0 15px;
      .list{
          border-bottom: 1px solid #EBEBEB;
          padding: .15rem 0;
          /deep/ .van-row{
            align-items: center;
          }
          .type{
            font-size:17px;
            font-weight:600;
            color: #555;
          }
          .right{
                line-height: 43px;
                text-align: right;
          }
          .price{
            height:21px;
            font-size:15px;
            font-weight:500;
            color: #FF4728;
          }
          .origin{
            font-size:11px;
            color:rgba(121,121,121,1);
            margin: 0 14px;
            text-decoration:line-through;
          }
          .time{
            height:16px;
            font-size:11px;
            color:rgba(255,71,40,1);
          }
          .desc{
            font-size:12px;
            color:rgba(85,85,85,1);
            padding: 6px 0 6px 8px;
          }
          .share{
            height: 30px;
            line-height: 30px;
            background: rgba(255,71,40,1);
            margin-right: .5rem;
            border: 0;
          }
          .buy{
            height: 30px;
            line-height: 30px;
            background: rgba(255,71,40,1);
            border: 0;
          }
      }
    }
  }
</style>
<template>
  <!-- 景区详情 -->
  <div class="detail">
    <head-img :detail="detail"></head-img>
    <div class="detail-tabs">

    </div>
    <ul class="detail-content">
      <li v-for="(item, index) in detail.list" class="list" :key="index">
        <van-row type="flex" justify="space-between">
          <van-col span="6" class="type">{{item.piao}}</van-col>
          <van-col span="18" class="right">
            <span class="price">￥ {{item.price}}</span>
            <span class="origin">{{item.price2}}</span>
            <span class="time">限时：{{item.price3}}</span>
          </van-col>
        </van-row> 
        <div class="desc">
          {{item.desc}}
        </div>
        <div class="desc last">
          <van-row type="flex" justify="space-between">
            <van-col span="6">奖励：{{item.price4}}</van-col>
            <van-col span="18" class="right">
              <van-button class="share" round  type="primary">推广</van-button>
              <van-button class="buy"  round  type="primary">预定</van-button>
            </van-col>
          </van-row>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
    import headImg from "../../../components/detail/head";
    import introduce from '../../../components/detail/introduce'
export default {
  data () {
    return {
      detail: {
        list: [
          { price: '29.0',
          price2: '129.0',
           price3: '10:00:00',
           price4: '3.5',
           desc: '请在使用前一天23：00前预订',
           piao: '成人票'}
        ],
        title: '迪斯尼',
        address: '上海',
        tabs: [
          { title: '1日', type: 1, name: 'scenic' },
          { title: '3日', type: 3, name: 'goods' }
        ],
        tags: ['23小时', '24小时', '25小时', '25小时'],
        imagelist: [{
          url: "https://haitao.nos.netease.com/f3kJUUtkrDbsiU1LtopkHcBGgT1809182243_960_480.jpg",
          src: "https://haitao.nos.netease.com/f3kJUUtkrDbsiU1LtopkHcBGgT1809182243_960_480.jpg"
        },
        {
          url: "https://haitao.nosdn2.127.net/EWQ1UI83HQ03U2TLaeShRtEhK19n7175ceTT1809191639_960_480.jpg",
          src: "https://haitao.nosdn2.127.net/EWQ1UI83HQ03U2TLaeShRtEhK19n7175ceTT1809191639_960_480.jpg"
        }]
      }
    }
  },
  components: {
    headImg,
    introduce
  },
  methods: {
    tabClick() {}
  }
}
</script>


