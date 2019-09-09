import Utils from './utils'
let userid = Utils.getUrlParam('userid')
let webToken = Utils.getUrlParam('webToken')
let nickName = Utils.getUrlParam('nickName')
let avatarUrl = Utils.getUrlParam('avatarUrl')
console.log(userid)
console.log(webToken)
if (userid) {
  let userInfo = {
    userid,
    webToken,
    nickName: decodeURIComponent(nickName),
    avatarUrl: decodeURIComponent(avatarUrl)
  }
  localStorage.setItem('userInfo', JSON.stringify(userInfo))
}