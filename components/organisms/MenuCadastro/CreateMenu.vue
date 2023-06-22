<template>
    <Container>
        <Title>
            <h1>Novo Cardápio</h1>
        </Title>
        <div class="containerSelect">
          <div class="contenteDate">
              <select id="" v-model="selected" name="">
                  <option disabled>Selecione um mês</option>
                  <option v-for="(month, index) in months" :key="index" :value="index+1">{{ month.name }}</option>
              </select>
              <div class="year">
                {{ year }}
              </div>
          </div>
          <button>Criar</button>
        </div>
    </Container>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
        selected: 0,
        months:[
            {name: "Janeiro", value: 1},
            {name: "Fevereiro", value: 2},
            {name: "Março", value: 3},
            {name: "Abril", value: 4},
            {name: "Maio", value: 5},
            {name: "Junho", value: 6},
            {name: "Julho", value: 7},
            {name: "Agosto", value: 8},
            {name: "Setembro", value: 9},
            {name: "Outubro", value: 10},
            {name: "Novembro", value: 11},
            {name: "Dezembro", value: 12}
        ],
        year: 0,
        monthAtual: 0
    }
  },
  watch:{
    selected(newValue){
      const year = new Date().getFullYear()
        if(newValue < this.monthAtual){
          if(year === this.year){
            this.year +=1
          }
        }
        if(newValue > this.monthAtual || newValue === this.monthAtual ){
            this.year = year
        }
    }
  },
  mounted(){
    this.IsMonth()
    this.isYear()
  },
  methods:{
    IsMonth(){
        const today = new Date().getMonth()+1
        this.selected = today
        this.monthAtual = today
        return today
    },
    isYear(){
      const year = new Date().getFullYear()
      this.year = year
      return year
    }
  }
})

</script>

<style lang="scss" scoped>
.containerSelect{
display: flex;
  .contenteDate{
    background-color: var(--white);
    width: fit-content;
    display: flex;
    align-items: center;
    gap: .5rem;
    .year{
      padding: 0 1rem;
      border-left: 2px solid var(--border);
    }
  }
  button{
    background: var(--txt_color);
    color: var(--white);
    padding: 0 1rem;
    font-weight: bold;
    font-size: 1.2rem;
  }
}
</style>