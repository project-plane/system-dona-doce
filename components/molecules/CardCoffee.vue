<template>
  <!-- <div class="containerCard">
    <img :src="`https://api.donadoce.gedroid.com/img_revenue/${pedidoCoffee.imagem}`" alt="" />
    <div class="cardPedido">
      <div class="descriptionPedido">
        <h3>{{ pedidoCoffee.description }}</h3>
        <p>R$ {{ pedidoCoffee.value }}</p>
      </div>
      <div class="selectPedido">
        <p>Qtd Selecionada</p>
        <input v-model="pedidoCoffee.yield_per_quantity" type="text" />
        
      </div>
      <div class="selectPedido">
        <p>Tipo</p>
        <input v-model="pedidoCoffee.yield_per_quantity" type="text" />
        
      </div>
      <div class="selectPedido">
        <p>Horário</p>
        <input v-model="pedidoCoffee.yield_per_quantity" type="text" />
        
      </div>
    </div>
    <button @click="addPedidos">Adicionar</button>
  </div> -->
  <div class="containerCard">
    <div class="cointainerCard__ImgProduto">
      <img
        src="https://api.donadoce.gedroid.com/img_revenue/7a190d3b-5fd2-4232-bb2e-82bafb5be7b7.jpeg"
        alt="Imagem do produto"
      />
    </div>
    <div class="descriptionPedido">
      <h3>{{ pedidoCoffee.description }}</h3>
      <h4>R$: {{ pedidoCoffee.value }}</h4>
    </div>
    <section class="cointainerCard__Inputs">
      <div class="selectPedido">
        <label for="qtdSelecionada">Qtd. Selecionada</label>
        <input
          id="qtdSelecionada"
          type="number"
          v-model="pedidoCoffee.yield_per_quantity"
        />
      </div>

      <div class="selectPedido">
        <label for="tipo">Tipo</label>
        <select name="cars" id="cars">
          <option value="Congelado">Congelado</option>
          <option value="Assado">Assado</option>
        </select>
      </div>

      <div class="selectPedido">
        <label for="horario">Horário</label>
        <input id="horario" v-model="pedidoCoffee.time" type="text" />
      </div>
    </section>
    <button @click="addPedidos">Adicionar</button>
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
  border-radius: 19px;
  border: 1px solid rgba(255, 255, 255, 0.27);
  background: #fff;
  width: auto;
  max-width: 18.4rem;
  min-height: 25.6rem;
  .cointainerCard__ImgProduto {
    height: 166px;
    background: rgb(72, 158, 158);
    border-top-left-radius: 1.2rem;
    border-top-right-radius: 1.2rem;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .descriptionPedido {
    padding: 0rem 0.4rem 0.4rem 0.4rem;
  }
  .cointainerCard__Inputs {
    display: flex;
    flex-direction: column;
    padding: 0rem 0.4rem 0.4rem 0.4rem;
    gap: 0.5rem;
    .selectPedido {
      display: flex;
      gap: 1rem;
      align-items: center;
      justify-content: space-between;

      label {
        color: var(--red);
        font-size: medium;
        font-weight: 500;
      }

      input,
      select {
        border: 1px solid var(--red);
        height: 35px;
        width: 38%;
        border-radius: 2rem;
      }
    }
  }
  button {
    background: var(--bg_heade_table);
    padding: 1rem 0;
    font-size: 1rem;
    width: 100%;
    border-bottom-left-radius: 1.2rem;
    border-bottom-right-radius: 1.2rem;
    height: 3.48rem;
    display: block;
    font-weight: 600;
    letter-spacing: 2.5px;
    &:hover {
      box-shadow: 0 6px 8px 0 rgba(0, 0, 0, 0.24),
        0 17px 50px 0 rgba(0, 0, 0, 0.19);
        color: var(--red)
    }
  }
}
</style>
