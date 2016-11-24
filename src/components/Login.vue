<template lang="pug">
div
</template>

<script>
export default {
  computed: {
    service () {
      return this.$store.getters.service
    },
    route () {
      return this.$store.state.route
    },
  },
  created () {
    this.$store.dispatch('setServiceAPI', {})
  },
  watch: {
    service: {
      deep: true,
      handler () {
        const {service: {valid}} = this
        if (!valid) {
          this.$router.push({name: 'settings'})
        }
      },
    },
    route: {
      deep: true,
      handler () {
        const {service: {valid}} = this
        const {route: {name}} = this
        if (!valid && name !== 'settings') {
          this.$router.push({name: 'settings'})
        }
      },
    },
  },
}
</script>
