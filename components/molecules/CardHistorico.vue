<template>
  <div class="card">
    <img src="/_nuxt/static/icon/cutEffect.svg" alt="" class="svg" />
    <div class="card-historico-container">
      <div class="header-card">
        <div style="display: flex; justify-content: space-between">
          <span><strong>Pedido:</strong> {{ data.numberOrder }}</span>
          <span><strong>Total:</strong> {{ valueorder(data.orderItem) }}</span>
        <!-- <pre>{{ data.orderItem }}</pre> -->
        </div>

        <span><strong>Data de Solicitação:</strong> {{ formatDate(data.dateOrder) }}</span>
        <span><strong>Data de Entrega:</strong> {{ formatDate(data.orderItem[0].delivery_date) }}</span>
        <!-- <pre>{{ formatDate(data.dateOrder) }}</pre> -->
      </div>

      <div class="dcardapio">
        <div style="display: flex; justify-content: center; flex-direction: column;  ">
          <div style="width: 100%; text-align: center;">
          <!-- <strong>Itens de Pedido</strong> -->
        </div>
        <div  class="dpedidos"  >

        </div>
        </div>
        <!-- <div v-for="(iten, index) in data.orderItem" :key="index">
          <div class="dpedidos">
            <div>{{ iten.revenues.description }}</div>
            <div> R$: {{ iten.amountItem * iten.valueOrderItem.toFixed(2) }} </div>
          </div>

          <div style="border: 1px dashed rgba(69, 64, 64, 0.968)"></div>
        </div> -->
      </div>

      <div class="footer-card">
        <span
          ><strong>Status: </strong><br />{{
            data.orderStatus.description
          }}</span
        >

        <ButtonPirula
          title="Ver Detalhes"
          @click.native="() => (showModal = true)"
          style="width: 50%"
        />
      </div>

      <ModalHistorico
        v-if="showModal"
        :valueTotal="valueorder(data.orderItem)"
        :data="data"
        @closeModal="() => (showModal = false)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import dayjs from '~/services/dayjs'
export default Vue.extend({
  props: {
    data: {
      type: [Array, Object],
      required: true,
    },
  },

  data() {
    return {
      showModal: false,
      totalOrderValue: 0,
      valorTotal: 0,
    }
  },

  methods: {
    valueorder(listOrder) {
    const totalOrderValue = listOrder.reduce((total, item) => {
      const amount = Number(item.amountItem);
      const value = Number(item.valueOrderItem);

      
      const itemTotal = amount * value;
      // console.log(itemTotal);
      return total + itemTotal;
    }, 0);

    // Formatando o valor total como moeda BRL
    const formattedTotal = totalOrderValue.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

    return formattedTotal;
},


    formatDate(date) {
      return dayjs.formtDateBr(date)
    },

    openModalHistorico() {
      this.showModal = true
      // this.$store.commit('OPEN_MODAL_HISTORICO', true)
    },
  },
})
</script>

<style lang="scss" scoped>
.card {
  display: flex;
  flex-direction: column;
}
.card img {
  width: 24rem;
  position: relative;
  top: 0.2999vw;
}

.dpedidos{
  display: flex;
  justify-content: space-between;
}
.card-historico-container {
  width: 24rem;
  background-color: var(--white);
  border-radius: 0.3rem;
  padding: 1rem;
  min-height: auto;
  height: auto;;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .header-card {
    display: flex;
    flex-direction: column;
  }

  .footer-card {
    justify-content: space-between;
    align-items: flex-end;
    display: flex;
  }
}
</style>
