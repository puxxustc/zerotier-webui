import 'babel-polyfill'

import Vue from 'vue'
import Resource from 'vue-resource'
import NProgress from 'vue-nprogress'
import { sync } from 'vuex-router-sync'

import './vendor.js'

import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'

Vue.use(Resource)
Vue.use(NProgress)

sync(store, router)

const nprogress = new NProgress({ parent: '.nprogress-container' })

/* eslint-disable no-new */
new Vue({
  router,
  store,
  nprogress,
  el: 'app',
  render: h => h(App),
})
