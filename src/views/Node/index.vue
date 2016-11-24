<template lang="pug">
div
  div.section
    h3.title.is-3
      span Overview
    hr

    div
      h4.title.is-4 Status
      div.margin-left-14-1
        div
          div.width-14-10.is-bold(style="position: absolute;")
            | address
          div.offset-14-10
            | {{ status.address }}
        div
          div.width-14-10.is-bold(style="position: absolute;")
            | publicIdentity
          div.offset-14-10.is-break-word
            | {{ status.publicIdentity }}
        div
          div.width-14-10.is-bold(style="position: absolute;")
            | online
          div.offset-14-10
            span(:class="status.online ? 'is-true' : 'is-false'")
        div
          div.width-14-10.is-bold(style="position: absolute;")
            | tcpFallbackActive
          div.offset-14-10
            span(:class="status.tcpFallbackActive ? 'is-true' : 'is-false'")
        div
          div.width-14-10.is-bold(style="position: absolute;")
            | version
          div.offset-14-10
            | {{ status.version }}
        div
          div.width-14-10.is-bold(style="position: absolute;")
            | worldId
          div.offset-14-10
            | {{ status.worldId }}
        div
          div.width-14-10.is-bold(style="position: absolute;")
            | worldTimestamp
          div.offset-14-10.is-font-hack
            | {{ formatTime(status.worldTimestamp) }}
        div
          div.width-14-10.is-absolute.is-bold
            | clock
          div.offset-14-10.is-font-hack
            | {{ formatTime(status.clock) }}
      hr

    div
      h4.title.is-4 Joined networks
      div.margin-left-14-1
        networks(:networks="networks")
      hr

    div
      h4.title.is-4 Peers
      div.margin-left-14-1
        peers(:peers="peers")
</template>

<script>
import api from 'src/lib/api.js'

import formatTime from 'src/mixins/formatTime.js'

import Networks from './Networks.vue'
import Peers from './Peers.vue'

export default {
  components: {
    Networks,
    Peers,
  },
  mixins: [formatTime],
  data () {
    return {
      status: {},
      networks: [],
      peers: [],
    }
  },
  methods: {
    loadStatus () {
      api({
        url: '/status',
        type: 'GET',
        success: (status) => {
          this.status = status
        },
      })
    },
    loadNetworks () {
      api({
        url: '/network',
        type: 'GET',
        success: (networks) => {
          this.networks = networks
        },
      })
    },
    loadPeers () {
      api({
        url: '/peer',
        type: 'GET',
        success: (peers) => {
          this.peers = peers
        },
      })
    },
    loadData () {
      this.loadStatus()
      this.loadNetworks()
      this.loadPeers()
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
