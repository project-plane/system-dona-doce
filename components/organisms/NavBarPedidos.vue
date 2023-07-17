<template>
  <div class="navbar-container">
    <span>Dona Doce</span>
    <div class="menuNavigation">
      <ul>
        <li class="active" @click="routePedido">Realizar Pedidos</li>
        <li>Histórico de Pedidos</li>
        <li>Meus Dados</li>
      </ul>
      <button class="logout" @click="logout">
        <img src="~/assets/icons/logout.svg" alt="" />
        <p>Sair</p>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Button from '../atoms/Button.vue'
export default Vue.extend({
  methods: {
    routePedido() {
      Button
      this.$store.commit('BARRA_PEDIDOS_NAV', true)
      this.$router.push('/pedidos')
    },
    logout() {
      sessionStorage.removeItem('token')
      this.$router.push('/login')
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
  .menuNavigation {
    display: flex;
    gap: 3rem;
    ul {
      display: flex;
      gap: 3rem;
      padding: 0 3rem;
      border-right: 2px solid red;
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
    .logout {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: transparent;
      p {
        font-size: 1.2rem;
      }
    }
  }

  span {
    color: var(--red);
    font-size: 1.4rem;
    font-weight: 600;
  }
}
</style>
