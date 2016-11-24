<template lang="pug">
div
  div.section
    h3.title.is-3
      span Settings
    hr
    div.columns
      div.column.is-one-third
        div
          p.control
            label.label ZeroTier Service API:
            input.input.is-disabled(
              v-model="apiRoot",
              type="text",
              placeholder="http://127.0.0.1:9993",
              :class="{'is-danger': !apiRootValid}")
            span.help.is-danger(v-if="!apiRootValid") Failed to connect ZeroTier Service API
          p.control
            label.label Token:
            input.input(
              v-model="token",
              type="text",
              :class="{'is-danger': !tokenValid}")
            span.help.is-danger(v-if="!tokenValid") Token invalid

          p.control
            button.button.is-primary(
              @click="save",
              :class="{'is-disabled': !valid}")
              | Save
</template>

<script>
import $ from 'jquery'

import openMessage from 'src/lib/message.js'

export default {
  data () {
    return {
      apiRoot: 'http://127.0.0.1:9993',
      apiRootValid: true,
      token: '',
      tokenValid: true,
      error: 0,
    }
  },
  computed: {
    service () {
      return this.$store.getters.service
    },
    valid () {
      const {apiRootValid, tokenValid} = this
      return apiRootValid && tokenValid
    },
  },
  methods: {
    testServiceApi () {
      const {apiRoot, token} = this
      if (apiRoot && token) {
        const url = `${apiRoot}/status`
        $.ajax({
          url,
          type: 'GET',
          headers: {
            'X-ZT1-Auth': token,
          },
          success: (data) => {
            let apiRootValid = true
            if (!(data instanceof Object)) {
              apiRootValid = false
            } else if (!data.versionMajor || !data.versionMinor) {
              apiRootValid = false
            } else {
              this.tokenValid = true
            }
            this.apiRootValid = apiRootValid
          },
          error: (xhr) => {
            let apiRootValid = true
            let tokenValid = true
            if (xhr.status === 401) {
              apiRootValid = true
              tokenValid = false
            } else {
              apiRootValid = false
              tokenValid = false
            }
            this.apiRootValid = apiRootValid
            this.tokenValid = tokenValid
          },
        })
      }
    },
    save () {
      const {apiRoot, token} = this
      this.$store.dispatch('setServiceAPI', {apiRoot, token, valid: true})
      openMessage({
        title: '',
        message: 'Saved!',
        duration: 2000,
        type: 'success',
        showCloseButton: true,
      })
    },
  },
  created () {
    const {location: {origin, pathname}} = window
    const apiRoot = `${origin}${pathname}api`
    const {service: {token}} = this
    this.apiRoot = apiRoot
    this.token = token
    this._timer = setInterval(() => { this.testServiceApi() }, 1000)
  },
  destroyed () {
    clearInterval(this._timer)
  },
  watch: {
    apiRoot () {
      this.testServiceApi()
    },
    token () {
      this.testServiceApi()
    },
    service: {
      deep: true,
      handler () {
        const {service: {apiRoot, token}} = this
        this.apiRoot = apiRoot
        this.token = token
      },
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
