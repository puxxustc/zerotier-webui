<template lang="pug">
mixin icon(key)
  template(v-if=`sort.key === '${key}'`)
    span(v-if="sort.order > 0").pull-right.fa.fa-sort-asc
    span(v-if="0 > sort.order").pull-right.fa.fa-sort-desc
  template(v-if=`sort.key !== '${key}'`)
    span.pull-right.fa.fa-sort

mixin header
  thead
    tr
    th(@click="toggleSortKey('nwid')")
      span nwid
      +icon('nwid')
    th(@click="toggleSortKey('name')")
      span name
      +icon('name')
    th(@click="toggleSortKey('creationTime')")
      span creationTime
      +icon('creationTime')
    th(@click="toggleSortKey('private')")
      span private
      +icon('private')
    th(@click="toggleSortKey('enableBroadcast')")
      span broadcast
      +icon('enableBroadcast')
    th(@click="toggleSortKey('allowPassiveBridging')")
      span bridge
      +icon('allowPassiveBridging')
    th
      span member
    th

div
  nav.level(style="margin-bottom: 10px;")
    div.level-left
      div.control
        input.input(v-model="search", type="text", placeholder="search")
  table.table.is-bordered.is-narrow
    +header
    tbody
      tr(v-if="networks.length === 0")
        td(colspan="8")
          span No networks.
      tr(v-for="network in sortedNetworks", @dblclick="viewNetwork(network.nwid)")
        td
          span.is-font-hack
            router-link(:to="{name: 'controller/network', params: {nwid: network.nwid}}")
              | {{ network.nwid }}
        td {{ network.name }}
        td {{ network.creationTime }}
        td
          span(:class="network.private ? 'is-true' : 'is-false'")
        td
          span(:class="network.enableBroadcast ? 'is-true' : 'is-false'")
        td
          span(:class="network.allowPassiveBridging ? 'is-true' : 'is-false'")
        td {{ members[network.nwid] }}
        td
          router-link(:to="{name: 'controller/network', params: {nwid: network.nwid}}")
            | view
    span Shown {{ sortedNetworks.length }} of {{ networks.length }}
</template>

<script>
import _ from 'lodash'

import api from 'src/lib/api.js'

import formatTime from 'src/mixins/formatTime.js'

export default {
  mixins: [formatTime],
  data () {
    return {
      search: '',
      sort: {
        key: 'nwid',
        order: 1,
      },
      nwids: [],
      networkDetail: {},
      members: {},
    }
  },
  computed: {
    networks () {
      const {nwids, networkDetail, formatTime} = this
      return nwids
        .map(nwid => networkDetail[nwid])
        .filter(nw => nw)
        .map((nw) => {
          const network = _.cloneDeep(nw)
          const {clock, creationTime} = network
          network.clock = formatTime(clock)
          network.creationTime = formatTime(creationTime)
          return network
        })
    },
    filteredNetworks () {
      const fields = ['nwid', 'name', 'creationTime']
      const {networks, search} = this
      if (search) {
        return networks.filter((nw) => {
          return _.some(fields.map(key => _.includes(nw[key], search)))
        })
      } else {
        return networks
      }
    },
    sortedNetworks () {
      const {filteredNetworks, sort: {key, order}} = this
      if (order >= 0) {
        return _.sortBy(filteredNetworks, key)
      } else {
        return _.sortBy(filteredNetworks, key).reverse()
      }
    },
  },
  methods: {
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
    loadMembers () {
      const {networks} = this
      for (const {nwid} of networks) {
        api({
          url: `/controller/network/${nwid}/active`,
          type: 'GET',
          success: (member) => {
            const {members} = this
            this.members = {..._.cloneDeep(members), ...{[nwid]: _.size(member)}}
          },
        })
      }
    },
    loadData () {
      this.loadNetworks()
      this.loadMembers()
    },
    toggleSortKey (key) {
      if (this.sort.key === key) {
        this.sort.order *= -1
      } else {
        this.sort.key = key
        this.sort.order = 1
      }
    },
    viewNetwork (nwid) {
      this.router.push({name: 'controller/network', params: {nwid}})
    },
  },
  created () {
    this.loadData()
    this._timer = setInterval(() => { this.loadData() }, 1000)
  },
  destroyed () {
    clearInterval(this._timer)
  },
}
</script>

<style lang="scss" scoped>
</style>
