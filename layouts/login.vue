<template>
  <div class="login">
    <div class="mascara">
      <Nuxt />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({})
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100vh;
  background-image: url('~/assets/img/bg_login.png');
  animation: fadeIn 5s, slidein 3s;
  // background-size: cover;
  opacity: 1;
  overflow: hidden;
  background-position: bottom center;

  .mascara {
    width: 100%;
    height: 100vh;
    background: var(--bg_opacity);
  }

  @keyframes slidein {
  from {
    margin-left: 100%;
    width: 0%;
    overflow: hidden;
  }

  to {
    margin-left: 0%;
    width: 100%;
    overflow: hidden;
  }
}

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
}
</style>
