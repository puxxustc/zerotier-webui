import $ from 'jquery'

import store from 'src/store/index.js'

const api = (options) => {
  const {apiRoot, token} = store.getters.service
  options.url = `${apiRoot}${options.url}`
  options.headers = {
    'X-ZT1-Auth': token,
  }
  $.ajax(options)
}

export default api
