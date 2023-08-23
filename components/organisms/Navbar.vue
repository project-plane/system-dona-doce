<template>
  <div class="navbar-container">
    <div>
      <NuxtLink to="/cadastrar/unidade"
        ><img class="logo" src="~/assets/img/logoDonaDoce.jpg" alt=""
      /></NuxtLink>
    </div>
    <img src="~/assets/icons/menu_hamburge.svg" alt="menu_icon" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({})
</script>

<style lang="scss" scoped>
.navbar-container {
  top: 0;
  position: fixed;
  width: 100%;
  height: 4rem;
  background-color: var(--white);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  z-index: 1;

  .logo {
    width: 160px;
    height: 60px;
  }

  span {
    color: var(--red);
    font-size: 1.4rem;
    font-weight: 600;
  }

  img {
    width: 2.1rem;
  }
}
</style>
