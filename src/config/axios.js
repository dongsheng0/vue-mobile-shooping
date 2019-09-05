import axios from 'axios';
axios.defaults.timeout = 5000;

let headers = {
  'Content-Type': 'application/x-www-form-urlencoded'
}
let userInfo = JSON.parse(localStorage.getItem('userInfo'))
let temp = {}
if (userInfo) {
  let {
    userid,
    webToken
  } = userInfo
  temp = {
    userid,
    webToken
  }
}
let configHeaders = {
  ...headers,
  ...temp
}
const requestHandler = config => {
  config.data = JSON.stringify(config.data);
  config.headers = configHeaders
  return config;
}
const errorHandler = error => Promise.reject(error);
//http request 拦截器
axios.interceptors.request.use(requestHandler, errorHandler);

const responseHandler = response => {
  return response
}
const responseHandlerError = err => {
  let errMsg = ''
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        errMsg = '错误请求'
        break;
      case 401:
        errMsg = '未授权，请重新登录'
        break;
      case 403:
        errMsg = '拒绝访问'
        break;
      case 404:
        errMsg = '请求错误,未找到该资源'
        break;
      case 405:
        errMsg = '请求方法未允许'
        break;
      case 408:
        errMsg = '请求超时'
        break;
      case 500:
        errMsg = '服务器端出错'
        break;
      case 501:
        errMsg = '网络未实现'
        break;
      case 502:
        errMsg = '网络错误'
        break;
      case 503:
        errMsg = '服务不可用'
        break;
      case 504:
        errMsg = '网络超时'
        break;
      case 505:
        errMsg = 'http版本不支持该请求'
        break;
      default:
        errMsg = `连接错误${err.response.status}`
    }
  } else {
    errMsg = '连接到服务器失败'
  }
  console.log(`10000${errMsg}`)
  return Promise.resolve(err.response)
}
//响应拦截器即异常处理
axios.interceptors.response.use(responseHandler, responseHandlerError)

let API = '/cgi'

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */
function process(res) {
  if (res.data.code == 0) {
    return Promise.resolve(res.data);
  } else if (res.data.code == 401) {
    this.$toast('未授权，请重新登录')
    return Promise.reject(res.data);
  } else {
    this.$toast(res.data.msg)
    return Promise.reject(res.data);
  }
}
export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(`${API}${url}`, {
        params: params
      })
      .then(res => {
        if (res.data.code == 0) {
          resolve(res.data);
        } else {
          reject(res.data);
        }
      })
      .catch(err => {
        reject(err)
      })
  })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(`${API}url`, data)
      .then(response => {
        process(response)
      }, err => {
        reject(err)
      })
  })
}