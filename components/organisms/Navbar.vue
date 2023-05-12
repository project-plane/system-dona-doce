<template>
  <nav class="nav_bar">
    <div class="logo">
      <p>Dona Doce</p>
    </div>
    <div class="menu_hamburge">
      <img src="~/assets/icons/menu_hamburge.svg" alt="menu_hamburge" />
    </div>
  </nav>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.nav_bar {
  position: fixed;
  width: 100%;
  height: 4rem;
  background: var(--white);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  .logo {
    color: var(--red);
    font-size: 1.4rem;
    font-weight: bold;
  }
  .menu_hamburge {
    cursor: pointer;
    img {
      width: 30px;
      height: 30px;
    }
  }
}
</style>