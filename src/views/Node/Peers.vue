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
      th(rowspan="2", @click="toggleSortKey('address')")
        span address
        +icon('address')
      th(rowspan="2", @click="toggleSortKey('role')")
        span role
        +icon('role')
      th(rowspan="2", @click="toggleSortKey('version')")
        span version
        +icon('version')
      th(rowspan="2", @click="toggleSortKey('latency')")
        span latency
        +icon('latency')
      th(rowspan="2", @click="toggleSortKey('lastUnicastFrame')")
        span lastUnicastFrame
        +icon('lastUnicastFrame')
      th(rowspan="2", @click="toggleSortKey('lastMulticastFrame')")
        span lastMulticastFrame
        +icon('lastMulticastFrame')
      th(colspan="5")
        span Paths
    tr
      th address
      th active
      th preferred
      th lastSend
      th lastReceive

div
  nav.level(style="margin-bottom: 10px;")
    div.level-left
      div.control.is-horizontal
        div.control.is-grouped
          div.control
            input.input(v-model="search", type="text", placeholder="search")
          div.control.has-text-centered
            label.checkbox(style="line-height: 2;")
              input(v-model="ignoreDeadPeers", type="checkbox")
              |  ignore dead peers
  table.table.is-bordered.is-narrow
    +header
    tbody
      tr(v-if="sortedPeers.length === 0")
        td(colspan="11")
          span No Peers.
      template(v-for="peer in sortedPeers")
        tr(v-if="!peer.paths.length")
          td
            span.is-font-hack {{ peer.address }}
          td {{ peer.role }}
          td {{ peer.version }}
          td {{ peer.latency }}
          td {{ peer.lastUnicastFrame }}
          td {{ peer.lastMulticastFrame }}
          td(colspan="5")
        template(v-if="peer.paths.length")
          tr(v-for="(path, index) in peer.paths")
            template(v-if="index === 0")
              td(:rowspan="peer.paths.length")
                span.is-font-hack {{ peer.address }}
              td(:rowspan="peer.paths.length")
                | {{ peer.role }}
              td(:rowspan="peer.paths.length")
                | {{ peer.version }}
              td(:rowspan="peer.paths.length")
                | {{ peer.latency }}
              td(:rowspan="peer.paths.length")
                | {{ peer.lastUnicastFrame }}
              td(:rowspan="peer.paths.length")
                | {{ peer.lastMulticastFrame }}
            td
              span.is-font-hack {{ path.address }}
            td
              span(:class="path.active ? 'is-true' : 'is-false'")
            td
              span(:class="path.preferred ? 'is-true' : 'is-false'")
            td {{ path.lastSend }}
            td {{ path.lastReceive }}

    span Shown {{ sortedPeers.length }} of {{ peers.length }}
</template>

<script>
import _ from 'lodash'

import formatTime from 'src/mixins/formatTime.js'

const getNow = () => {
  return (new Date()).getTime()
}

export default {
  mixins: [formatTime],
  props: {
    peers: {
      type: Array,
    },
  },
  data () {
    return {
      search: '',
      ignoreDeadPeers: true,
      sort: {
        key: 'address',
        order: 1,
      },
      now: getNow(),
    }
  },
  computed: {
    wrappedPeers () {
      const {formatTime, peers, now, ignoreDeadPeers} = this
      return peers.filter((p) => {
        if (!p) {
          return false
        } else if (ignoreDeadPeers) {
          if (p.versionMajor < 0) {
            return false
          } else {
            return true
          }
        } else {
          return true
        }
      }).map((p) => {
        const peer = _.cloneDeep(p)
        const {lastUnicastFrame, lastMulticastFrame, paths} = peer
        if (lastUnicastFrame) {
          peer.lastUnicastFrame = formatTime(lastUnicastFrame)
        } else {
          peer.lastUnicastFrame = null
        }
        if (lastMulticastFrame) {
          peer.lastMulticastFrame = formatTime(lastMulticastFrame)
        } else {
          peer.lastMulticastFrame = null
        }
        peer.paths = paths.map((x) => {
          const path = _.cloneDeep(x)
          const {lastSend, lastReceive} = path
          if (lastSend) {
            path.lastSend = Math.floor((now - lastSend) / 1000.0)
          } else {
            path.lastSend = null
          }
          if (lastReceive) {
            path.lastReceive = Math.floor((now - lastReceive) / 1000.0)
          } else {
            path.lastReceive = null
          }
          return path
        })
        return peer
      })
    },
    filteredPeers () {
      const fields = ['address', 'role', 'version']
      const {wrappedPeers} = this
      let {search} = this
      if (search) {
        search = search.toLowerCase()
        return wrappedPeers.filter((n) => {
          return _.some(fields.map(key => _.includes(n[key].toLowerCase(), search)))
        })
      } else {
        return wrappedPeers
      }
    },
    sortedPeers () {
      const {filteredPeers, sort: {key, order}} = this
      if (order >= 0) {
        return _.sortBy(filteredPeers, key)
      } else {
        return _.sortBy(filteredPeers, key).reverse()
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
  created () {
    this._timer = setInterval(() => { this.now = getNow() }, 1000)
  },
  destroyed () {
    clearInterval(this._timer)
  },
}
</script>

<style lang="scss" scoped>
.path {
  display: flex;
}
.path-item {
  display: block;
  flex-grow: 1;
  flex-shrink: 1;
  padding: 10px;
}
</style>
