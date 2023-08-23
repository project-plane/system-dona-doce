<template>
  <div class="calendar-container">
    <div class="columnLeft">
      <div class="headerCalendar">
        <h1>Agenda</h1>
        <div class="btns">
          <button :class="{ focus: isToday }" @click="calendarShowOrNot(true)">
            Hoje
          </button>

          <v-date-picker v-model="date" mode="date">
            <template v-slot="{ inputEvents }">
              <button
                :class="{ focus: !isToday }"
                @click="calendarShowOrNot(false)"
                v-on="inputEvents"
              >
                Calendário
              </button>
            </template>
          </v-date-picker>
        </div>
      </div>

      <div class="row-calendar">
        <div class="calendar">
          <span> {{ formatDateDayOfWeek(date) }}</span>
          <h2>{{ formatDateDayAndMes(date) }}</h2>
        </div>
      </div>
    </div>
    <div class="columnRight">
      <div class="headerValue">
        <div class="valueLeft">
          <div class="valueReceber">
            <span>Valor total a receber</span>
            <strong v-if="visualization">R$: 7.854,00</strong>
            <strong v-else>R$: --------</strong>
          </div>
          <div class="valueCompras">
            <span>Compras</span>
            <strong v-if="visualization">R$: 2.000,00</strong>
            <strong v-else>R$: --------</strong>
          </div>
        </div>
        <div class="valueRight">
          <div class="valueLucro">
            <span>Lucro</span>
            <strong v-if="visualization">R$: 5.854,00</strong>
            <strong v-else>R$: --------</strong>
          </div>
          <img
            v-if="visualization"
            @click="visualization = false"
            src="~/assets/icons/eye.svg"
            alt=""
          />
          <img
            v-else
            @click="visualization = true"
            src="~/assets/icons/eyeClose.svg"
            alt=""
          />
        </div>
      </div>
      <div class="selectInput">
        <div class="input">
          <label>Visualizar pedido(s)</label>
          <select>
            <option value="">Programado</option>
            <option value="">Coffee</option>
          </select>
        </div>
        <div class="input">
          <label>Clientes / Empresas</label>
          <select>
            <option value="">Clientes</option>
            <option value="">Empresas</option>
          </select>
        </div>
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

<style lang="scss" scoped>
.calendar-container {
  padding: 2rem 2vw;
  width: 100%;
  display: flex;
  justify-content: space-between;

  .columnLeft {
    .headerCalendar {
      .btns {
        button {
          width: 7rem;
          height: 2.5rem;
          border-radius: 6rem;
          font-size: 1rem;
          font-weight: 600;
          background-color: transparent;
          border: 1px solid var(--red);
        }

        .focus {
          background-color: var(--red);
          color: var(--white);
        }
      }
    }

    .row-calendar {
      margin-top: 1rem;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: end;
    }
  }

  .columnRight {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .headerValue {
      display: flex;
      gap: 2rem;
      border-bottom: 1px solid var(--border);
      padding-bottom: 0.6rem;

      .valueLeft {
        .valueReceber {
          display: flex;
          flex-direction: column;
          color: var(--red);
        }

        .valueCompras {
          display: flex;
          flex-direction: column;
          color: var(--bg_color_modal);
        }
      }

      .valueRight {
        display: flex;
        justify-content: flex-end;
        gap: 0.7rem;

        .valueLucro {
          display: flex;
          flex-direction: column;
          color: var(--green);
          font-size: 2rem;
        }

        img {
          width: 30px;
        }
      }
    }
    .selectInput {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      .input {
        display: flex;
        flex-direction: column;
      }
    }
  }
}
</style>
