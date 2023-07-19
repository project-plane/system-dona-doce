<template>
  <div class="containerCard">
    <div class="dataPedido">
      <span
        >{{ new Date(dataPedido.dateMenu).getDate() }}/{{
          new Date(dataPedido.dateMenu).getMonth() + 1
        }}/{{ new Date(dataPedido.dateMenu).getFullYear() }}</span
      >
    </div>
    <div class="pedidos">
      <div class="qtdPedidos">
        <span>Qtd. Pedidos</span>
        <span>{{ this.$store.state.qtdPedidos }}</span>
      </div>
      <ButtonPirula title="Adicionar Pedido" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    dataPedido: {
      type: [Object, Array],
      required: true,
    },
  },
  data() {
    return {
      qtdPedido: 0,
    }
  },
  methods: {},
})
</script>

<style scoped lang="scss">
.containerCard {
  width: 100%;
  height: 100%;
  background: var(--white);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  .dataPedido {
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid var(--border);
    padding-bottom: 2rem;
  }
  .pedidos {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 3rem;
    padding-top: 2rem;
    .qtdPedidos {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
