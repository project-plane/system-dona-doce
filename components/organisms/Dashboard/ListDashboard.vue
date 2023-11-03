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
          @click.native="clickOrderFind(pedidos)"
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
      selectedTipo: this.$store.state.selectedTipo || "undefined",
      selectedStatus: this.$store.state.selectedStatus || "undefined",
      selectedClient: this.$store.state.selectedClient || "undefined",
      dataCalendar: dayjs.formtDateUSA(new Date())
    }
  },
  async fetch() {
    this.loading = true
    this.dataPedidos = []
    await httpOrder
      .OrderHistory(this.dataCalendar,this.selectedClient, this.selectedTipo, this.selectedStatus)
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
    async selectedTipoComputed(newValue){
        this.selectedTipo = newValue
        await this.atualizar();
      },
    async selectedStatusComputed(newValue){
      this.selectedStatus = newValue
      await this.atualizar();

    },
    async selectedClientComputed(newValue){
      this.selectedClient = newValue
      await this.atualizar();
    },
    async selectedCalendarComputed(newValue){
      this.dataCalendar =  dayjs.formtDateUSA(newValue);
      await this.atualizar();
    }
  },
  methods: {
    clickOrderFind(order) {
    },

    async atualizar(){
      console.log({teste: this.dataCalendar});

      this.loading = true
      this.dataPedidos = []
        await httpOrder.OrderHistory(this.dataCalendar,this.selectedClient, this.selectedTipo, this.selectedStatus)
        .then((res) => {
          this.dataPedidos = res.data
          this.$store.commit('LIST_ALL_ORDER', this.dataPedidos)
        })
        .catch((error) => {
          console.log(error)
        })

      this.loading = false

    }

  },
  computed: {
    selectedTipoComputed(){
        return this.$store.state.selectedTipo
       },
    selectedStatusComputed(){
        return this.$store.state.selectedStatus
       },
        selectedClientComputed(){
        return this.$store.state.selectedClient
       },
       selectedCalendarComputed(){
        return this.$store.state.dateCalendar
       }
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
