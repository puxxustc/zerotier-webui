<template lang="pug">
footer.footer(v-once)
  div.container
    div.content.has-text-centered
      p
        span.icon
          i.fa.fa-code
        | &nbsp;with&nbsp;
        span.icon
          i.fa.fa-heart
        | &nbsp;by&nbsp;
        a(href="https://github.com/XiaoxiaoPu", target="_blank") xiaoxiao
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.footer {
  .fa.fa-heart {
    color: red;
  }
}
</style>
