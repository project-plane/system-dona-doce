<template>
  <div class="containerPedidos">
    <div class="headerPedidos">
      <div class="input_radio">
        <input
          id="programation"
          v-model="statusPedidos"
          type="radio"
          name="programation"
          :value="0"
        />
        <div class="input">
          <img src="~/assets/icons/programationWhite.svg" alt="" />
          <label class="programado" for="programation"> Programado </label>
        </div>
      </div>
      <div class="input_radio">
        <input
          id="programation"
          v-model="statusPedidos"
          type="radio"
          name="programation"
          :value="1"
        />
        <div class="input">
          <img src="~/assets/icons/coffeeWhite.svg" alt="" />
          <label class="programado" for="programation"> Coffee </label>
        </div>
      </div>
    </div>
    <div class="listPedidos" v-if="statusPedidos === 0">
      <div v-for="pedido in listPedidos" :key="pedido.id">
        <CardPedido :dataPedido="pedido" @click.native="openPedido(pedido)" />
      </div>
    </div>
    <div class="listPedidos" v-else>
      <div v-for="pedido in listAllReceitas" :key="pedido.id">
        <CardCoffee :pedidoCoffee="pedido" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import httpPedidos from '~/server/cardapio'
import httpReceitas from '~/server/receitas'
import TemplateFinalizationPedidoVue from './TemplateFinalizationPedido.vue'

export default Vue.extend({
  layout: 'pedidos',
  data() {
    return {
      listPedidos: [],
      listAllReceitas: [],
      selected: '',
      statusPedidos: 0,
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
    await httpReceitas
      .GetAllReceitas()
      .then((res) => {
        this.listAllReceitas = res.data
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
  padding: 4rem;
  display: flex;
  flex-direction: column;
  margin-top: 10vh;
  .headerPedidos {
    width: 30%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 2rem;
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
    .input_radio {
      display: flex;
      gap: 1rem;
      align-items: center;
      justify-content: center;

      .input {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        gap: 0.5rem;
        img {
          color: var(--white);
        }

        .coffee,
        .programado {
          color: var(--white);
          font-weight: 500;
          font-size: 1.2rem;
        }
      }
    }
  }
  .listPedidos {
    width: 100%;
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }
}
</style>
