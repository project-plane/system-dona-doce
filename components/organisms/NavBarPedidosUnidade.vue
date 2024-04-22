<template>
  <div class="navbar-container">
    <img class="logo" src="~/assets/img/logoDonaDoce.jpg" alt="">
    <div class="menuNavigation">

      <nuxt-link to="/pedidos-unidade">Realizar Pedidos</nuxt-link>
      <nuxt-link to="/pedidos-unidade/historico-pedidos">Histórico de Pedidos</nuxt-link>
      <nuxt-link to="/lotes/listagemCliente">Lotes de Pedidos</nuxt-link>
      <nuxt-link to="/pedidos-unidade/meus-dados">Meus Dados</nuxt-link>
      <div class="containerUnidade"> 
        <h4>{{ responsavel.accountable }}</h4>
        <h6 style="margin-top: -5px;">{{ unidade.corporate_name }}</h6>
      </div>

      <button class="logout" @click="logout">
        <img src="~/assets/icons/logout.svg" alt="" />
        <span>Sair</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Button from '../atoms/Button.vue'
import HttpMeusDados from '@/server/meusDados/index'

export default Vue.extend({
  data(){
        return{
          responsavel: {},
          unidade: {}
        }
    },
  async created(){
  
    await HttpMeusDados.MeusDados().then( (res) => {
        this.responsavel = res.data.Client_Company
        this.unidade = res.data.Client_Company.company
    })

  },
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
  height: 4rem;
  background-color: var(--white);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  z-index: 5;

  .logo {
    height: 100%;
  }

  .menuNavigation {
    display: flex;
    gap: 3rem;
    align-items: center;

    a {
      color: black;
      text-decoration: none;
      padding: 0.5rem 1rem;
      width: auto;
      font-size: 0.9rem;
    }

    a.nuxt-link-exact-active {
      color: var(--red);
      border-bottom: 5px solid var(--red);
    }
    .containerUnidade{
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .logout {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      background: transparent;

      img {
        width: 1.2rem;
      }

      span {
        color: black;
        font-weight: 500;
        font-size: 0.9rem;
      }
    }
  }

  span {
    color: var(--red);
    font-size: 1.2rem;
    font-weight: 600;
  }
}
</style>
