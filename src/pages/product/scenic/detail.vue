<style lang="less">
@import "../../../assets/style/global";
.detail {
  &-tabs {
    width: 50%;
    height: 45px;
    border-bottom: 1px solid #ebebeb;
  }

  &-content {
    padding: 0 15px;
    .list {
      border-bottom: 1px solid #ebebeb;
      padding: 0.15rem 0;
      /deep/ .van-row {
        align-items: center;
      }
      .type {
        font-size: 17px;
        font-weight: 600;
        color: #555;
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
      .desc {
        font-size: 12px;
        color: rgba(85, 85, 85, 1);
        padding: 6px 0 6px 8px;
      }
      .share {
        .button("green");
        margin-right: 0.5rem;
      }
      .buy {
        .button("red");
      }
    }
  }
}
</style>
<template>
  <!-- 景区详情 -->
  <div class="detail">
    <head-img :detail="details"></head-img>
    <div class="detail-tabs">
      <tabs :tabs="tabs" active="0" @click="tabClick"></tabs>
    </div>
    <div class="detail-content">
      <ul>
        <li v-for="(item, index) in list" class="list" :key="index">
          <van-row type="flex" justify="space-between">
            <van-col span="6" class="type">{{item.specName}}</van-col>
            <van-col span="18" class="right">
              <span class="price">￥ {{item.specialOfferPrice}}</span>
              <span class="origin">{{item.minimumPrice}}</span>
              <span class="time">限时：{{item.specialOfferTimeLimit}}</span>
            </van-col>
          </van-row>
          <div class="desc">
            <p class="point" v-for="(rule, i) in item.useRules" :key="i">{{rule}}</p>
          </div>
          <div class="desc last">
            <van-row type="flex" justify="space-between">
              <van-col span="6">
                <span class="point active">奖励：￥{{item.minimumRakeOff}}</span>
              </van-col>
              <van-col span="18" class="right">
                <span class="share">推广</span>
                <span class="buy">预定</span>
              </van-col>
            </van-row>
          </div>
        </li>
      </ul>
      <!-- 详情介绍 -->
      <introduce :detail="details.detail" :pic="pic"></introduce>
    </div>
  </div>
</template>

<script>
import headImg from "../../../components/detail/head";
import introduce from '../../../components/detail/introduce'
import tabs from '../../../components/common/tabs'

export default {
  data () {
    return {
      pic: '',
      tabs: [],
      list: [],
      details: {},
    }
  },
  components: {
    headImg,
    introduce,
    tabs
  },
  methods: {
    tabClick (e) {
      this.list = this.ticketTypes[e].tickets
    }
  },
  mounted () {
    let res = {
      "name": "北京动物园", //名称
      "address": "北京市西城区西直门外大街137号", //地址
      "pics": [ //5张轮播图片
        {
          "pic_index": 1,
          "is_list": 0,
          "id": 1,
          "pic_url": "http://pw4gcfw3i.bkt.clouddn.com/scenicSpots/2019-08-17/1566053719144.jpg",
          "scenic_spots_id": 1
        },
        {
          "pic_index": 2,
          "is_list": 1,
          "id": 2,
          "pic_url": "http://pw4gcfw3i.bkt.clouddn.com/scenicSpots/2019-08-17/1566053719398.jpg",
          "scenic_spots_id": 1
        },
        {
          "pic_index": 3,
          "is_list": 0,
          "id": 3,
          "pic_url": "http://pw4gcfw3i.bkt.clouddn.com/scenicSpots/2019-08-17/1566053719449.jpg",
          "scenic_spots_id": 1
        },
        {
          "pic_index": 4,
          "is_list": 0,
          "id": 4,
          "pic_url": "http://pw4gcfw3i.bkt.clouddn.com/scenicSpots/2019-08-17/1566053719500.jpg",
          "scenic_spots_id": 1
        },
        {
          "pic_index": 5,
          "is_list": 0,
          "id": 5,
          "pic_url": "http://pw4gcfw3i.bkt.clouddn.com/scenicSpots/2019-08-17/1566053719550.jpg",
          "scenic_spots_id": 1
        }
      ],
      "detail": "<p>北京动物园始建于1906年，在西直门外乐善园、继园和广善寺、惠安寺“两园、两寺”旧址上的清“农事试验场”内，由商部奉旨筹建。园内由动物园、植物园、农事试验三部分组成。最早的动物园位于园内东侧，占地1.5公顷，是中国对公众开放最早的动物园和华北地区对公众开放最早的公园。据考此地也是中国现代动物园、植物园、博物馆的发祥地。</p><p>北京动物园于1955年正式定名，目前占地面积约90公顷，展出珍稀野生动物约500种，5000余只，年接待国内外游客500万人次，发挥着国家动物园功能。北京动物园秉承“教育保护并举，安全服务并重”的工作理念，围绕北京建设世界城市目标，努力打造成为面向国内游客展示首都风采，面向国外游客展示中国形象的北京名片。北京动物园是国家重点公园、国家重点文物保护单位、全国科普教育基地、全国4A级景区。</p><p>斗转星移，物换景迁，往昔试验场，今日动物园。山石古建，廊桥亭榭，河泉陂池，花草藤树，爬虫游鱼，走兽飞禽，济济一堂，相得益彰。科学研究、保护教育、文化交流、知识传播、文物荟萃，功能齐全。少儿发其天真，成人觅其童趣。春花秋月，夏风冬雪，扶老携幼，络绎不绝，天伦同享，古园新晖。</p><p><br/></p>", //详细介绍
      "ticketTypes": [ //该景区下的票分类，比如一日票、二日票
        {
          "name": "门票套票", //分类名称
          "tickets": [ //分类下对应的具体的票
            {
              "id": 1, //票ID
              "name": "门票+熊猫馆票+电子讲解", //票名称
              "specName": "成人票", //票规格
              "specialOfferTimeLimit": "2019-09-01 00:00:00", //限时特价时间，可为null
              "specialOfferPrice": 68, //限时特价的价格
              "minimumPrice": 69, //最低的票价
              "minimumRakeOff": 5, //最低的佣金
              "useRules": [ //使用规则
                "使用1天可退",
                "使用3天可改日期",
                "在预订7天内未使用可退"
              ]
            },
            {
              "id": 3,
              "name": "北京海洋馆票+北京动物园票+熊猫馆票",
              "specName": "双人票",
              "specialOfferTimeLimit": "2019-08-30 18:32:00",
              "specialOfferPrice": 68,
              "minimumPrice": null,
              "minimumRakeOff": null,
              "useRules": [
                "使用1天可退",
                "使用3天可改日期",
                "在预订7天内未使用可退"
              ]
            }
          ]
        },
        {
          "name": "多景点联票",
          "tickets": [
            {
              "id": 2,
              "name": "门票+熊猫馆票+电子讲解",
              "specName": "大学生票",
              "specialOfferTimeLimit": "2019-08-25 15:41:28",
              "specialOfferPrice": null,
              "minimumPrice": null,
              "minimumRakeOff": null,
              "useRules": [
                "请在2天1小时2分前预订"
              ]
            },
            {
              "id": 4,
              "name": "北京海洋馆票+北京动物园票+熊猫馆票",
              "specName": "双人票",
              "specialOfferTimeLimit": "2019-08-25 15:41:28",
              "specialOfferPrice": null,
              "minimumPrice": null,
              "minimumRakeOff": null,
              "useRules": []
            }
          ]
        }
      ]
    }
    this.details = res
    this.pic = res.pics[0]
    this.tabs = res.ticketTypes.map(item => { return { title: item.name, "name": 0 } })
    this.ticketTypes = res.ticketTypes
    this.list = this.ticketTypes[0].tickets
    console.log(res)
  }
}
</script>


