<template>
    <div class="headerBashboard">
      <h1>{{title}}</h1>
      <div class="btns">
       
        <div class="selectInput">
          <div class="input">
          <label>Clientes</label>
          <select v-model="selectedClient" @change="searchCliente">
            <option value="" disabled>Selecionar Cliente</option>
            <option value="" >Todos</option>
            <option v-for="item in listClient" :value="item.id" :key="item.id">{{ item.corporate_name }}</option>
        </select>
        <!-- <pre>{{ listClient[0].id }}</pre> -->
        </div>
          <div class="input">
            <label>Tipo Pedido</label>
            <select v-model="selectedType">
              <option value="">Todos</option>
              <option value="programmed">Programado</option>
              <option value="coffe">Coffee</option>
            </select>
          </div>
          <div style="display: flex; gap: 1rem; align-items: center; width: 35%;">
         <label for="">
          <p>Data Inicio</p>
           <input type="date" v-model="startDate" style="background-color: var(--red);" />
         </label>
         <label for="">
          <p>Data Final</p>
           <input type="date" v-model="endDate" style="background-color: var(--red);" />
         </label>
        </div>
      </div>

       
        </div>
      </div>

  </template>
  
  <script lang="ts">
  import Vue from 'vue'
  import httpClients from '~/server/cliente'
  import 'dayjs/locale/pt-br'
  
  export default Vue.extend({
  
    props: {
  
      title: String,
    },
    data() {
      return {
        isToday: true,
        calendarStatus: false,
        date: new Date(),
        visualization: false,
        selectedType: '',
        selectedAgenda: '',
        selectedClient: 'CLIENTE 2',
        listClient:[],
        startDate: '',
        endDate: '',
        dataPedidos:[],
        filteredData: [],
        range: {
          start: new Date(),
          end: new Date(),
        },

      }
    },
    async fetch() {
    await httpClients
      .GetAllClients()
      .then((res) => {
        this.listClient = res.data
      })
      .catch((error) => {
        console.log(error)
      })
    this.loading = false
  },
    computed: {
    filteredData() {
      return this.data.filter(item => {
        return item.data >= this.startDate && item.data <= this.endDate;
      });
    },
  },
  methods:{
    searchCliente() {
      this.$emit('searchCliente', this.selectedClient)
    },
    // filterByDateRange(startDate, endDate) {
    //   this.listFiltered = []
    //   this.filterData.map((item) => {
    //     item.dateOrder = new Date(item.dateOrder).toISOString().split('T')[0]
    //     const itemDate = new Date(item.dateOrder)
    //     if (itemDate >= new Date(startDate) && itemDate <= new Date(endDate)) {
    //       this.listFiltered.push(item)
    //     }
    //   })
    // },
    filterByType() {
      if (this.selectedType === '' && this.selectedAgenda === '') {
        this.filter = false ;
      } else {
        this.filter = true
        this.filterData = this.historico.filter((item) => {
          let typeCondition =
            this.selectedType === '' || item.order_type === this.selectedType
          let agendaCondition =
            this.selectedAgenda === '' ||
            item.orderStatus.description === this.selectedAgenda

          return typeCondition && agendaCondition
        })
      }
    },
  },
  
   
  watch: {
    date(newValue) {
      if (
        newValue.toISOString().split('T')[0] !==
        new Date().toISOString().split('T')[0]
      ) {
        this.isToday = false
      } else {
        this.isToday = true
      }
    },
    selectedType(newValue) {
      this.$store.commit('SELECTED_TIPO', newValue)
    },
    selectedAgenda(newValue) {
      this.$store.commit('SELECTED_STATUS', newValue)
    },
    selectedClient(newValue) {
      this.$store.commit('SELECTED_NAME_CLIENT', newValue)
    },
    range: {
      handler(newValue) {
        this.filterByDateRange(
          new Date(newValue.start).toISOString().split('T')[0],
          new Date(newValue.end).toISOString().split('T')[0]
        )
      },
      deep: true,
    },
    
  },
  })
  </script>
  
  <style scoped lang="scss">
  .headerBashboard {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 1rem 0;
    border-bottom: 1px solid var(--border);
  
    .btns {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
  
      button {
        width: 7rem;
        height: 2.5rem;
        border-radius: 6rem;
        font-size: 1rem;
        font-weight: 600;
        background-color: transparent;
        border: 1px solid var(--red);
        margin-top: 1rem;
      }
  
      .focus {
        background-color: var(--red);
        color: var(--white);
      }
  
      .selectInput {
        width: 40%;
        display: flex;
  
        gap: 1rem;
  
        .input {
          width: 100%;
          display: flex;
          flex-direction: column;
        }
      }
    }
  }
  </style>
  