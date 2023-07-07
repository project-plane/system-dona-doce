<template>
  <div class="pedidos">
    <div class="navbar">
      <h1>Dona Doce</h1>
      <ul>
        <li class="active" @click="routePedido">
          Pedidos
          <div :class="{ barraActive: this.$store.state.barraRoute }"></div>
        </li>
        <li>Histórico de Pedidos</li>
      </ul>
    </div>
    <div class="container">
      <Nuxt />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  methods: {
    routePedido() {
      this.$store.commit('BARRA_PEDIDOS_NAV', true)
      this.$router.push('/pedidos/newPedidos')
    },
  },
})
</script>

<style scoped lang="scss">
.pedidos {
  width: 100%;
  height: 100vh;
  background: var(--red);
  position: relative;
  .navbar {
    width: 100%;
    height: 10vh;
    background: var(--white);
    padding: 0 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    ul {
      display: flex;
      gap: 3rem;
      li {
        list-style: none;
        cursor: pointer;
      }
      .active {
        .barraActive {
          background: var(--red);
          height: 7px;
          position: relative;
          bottom: -21px;
          border-radius: 5px;
        }
      }
    }
  }
  img {
    position: fixed;
    right: 0;
    bottom: 0;
    width: 30%;
  }
  .container {
    width: 100%;
    height: 90vh;
    padding: 2rem;
    z-index: 1000;
  }
}
</style>
