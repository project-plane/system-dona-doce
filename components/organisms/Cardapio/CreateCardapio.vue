<template>
    <Container>
        <Title title="Novo Cardápio" />
        <div class="calendar-content">
          <div class="calendar">
            <span>Selecione as datas</span>
            <v-date-picker v-model="date" :attributes="attributes" is-expanded mode="date" color="red"/>
            <pre>{{ date }}</pre>
            <span>Quantidade de dias: {{ days.length }}</span>
          </div>
          
          <div class="calendar-input">
            <span>Dia: {{ formatDate(date) }}</span>
            <div class="input-select">
              <span>Desejujum</span>
              <select v-model="selected">
                <option disabled value="">Selecionar Receita</option>
                <option v-for="(receita, index) in optionsReceitas" :key="index">
                  {{ receita.description }}
                </option>
              </select>
            </div>

            <div class="input-select">
              <span>Lanche 01</span>
              <input type="text">
            </div>

            <div class="input-select">
              <span>Lanche 02</span>
              <input type="text">
            </div>

            <div class="input-select">
              <span>Lanche 03</span>
              <input type="text">
            </div>

          </div>
          
        </div>
        <div class="row-button">
          <Button title="Salvar Cardápio" @click.native="saveCardapio" />
        </div>
  </Container>
</template>

<script lang="ts">
import Vue from 'vue'
import dayjs from 'dayjs'
import httpReceitas from '~/server/receitas'
export default Vue.extend({
  data() {
    return {
      days: [{ id: "2023-07-07", date: "2023-07-07T04:00:00.000Z" }, { id: "2023-07-08", date: "2023-07-08T04:00:00.000Z" }, { id: "2023-07-09", date: "2023-07-09T04:00:00.000Z" }],
      optionsReceitas: [],
      date: ''
    };
  },

  computed: {
    dates() {
      return this.days.map(day => day.date);
    },
    attributes() {
      return this.dates.map(date => ({
        highlight: true,
        dates: date,
      }));
    },
  },

  watch: {
    date (newValue) {
      this.date = new Date(newValue).toISOString()
    }
  },

  created() {
    httpReceitas.GetReceitas().then( (res) => {
      this.optionsReceitas = res.data
    })
  },

  methods: {
    formatDate(date) {
      return `${dayjs(date).format('DD/MM/YYYY')}`
    }
  },


  

})
</script>

<style lang="scss" scoped>

.calendar-content {
  margin-top: -1rem;
  display: flex;
  justify-content: space-between;

  .calendar {
    display: flex;
    flex-direction: column;
    width: 45%
  }

  .calendar-input {
    width: 45%;
    display: flex;
    flex-direction: column;
    gap: 1rem;


    .input-select {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
  

      span {
        font-size: 1rem;
      }

      select {
        border: 0.06rem solid var(--border);
        border-radius: 0.25rem;
      }
    }
  }
}

.row-button {
  display: flex;
  justify-content: flex-end;
}
</style>
