import axios from 'axios'


function process(res) {
  if (res.data.error_code == 0) {
    return Promise.resolve(res.data);
  } else {
    return Promise.reject(res.data);
  }
}
const request = (method, url, param) => {
  return axios[method](
      url,
      method == 'get' ? {
        params: param,
      } :
      param
    )
    .then(res => {
      return process(res);
    })
    .catch(err => {
      // Message.error({
      //   message: err.message,
      // });
      return Promise.reject(err);
    });
};

export const getPreviewUrl = (param) => {
  return request('get', '/api/live/courseware/courseware/get_preview_url', param)
}