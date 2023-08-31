<template>
  <div class="informationFinance">
    <div class="finance">
      <h2>Financeiro</h2>
    </div>
    {{ teste }}
    <div v-if="teste">
      oi
    </div>
    <div class="informationOrder" v-else>
      <h3>Informações do pedido</h3>
      <span>Clique no card de pedido para visualizar as informações
        secundárias</span>
      <img src="~/assets/icons/cooke.svg" alt="" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      objectValeu: {
        empresa: "AMAZÔNIA REFEIÇÕES", cliente: "UNICOBA", status: 0, total: 2458
      }
    }
  },
  async fetch() {
    const teste = this.$store.state.dadosPedidos
    // await this.$store.state.dadosPedidos
    console.log(teste);

  },
  computed: {
    teste() {
      const objectValeu = this.$store.state.dadosPedidos
      if (Object.keys(objectValeu).length === 0) {
        console.log('vazio');
      }
      else {
        console.log('cheio');
        return objectValeu
      }
    }
  },
})
</script>

<style scoped lang="scss">
.informationFinance {
  width: 100%;
  height: 100%;

  .finance {
    padding: 0 1rem;
  }

  .informationOrder {
    padding: 0 1rem;
    height: 265px;
    overflow: scroll;

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
