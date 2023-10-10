<template>
    <div class="containerPedidosCoffe">
      <div class="headerPedidos" style="display: flex;
    justify-content: space-between;">
        <h2>Pedidos Coffee</h2>
       
    <button class="qtdPedidos" @click="() => (showModal = true)">
     <img src="../../assets/icons/shopCar.svg" />
     <span v-if="this.$store.state.pedidos.length > 0 ">
      <p>{{ this.$store.state.pedidos.length}}</p>
    </span> 
    <p style="margin-left: 0.5rem">Carrinho</p>
      </button>
      </div>

      <ModalCarrinhoCoffe v-if="showModal" :listaCompletaReceita="pedidos" @closeModal="() => (showModal = false)"  />
    </div>
    
  </template>
  
  <script lang="ts">
  import Vue from 'vue'
  
  export default Vue.extend({
    layout: 'pedidos',
    props: {
      dataPedido: {
        type: String,
        required: true,
      },
      qtdPedidos: {
        type: [Array, Object],
        required: true,
      },
      listaCompletaReceita: {
        type: [Array, Object],
        required: true,
      },
    },
    data() {
      return {
        active: true,
        lancheDesjejum: true,
        lanche01: false,
        lanche02: false,
        showModal: false,
      }
    },
    computed: {
    pedidos() {
      return this.$store.state.pedidos; 
    },
  },
    methods: {
      openModalHistorico() {
        this.showModal = true
      },
    
      finalizarPedidosProgramados() {
        this.$emit('finalizarPedido')
      },
    },
  })
  </script>
  
  <style scoped lang="scss">
  .containerPedidosCoffe {
    width: 100%;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid white;

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
          border-bottom: 1px solid #e5d7c5;
          background: #ea4e42;
          padding: 0.5rem 1rem;
          color: var(--white);
          height: 2.5rem;
          width: 7.5rem;
          border-top-left-radius: 4px;
          border-top-right-radius: 4px;
  
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
  