<template>
  <!-- 我的  -->
  <div class="user">
    <!-- 信息 -->
    <div class="user-profile">
      <img  class="avatar" src="http://pw4gcfw3i.bkt.clouddn.com/scenicSpots/2019-08-17/1566053719550.jpg"  alt="用户头像" />
      <div class="username">用户名字</div>
      <van-row class="user-profile-content">
        <van-col span="12">
          <p class="title">可提现收益</p>
          <p class="money">￥33333.44</p>
          <p class="btn">去提现</p>
          <!-- <router-link to="/user/withdrawal" class="btn">去提现</router-link> -->
        </van-col>
        <van-col span="12">
          <p class="title">累计总收益</p>
          <p class="money">￥3333.44</p>
          <p class="btn">收益详情</p>
          <!-- <router-link to="/user/profit/detail" class="btn">收益详情</router-link> -->
        </van-col>
      </van-row>
    </div>
    <!-- 菜单 -->
    <div class="user-menu">
      <van-row gutter="15">
        <van-col span="12" class="menu-item">
         <div class="menu-item-link">
           <i class="menu-item-icon"></i>
           <p class="menu-item-name">我的推广</p>
         </div>
        </van-col>
        <van-col span="12" class="menu-item" is-link >
          <router-link to="/user/order" class="menu-item-link">
            <i class="menu-item-icon"></i>
            <p class="menu-item-name">我的订单</p>
          </router-link>
        </van-col>
      </van-row>
    </div>
    <navigate />
  </div>
<!--   
    <van-cell-group class="user-group">
      <van-cell title="我的订单" value="查看全部订单" is-link  to="/user/order"/>
      <van-row class="user-links">
        <router-link to="/user/order">
          <van-col span="6">
            <van-icon name="after-sale">
              <van-info :info="data.AfterSaleTotal" />
            </van-icon>
            <div>我的订单</div>
          </van-col>
        </router-link>
      </van-row>
    </van-cell-group> -->

</template>

<script>

export default {
  data () {
    return {
      data: {}
    }
  },
  components: {
  },
  created: function () {
   
  },
};
</script>
<style lang="less" scoped>
  .user {
    padding: 1rem 15px 20px 15px;

    &-profile {
      text-align: center;
      display: block;
      background: url("../../assets/img/user_bj.png") no-repeat;
      background-size: 100% 100%;
      box-shadow: 0px 8px 30px 0px rgba(246, 130, 89, 0.15);
      color: #fff;
      padding-bottom: 2rem;

      .avatar {
        width: 62px;
        height: 62px;
        border-radius: 50%;
        border: 3px solid #fff;
        overflow: hidden;
        margin-top: -33px;
      }

      .username {
        font-size: 17px;
        padding: .5rem 0 .7rem;
      }

      &-content {
        .title {
          font-size: 16px;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          line-height: 22px;
          text-align: center;
        }

        .money {
          font-size: 30px;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          line-height: 42px;
          margin: 0.9rem 0;
        }

        .btn {
          display: inline-block;
          padding: 0 6px;
          line-height: 24px;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 1);
          font-size: 13px;
          font-weight: 500;
          margin: 0 auto;
          color: #fff;
        }
      }
    }

    &-menu {
      display: block;
      margin-top: 20px;

      .menu-item {
        .menu-item-link {
          display: block;
          text-align: center;
          background: rgba(255, 255, 255, 1);
          box-shadow: 0px 8px 30px 0px rgba(246, 130, 89, 0.15);
          border-radius: 12px;
          padding-bottom: 20px;
        }

        &-icon {
          display: inline-block;
          width: 95px;
          height: 80px;
          background: url("../../assets/img/user_share.png") no-repeat;
        }

        &-name {
          font-size: 15px;
          font-weight: 500;
          color: rgba(114, 114, 114, 1);
          line-height: 21px;
        }

        &+.menu-item {
          .menu-item-icon {
            background: url("../../assets/img/user_order.png") no-repeat;
          }
        }
      }
    }
  }
</style>
