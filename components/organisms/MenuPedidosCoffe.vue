<template>
  <div class="containerPedidosCoffe">
    <div style="width: 100%;">
        <h2>Pedidos Coffee</h2></div>
    <div
      class="headerPedidos"
      style="display: flex; justify-content: space-between; padding-bottom: 0.4rem;"
    >
    <button @click="() => (showDate = !showDate)" class="btn-calendar">
      <span v-if="selectedDate === null"> Selecione uma Data</span>
      <span v-if="selectedDate !=null"> Data selecionada {{ formatDateGeral(selectedDate) }}</span>
      <img src="../../assets/icons/calendar.svg" alt="" />
    </button>

    <div v-if="showDate ===true" style="position: absolute; margin-top: 3rem;">
      <v-date-picker v-model="selectedDate"
      :min-date="formattedDate" color="red"/>
    </div>
      <button class="qtdPedidos" @click="openModal" >
        <img src="../../assets/icons/shopCar.svg" />
        <span v-if="this.$store.state.pedidos.length > 0">
          <p>{{ this.$store.state.pedidos.length }}</p>
        </span>
        <p style="margin-left: 0.5rem">Carrinho</p>
      </button>
    </div>

    <ModalCarrinhoCoffe
      :infoncliente="infoCliente"
      v-if="showModal"
      :listaCompletaReceita="pedidos"
      @closeModal="() => (showModal = false)"
    />
  </div>
</template>

<script lang="ts">
import dayjs from 'dayjs'
import Vue from 'vue'


export default Vue.extend({
  layout: 'pedidos',
  props: {
    infoCliente: Array,
  },
  data() {
    return {
      active: true,
      lancheDesjejum: true,
      lanche01: false,
      lanche02: false,
      showModal: false,
      show: false,
      selectedDate: null,
      today: new Date(),
      showDate:false
    }
  },
  watch: {
    selectedDate(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.$store.commit('setDataOrder',this.format(newValue))
        this.showDate = false;
      }
    },
  },
  computed: {
    formattedDate() {
      var time = new Date(this.formatDate(this.today));
      var outraData = new Date();
      outraData.setDate(time.getDate() + 3);
      return new Date(outraData)
    },
    pedidos() {
      return this.$store.state.pedidos
    },

  },
  methods: {
    formatDate(date) {
    return dayjs(date).format('YYYY-MM-DD')
    },
    formatDateGeral(date) {
      return dayjs(date).format('DD/MM/YYYY')
    },
    format(date) {
      return dayjs(date).toISOString()
    },
    openModalHistorico() {
      this.showModal = true
    },

    openModal(){
      if(this.selectedDate === null){
        alert('Selecione uma data')
      }
      if(this.selectedDate != ""){
        this.showModal = true
      }

    }


  },
})
</script>

<style scoped lang="scss">
.containerPedidosCoffe {
  width: 100%;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid white;
  .btn-calendar {
    background-color: var(--white);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    align-items: center;
    padding: 0.3rem;
    gap: 0.5rem;
    width: 10rem;
    font-size: 0.8rem;
    border-radius: 0.25rem;
    color: var(--text_color);

    &:hover{
      color: var(--red);
      font-weight: 600;
      letter-spacing: .2px;
    }
  }
  .headerPedidos {
    h2 {
      font-size: 1.4rem;
      color: var(--white);
    }
  }

  img {
    width: 35px;
    height: 35px;
  }

  .qtdPedidos {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    // border-bottom: 1px solid #e5d7c5;
    background: #ea4e42;
    padding: 0.5rem 1rem;
    color: var(--white);
    height: 2.5rem;
    width: 7.5rem;
    border-radius: 4px;


    span {
      position: relative;
      top: -15px;
      left: -15px;

      p {
        width: 25px;
        height: 25px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: var(--bg_color);
        border-radius: 50%;
        position: absolute;
        top: -10px;
        color: black;
      }
    }

    button {
      display: flex;
      align-items: center;
      gap: 1.3rem;
      padding: 0.5rem;
      font-size: 1.1rem;

      img {
        height: 20px;
      }
    }
  }
}
</style>
