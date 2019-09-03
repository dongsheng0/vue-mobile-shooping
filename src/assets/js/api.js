import {get, post} from '../../config/axios';
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
    return get ('/banner/list', paramObj);
  },
  // 城市列表 OK
  cityApi: paramObj => {
    return get ('/city/list', paramObj);
  },
  // 首页-景区列表 OK spots
  scenicSpotsApi: paramObj => {
    return get ('/scenic_spots/list', paramObj);
  },
  // 景区详情 OK
  scenicSpotsDetailApi: paramObj => {
    return get ('/scenic_spots/detail', paramObj);
  },
  // 景区详情-下单前 OK
  scenicSpotsPreorderApi: paramObj => {
    return get ('/scenic_spots/preorder', paramObj);
  },
  // 景区-创建订单 OK
  scenicSpotsCreateOrderApi: paramObj => {
    return get('/scenic_spots/createOrder', paramObj);
  },
  // 酒店
  // 首页酒店列表 OK
  hotelListApi: paramObj => {
    return get ('/hotel/list', paramObj);
  },
  // 酒店详情
  hotelDetailApi: paramObj => {
    return get('/hotel/detail', paramObj);
  },
  // 酒店-日期筛选房型
  hotelRoomspi: paramObj => {
    return get('/hotel/detail', paramObj);
  },
};
export default serverHttp;
