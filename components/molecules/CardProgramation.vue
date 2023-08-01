<template>
  <div class="containerCard">
    <img :src="`https://api.donadoce.gedroid.com/img_revenue/${tipoLanches.revenues.imagem}`" alt="" />
    <div class="cardPedido">
      <div class="descriptionPedido">
        <h3>{{ tipoLanches.revenues.description }}</h3>
        <p>R$ {{ tipoLanches.revenues.value }}</p>
      </div>
      <div class="selectPedido">
        <p>Qtd Selecionada</p>
        <input v-model="tipoLanches.revenues.yield_per_quantity" type="text" />
      </div>
    </div>
    <button @click="addPedidos(tipoLanches)">Adicionar Pedido</button>
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
    tipoPedido: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      pedido: {
        fk_revenue: "string",
        fk_categoryOrderItem: "string",
        amountItem: 0
      }
    }
  },
  methods: {
    addPedidos(lanche) {
      this.pedido.fk_revenue = lanche.fk_revenues
      this.pedido.amountItem = Number(lanche.revenues.yield_per_quantity)
      this.pedido.fk_categoryOrderItem = this.tipoPedido
      this.$store.commit('CREATE_NEW_ORDER', this.pedido)
    },
  },
})
</script>

<style scoped lang="scss">
.containerCard {
  width: 100%;
  background: var(--white);
  border-radius: 0.4rem;
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
    border-radius: 0.4rem 0.4rem 0 0;
    background-size: cover;
    object-fit: cover;
    height: 250px;
  }

  .descriptionPedido {}

  button {
    background: var(--bg_heade_table);
    padding: 1rem 0;
    border-radius: 0 0 0.4rem 0.4rem;
    font-size: 1rem;
  }
}
</style>
