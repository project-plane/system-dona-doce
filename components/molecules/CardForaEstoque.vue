<template>
  <div class="containerCard">
    <img
      :src="`https://api.donadoce.net/img_revenue/${foraDeEstoque.imagem}`"
      alt=""
    />
    <div class="cardPedido">
      <div class="descriptionPedido">
        <h3>{{ foraDeEstoque.description }}</h3>
        <p>R$ {{ foraDeEstoque.value.toFixed(2) }}</p>
      </div>
      <div>
        <div class="selectPedido">
          <p>Quantidade</p>
          <input
            style="width: 6.5rem"
            v-model="qtdPedido"
            :min="foraDeEstoque.base_min_amount"
            :max="foraDeEstoque.base_max_amount"
            type="number"
          />
        </div>
        <div
          style="
            display: flex;
            width: 100%;
            justify-content: flex-end;
            color: red;
            font-size: 9px;
          "
        >
          <span
            >Min: {{ foraDeEstoque.base_min_amount }} <strong> - </strong>
          </span>
          <span>Max: {{ foraDeEstoque.base_max_amount }}</span>
        </div>
      </div>

      <div class="selectPedido">
        <p>Modo de preparo</p>
        <select
          v-model="selected"
          style="border: 1px solid var(--red); height: 35px"
        >
          <option value="" disabled>Selecione</option>
          <option value="roast">Assado</option>
          <option value="frozen">Congelado</option>
        </select>
      </div>
    </div>
    <input type="text" placeholder="Observacoes sobre o pedido..." v-model="comentario" style="border-bottom: solid 1px #b9b9b9a1; border-radius: 0px;">
    <button @click="addPedidos(foraDeEstoque)">Adicionar</button>
    
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    foraDeEstoque: {
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
      comentario:""
    }
  },

  methods: {
    addPedidos(lanche) {
      if (!this.qtdPedido || !this.selected) {
        this.$toast.error('Preencha o campo quantidade!!!')
        return
      }

      this.$emit(
        'pedidosForeEstoque',
        this.qtdPedido,
        lanche.id,
        this.foraDeEstoque,
        this.selected,
        this.comentario
        
      )
      const dataForaEstoque =  {
      fk_revenue: "string",
      fk_categoryOrderItem: "string",
      amountItem: Number(this.qtdPedido),
      method_of_preparation: "string",
      comment: "string"
    }
      this.qtdPedido = ''
      this.selected = ''
      this.comentario = ""
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
