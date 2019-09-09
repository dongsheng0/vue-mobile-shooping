
<template>
  <!-- 商品详情 -->
  <div class="detail">
    <head-img :detail="details">
      <van-row type="flex" justify="space-between" slot="footer" class="right">
        <van-col span="6" class="type">
          <span class="price">{{goodsSpecDefault.price | price}}</span>
          <span
            class="origin"
            v-if="goodsSpecDefault.special_offer_time_limit"
          >{{goodsSpecDefault.special_offer_price | price}}</span>
        </van-col>
        <van-col span="18" v-if="goodsSpecDefault.special_offer_time_limit">
          <span class="time">
            限时:
            <van-count-down :time="goodsSpecDefault.special_offer_time_limit | countDown" />
          </span>
        </van-col>
      </van-row>
    </head-img>
    <div class="detail-content">
      <!-- 详情介绍 -->
      <introduce :detail="details.detail" :pic="pic"></introduce>
    </div>

    <van-sku
      v-model="show"
      :price="price"
      :sku="sku"
      :goods="goods"
      :show-add-cart-btn="false"
      buy-text="预购"
      :hide-stock="sku.hide_stock"
      :initial-sku="initialSku"
      @buy-clicked="onBuyClicked"
    />
    <!-- 推广部分 -->
    <div class="preorder-btn">
      <div class="share">
        推广
        <span class="money">赚￥2.00</span>
      </div>
      <span class="preorder" @click="handelPreorder">预定</span>
    </div>
  </div>
</template>

<script>
import headImg from "../../../components/detail/head";
import introduce from '../../../components/detail/introduce'
import serverHttp from '../../../assets/js/api'

export default {
  data () {
    return {
      // 规格选择弹框-获取数据 预购的时候从这里
      skuData: {
        selectedSkuComb: {
          id: 2257,
          price: 100,
          s1: '30349',
          stock_num: 111
        }
      },
      show: false,
      price: '5.00',
      none_sku: true,  // 是否无规格商品 
      hide_stock: true,  // 是否隐藏剩余库存
      // 规格选择弹框-渲染
      sku: {
        // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
        // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
        tree: [
          {
            k: '商品规格', // skuKeyName：规格类目名称
            v: [
              {
                id: '111', // skuValueId：规格值 id
                name: '红色', // skuValueName：规格值名称
                price: 200, // 价格（单位分）
                // 规格类目图片，只有第一个规格类目可以定义图片
              }
            ],
            k_s: 's1'
            // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
          }
        ],
        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
        list: [
          {
            id: 11, // skuId，下单时后端需要
            price: 110, // 价格（单位分）
            s1: '111', // 规格类目 k_s 为 s1 的对应规格值 id
            stock_num: 110 // 当前 sku 组合对应的库存
          }
        ],
        price: '', // 默认价格（单位元）
        none_sku: false, // 是否无规格商品
        hide_stock: true // 是否隐藏剩余库存
      },
      initialSku: {
        // 键：skuKeyStr（sku 组合列表中当前类目对应的 key 值）
        // 值：skuValueId（规格值 id）
        // s1: 1,
        // 初始选中数量
        selectedNum: 1
      },
      goods: {
        // 商品标题
        price: '12',
        // 默认商品 sku 缩略图
        picture: ''
      },
      //
      //
      goodsSpecDefault: {}, // 顶部的商品展示第一个规格的商品
      detailId: this.$route.params.id, // 商品id
      pic: '',
      details: {},
    }
  },
  components: {
    headImg,
    introduce,
  },
  methods: {
    onBuyClicked (e) {
      console.log(e)
      if (e && e.selectedSkuComb) {
        this.preorder(e.selectedSkuComb.id, e.selectedNum, e.selectedSkuComb.price / 100)
      } else {
        this.$toast('请先选择商品规格')
      }
    },
    // 预购按钮
    handelPreorder () {
      this.show = true
    },
    // 预购第二步-确定
    preorder (id, buyNum, unitPrice) {
      this.$router.push({ 'path': `/goods/order/${id}`, query: { buyNum, unitPrice } })
    },
    // 初始化商品选购规格
    initSku (skuList) {
      this.sku.tree[0].v = []
      this.sku.list = []
      skuList.forEach(item => {
        let tree = {
          id: item.id,
          name: item.name, // skuValueName：规格值名称
          price: item.price * 100, // 价格（单位分）
        }
        let list = {
          id: item.id, // skuId，下单时后端需要
          price: item.price * 100, // 价格（单位分）
          s1: item.id, // 规格类目 k_s 为 s1 的对应规格值 id
          stock_num: 100000 // 当前 sku 组合对应的库存
        }
        this.sku.tree[0].v.push(tree)
        this.sku.list.push(list)

      });
      this.initialSku.s1 = skuList[0].id
      this.sku.price = skuList[0].price
      this.goods.picture = this.pic.pic_url // 商品的首张图
    },
    getDetail () {
      serverHttp.goodsDetailApi({ id: this.detailId }).then(res => {
        this.details = res.rs
        this.pic = res.rs.pics[0]
        this.details.name = '商品详情'
        this.goodsSpecDefault = this.details.goodsSpecList.length > 0 ? this.details.goodsSpecList[0] : {}
        this.initSku(this.details.goodsSpecList)
      })
    }
  },
  mounted () {
    this.getDetail()
  }
}
</script>
<style lang="less">
@import "../../../assets/style/global";

.detail {
  padding-bottom: 50px;
  .type {
    font-size: 17px;
    font-weight: 600;
    color: #555;
    text-align: left;
  }
  .right {
    line-height: 43px;
    text-align: right;
  }
  .price {
    height: 21px;
    font-size: 15px;
    font-weight: 500;
    color: #ff4728;
  }
  .origin {
    font-size: 11px;
    color: rgba(121, 121, 121, 1);
    margin: 0 14px;
    text-decoration: line-through;
  }
  .time {
    height: 16px;
    font-size: 11px;
    color: rgba(255, 71, 40, 1);
  }

  &-content {
    padding: 0 15px;

    .list {
      border-bottom: 1px solid #ebebeb;
      padding: 0.15rem 0;
      /deep/ .van-row {
        align-items: center;
      }
    }
  }
}
</style>