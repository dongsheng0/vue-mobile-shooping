import {
  get,
  post
} from "../../config/axios"
let API = '/cgi'
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
  // 首页banner
  bannerApi: (paramObj) => {
    return get(`${API}/banner/list`, paramObj);
  },
  // 城市列表
  cityApi: (paramObj) => {
    return get(`${API}/city/list`, paramObj);
  }
}
export default serverHttp