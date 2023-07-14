<template>
  <div class="containerPedidos">
    <div class="headerPedidos">
      <h3>Dias Disponíveis para Fazer Pedidos</h3>
      <div class="inputPedido">
        <label>Tipo de Pedido</label>
        <select v-model="selected">
          <option value="" disabled>Todos</option>
          <option value="programados">Programados</option>
          <option value="Coffee">Coffee</option>
          <option value="Vitrine">Vitrine</option>
        </select>
      </div>
    </div>
    <div class="listPedidos">
      <div v-for="pedido in listPedidos" :key="pedido.id">
        <CardPedido :dataPedido="pedido" @click.native="openPedido(pedido)" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import httpPedidos from '~/server/cardapio'
import TemplateFinalizationPedidoVue from './TemplateFinalizationPedido.vue'

export default Vue.extend({
  data() {
    return {
      listPedidos: [],
      selected: '',
    }
  },

  async fetch() {
    await httpPedidos
      .GetMenu()
      .then((res) => {
        this.listPedidos = res.data
      })
      .catch((error) => {
        console.log(error)
      })
  },

  methods: {
    openPedido(pedido) {
      this.$router.push({
        path: '/pedidos/newPedidos',
        query: {
          id: pedido.id,
          dataPedido: pedido.dateMenu,
        },
      })
    },
  },
})
</script>

<style scoped lang="scss">
.containerPedidos {
  width: 100%;
  padding: 2rem;
  .headerPedidos {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
    h3 {
      color: var(--white);
    }
    .inputPedido {
      width: 25%;
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
      label {
        color: var(--white);
      }
      input {
        width: 100%;
      }
    }
  }
  .listPedidos {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
  }
}
</style>
