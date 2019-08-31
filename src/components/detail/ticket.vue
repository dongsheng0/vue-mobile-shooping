<style lang="less" scoped>
  .ticket{
      position: relative;
      margin: 22px 15px;
      background:rgba(255,255,255,1);
      box-shadow:0px 8px 30px 0px rgba(246,130,89,0.15);
      min-height: 1rem;
      box-sizing: border-box;
      padding: 3px 0 3px .5rem ;
      &-left-content{
        border-right: 1px dashed #D6D6D6;
      }
      h4{
        line-height: 25px;
        padding: 5px 0;
        font-size:18px;
        font-weight:500;
        color:rgba(66,66,66,1);
        padding-left: 4px;
      }
      .ticket-type{
        text-align: center;
        font-size:14px;
        font-weight:600;
        color:rgba(254,163,98,1);
        line-height:16px;
      }
      &-left{
        position: absolute;
        top:0;
        left: 0;
        width:7px;
        height: 100%;
        border-radius: 7px 0 0 7px;
        background:linear-gradient(360deg,rgba(242,111,84,1) 0%,rgba(255,168,99,1) 100%);
      }
      &-img{
          width: 1rem;
          height: 1rem;
          margin-right: 10px;
          border-radius:4px;
      }
      .point:last-child{
          margin-bottom: 10px;
      }
    }
</style>
<template>
<div class="ticket">
    <van-row type="flex" align="center">
        <van-col span="20" class="ticket.source !='goods' ? 'ticket-left-content' : ''">
            <h4>{{ticket.name}}</h4>
            <p class="point" v-for="(i, key) in ticket.list" :key="key">{{i}}</p>
        </van-col>
        <van-col span="4">
            <div class="ticket-type" v-if="ticket.source !='goods'">
                <p v-for="(item, i) in ticket.piao" :key="i">{{item}}</p>
            </div>
            <img class="ticket-img" :src="ticket.url" alt="" v-else>
        </van-col>
    </van-row>
    <span class="ticket-left"></span>
</div>
</template>

<script>
    export default {
        name: 'ticket',
        props: {
            ticket: {
                type: Object,
                default: function () {
                    return {
                        source: 'goods',
                        url: 'http://pw4gcfw3i.bkt.clouddn.com/scenicSpots/2019-08-17/1566053528010.jpg',
                        piao: '成人票',
                        name: '故宫',
                        list: ['请在使用前一天23：00前预订', '请在使用前一天23：00前预订', '请在使用前一天23：00前预订']
                    }
                }
            }
        },
        data() {
            return {

            }
        }
    }
</script>