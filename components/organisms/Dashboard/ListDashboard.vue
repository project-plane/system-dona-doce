<template>
  <div class="cards-container">
    <div v-for="(pedidos, index) in dataPedidos" :key="pedidos">
      <CardDashboard :dataPedidos="pedidos" :index="index" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    dataPedidos: {
      type: [Array, Object],
      required: true
    },
  },
})
</script>

<style lang="scss" scoped>
.cards-container {
  height: 300px;
  padding: 2rem 2vw;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1rem;
  overflow-y: auto;
}
</style>
