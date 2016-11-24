<template lang="pug">
div
  div.section
    h3.title.is-3
      span Controller
    hr

    div(v-if="!controller.controller")
      div.margin-left-14-1
        div Controller not enabled. &nbsp;:(

    div(v-if="controller.controller")
      h4.title.is-4 Status
      div.margin-left-14-1
        div
          div.width-14-10.is-bold.is-absolute
            | controller
          div.offset-14-10
            span(:class="controller.controller ? 'is-true' : 'is-false'")
          div.width-14-10.is-bold.is-absolute
            | apiVersion
          div.offset-14-10
            | {{ controller.apiVersion }}
        div
          div.width-14-10.is-absolute.is-bold
            | instanceId
          div.offset-14-10.is-break-word
            | {{ controller.instanceId }}
        div
          div.width-14-10.is-absolute.is-bold
            | clock
          div.offset-14-10.is-font-hack
            | {{ formatTime(controller.clock) }}
      hr

      div
        h4.title.is-4 Managed networks
        div.margin-left-14-1
          networks(:networks="networks")
      hr
</template>

<script>
import api from 'src/lib/api.js'

import formatTime from 'src/mixins/formatTime.js'

import Networks from './Networks.vue'

export default {
  components: {
    Networks,
  },
  mixins: [formatTime],
  data () {
    return {
      controller: {},
      nwids: [],
      networkDetail: {},
    }
  },
  computed: {
    networks () {
      const {nwids, networkDetail} = this
      return nwids.map(nwid => networkDetail[nwid])
    },
  },
  methods: {
    loadController () {
      api({
        url: '/controller',
        type: 'GET',
        success: (controller) => {
          this.controller = controller
        },
      })
    },
    loadNetworks () {
      api({
        url: '/controller/network',
        type: 'GET',
        success: (nwids) => {
          this.nwids = nwids
          for (const nwid of nwids) {
            api({
              url: `/controller/network/${nwid}`,
              type: 'GET',
              success: (detail) => {
                this.networkDetail = {...this.networkDetail, ...{[nwid]: detail}}
              },
            })
          }
        },
      })
    },
    loadData () {
      this.loadController()
      this.loadNetworks()
    },
  },
  created () {
    window.api = api
    this.loadData()
    this._timer = setInterval(() => { this.loadData() }, 1000)
  },
  destroyed () {
    clearInterval(this._timer)
  },
}
</script>

<style lang="scss" scoped>
.is-bold {
  font-weight: bold;
}
</style>
