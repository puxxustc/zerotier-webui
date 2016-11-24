import Vue from 'vue'
import VueRouter from 'vue-router'

import views from './views.js'

// install router
Vue.use(VueRouter)

const fallbackRoute = {
  path: '*',
  redirect: {name: 'settings'},
}

// create router
const router = new VueRouter({
  mode: 'hash',
  linkActiveClass: 'is-active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    ...views,
    fallbackRoute,
  ],
})

export default router
