<template>
  <div class="containerCard">
    <img :src="tipoLanches.img" :alt="tipoLanches.description" />
    <div class="cardPedido">
      <div class="descriptionPedido">
        <h3>{{ tipoLanches.description }}</h3>
        <p>R$ {{ tipoLanches.value }}</p>
      </div>
      <div class="selectPedido">
        <p>Qtd Selecionada</p>
        <input type="text" v-model="tipoLanches.qtd" />
      </div>
    </div>
    <button @click="addPedidos">Adicionar ao calendário</button>
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
      if (!this.tipoLanches.qtd) {
        this.$toast.info('Campo quantidade vazio')
        return
      }
      const dadosPedidos = {
        imgLanche: this.tipoLanches.img,
        descriptionLanche: this.tipoLanches.description,
        valueLanche: this.tipoLanches.value,
        qtdLanche: this.tipoLanches.qtd,
      }

      this.$store.commit('SAVE_DADOS_PEDIDOS_PROGRAMADOS', dadosPedidos)

      this.tipoLanches.qtd = ''
    },
  },
})
</script>

<style scoped lang="scss">
.containerCard {
  width: 27%;
  height: 100%;
  background: var(--white);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
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
