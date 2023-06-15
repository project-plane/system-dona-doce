<template>
  <div class="containerGrid">

    <MenuCreate
      v-show="midiaAba"
      @empresa="empresa"
      @client="client"
      @users="users"
      @ingredientes="ingredientes"
      @estoque="estoque"
      @receitas="receitas"
    />

    <div v-show="midiaFluxo" class="scroll_container">
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
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      statusEmpresa: true,
      statusClientes: false,
      statusUsers: false,
      statusIngredientes: false,
      statusEstoque: false,
      statusReceitas: false,
      
      window:{
        width: 0
      },
      midiaAba: true,
      midiaFluxo: true,
    }
  },
  mounted(){
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
    empresa() {
      this.statusEmpresa = true
      this.statusClientes = false
      this.statusUsers = false
      this.statusIngredientes = false
      this.statusEstoque = false
      this.statusReceitas = false
    },
    users() {
      this.statusEmpresa = false
      this.statusClientes = false
      this.statusUsers = true
      this.statusIngredientes = false
      this.statusEstoque = false
      this.statusReceitas = false
    },
    client() {
      this.statusEmpresa = false
      this.statusClientes = true
      this.statusUsers = false
      this.statusIngredientes = false
      this.statusEstoque = false
      this.statusReceitas = false
    },
    ingredientes() {
      this.statusEmpresa = false
      this.statusClientes = false
      this.statusUsers = false
      this.statusIngredientes = true
      this.statusEstoque = false
      this.statusReceitas = false
    },
    estoque() {
      this.statusEmpresa = false
      this.statusClientes = false
      this.statusUsers = false
      this.statusIngredientes = false
      this.statusEstoque = true
      this.statusReceitas = false
    },
    receitas() {
      this.statusEmpresa = false
      this.statusClientes = false
      this.statusUsers = false
      this.statusIngredientes = false
      this.statusEstoque = false
      this.statusReceitas = true
    },
  },
})
</script>

<style lang="scss" scoped>
.containerGrid {
  display: grid;
  grid-template: calc(4rem - 100vh) / 25rem 1fr;
  .scroll_container {
    height: 90vh;
    overflow-y: scroll;
    border-left: 1px solid var(--border);
  }
}
</style>
