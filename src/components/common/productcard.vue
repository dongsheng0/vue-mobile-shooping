<template>
  <van-cell-group class="additional">
    <van-card
      :title="product.name"
      :centered="true"
      :origin-price="product.minimumPrice"
      :desc="product.desc"
      :num="(iscard?null:product.quantity)"
      @click="clickProduct"
    >
      <!-- 自定义图片 -->
      <template slot="thumb">
        <img class="p-img" :src="product.picUrl" />
        <p v-if="product.imageTag!=null&&product.imageTag!=''" class="image_tag">{{product.imageTag}}</p>
      </template>
      <!-- 自定义价格 -->
      <template slot="price">
        <p class="price">
          ￥
          <span>{{product.price}}</span> 起
        </p>
      </template>
      <!-- 描述下方标签区域-->
      <template slot="tags"></template>
      <template slot="bottom">
        <div class="p-tag">
          <span class="p-tag-icon"></span>
          <span class="p-tag-price">￥{{product.minimumPrice}}</span>
        </div>
        <!-- <div class="p-time">
                    <span class="p-time-end">限时：{{product.time}}</span>
                    <div class="p-tag">
                        <span class="p-tag-icon"></span>
                        <span class="p-tag-price">￥{{product.price}}</span>
                    </div>
        </div>-->
      </template>
      <template slot="footer">
        <div>
          <van-row type="flex" justify="space-between">
            <van-col span="18">
              <span class>{{product.shareMeg}}</span>
            </van-col>
            <van-col span="6">
              <span class="share">推广</span>
            </van-col>
          </van-row>
        </div>
      </template>
    </van-card>
    <!-- <van-cell v-for="(gift,j) in product.gift" :key="j" :value="'x'+gift.quantity">
            <template slot="title">
                <van-tag type="danger" v-if="j==0">赠品</van-tag>
                <span class="van-cell-text" :style="(j>0?'margin-left: 35px;':'')">{{gift.title}}</span>
            </template>
    </van-cell>-->
    <slot />
  </van-cell-group>
</template>

<script>
export default {
  name: 'product-card',
  props: {
    product: Object,
    iscard: {
      type: Boolean,
      default: false
    },
  },
  methods: {
    clickProduct (data) {
      this.$emit('click', data)
    }
  }
}
</script>

<style lang="less">
@import "../../assets/style/global.less";
.additional {
  .p-img {
    background-color: rgba(216, 216, 216, 1);
    border-radius: 8px;
  }
  .p-tag {
    float: right;
    min-width: 46px;
    height: 26px;
    display: inline-block;
    background: rgba(252, 157, 96, 0.3);
    border-radius: 13px;
    padding: 0 13px;
    font-weight: 500;
    font-size: 16px;
    line-height: 26px;
    color: #fd6234;
    &-icon {
      width: 13px;
      height: 12px;
      background: url(../../assets/img/icon/icon_gift.png) no-repeat;
      display: inline-block;
    }
  }
  .p-time {
    .p-time-end {
      color: #fd6234;
      font-size: 12px;
    }
  }
  .van-cell:not(:last-child)::after {
    border: 0;
  }
  /deep/ .van-card__title {
    font-size: 15px;
    font-weight: 500;
    color: #424242;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  /deep/ .van-card__desc {
    padding: 5px 0;
  }
  .share {
    .button("red");
  }
}
</style>