<template>
  <div class="headerBashboard">
    <h1>Agenda</h1>
    <div class="btns">
      <button :class="{ focus: isToday }" @click="calendarShowOrNot(true)">
        Hoje
      </button>

      <v-date-picker v-model="date" mode="date">
        <template v-slot="{ inputEvents }">
          <button :class="{ focus: !isToday }" @click="calendarShowOrNot(false)" v-on="inputEvents">
            Calendário
          </button>
        </template>
      </v-date-picker>
      <div class="selectInput">
        <div class="input">
          <label>Tipo Pedido</label>
          <select>
            <option value="" disabled>Selecionar tipo pedido</option>
            <option value="">Programado</option>
            <option value="">Coffee</option>
          </select>
        </div>
        <div class="input">
          <label>Status</label>
          <select>
            <option value="">Selecionar status</option>
            <option value="">Solicitado</option>
            <option value="">Agendado</option>
            <option value="">Pré-Produção</option>
            <option value="">Em Processamento</option>
            <option value="">Em Entrega</option>
            <option value="">Entregue</option>
          </select>
        </div>
        <div class="input">
          <label>Clientes</label>
          <select>
            <option value="">Selecionar Cliente</option>
            <option value="">Sodex</option>
            <option value="">V&V Refeições</option>
            <option value="">Prato Bom</option>
            <option value="">VA Refeições</option>
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

export default Vue.extend({
  data() {
    return {
      isToday: true,
      calendarStatus: false,
      date: new Date(),
      visualization: false,
    }
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
