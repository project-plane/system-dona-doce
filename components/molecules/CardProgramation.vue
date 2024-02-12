<template>
  <div class="containerCard">
    <img :src="`https://api.donadoce.net/img_revenue/${tipoLanches.imagem}`" alt="" />
    <div class="cardPedido">
      <div class="descriptionPedido">
        <h3>{{ tipoLanches.descriptionRevenue }}</h3>
        <p>R$ {{ tipoLanches.valeuRevenue.toFixed(2) }}</p>
      </div>
     <div>

      <div class="selectPedido">
        <p>Quantidade</p>
        <input
          style="width: 6.5rem;"
          v-model="qtdPedido"
          type="number"
    
  />
      </div>
      <div style="display: flex; width: 100%;  justify-content: flex-start; margin-top: -5px; gap: 0.3rem; color: rgb(161, 143, 137); font-size: 12px; font-weight: 600; vertical-align: text-top; ">
        <span>Qtd. Min. {{ base_min_amount }} x </span>  
        <span>Qtd. Max. {{ base_max_amount }}</span>
      </div>

    </div>

      <div class="selectPedido">
        <p>Modo de preparo </p>
        <select v-model="selected" style="border: 1px solid var(--red); height: 35px;" >
          <option value="" disabled>Selecione</option>
          <option value="roast">Assado</option>
          <option value="frozen">Congelado</option>
        </select>
      </div>

    <input type="text" placeholder="Observacoes sobre o pedido..." v-model="comentario" style="border-bottom: solid 1px #b9b9b9a1; border-radius: 0px;">
    </div>
    <button @click="addPedidos(tipoLanches)">Adicionar</button>


  </div>
</template>

<script lang="js">
import Vue from 'vue'

export default Vue.extend({
  props: {
    tipoLanches: {
      type: Object,
      required: true,
    },
    base_max_amount:{
      type: String,
      required: true,
    },
    base_min_amount:{
      type: String,
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
      comentario:"",

    }
  },

  methods: {
    addPedidos(lanche) {
      if (!this.qtdPedido || !this.selected) {
        this.$toast.error('Preencha o campo quantidade!!!')
        return
      }
      const fkRevenueExists = this.$store.state.carrinhoProgramado.some(pedido => pedido.fk_revenues === lanche.fk_revenues);
      if (fkRevenueExists) {
        this.$toast.info('Esse Pedido já foi adicionado!');
        return;
      }
      this.$emit(
        'pedidos',
        this.qtdPedido,
        lanche.fk_revenues,
        this.tipoLanches,
        this.selected,
        this.comentario

        
      )
      const pedidos ={
        fk_categoryOrderItem: this.tipoPedido,
        amountItem: Number(this.qtdPedido),
        fk_revenue: lanche.fk_revenues,
        method_of_preparation: this.selected,
        comment: this.comentario,
      }
      const data = {
        pedidos : pedidos,
        listReceita: this.tipoLanches,
     
      };

      this.$store.commit("adicionarPedidoProgramado", data);
      
  
      this.qtdPedido = ''
      this.selected = ''
      this.comentario = ''
    },
  },
})
</script>

<style scoped lang="scss">

.descriptionPedido {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.containerCard {
  width: 100%;
  max-width: 371px;
  background: var(--white);
  border-radius: 0.4rem;
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  .cardPedido {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
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
