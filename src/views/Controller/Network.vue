<template lang="pug">
div
  h5.title.is-5
    router-link(:to="{name: 'controller'}") Networks
    | &nbsp;»&nbsp;
    router-link(:to="{name: 'controller/network', params: {nwid}}") {{ nwid }}
    | &nbsp;&nbsp;
    i.fa.fa-refresh.refresh(style="cursor: pointer;", @click="loadData")
  div.margin-left-14-1
    div
      span {{ network }}
</template>

<script>
// import _ from 'lodash'

import api from 'src/lib/api.js'

import formatTime from 'src/mixins/formatTime.js'

export default {
  mixins: [formatTime],
  props: {
    networks: {
      type: Array,
    },
  },
  data () {
    return {
      search: '',
      sort: {
        key: 'nwid',
        order: 1,
      },
      network: {},
      members: {},
    }
  },
  computed: {
    nwid () {
      return this.$route.params.nwid
    },
  },
  methods: {
    loadNetwork () {
      const {nwid} = this
      api({
        url: `/controller/network/${nwid}`,
        type: 'GET',
        success: (nw) => {
          this.network = nw
        },
      })
    },
    loadData () {
      this.loadNetwork()
    },
  },
  created () {
    this.loadData()
    // this._timer = setInterval(() => { this.loadData() }, 1000)
  },
  destroyed () {
    // clearInterval(this._timer)
  },
}
</script>

<style lang="scss" scoped>
@import '~bulma/sass/utilities/variables';

.refresh {
  color: $primary;
}
</style>
