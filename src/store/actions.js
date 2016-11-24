import $ from 'jquery'

import * as types from './mutation-types.js'

export const setServiceAPI = ({ commit }, service = {}) => {
  // load token from localStorage
  if (!service.valid) {
    try {
      const s = window.localStorage.getItem('zerotier-webui.service')
      if (s) {
        service = JSON.parse(s)
      }
    } catch (e) {
      // empty
    }
  }
  if (!service.valid) {
    commit(types.SET_SERVICE_API, service)
  } else {
    // check if service valid
    const {apiRoot, token} = service
    $.ajax({
      url: `${apiRoot}/status`,
      type: 'GET',
      headers: {
        'X-ZT1-Auth': token,
      },
      success: (data) => {
        commit(types.SET_SERVICE_API, service)
      },
      error: () => {
        service.valid = false
        commit(types.SET_SERVICE_API, service)
      },
    })
  }
}
