import Utils from './utils'
let userid = Utils.getUrlParam('userid')
let webToken = Utils.getUrlParam('webToken')
console.log(userid)
console.log(webToken)
if (userid) {
  let userInfo = {
    userid,
    webToken
  }
  localStorage.setItem('userInfo', JSON.stringify(userInfo))
}