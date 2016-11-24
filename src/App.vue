<template lang="pug">
div
  login

  div
    nprogress-container

    nav-bar
    main-view
    footer-bar
</template>

<script>
import Login from './components/Login.vue'

import NprogressContainer from 'vue-nprogress/src/NprogressContainer'
import { MainView, NavBar, FooterBar } from 'components/layout/index.js'

export default {
  components: {
    Login,
    NprogressContainer,
    MainView,
    NavBar,
    FooterBar,
  },
}
</script>

<style lang="scss">
@import '~animate.css';
.animated {
  animation-duration: .377s;
}
@import '~bulma';
$fa-font-path: '~font-awesome/fonts/';
@import '~font-awesome/scss/font-awesome';
@import '~hack-font/build/webfonts/css/hack.css';
@import './assets/style.scss';

.nprogress-container {
  position: fixed !important;
  width: 100%;
  height: 50px;
  z-index: 2048;
  pointer-events: none;
  #nprogress {
    $color: #48e79a;
    .bar {
      background: $color;
    }
    .peg {
      box-shadow: 0 0 10px $color, 0 0 5px $color;
    }
    .spinner-icon {
      border-top-color: $color;
      border-left-color: $color;
    }
  }
}
</style>
