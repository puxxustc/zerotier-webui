import Vue from 'vue'
import Vuex from 'vuex'

import * as actions from './actions'
import * as getters from './getters'
import * as types from './mutation-types.js'

Vue.use(Vuex)

const state = {
  service: {
    apiRoot: '',
    token: '',
    valid: false,
  },
}

const mutations = {
  [types.SET_SERVICE_API] (state, service) {
    state.service = {...state.service, ...service}
    window.localStorage.setItem('zerotier-webui.service', JSON.stringify(service))
  },
}

const store = new Vuex.Store({
  state,
  actions,
  getters,
  mutations,
  strict: process.env.NODE_ENV !== 'production',
})

export default store
