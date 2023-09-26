<template>
  <div class="navbar-container">
      <img class="logo" src="~/assets/img/logoDonaDoce.jpg" alt="" >


      <NuxtLink v-if="$nuxt.$route.path === '/dashboard/dashboard' || $nuxt.$route.path === '/kanban/producao' || $nuxt.$route.path === '/kanban/entrega'" to="/cadastrar/unidade" class="btn-dashboard"
        >Ir para Cadastros <div class="arrow"></div></NuxtLink>

    <img v-else class="menu-hamburger" src="~/assets/icons/menu_hamburge.svg" alt="menu_icon" @click="showMenu"/>
    
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data () {
    return {
      menu: false
    }
  },

  methods: {
    showMenu() {
      this.menu = !this.menu
      this.$emit('showMenu', this.menu)
    }
  }
})
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
    height: 100%;
  }

  span {
    color: var(--red);
    font-size: 1.4rem;
    font-weight: 600;
  }

  .menu-hamburger {
    display: none;
  }


  .btn-dashboard {
    width: 10rem;
    height: 100%;
    display: flex;
    padding: 1rem;
    justify-content: center;
    align-items: center;
    background-color: var(--red);
    border: none;
    font-size: 1rem;
    font-weight: 600;
    color: var(--white);
    transition: 0.3s;

    .arrow {
      width: 2.5rem;
      background-color: var(--white);
      height: 70%;
      clip-path: polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%);
    }
  }

  .btn-dashboard:hover {
    padding: 1rem 0.1rem 1rem 1rem;
  }

  @media (max-width: 900px) {
    .menu-hamburger {
      display: block;
      cursor: pointer;
    }
  }
}
</style>
