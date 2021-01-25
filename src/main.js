import Vue from 'vue'
import App from './App.vue'

import './plugins/element.js'
import router from './router'

import '@/styles/index.scss' // global css
import './icons' // icon
import settings from '@/settings'

// for debug mock data
// require('./mock');

Vue.config.productionTip = false
Vue.prototype.mediaBaseUrl = settings.mediaBaseUrl
Vue.prototype.apiUrl = settings.baseUrl + '/v1.0/'

console.log(settings.mediaBaseUrl, settings.baseUrl)

Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  } else {
    document.title = settings.title
  }
  next()
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
