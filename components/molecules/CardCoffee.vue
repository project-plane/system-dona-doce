<template>
  <div class="containerCard">
    <img
      :src="`https://api.donadoce.gedroid.com/img_revenue/${pedidoCoffee.imagem}`"
      alt=""
    />
    <div class="cardPedido">
      <div class="descriptionPedido">
        <h3>{{ pedidoCoffee.description }}</h3>
        <p>R$ {{ pedidoCoffee.value }}</p>
      </div>
      <div class="selectPedido">
        <p>Qtd Selecionada</p>
        <input v-model="pedidoCoffee.yield_per_quantity" type="text" />
      </div>
    </div>
    <button @click="addPedidos">Adicionar Pedido</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    pedidoCoffee: {
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

      
      // const createOrderItemDto = {
      //   imgLanche: this.tipoLanches.revenues.imagem,
      //   descriptionLanche: this.tipoLanches.revenues.description,
      //   valueLanche: this.tipoLanches.revenues.value,
      //   qtdLanche: this.tipoLanches.revenues.yield_per_quantity,
      // }

      // this.$store.commit('SAVE_DADOS_PEDIDOS_PROGRAMADOS', createOrderItemDto)

      this.tipoLanches.yield_per_quantity = ''
      this.$toast.success('Pedido adicionado com sucesso!!!')
    },
  },
})
</script>

<style scoped lang="scss">
.containerCard {
  width: 100%;
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
        width: 40%;
      }
    }
  }
  img {
    width: 438px;
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
