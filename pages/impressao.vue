<template>
  <ImpressaoCompras :listBuy="listBuyParsed" :valorSoma="value" />
</template>

<script lang="ts">
import { Value } from 'sass'
import Vue from 'vue'

export default Vue.extend({
  layout: 'dashboard',
  data() {
    return {
      listBuyParsed: null,
      value: 0
    }
  },
  mounted() {
    this.listBuyParsed = JSON.parse(this.$route.query.listBuy || '[]')
    this.soma()
  },
  methods: {
    soma() {
      this.value = this.listBuyParsed
        .map((item) => Number(item.value_prediction))
        .reduce((total, value) => total + value, 0)

        console.log(this.value);
        
    },
  },
})
</script>

<style scoped></style>
