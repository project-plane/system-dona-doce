<template>
  <div class="containerGrid">
    <MenuCreate v-show="midiaAba" @empresa="empresa" @client="client" @users="users" @ingredientes="ingredientes"
      @estoque="estoque" @dashboard="dashboard" @receitas="receitas" @receitasPorCliente="receitasPorCliente" @menu="menu" />

    <div v-show="midiaFluxo" class="scroll_container">
      <div v-if="statusDashboard">
        <CalendarHeader />
        <ListDashboard />
      </div>
      <div v-if="statusEmpresa">
        <CreateEmpresa />
        <TableEmpresa />
      </div>
      <div v-if="statusUsers">
        <CreateUser />
        <TableUsers />
      </div>
      <div v-if="statusClientes">
        <CreateClient />
        <TableClients />
      </div>
      <div v-if="statusIngredientes">
        <CreateIngredientes />
        <TableIngredientes />
      </div>
      <div v-if="statusEstoque">
        <CreateEstoque />
        <TableEstoque />
      </div>
      <div v-if="statusReceitas">
        <CreateReceitas />
        <TableReceitas />
      </div>
      <div v-if="statusReceitasPorCliente">
        <CreateReceitasPorCliente />
      </div>
      <div v-if="statusMenu">
        <CreateCardapio />
        <TableCardapios />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      statusDashboard: false,
      statusEmpresa: false,
      statusClientes: false,
      statusUsers: false,
      statusIngredientes: false,
      statusEstoque: false,
      statusReceitas: false,
      statusReceitasPorCliente: false,
      statusMenu: false,

      window: {
        width: 0
      },
      midiaAba: true,
      midiaFluxo: true,
    }
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  methods: {
    handleResize() {
      this.window.width = window.innerWidth;
      if (this.window.width <= 600) {
        this.midiaFluxo = false;
      } else {
        this.midiaAba = true;
        this.midiaFluxo = true;
      }
    },
    dashboard() {
      this.statusDashboard = true
      this.statusEmpresa = false
      this.statusClientes = false
      this.statusUsers = false
      this.statusIngredientes = false
      this.statusEstoque = false
      this.statusReceitas = false
      this.statusReceitasPorCliente = false
      this.statusMenu = false
    },
    empresa() {
      this.statusDashboard = false
      this.statusEmpresa = true
      this.statusClientes = false
      this.statusUsers = false
      this.statusIngredientes = false
      this.statusEstoque = false
      this.statusReceitas = false
      this.statusReceitasPorCliente = false
      this.statusMenu = false
    },
    users() {
      this.statusDashboard = false
      this.statusEmpresa = false
      this.statusClientes = false
      this.statusUsers = true
      this.statusIngredientes = false
      this.statusEstoque = false
      this.statusReceitas = false
      this.statusReceitasPorCliente = false
      this.statusMenu = false
    },
    client() {
      this.statusDashboard = false
      this.statusEmpresa = false
      this.statusClientes = true
      this.statusUsers = false
      this.statusIngredientes = false
      this.statusEstoque = false
      this.statusReceitas = false
      this.statusReceitasPorCliente = false
      this.statusMenu = false
    },
    ingredientes() {
      this.statusDashboard = false
      this.statusEmpresa = false
      this.statusClientes = false
      this.statusUsers = false
      this.statusIngredientes = true
      this.statusEstoque = false
      this.statusReceitas = false
      this.statusReceitasPorCliente = false
      this.statusMenu = false
    },
    estoque() {
      this.statusDashboard = false
      this.statusEmpresa = false
      this.statusClientes = false
      this.statusUsers = false
      this.statusIngredientes = false
      this.statusEstoque = true
      this.statusReceitas = false
      this.statusReceitasPorCliente = false
      this.statusMenu = false
    },
    receitasPorCliente() {
      this.statusDashboard = false
      this.statusEmpresa = false
      this.statusClientes = false
      this.statusUsers = false
      this.statusIngredientes = false
      this.statusEstoque = false
      this.statusReceitas = false
      this.statusReceitasPorCliente = true
      this.statusMenu = false
    },
    receitas() {
      this.statusDashboard = false
      this.statusEmpresa = false
      this.statusClientes = false
      this.statusUsers = false
      this.statusIngredientes = false
      this.statusEstoque = false
      this.statusReceitas = true
      this.statusReceitasPorCliente = false
      this.statusMenu = false
    },
    menu() {
      this.statusDashboard = false
      this.statusEmpresa = false
      this.statusClientes = false
      this.statusUsers = false
      this.statusIngredientes = false
      this.statusEstoque = false
      this.statusReceitas = false
      this.statusReceitasPorCliente = false
      this.statusMenu = true
    }
  },
})
</script>

<style lang="scss" scoped>
.containerGrid {
  display: flex;

  .scroll_container {
    width: 80%;
    height: 90vh;
    overflow-y: scroll;
  }
}
</style>
