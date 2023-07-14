<template>
  <div class="containerCard">
    <img
      :src="`https://api.donadoce.gedroid.com/img_revenue/${tipoLanches.revenues.imagem}`"
      alt=""
    />
    <div class="cardPedido">
      <div class="descriptionPedido">
        <h3>{{ tipoLanches.revenues.description }}</h3>
        <p>R$ {{ tipoLanches.revenues.value }}</p>
      </div>
      <div class="selectPedido">
        <p>Qtd Selecionada</p>
        <input type="text" v-model="tipoLanches.revenues.yield_per_quantity" />
      </div>
    </div>
    <button @click="addPedidos">Adicionar Pedido</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    tipoLanches: {
      type: Object,
      required: true,
    },
  },
  methods: {
    addPedidos() {
      if (!this.tipoLanches.revenues.yield_per_quantity) {
        this.$toast.info('Campo quantidade vazio')
        return
      }
      const dadosPedidos = {
        imgLanche: this.tipoLanches.revenues.imagem,
        descriptionLanche: this.tipoLanches.revenues.description,
        valueLanche: this.tipoLanches.revenues.value,
        qtdLanche: this.tipoLanches.revenues.yield_per_quantity,
      }

      this.$store.commit('SAVE_DADOS_PEDIDOS_PROGRAMADOS', dadosPedidos)

      this.tipoLanches.yield_per_quantity = ''
      this.$toast.success('Pedido adicionado com sucesso!!!')
    },
  },
})
</script>

<style scoped lang="scss">
.containerCard {
  width: 27%;
  background: var(--white);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  .cardPedido {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 1rem;
    .selectPedido {
      display: flex;
      gap: 1rem;
      align-items: center;
      justify-content: space-between;
      p {
        color: var(--red);
      }
      input {
        border: 1px solid var(--red);
        height: 35px;
      }
    }
  }
  img {
    width: 100%;
    height: 250px;
  }
  .descriptionPedido {
  }
  button {
    background: var(--bg_heade_table);
    padding: 1rem 0;
    font-size: 1rem;
  }
}
</style>
