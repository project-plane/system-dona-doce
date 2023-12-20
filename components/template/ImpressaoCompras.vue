<template>
  <div class="informationFinance">
    <div class="informationOrder">
      <div class="list-buy">
        <div>
          <section class="headerLista">
            <h2>Lista de Compras</h2>
            <span>
              Valor Total <strong>{{ valueorder(valorSoma) }}</strong></span
            >
          </section>
          <div v-for="(l, index) in listBuy" :key="index">
            <div class="line-buy">
              <div>
                {{ l.quantity_to_buy }}{{ l.unit_of_measurement }} -
                {{ l.description }}
              </div>
              <div>R$: {{ l.value_prediction }}</div>
            </div>
            <div style="border: 1.5px dashed rgba(69, 64, 64, 0.968)"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import dayjs from '~/services/dayjs'

export default Vue.extend({
  props: {
    listBuy: Array,
    valorSoma: Number
  },
  data() {
    return {
        valorCompras: this.$store.state.value_buy,
    }
  },
  fetch(){
    window.print()
  },    
  methods: {
    valueorder(number) {
      const value = dayjs.valueorder(number)
      return value
    },
  },
})
</script>

<style scoped lang="scss">
.informationFinance {
  width: 100vw;
  display: flex;
  justify-content: center;
}
.informationOrder {
  width: 90%;
  padding-top: 1rem;
}
.headerLista {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.imgCooke {
  position: absolute;
  top: 50%;
  z-index: 1;
}
.list-buy {
  min-height: 10rem;
  overflow: scroll;
}
.line-buy {
  display: flex;
  flex-direction: row;
  padding: 4px;
  justify-content: space-between;
}
</style>
