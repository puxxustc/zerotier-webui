<template lang="pug">
section.hero.app-navbar.animated
  div.hero-head
    nav.nav.has-shadow
      div.container
        div.width-10-3
        div.nav-left
          div.nav-item.hero-brand
            span.workflow ZeroTier WebUI
          div(style="width: 10px;")
          template(v-for="menu in menus")
            router-link.nav-item.hero-brand.is-tab(:to="{name: menu.name}")
              span {{ menu.meta.title }}
        div.nav-center
        div.nav-right.is-flex
</template>

<script>
import nav from 'src/router/nav.js'

export default {
  data () {
    const menus = nav.map((n) => {
      const {name, path, meta} = n
      return {
        name,
        path,
        meta,
      }
    })
    return {
      menus,
    }
  },
}
</script>

<style lang="scss" scoped>
@import '~bulma/sass/utilities/variables';
.app-navbar {
  position: fixed;
  min-width: 100%;
  z-index: 1024;
  box-shadow: 0 2px 3px rgba(17, 17, 17, 0.1), 0 0 0 1px rgba(17, 17, 17, 0.1);
  .container {
    margin: auto 10px;
  }
  .nav-right {
    align-items: stretch;
    align-items: stretch;
    flex: 1;
    justify-content: flex-end;
    overflow: hidden;
    overflow-x: auto;
    white-space: nowrap;
  }
}
.hero-brand {
  .workflow {
    margin-left: 10px;
    // color: #36AC70;
    font-size: 18px;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  }
}
</style>
