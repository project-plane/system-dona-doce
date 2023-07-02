<template>
    <Container>
        <Title title="Novo Cardápio" />
        <div>
          <div class="containerSelect">
            <div class="contenteDate">
              <div class="selectDay" @click="showModal = true">
                <div v-if="startDay == 0">
                  dias
                </div>
                <div v-else>
                  <p v-if="startDay != endDay">{{ startDay }} a {{ endDay }}</p>
                  <p v-else>{{ startDay }}</p>
                </div>
              </div>
                <select id="" v-model="selected" name="" @click="showModal = false">
                    <option disabled>Selecione um mês</option>
                    <option v-for="(month, index) in months" :key="index" :value="index+1">{{ month.name }}</option>
                </select>
                <div class="year">
                  {{ year }}
                </div>
            </div>
          </div>
          <select id="" v-model="selected" name="" @click="showModal = false">
            <option disabled>Selecione um mês</option>
            <option
              v-for="(month, index) in months"
              :key="index"
              :value="index + 1"
            >
              {{ month.name }}
            </option>
          </select>
          <div class="year">
            {{ year }}
          </div>
        </div>
        <button>Criar</button>
      </div>
      <div class="days" v-if="showModal">
        <div v-for="(day, index) in daysIsMonth(selected, year)" :key="index">
          <button
            :class="styleButton(startDay, endDay, index + 1)"
            @click="selectDay(day)"
            @dblclick="restartDay(day)"
          >
            {{ day }}
          </button>
        </div>
      </div>
    </div>
  </Container>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      selected: 0,
      months: [
        { name: 'Janeiro', value: 1 },
        { name: 'Fevereiro', value: 2 },
        { name: 'Março', value: 3 },
        { name: 'Abril', value: 4 },
        { name: 'Maio', value: 5 },
        { name: 'Junho', value: 6 },
        { name: 'Julho', value: 7 },
        { name: 'Agosto', value: 8 },
        { name: 'Setembro', value: 9 },
        { name: 'Outubro', value: 10 },
        { name: 'Novembro', value: 11 },
        { name: 'Dezembro', value: 12 },
      ],
      year: 0,
      monthAtual: 0,
      slcDay: 0,
      startDay: 0,
      endDay: 0,
      showModal: false,
    }
  },
  watch: {
    selected(newValue) {
      const year = new Date().getFullYear()
      if (newValue < this.monthAtual) {
        if (year === this.year) {
          this.year += 1
        }
      }
      if (newValue > this.monthAtual || newValue === this.monthAtual) {
        this.year = year
      }
    },
    slcDay(newValue, oldValue) {
      if (oldValue === 0 || oldValue > newValue) {
        this.startDay = newValue
        this.endDay = newValue
        return
      }
      this.startDay = oldValue
      this.endDay = newValue
    },
  },
  mounted() {
    this.IsMonth()
    this.isYear()
  },
  methods: {
    IsMonth() {
      const today = new Date().getMonth() + 1
      this.selected = today
      this.monthAtual = today
      return today
    },
    isYear() {
      const year = new Date().getFullYear()
      this.year = year
      return year
    },
    daysIsMonth(month: number, year: number) {
      const date = new Date(year, month, 0)
      const lastDay = date.getDate()
      return lastDay
    },
    selectDay(day: number) {
      this.slcDay = day
    },
    styleButton(startDay: number, endDay: number, list: number) {
      if (list >= startDay && list <= endDay) {
        return 'checkBtn'
      }
    },
    restartDay(day) {
      this.startDay = day
      this.endDay = day
    },
  },
})
</script>

<style lang="scss" scoped>
$boxSize: 2rem;
.days {
  display: grid;
  grid-auto-rows: $boxSize;
  grid-template-columns: repeat(auto-fill, minmax($boxSize, 1fr));
  width: 16rem;
  background: var(--white);
  padding: 1rem;
  margin-top: 0.5rem;
  button {
    width: 100%;
    height: 100%;
    background: none;
  }
  .checkBtn {
    color: var(--red);
    font-weight: bold;
  }
}
.containerSelect {
  display: flex;
  .selectDay {
    background: var(--white);
    width: fit-content;
    padding: 0 1rem;
    border-right: 2px solid var(--border);
    cursor: pointer;
  }
  .contenteDate {
    background-color: var(--white);
    width: fit-content;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    .year {
      padding: 0 1rem;
      border-left: 2px solid var(--border);
      cursor: not-allowed;
    }
  }
  button {
    background: var(--txt_color);
    color: var(--white);
    padding: 0 1rem;
    font-weight: bold;
    font-size: 1.2rem;
  }
}
</style>
