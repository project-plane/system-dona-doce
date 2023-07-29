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
    <h3 v-if="statusPedidos === 0 && !$fetchState.pending">Dias Disponiveis</h3>

    <div v-if="$fetchState.pending && statusPedidos === 0">Carregando dados..</div>
    <div v-if="statusPedidos === 0" class="listPedidos">
      <div v-for="pedido in listPedidos" :key="pedido.id">
        <CardPedido :data-pedido="pedido" @click.native="openPedido(pedido)" />
      </div>
    </div>
    <div v-else class="listPedidos">
      <div v-for="pedido in listAllReceitas" :key="pedido.id">
        <CardCoffee :pedido-coffee="pedido" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import TemplateFinalizationPedidoVue from './TemplateFinalizationPedido.vue'
import httpPedidos from '~/server/cardapio'
import httpReceitas from '~/server/receitas'

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
    await httpReceitas
      .GetAllReceitas()
      .then((res) => {
        this.listAllReceitas = res.data
      })
      .catch((error) => {
        console.log(error)
      })

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
  height: 100vh;
  padding: 6rem 4rem 4rem 4rem;
  display: flex;
  flex-direction: column;
  .headerPedidos {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    gap: 1rem;
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
      gap: 0.5rem;
      align-items: center;
      justify-content: center;

      .input {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;
        img {
          color: var(--white);
          width: 1.2rem;
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
    margin-top: 0.3rem;
    flex-wrap: wrap;
  }
}
</style>
