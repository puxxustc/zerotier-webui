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
      th(@click="toggleSortKey('status')")
        span status
        +icon('status')
      th(@click="toggleSortKey('type')")
        span type
        +icon('type')
      th(@click="toggleSortKey('broadcastEnabled')")
        span broadcast
        +icon('broadcastEnabled')
      th(@click="toggleSortKey('bridge')")
        span bridge
        +icon('bridge')
      th(@click="toggleSortKey('mac')")
        span mac
        +icon('mac')
      th(@click="toggleSortKey('mtu')")
        span mtu
        +icon('mtu')
      th(@click="toggleSortKey('dhcp')")
        span dhcp
        +icon('dhcp')
      th(@click="toggleSortKey('portDeviceName')")
        span nic
        +icon('portDeviceName')
      th
        span address
      th
        span action

div
  nav.level(style="margin-bottom: 10px;")
    div.level-left
      div.control
        input.input(v-model="search", type="text", placeholder="search")
  table.table.is-bordered.is-narrow
    +header
    tbody
      tr(v-if="networks.length === 0")
        td(colspan="12")
          span No networks.
      tr(v-for="network in sortedNetworks", @dblclick="viewNetwork(network.nwid)")
        td
          span.is-font-hack
            | {{ network.nwid }}
        td {{ network.name }}
        td
          span.is-font-hack.is-break-word(
            style="display: inline-block; max-width: 140px;")
            | {{ network.status }}
        td {{ network.type }}
        td
          span(:class="network.broadcastEnabled ? 'is-true' : 'is-false'")
        td
          span(:class="network.bridge ? 'is-true' : 'is-false'")
        td
          span.is-font-hack {{ network.mac }}
        td {{ network.mtu }}
        td
          span(:class="network.dhcp ? 'is-true' : 'is-false'")
        td {{ network.portDeviceName }}
        td
          span.is-font-hack.is-break-word(
            style="display: inline-block; max-width: 140px;")
            | {{ network.assignedAddresses.join('\n') }}
        td
          a.button.is-danger.is-outlined.is-small(@click="leaveNwid = network.nwid")
            span Leave ✗
    div Shown {{ sortedNetworks.length }} of {{ networks.length }}
  leave-network(v-if="leaveNwid", :nwid="leaveNwid", @dismiss="leaveNwid = ''")
  join-network
</template>

<script>
import _ from 'lodash'

import JoinNetwork from './JoinNetwork.vue'
import LeaveNetwork from './LeaveNetwork.vue'

export default {
  components: {
    JoinNetwork,
    LeaveNetwork,
  },
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
      leaveNwid: '',
    }
  },
  computed: {
    wrappedNetworks () {
      const {networks} = this
      return networks.filter(n => n).map((n) => {
        const network = _.cloneDeep(n)
        return network
      })
    },
    filteredNetworks () {
      const fields = ['nwid', 'name', 'status', 'type', 'mac']
      const {wrappedNetworks} = this
      let {search} = this
      if (search) {
        search = search.toLowerCase()
        return wrappedNetworks.filter((n) => {
          return _.some(fields.map(key => _.includes(n[key].toLowerCase(), search)))
        })
      } else {
        return wrappedNetworks
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
    toggleSortKey (key) {
      if (this.sort.key === key) {
        this.sort.order *= -1
      } else {
        this.sort.key = key
        this.sort.order = 1
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
