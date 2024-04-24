<template>
  <div class="card">
    <img src="/_nuxt/static/icon/cutEffect.svg" alt="" class="svg" />
   <!-- <pre> {{ data }}</pre> -->
    <div class="card-historico-container">
      <div class="header-card">
        <div style="display: flex; justify-content: space-between">
          <div>
            <span><strong>Id:</strong> {{ data.numberOrder }}</span>
            <span><strong>Unidade:</strong> {{ data.company.corporate_name }}</span>
          </div>
          <div>
            <img style="height: 2.5rem;width: 2.5rem;" v-if="data.order_type === 'programmed'" src="../../assets/icons/programado.svg" />
            <img style="height: 2.5rem;width: 2.5rem;" v-else src="../../assets/icons/coffee.svg" alt="" />
         </div>
         
        </div>
        <span style="font-size: 14px;"><strong>Solicitação:</strong> {{ formatDate(data.dateOrder) }}</span>
        <span style="font-size: 14px;"><strong>Data de Entrega:</strong> {{ formatDate(data.orderItem[0].delivery_date) }}</span>
     
 
      </div>

      <span><strong>Total:</strong> {{ valueorder(data.orderItem) }}</span>
      <div class="footer-card">
        <span><strong>Status: </strong><br />
        {{data.orderStatus.description}}</span>

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
  width: 28rem;
  position: relative;
  top: 0.2999vw;
}

.dpedidos{
  display: flex;
  justify-content: space-between;
}
.card-historico-container {
  width: 28rem;
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
