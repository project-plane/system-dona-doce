<template>
  <div>
    <div v-if="loading == true">
      <LoadingPage />
    </div>
    <div v-else class="cards-container">
      <div class="cardDashboard">
        <CardDashboard
          v-for="(pedidos, index) in dataPedidos"
          :key="index"
          :data-pedidos="pedidos"
          :all-pedidos="dataPedidos"
          :index="index"
          @click.native="() => clickOrderFind(pedidos)"
        />

        <span v-if="dataPedidos.length <= 0" class="spanFiltro">
          Nenhum resultado encontrado. <br />
          Tente ajustar os filtros da sua pesquisa e tente novamente
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import httpOrder from '~/server/pedidos'
import dayjs from '~/services/dayjs'

export default Vue.extend({
  data() {
    return {
      selectAll: '',
      dataPedidos: [],
      selectOrder: [],
      pedidoProgramado: [],
      pedidoCoffee: [],
      loading: false,
      selectedTipo: this.$store.state.selectedTipo,
      selectedStatus: this.$store.state.selectedStatus,
      selectedClient: this.$store.state.selectedClient,
      selectedUnidade: this.$store.state.unidadeSelecionada,

      dataCalendar: dayjs.formtDateUSA(new Date()),
    }
  },
  async fetch() {
    this.loading = true
    this.dataPedidos = []

    await httpOrder
      .OrderHistory(this.dataCalendar)
      .then((res) => {
        this.dataPedidos = res.data
        this.$store.commit('LIST_ALL_ORDER', this.dataPedidos)
      })
      .catch((error) => {
        console.log(error)
      })

    this.loading = false
  },
  watch: {
    async selectedTipoComputed(newValue) {
      this.selectedTipo = newValue
      await this.atualizar()
    },
    async selectedStatusComputed(newValue) {
      this.selectedStatus = newValue
      await this.atualizar()
    },
    async selectedClientComputed(newValue) {
      this.selectedClient = newValue
      await this.atualizar()
    },
    async selectedCalendarComputed(newValue) {
      this.dataCalendar = dayjs.formtDateUSA(newValue)
      await this.atualizar()
    },
    async selectedUnidadeComputed(newValue) {
      this.selectedUnidade = newValue
      await this.atualizar()
    },
    selectedClient: 'completeRota',
    selectedUnidade: 'completeRota',
    selectedStatus: 'completeRota',
    selectedTipo: 'completeRota',
  },
  methods: {
    async atualizar() {
      this.loading = true;
      this.dataPedidos = [];
      this.completeRota();

      const rotas = [this.rotaCliente, this.rotaUnidade, this.rotaStatus, this.rotaTipo].filter(Boolean).join('&');

      try {
        const res = await httpOrder.OrderHistory(this.dataCalendar, rotas);
        this.dataPedidos = res.data;
        this.$store.commit('LIST_ALL_ORDER', this.dataPedidos);
        res.data.forEach((item) => {
          item.orderItem.forEach((id) => {
            this.pedidoForaEstoque = id.of_menu;
          });
        });
      } catch (error) {
        console.error(error);
      }

  this.loading = false;
},
    completeRota() {
      this.rotaCliente = this.selectedClient ? `fk_client=${this.selectedClient}&` : '';
      this.rotaUnidade = this.selectedUnidade ? `fk_company=${this.selectedUnidade}&` : '';
      this.rotaStatus = this.selectedStatus ? `statusOrder=${this.selectedStatus}&` : '';
      this.rotaTipo = this.selectedTipo ? `orderType=${this.selectedTipo}&` : '';
  },
 
  clickOrderFind(order) {},
  },
  computed: {
    selectedTipoComputed() {
      return this.$store.state.selectedTipo
    },
    selectedStatusComputed() {
      return this.$store.state.selectedStatus
    },
    selectedClientComputed() {
      return this.$store.state.selectedClient
    },
    selectedCalendarComputed() {
      return this.$store.state.dateCalendar
    },
    selectedUnidadeComputed() {
      return this.$store.state.unidadeSelecionada
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
