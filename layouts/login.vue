<template>
  <div class="login">
    <div class="imgBg"></div>
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
  display: flex;
  animation: fadeIn 5s, slidein 3s;
  opacity: 1;
  overflow: hidden;
  background-position: bottom center;
  .imgBg{
    background-repeat: no-repeat;
    background-image: url('~/assets/img/bgTemplate.jpeg');
    background-position: center;
    background-size: cover;
    height: 100vh;
    width: 50%;
 
}
  .mascara {
    width: 50%;
    height: 100vh;
    background: #fa5c4f21;
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
