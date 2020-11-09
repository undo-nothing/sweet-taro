import Vue from 'vue'
import App from './App.vue'

import './plugins/element.js'
import router from './router'

import '@/styles/index.scss' // global css
import './icons' // icon

// for debug mock data
// require('./mock');

// var apiBaseUrl = 'http://127.0.0.1:8000';
var mediaBaseUrl = 'http://127.0.0.1:8000/media/';
var apiUrl = 'http://127.0.0.1:8000/v1.0/';


Vue.config.productionTip = false;
Vue.prototype.mediaBaseUrl = mediaBaseUrl;
Vue.prototype.apiUrl = apiUrl;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
