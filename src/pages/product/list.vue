<template>
  <!-- 列表 -->
  <div class="product-list">
    <searchtop />
    <div v-for="(product,i) in products" :key="i">
      <product-card :product="product" @click="showProduct(product)" />
    </div>
  </div>
</template>

<script>
import searchtop from "../../components/search/searchtop";

export default {
  components: {
    searchtop
  },
  data () {
    return {
      value: "",
      filterindex: 0,
      filtersort: false,
      filtershow: false,

      products: [
        {
          id: 1,
          imageURL: 'https://pop.nosdn.127.net/19e33c9b-6c22-4a4b-96da-1cb7afb32712',
          title: 'BEYOND博洋家纺 床上套件 秋冬保暖纯棉床单被套 双人被罩 磨毛全棉印花床品四件套',
          price: '125.50',
        },
      ]
    };
  },
  methods: {
    onFilterBar (value) {
      if (value == 0) {
        this.filtersort = !this.filtersort;
      } else if (value == 3) {
        this.filtershow = !this.filtershow;
      } else {
        this.filtersort = false;
        this.filterindex = value;
      }
    },
    showProduct (product) {
      this.$router.push('/product/' + product.id);
    }
  }
};
</script>

<style lang="less">
.product-list {
  .additional .price {
    position: absolute;
    bottom: 6px;
    height: 34px;
  }
}
.filterbar {
  font-size: 14px;
  position: relative;
  ul {
    width: 100%;
    height: 40px;
  }
  li {
    color: #999;
    width: 25%;
    float: left;
    text-align: center;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #eee;
    i {
      font-size: 12px;
      margin-left: 2px;
    }
    .down {
      -webkit-transform: rotate(90deg);
      transform: rotate(90deg);
    }
  }
  .selected {
    color: #e93b3d;
  }
  .show {
    .down {
      -webkit-transform: rotate(-90deg);
      transform: rotate(-90deg);
    }
  }
  .item_options {
    width: 100%;
    position: absolute;
    top: 41px;
    background: #fff;
    display: none;
    z-index: 1;
    li {
      width: 100%;
      text-align: left;
      padding-left: 10px;
    }
  }

  .item_options.show {
    display: block;
  }
  .filterlayer {
    width: 85%;
    height: 100%;
    background-color: #f7f7f7;
    &_bottom {
      &_buttons {
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        z-index: 10;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;

        .cancel {
          color: #333;
          background-color: #fff;
          box-shadow: 0 -1px 2px 0 rgba(0, 0, 0, 0.07);
        }
        .confirm {
          color: #fff;
          background-color: #e93b3d;
        }
      }
      &_button {
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        flex: 1;
        font-size: 16px;
        height: 49px;
        line-height: 49px;
        text-align: center;
      }
    }
    ul {
      height: auto;
      background: #fff;
      margin-bottom: 15px;
    }
    li {
      width: 100%;
      text-align: left;
      height: auto;
      line-height: initial;
      .van-cell {
        font-size: 16px;
      }
      .big {
        height: 25px;
        max-width: 250px;
        overflow: hidden;
        font-size: 16px;
        color: #333;
        text-overflow: ellipsis;
        margin-left: 10px;
      }
    }
    .filterInner {
      overflow-y: scroll;
      max-height: 100%;
      .van-button {
        height: 40px;
        margin-bottom: 15px;
        line-height: 40px;
      }
    }
    .tags_selection {
      font-size: 14px;
      text-align: center;
      background-color: #fff;
      position: relative;
      margin: 0;
      padding: 10px 0 0 10px;
      .option {
        box-sizing: border-box;
        float: left;
        width: 33.33%;
        padding-right: 10px;
        height: 30px;
        line-height: 30px;
        margin-bottom: 10px;
        a {
          position: relative;
          display: block;
          padding: 0 5px;
          color: #666;
          background-color: #f7f7f7;
          border-radius: 4px;
          overflow: hidden;
          text-overflow: ellipsis;
          height: 30px;
        }
      }
    }
  }
}
</style>
