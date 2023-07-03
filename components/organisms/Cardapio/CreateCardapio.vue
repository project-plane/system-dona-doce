<template>
    <Container>
        <Title title="Novo Cardápio" />
        <div class="calendar-content">
          <div class="calendar">
            <span>Selecione uma data</span>
            <v-date-picker v-model="date" :attributes="attributes" is-expanded mode="date" color="red"/>
            <!-- <pre>objeto local {{ cardapio  }}</pre>
            
            <pre>listagem do back {{ days }}</pre> -->
          </div>
          
          <div class="calendar-input" v-if="formatDate(date) !== 'Invalid Date' && formatDate(date) !== '31/12/1969'">
            <span>Dia: {{ formatDate(date) }}</span>
            <div class="input-select">
              <span>Desjejum</span>
              <select v-model="cardapio.desjejum">
                <option disabled value="">Selecionar Receita</option>
                <option v-for="(receita, index) in optionsReceitas" :key="index">
                  {{ receita.description }}
                </option>
              </select>
            </div>

            <div class="input-select">
              <span>Lanche 01</span>
              <select v-model="cardapio.lanche01">
                <option disabled value="">Selecionar Receita</option>
                <option v-for="(receita, index) in optionsReceitas" :key="index">
                  {{ receita.description }}
                </option>
              </select>
            </div>

            <div class="input-select">
              <span>Lanche 02</span>
              <select v-model="cardapio.lanche02">
                <option disabled value="">Selecionar Receita</option>
                <option v-for="(receita, index) in optionsReceitas" :key="index">
                  {{ receita.description }}
                </option>
              </select>
            </div>

            <div class="input-select">
              <span>Lanche 03</span>
              <select v-model="cardapio.lanche03">
                <option disabled value="">Selecionar Receita</option>
                <option v-for="(receita, index) in optionsReceitas" :key="index">
                  {{ receita.description }}
                </option>
              </select>
            </div>

          </div>
          
        </div>
        <div class="row-button" v-if="formatDate(date) !== 'Invalid Date' && formatDate(date) !== '31/12/1969'">
          <Button title="Salvar" @click.native="saveDayCardapio" />
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
      days: [
      { 
          id: "1",
          date: "2023-07-04T04:00:00.000Z",
          desjejum: 'coxinha',
          lanche01: 'kibe',
          lanche02: 'enroladinho de salsicha',
          lanche03: 'coxinha',
        },
        { 
          id: "2",
          date: "2023-07-09T04:00:00.000Z",
          desjejum: 'Kibe',
          lanche01: 'coxinha',
          lanche02: 'enroladinho de salsicha',
          lanche03: 'coxinha',
        }
      
      ],
      optionsReceitas: [],
      date: '',
      cardapio: {
        date: '',
        desjejum: '',
        lanche01: '',
        lanche02: '',
        lanche03: ''
      }
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
      this.days.map ( (item) => {
        if(dayjs(item.date).format('DD/MM/YYYY') === dayjs(newValue).format('DD/MM/YYYY')) {
          console.log('existe na listagem')
        } else {
          console.log('não existe')
          this.cardapio.date = newValue
        }
      })

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
      return dayjs(date).format('DD/MM/YYYY')
    },

    saveDayCardapio() {
      // aqui vai ficar o endpoint
      this.days.push(this.cardapio)
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
