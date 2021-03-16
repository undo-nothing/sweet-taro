import Vue from 'vue'
import App from './App.vue'

import './plugins/element.js'
import store from './store'
import router from './router'

import '@/styles/index.scss' // global css
import './icons' // icon
import settings from '@/settings'

// for debug mock data
// require('./mock');

if (process.env.ENV  === 'development') {
  Vue.config.productionTip = false
} else {
  Vue.config.productionTip = true
}

Vue.prototype.mediaBaseUrl = settings.mediaBaseUrl

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
  store,
  render: h => h(App)
}).$mount('#app')
