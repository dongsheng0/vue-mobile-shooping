<template>
  <van-cell-group class="additional">
    <van-card
      :title="product.name"
      :centered="true"
      :origin-price="product.originPrice"
      :desc="product.address"
      @click="clickProduct"
      @click-thumb="clickThumb"
    >
      <!-- 自定义图片 -->
      <template slot="thumb">
        <img class="p-img" :src="product.picUrl" />
        <p v-if="product.imageTag!=null&&product.imageTag!=''" class="image_tag">{{product.imageTag}}</p>
      </template>
      <!-- 自定义价格 -->
      <template slot="price">
        <p class="price">
          <span>{{product.price | price}}</span>
          <!-- <span class="price-style">起</span> -->
        </p>
      </template>
      <template slot="origin-price">
        <p class="origin-price" v-if="product.specialOfferTimeLimit">
          <span>原价：{{product.originPrice | price}}</span>
        </p>
      </template>
      <template slot="tags">
        <slot name="tags" />
      </template>
      <template slot="bottom">
        <slot name="bottom" />
      </template>
      <template slot="footer">
        <slot name="footer" />
      </template>
    </van-card>
  </van-cell-group>
</template>

<script>
export default {
  name: 'product-card',
  props: {
    product: Object
  },
  methods: {
    clickProduct (data) {
      this.$emit('click', data)
    },
    clickThumb (data) {
      this.$emit('clickThumb', data)
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
    height: 100%;
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
    .button("green");
  }
  .preorder {
    .button("red");
    margin-left: 0.2rem;
  }
  .card-tag {
    display: inline-block;
    padding: 0 5px;
    border-radius: 9px;
    border: 1px solid rgba(182, 182, 182, 1);
    color: rgba(182, 182, 182, 1);
    line-height: 16px;
    margin: 4px 4px 4px 0;
  }
}
</style>