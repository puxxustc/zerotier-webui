<template lang="pug">
div
  div.warning-border
    div Confirm to leave network {{ nwid }}
    div.control
      label.checkbox
        input(v-model="confirmed", type="checkbox")
        span.danger  Yes, I mean it! This cannot be undone
    div.control
      a.button.is-danger.is-outlined(
        :class="{'is-disabled': !confirmed}",
        @click="leaveNetwork")
        span Leave ✗
      span &nbsp;
      a.button.is-primary.is-outlined(@click="cancel")
        span Cancel
  div &nbsp;
</template>

<script>
import api from 'src/lib/api.js'

export default {
  props: {
    nwid: {
      type: String,
    },
  },
  data () {
    return {
      confirmed: false,
    }
  },
  methods: {
    leaveNetwork () {
      const {nwid} = this
      api({
        url: `/network/${nwid}`,
        type: 'DELETE',
      })
      this.$emit('dismiss')
    },
    cancel () {
      this.$emit('dismiss')
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~bulma/sass/utilities/variables';

.danger {
  color: $danger
}

.warning-border {
  border: 1px solid $warning;
  border-top-right-radius: 3px;
  color: rgba(0, 0, 0, 0.7);
  padding: 10px;
}
</style>
