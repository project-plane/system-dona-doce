<template>
  <div class="containerCard">
    <div class="cointainerCard__ImgProduto">
      <img
        :src="`https://api.donadoce.gedroid.com/img_revenue/${infoCoffee.imagem}`"
        alt="Imagem do produto"
      />
    </div>
    <div class="descriptionPedido">
      <h3>{{ infoCoffee.description }}</h3>
      <span>R$: {{ infoCoffee.value }}</span>
    </div>
    <section class="cointainerCard__Inputs">
      <div class="selectPedido">
        <label>Qtd. Selecionada
          <div style="width: 100%;">
          <span style="font-size: 10px; color:  rgb(115 98 93); font-weight: 600; vertical-align: text-top; "> Qtd. min: {{ infoCoffee.base_min_amount}}</span>
          <span style="font-size: 10px; color:  rgb(115 98 93); font-weight: 600; vertical-align: text-top;" > x max: {{ infoCoffee.base_max_amount }}</span>
        </div>

   

        </label>
        <input
          type="number"
          v-model="pedidoCoffee.amountItem"
        />
        
      </div>
      
      <div class="selectPedido">
        <label>Tipo</label>
        <select name="cars" v-model="pedidoCoffee.method_of_preparation">
          <option value="frozen">Congelado</option>
          <option value="roast">Assado</option>
        </select>
      </div>

      <div class="selectPedido">
        <label >Horário</label>
        <select name="cars" v-model="pedidoCoffee.order_time">
          <option value="2023-10-21T09:00:00.000Z">09:00</option>
          <option value="2023-10-21T10:00:00.000Z">10:00</option>
          <option value="2023-10-21T11:00:00.000Z">11:00</option>
          <option value="2023-10-21T12:00:00.000Z">12:00</option>
          <option value="2023-10-21T13:00:00.000Z">13:00</option>
          <option value="2023-10-21T14:00:00.000Z">14:00</option>
          <option value="2023-10-21T15:00:00.000Z">15:00</option>
          <option value="2023-10-21T16:00:00.000Z">16:00</option>
          <option value="2023-10-21T17:00:00.000Z">17:00</option>

        </select>
    
      </div>
    </section>
   
    <button @click="adicionarPedido">Adicionar</button>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    infoCliente: Array,
    infoCoffee: {
      type: Object,
      required: true,
      
    },
  },
  data(){
    return{
      pedidoCoffee:{
        amountItem: 0,
        method_of_preparation: "",
        order_time:"",
        delivery_date:null,
      }
    }
  },
  methods: {
    adicionarPedido() {
    const { amountItem, method_of_preparation, order_time } = this.pedidoCoffee;

    if (!amountItem || !method_of_preparation || !order_time) {
      this.$toast.info('Os Campos não podem ficar vazios!');
      return;
    }

    if (!this.$store.state.dataPedido) {
      this.$toast.info('Selecione uma data');
      return;
    }

    const fkRevenueExists = this.$store.state.pedidos.some(pedido => pedido.fk_revenue === this.infoCoffee.id);
    if (fkRevenueExists) {
      this.$toast.info('Esse Pedido já foi adicionado!');
      this.limparPedido();
      return;
    }

    if (amountItem >= 1) {
      const novoItem = {
        fk_revenue: this.infoCoffee.id,
        amountItem: parseInt(amountItem),
        delivery_date: this.$store.state.dataPedido,
        order_time,
        method_of_preparation,
        infoProduct: this.infoCoffee
      };

      const data = {
        fk_revenue: this.infoCoffee.id,
        amountItem: parseInt(amountItem),
        delivery_date: this.$store.state.dataPedido,
        order_time,
        method_of_preparation,
      };

      this.$store.commit("adicionarPedido", novoItem);
      this.$store.commit("addOrder", { id: "", data });
    }

  this.limparPedido();
},

limparPedido() {
  this.pedidoCoffee.amountItem = '';
  this.pedidoCoffee.order_time = '';
  this.pedidoCoffee.method_of_preparation = '';
}
  },
})
</script>

<style scoped lang="scss">
.containerCard {
  border-radius: 0.4rem;
  border: 1px solid rgba(255, 255, 255, 0.27);
  background: #fff;
  width: auto;
  max-width: 18.4rem;
  min-height: 25.6rem;
  .cointainerCard__ImgProduto {
    height: 166px;
    background: rgb(72, 158, 158);
    border-top-left-radius: 0.4rem;
    border-top-right-radius: 0.4rem;
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
        font-size: 87.5%;
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
    border-bottom-left-radius: 0.4rem;
    border-bottom-right-radius: 0.4rem;
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
