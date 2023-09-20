<template>
  <div class="containerCard">
    <img
      :src="`https://api.donadoce.gedroid.com/img_revenue/${tipoLanches.imagem}`"
      alt=""
    />
    <div class="cardPedido">
      <div class="descriptionPedido">
        <h3>{{ tipoLanches.descriptionRevenue }}</h3>
        <p>R$ {{ tipoLanches.valeuRevenue }}</p>
      </div>
      <div class="selectPedido">
        <p>Qtd Selecionada</p>
        <input v-model="qtdPedido" type="text" />
      </div>
      <div class="selectPedido">
        <p>Tipo</p>
        <select
          v-model="selected"
          style="border: 1px solid var(--border); height: 30px"
        >
          <option value="" disabled>Selecione o tipo de pedido</option>
          <option value="assado">Assado</option>
          <option value="congelado">Congelado</option>
        </select>
      </div>
    </div>
    <button @click="addPedidos(tipoLanches)">Adicionar</button>
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
      required: true,
    },
  },

  data() {
    return {
      qtdPedido: '',
      selected: '',
    }
  },

  methods: {
    addPedidos(lanche) {
      if (!this.qtdPedido) {
        this.$toast.error('Preencha o campo quantidade!!!')
        return
      }

      this.$emit(
        'pedidos',
        this.qtdPedido,
        lanche.fk_revenues,
        this.tipoLanches,
        this.selected
      )
      this.qtdPedido = ''
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

  button {
    background: var(--bg_heade_table);
    padding: 1rem 0;
    border-radius: 0 0 0.4rem 0.4rem;
    font-size: 1rem;
  }
}
</style>
