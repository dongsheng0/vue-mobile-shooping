/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * dataSources：数据源
 */

let base = {
  'development': 'https://xiaoxue-live.test-dahai.com',
  'testing': 'https://s4.test-v2-live.qdsay.com',
  'production': 'https://v2-live.dahai.com'
}
let baseUrl = base[process.env.NODE_ENV]; 
let routerMode = 'hash';
let dataSources='local'; //local=本地，其他值代表非本地 serve

export {
	baseUrl,
	routerMode,
	dataSources,
}