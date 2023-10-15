<template>
    <div class="headerBashboard">
      <h1>{{title}}</h1>
      <div class="btns">
        <div style="display: flex; gap: 1rem; align-items: center; width: 35%;">
          <p>Data Inicio</p>
            <input type="date" v-model="startDate" style="background-color: var(--red);" />
          <p>Data Inicio</p>
            <input type="date" v-model="endDate" style="background-color: var(--red);"  />
        </div>
        <div class="selectInput">
          <div class="input">
            <label>Tipo Pedido</label>
            <select v-model="selectedType">
              <option value="">Todos</option>
              <option value="programmed">Programado</option>
              <option value="coffe">Coffee</option>
            </select>
          </div>
        
          <div class="input">
            <label>Clientes</label>
            <select v-model="selectedClient">
              <option value="" disabled>Selecionar Cliente</option>
              <option value="Sodex">Sodex</option>
              <option value="V&V Refeições">V&V Refeições</option>
              <option value="Prato Bom">Prato Bom</option>
              <option value="VA Refeições">VA Refeições</option>
            </select>
          </div>
    </div>
<!--       
        <v-date-picker v-model="date" mode="date">
          <template #default="{ inputEvents }">
            <button
              :class="{ focus: !isToday }"
              @click="calendarShowOrNot(false)"
              v-on="inputEvents"
            >
              Calendário
            </button>
          </template>
        </v-date-picker> -->
       
        </div>
      </div>

  </template>
  
  <script lang="ts">
  import Vue from 'vue'
  
  import dayjs from 'dayjs'
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
        selectedClient: '',

        startDate: '',
        endDate: '',

      }
    },
    computed: {
    filteredData() {
      return this.data.filter(item => {
        return item.data >= this.startDate && item.data <= this.endDate;
      });
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
  