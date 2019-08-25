<template>
  <div  class="footer">
    <van-tabbar  
        active-color="#333333"
        :route="true"
        inactive-color="#555">
      <van-tabbar-item  to="/home">
        <span>首页</span>
        <span class="home" slot="icon" slot-scope="props" :class="props.active ? 'active' : 'normal'"></span>
        </van-tabbar-item>
      <van-tabbar-item  to="/user">
        <span>我的</span>
        <span class="user" slot="icon" slot-scope="props" :class="props.active ? 'active' : 'normal'"></span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from "vant";
export default {
  name: 'navigate',
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
  },
  active: 0,
}
</script>
<style lang="less">
  .footer{
    /deep/ .van-tabbar{
      margin-bottom: 5px;
      height: 49px;
      background:rgba(255,255,255,1);
      box-shadow:0px -6px 6px 0px rgba(0,0,0,0.03);
    }
    .home{
      display: inline-block;
       width: 48px;
       height: 30px;
      &.active{
        background: url(../../assets/img/icon/icon_home_active.png) no-repeat
      }
      &.normal{
        background: url(../../assets/img/icon/icon_home_normal.png) no-repeat
      }
    }
    .user{
      display: inline-block;
       width: 48px;
       height: 30px;
      &.active{
        background: url(../../assets/img/icon/icon_user_active.png) no-repeat
      }
      &.normal{
        background: url(../../assets/img/icon/icon_user_normal.png) no-repeat
      }
    }
  }
</style>
