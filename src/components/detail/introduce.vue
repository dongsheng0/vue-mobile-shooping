
<style lang="less">
.introduce {
  .title {
    text-align: center;
    padding: 10px 0 16px 0;
    &-content {
      .title-icon {
        display: inline-block;
        width: 13px;
        height: 8px;
        background: url(../../assets/img/icon/icon_title.png) no-repeat;
        margin: 6px 4px 0 4px;
      }

      .title-name {
        height: 22px;
        font-size: 16px;
        font-weight: 600;
        color: rgba(85, 85, 85, 1);
        line-height: 22px;
      }
    }
  }
  .desc {
    font-size: 13px;
    color: rgba(85, 85, 85, 1);
    line-height: 19px;
  }
  img {
    width: 100%;
    border-radius: 10px;
  }
}
</style>
<template>
  <!-- 景区介绍，景区介绍 -->
  <div class="introduce">
    <div class="title">
      <div class="title-content">
        <span class="title-icon"></span>
        <span class="title-name">景区</span>
        <span class="title-icon"></span>
      </div>
    </div>
    <div class="desc" v-html="detail"></div>
    <img :src="pic" alt />
  </div>
</template>

<script>
export default {
  name: 'introduce',
  props: ['detail', 'pic'],
  data () {
    return {

    }
  }
}
</script>