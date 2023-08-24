<template>
  <div class="informationFinance">
    <div class="finance">
      <h4>Financeiro</h4>
    </div>
    <div class="informationOrder">
      <h3>Informações do pedido</h3>
      <span>clique no card de pedido para visualizar as informações
        secundárias</span>
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
  height: 50%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;

  .informationOrder {
    h3 {
      font-size: 1.3rem;
      color: var(--red);
    }

    img {
      display: flex;
      justify-content: center;
      align-items: center;
      width: auto;
      padding: 2rem;
    }
  }
}
</style>
