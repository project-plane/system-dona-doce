<template>
  <div class="headerBashboard">
    <h1>Agenda</h1>
    <div class="btns">
      <button :class="{ focus: isToday }" @click="calendarShowOrNot(true)">
        Hoje
      </button>

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
      </v-date-picker>
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
          <label>Status</label>
          <select v-model="selectedAgenda">
            <option value="">Todos</option>
            <option value="022ac120002-1c69-11ee-be56-0242ac120002">Solicitado</option>
            <option value="11ee6828-1c69-11ee-be56-c691200020241">Agendado</option>
            <option value="314e2828-1c69-11ee-be56-c691200020241">Pré-Produção</option>
            <option value="45690813-1c69-11ee-be56-c691200020241">Em Processamento</option>
            <option value="789850813-1c69-11ee-be56-c691200020241">Em Entrega</option>
            <option value="1c69c120002-575f34-1c69-be56-0242ac1201c69">Entregue</option>
          </select>
        </div>
        <div class="input">
          <label>Clientes</label>
          <select v-model="selectedClient">
            <option value="" >Todos</option>
            <option v-for="item in listClient" :value="item.id" :key="item.id">{{ item.corporate_name }}</option>
        </select>
        </div>


      </div>
    </div>
    <div class="row-calendar">
      <div class="calendar">
        <span> {{ formatDateDayOfWeek(date) }}</span>
        <h2>{{ formatDateDayAndMes(date) }}</h2>
      </div>
    </div>


  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import httpClients from '~/server/cliente'

export default Vue.extend({

  props: {

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
      listClient: [],
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
      this.$store.commit('SELECTED_CLIENT', newValue)
    },
  },

  methods: {
    formatDateDayOfWeek(date) {
      dayjs.locale('pt-br')
      return dayjs(date).format('dddd')
    },

    formatDateDayAndMes(date) {
      dayjs.locale('pt-br')
      return dayjs(date).format('DD.MMMM.YYYY')
    },

    formatDateYear(date) {
      dayjs.locale('pt-br')
      return dayjs(date).format('YYYY')
    },
    calendarShowOrNot(foo) {
      this.isToday = foo
      if (!this.isToday) {
        console.log('show modal, bro')
      } else {
        this.date = new Date()
      }
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
      width: 100%;
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
