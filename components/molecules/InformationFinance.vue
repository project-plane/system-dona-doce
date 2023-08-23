<template>
  <div class="informationFinance">
    <div class="finance">
      <h3>Financeiro</h3>
    </div>
    <div class="informationOrder">
      <h2>Informações do pedido</h2>
      <span
        >clique no card de pedido para visualizar as informações
        secundárias</span
      >
      <img src="~/assets/icons/cooke.svg" alt="" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>

<style scoped lang="scss">
.informationFinance {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2rem;
  .informationOrder {
    h2 {
      font-size: 1.7rem;
      color: var(--red);
    }
    img {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      padding: 2rem;
    }
  }
}
</style>
