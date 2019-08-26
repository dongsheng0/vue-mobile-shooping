import Vue from 'vue';
import {
  router
} from './config/router';
import './config/rem';
import App from './App.vue';
import VueLazyload from 'vue-lazyload'
import Calendar from 'vue-mobile-calendar'
import components from './config/components.js';
Vue.use(components);

Vue.use(VueLazyload)
Vue.use(Calendar)
Vue.config.productionTip = false

new Vue({
  router,
  el: '#app',
  render: h => h(App)
});