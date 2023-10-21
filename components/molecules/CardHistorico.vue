<template>
    <div class="card-historico-container">
      <div class="header-card">
       <section style="display: flex; flex-direction: row-reverse; justify-content: space-between;">
        <span>   <strong>Id:</strong> {{ data.numberOrder }}</span>
        <span><strong>Data do Pedido:</strong> {{ formatDate(data.dateOrder) }}</span>
       </section>
        <span><strong>Valor total:</strong> {{ formatCurrency(valueorder(data.orderItem)) }}</span>
      </div>
      <div class="footer-card">
        <span><strong>Status: </strong><br/>{{ data.orderStatus.description }}</span>
        <ButtonPirula title="Ver Detalhes" @click.native="openModalHistorico" style="width: 50%;"/>
      </div>
      <ModalHistorico v-if="showModal" :valueTotal="formatCurrency(valueorder(data.orderItem))" :data="data" @closeModal="closeModalHistorico" />
    </div>
  </template>
  
  <script lang="ts">
  import Vue from 'vue';
  import dayjs from 'dayjs';
  
  export default Vue.extend({
    props: {
      data: {
        type: Object,
        required: true,
      },
    },
  
    data() {
      return {
        showModal: false,
      };
    },
  
    methods: {
      valueorder(listOrder) {
        return listOrder.reduce((total, item) => total + (Number(item.amountItem) * Number(item.valueOrderItem)), 0);
      },
  
      formatCurrency(value) {
        return value.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        });
      },
  
      formatDate(date) {
        return dayjs(date).format('DD/MM/YYYY');
      },
  
      openModalHistorico() {
        this.showModal = true;
      },
  
      closeModalHistorico() {
        this.showModal = false;
      },
    },
  });
  </script>
  
  <style lang="scss" scoped>
  .card-historico-container {
    background-color: var(--white);
    border-radius: 0.3rem;
    padding: 1rem;
    height: 150px;
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
  