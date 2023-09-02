<template>
  <div class="cards-container">
    <div class="inputCheckbox">
      <input type="checkbox" v-model="selectAll" />
      <Label>Selecionar Todos</Label>
    </div>
    <div class="cardDashboard">
      <div v-for="(pedidos, index) in dataPedidos" :key="index">
        <CardDashboard :dataPedidos="pedidos" :allPedidos="dataPedidos" :index="index"
          @click.native="clickOrderFind(pedidos)" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import httpOrder from '~/server/pedidos'

export default Vue.extend({
  data() {
    return {
      selectAll: '',
      dataPedidos: [],
      selectOrder: [],
    }
  },
  async fetch() {
    await httpOrder
      .OrderHistory()
      .then((res) => {
        this.dataPedidos = res.data
      })
      .catch((error) => {
        console.log(error)
      })
  },
  watch: {
    selectAll(newValue, oldValue) {
      if (newValue) {
        this.dataPedidos.map((item) => {
          this.selectOrder.push({
            clients: item.user.Clients,
          })
        })
        return
      }
      this.selectOrder = []
    },
  },
  methods: {
    clickOrderFind(order) {
      console.log(order)
    },
  },
})
</script>

<style lang="scss" scoped>
.cards-container {
  height: auto;
  padding: 2rem;
  overflow-y: auto;

  .inputCheckbox {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    margin-bottom: 1rem;

    label {
      font-weight: bold;
    }
  }

  .cardDashboard {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
    gap: 1rem;
  }
}
</style>
