<template>
  <div class="navbar-container">
    <span>Dona Doce</span>
    <img src="~/assets/icons/menu_hamburge.svg" alt="menu_icon"/>
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