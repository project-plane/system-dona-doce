<template>
  <div class="calendar-container">
    <HeaderDashboard />
    <section v-if="this.$store.state.selectedStatus === 'Pré-Produção'">
      <CalendarDashboard />
    </section>
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
  padding: 1rem 2vw;
  width: 100%;
  display: flex;
  flex-direction: column;
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
