<template lang="pug">
section.app-main
  div.container.is-fluid.is-marginless.app-content
    transition(
      mode="out-in"
      enter-active-class="fadeIn"
      leave-active-class="fadeOut"
      appear)
      router-view.animated
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
@import '~bulma/sass/utilities/variables';
@import '~bulma/sass/utilities/mixins';
.app-main {
  padding-top: 50px;
  margin-left: 30px;
  margin-right: 30px;
  transform: translate3d(0, 0, 0);
  @include mobile() {
    margin-left: 0;
  }
}
.app-content {
  padding: 20px;
}
</style>
