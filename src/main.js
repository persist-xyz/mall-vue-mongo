// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import vueLazyload from 'vue-lazyload'
import App from './App'
import router from './router'
import store from './store'
import axios from '@/utils/axios'
import '@/assets/css/reset.scss'
import '@/assets/css/common.scss'

import toast from '@/components/toast'

import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll)

Vue.use(vueLazyload, {
  loading: '/static/loading-bars.svg'
})
Vue.config.productionTip = false

Vue.prototype.$ajax = axios
Vue.prototype.$toast = toast

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
