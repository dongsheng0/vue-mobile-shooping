import {
  get,
  post
} from '../../config/axios';
/**
 * 下面是获取数据的接口
 */
/** 
 * 测试接口
 * 名称：exam
 * 参数：paramObj/null
 * 方式：fetch/post/patch/put
 */
const serverHttp = {
  // 首页banner OK
  bannerApi: paramObj => {
    return get('/banner/list', paramObj);
  },
  // 城市列表 OK
  cityApi: paramObj => {
    return get('/city/list', paramObj);
  },
  // 
  //
  //景区部分
  //
  //
  // 首页-景区列表 OK 
  scenicSpotsApi: paramObj => {
    return get('/scenic_spots/list', paramObj);
  },
  // 景区详情 OK
  scenicSpotsDetailApi: paramObj => {
    return get('/scenic_spots/detail', paramObj);
  },
  // 景区详情-下单前 OK
  scenicSpotsPreorderApi: paramObj => {
    return get('/scenic_spots/preorder', paramObj);
  },
  // 景区-创建订单 OK
  scenicSpotsCreateOrderApi: paramObj => {
    return post('/scenic_spots/createOrder', paramObj);
  },
  // 
  // 
  // 酒店部分
  //
  // 首页酒店列表 OK
  hotelListApi: paramObj => {
    return get('/hotel/list', paramObj);
  },
  // 酒店详情 OK
  hotelDetailApi: paramObj => {
    return get('/hotel/detail', paramObj);
  },
  // 酒店-日期筛选房型 OK
  hotelRoomsApi: paramObj => {
    return get('/hotel/rooms', paramObj);
  },
  // 酒店-下单前 OK
  hotelPreorderApi: paramObj => {
    return post('/hotel/preorder', paramObj);
  },
  // 酒店-创建订单 OK
  hotelCreateOrderApi: paramObj => {
    return post('/hotel/createOrder', paramObj);
  },

  // 首页商品列表 OK
  goodslListApi: paramObj => {
    return get('/goods/list', paramObj);
  },
  // 商品详情 OK
  goodsDetailApi: paramObj => {
    return get('/goods/detail', paramObj);
  },
  // 商品-下单前 OK
  goodsPreorderApi: paramObj => {
    return post('/goods/preorder', paramObj);
  },
  // 商品-创建订单 OK
  goodsCreateOrderApi: paramObj => {
    return post('/goods/createOrder', paramObj);
  },



  //
  //个人中心
  //
  // 我的订单 OK
  userOrdersApi: paramObj => {
    return get('/user/orders', paramObj);
  },
  //
  // 订单支付 OK
  userPayApi: paramObj => {
    return post('/user/pay', paramObj);
  },
};
export default serverHttp;