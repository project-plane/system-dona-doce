<template>
  <div>
    <div v-if="loading == true">
      <LoadingPage />
    </div>
    <div v-else class="cards-container">
      <!-- <div class="inputCheckbox">
      <input v-model="selectAll" type="checkbox" />
      <Label>Selecionar Todos</Label>
    </div> -->

      <div v-if="$store.state.selectedTipo === ''" class="cardDashboard">
        <CardDashboard
          v-for="(pedidos, index) in filteredItems"
          :key="index"
          :data-pedidos="pedidos"
          :all-pedidos="dataPedidos"
          :index="index"
          @click.native="clickOrderFind(pedidos)"
        />
        <span v-if="filteredItems.length <= 0" class="spanFiltro">
          Nenhum resultado encontrado. <br />
          Tente ajustar os filtros da sua pesquisa e tente novamente
        </span>
      </div>

      <div
        v-if="$store.state.selectedTipo === 'programmed'"
        class="cardDashboard"
      >
        <CardDashboard
          v-for="(pedidos, index) in pedidoProgramado"
          :key="index"
          :data-pedidos="pedidos"
          :all-pedidos="dataPedidos"
          :index="index"
        />
      </div>

      <div v-if="$store.state.selectedTipo === 'coffe'" class="cardDashboard">
        <CardDashboard
          v-for="(pedidos, index) in pedidoCoffee"
          :key="index"
          :data-pedidos="pedidos"
          :all-pedidos="dataPedidos"
          :index="index"
          @click.native="clickOrderFind(pedidos)"
        />
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
      pedidoProgramado: [],
      pedidoCoffee: [],
      loading: false,
    }
  },
  async fetch() {
    this.loading = true
    await httpOrder
      .OrderHistory()
      .then((res) => {
        this.dataPedidos = res.data
        this.$store.commit('LIST_ALL_ORDER', this.dataPedidos)
      })
      .catch((error) => {
        console.log(error)
      })

    this.dataPedidos.map((e) => {
      if (e.order_type === 'programmed') {
        this.pedidoProgramado.push(e)
      } else {
        this.pedidoCoffee.push(e)
      }
    })

    this.loading = false
  },
  watch: {},
  methods: {
    clickOrderFind(order) {
      console.log(order)
    },
  },
  computed: {
    filteredItems() {
      if (!this.$store.state.selectedClient) {
        return this.dataPedidos;
      } else {
        // Filtrar os itens com base no valor selecionado
        return this.dataPedidos.filter(
          (item) => item.fk_user === this.$store.state.selectedClient
        )
      }
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
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
    justify-content: space-between;
    gap: 1rem;
    .spanFiltro {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      height: 50vh;
    }
  }
}
</style>
