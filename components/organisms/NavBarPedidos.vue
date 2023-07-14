<template>
  <div class="navbar-container">
    <span>Dona Doce</span>
    <ul>
      <li class="active" @click="routePedido">Realizar Pedidos</li>
      <li>Histórico de Pedidos</li>
      <li>Meus Dados</li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  methods: {
    routePedido() {
      this.$store.commit('BARRA_PEDIDOS_NAV', true)
      this.$router.push('/pedidos')
    },
  },
})
</script>

<style lang="scss" scoped>
.navbar-container {
  top: 0;
  position: fixed;
  width: 100%;
  height: 10vh;
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
</style>
