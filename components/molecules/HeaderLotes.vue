<template>
   <Loading v-if="loading"  />
    <div v-else class="headerBashboard">
      <h1>{{title}}</h1>
      <div class="btns">
       
        <div class="selectInput" >
          <div class="input" v-if="select === true">
          <label>Clientes</label>
          <select v-model="selectedClient" @change="searchCliente">
            <option value="" disabled>Selecionar Cliente</option>
            <option v-for="item in listClient" :value="item.id" :key="item.id">{{ item.corporate_name }}</option>
        </select>
        <!-- <pre>{{ listClient[0].id }}</pre> -->
        </div>
          <div class="input" v-if="typeOrder === true">
            <label>Tipo Pedido</label>
            <select v-model="selectedType"  @change="searchCliente">
              <option value="">Todos</option>
              <option value="programmed">Programado</option>
              <option value="coffe">Coffee</option>
            </select>
          </div>
      
          <div style="display: flex; gap: 1rem; align-items: center; width: 50%;" v-if="filterData === true">
         <label for="">
          <p>Data Inicio</p>
           <input type="date" id="startDate" style="background-color: white;" v-model="startDate"  @change="emitDateRange" />
         </label>
         <label for="">
          <p>Data Final</p>
           <input type="date" id="endDate"   style="background-color: white;"  v-model="endDate" @change="emitDateRange" />
         </label>
        </div>
        <div class="searchId" v-if="filterSearch === true">
             <label :for="label">{{ label }}</label>
              <input  placeholder="Pesquisar por Id" type="text" :id="label" :value="value" @input="$emit('input', $event.target.value)">
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
      label: String,
      value: String,
      title: String,
      typeOrder: Boolean,
      filterData: Boolean,
      filterSearch:Boolean,
      select: Boolean
    },
    data() {
      return {
        textSearch:'',
        
        selectedType: '',
        selectedAgenda: '',
        selectedClient: '',
        listClient:[],
        startDate: '',
        endDate: '',
        loading: false,

      }
    },
    async fetch() {
    this.loading = true
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
      this.$emit('searchCliente', this.selectedClient, this.selectedType )
    },
    emitDateRange() {
      this.$emit('dateRangeSelected', {
        startDate: this.startDate,
        endDate: this.endDate,
      });
    }
  },
  
   
  watch: {
    selectedType(newValue) {
      this.$store.commit('SELECTED_TIPO', newValue)
    },
    selectedAgenda(newValue) {
      this.$store.commit('SELECTED_STATUS', newValue)
    },
    selectedClient(newValue) {
      this.$store.commit('SELECTED_NAME_CLIENT', newValue)
    },
 
    
  },
  })
  </script>
  
  <style scoped lang="scss">
  .headerBashboard {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 1rem;
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
  .searchId{
    @extend .input;
    right: auto;
    input {
    width: 100%;
    border: 0.03rem solid var(--border);
    border-radius: 0.25rem;
    background-image: url('../../assets/icons/search.svg');
    background-position-y: center;
    background-repeat: no-repeat;
    background-position-x: right;
    background-size: 22px;
    
  }
    

  }
  </style>
  