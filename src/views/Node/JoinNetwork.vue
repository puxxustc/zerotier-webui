<template lang="pug">
div
  div(v-if="!edit")
    a.button.is-primary.is-outlined(@click="edit = true")
      span + Join new network
  div(v-if="edit")
    div.control.has-addons
      input.input(v-model="nwid", type="text", placeholder="Network ID")
      a.button.is-primary.is-outlined(
        :class="{'is-disabled': !valid}", @click="joinNetwork")
        span Join ✓
      a.button.is-danger.is-outlined(@click="edit = false")
        span Cancel ✗
</template>

<script>
import api from 'src/lib/api.js'

export default {
  data () {
    return {
      edit: false,
      nwid: '',
    }
  },
  computed: {
    valid () {
      const {nwid} = this
      if (/^[0-9a-f]{16}$/.test(nwid)) {
        return true
      } else {
        return false
      }
    },
  },
  methods: {
    joinNetwork () {
      const {nwid} = this
      this.edit = false
      api({
        url: `/network/${nwid}`,
        type: 'POST',
      })
      this.nwid = ''
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
