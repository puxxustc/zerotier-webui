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
    th(@click="toggleSortKey('revision')")
      span revision
      +icon('revision')
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
            a {{ network.nwid }}
        td {{ network.name }}
        td {{ network.creationTime }}
        td
          span(:class="network.private ? 'is-true' : 'is-false'")
        td
          span(:class="network.enableBroadcast ? 'is-true' : 'is-false'")
        td
          span(:class="network.allowPassiveBridging ? 'is-true' : 'is-false'")
        td {{ network.revision }}
        td
          a view
    span Shown {{ sortedNetworks.length }} of {{ networks.length }}
</template>

<script>
import _ from 'lodash'

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
    }
  },
  computed: {
    wrappedNetworks () {
      const {networks, formatTime} = this
      return networks.filter(n => n).map((n) => {
        const network = _.cloneDeep(n)
        const {clock, creationTime} = network
        network.clock = formatTime(clock)
        network.creationTime = formatTime(creationTime)
        return network
      })
    },
    filteredNetworks () {
      const fields = ['nwid', 'name', 'creationTime']
      const {wrappedNetworks, search} = this
      if (search) {
        return wrappedNetworks.filter((n) => {
          return _.some(fields.map(key => _.includes(n[key], search)))
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
    viewNetwork (nwid) {
      //
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
