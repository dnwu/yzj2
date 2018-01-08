// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import store from './store'
import VueCookie from 'vue-cookie'
import '@/config/number'
import EasyScroll from 'easyscroll'
import axios from '@/config/axios'

Vue.prototype.axios = axios

Vue.config.productionTip = false;
Vue.use(ElementUI)
Vue.use(VueCookie)
Vue.use(EasyScroll)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  axios,
  store,
  template: '<App/>',
  components: { App }
})
