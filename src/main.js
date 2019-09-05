import Vue from 'vue';
import {
  router
} from './config/router';
import './assets/js/userinfo'
import './config/rem';
import App from './App.vue';
import VueLazyload from 'vue-lazyload'
import Calendar from 'vue-mobile-calendar'
import components from './config/components.js';
import moment from 'moment'
Vue.use(components);

Vue.use(VueLazyload)
Vue.use(Calendar)
Vue.config.productionTip = false

new Vue({
  router,
  el: '#app',
  render: h => h(App)
});
Vue.filter('countDown', function (value) {
  return (moment(value).unix() - moment().unix()) * 1000
})
Vue.filter('price', function (value) {
  return `￥${value}`
})