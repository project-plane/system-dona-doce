<template>
  <div class="login">
    <div class="mascara">
      <Nuxt />
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100vh;
  background-image: url('~/assets/img/bg_login.png');
  background-size: cover;
  opacity: 1;
  .mascara {
    width: 100%;
    height: 100vh;
    background: var(--bg_opacity);
  }
}
</style>