<template>
    <div v-if="loading" class="loading">
      <span class="loader"></span>
    </div>
    <div v-else>
      <label class="cardModalPedido" >
          <div class="titleCard">
    
            <div class="titleCompany">
          
              <p> 1 </p>
              <div class="descriptionCompany" style="    display: flex;  justify-content: space-between;">
                <h2>PAM PLÁSTICOS </h2>
                <input type="checkbox" name="" id="">
                <!-- <span v-if="dataPedidos.order_type === 'programmed'" class="date-blue">{{ currentDate() }}</span>
                <span v-if="dataPedidos.order_type === 'coffe'" class="date-red">{{ currentDate() }}</span> -->
              </div>
            </div>
  
          <div class="dataOrder">
            <div class="descriptionOrder">
              <span>
                <strong> Total: </strong>
                R$ 100
              </span>
              <!-- <span>Total R$ {{ dataPedidos.valueOrder.toFixed(2) }}</span> -->
            </div>
  
            <div class="btn-options">
              <!-- <ButtonPirula title="Exibir Pedidos" @click.native="exibirPedidos(dataPedidos)" /> -->

            </div>
            
          </div>
        </div>
   
      </label>
    </div>
  </template>
  
  <script lang="ts">
  import Vue from 'vue'
  
  import httpOrder from '@/server/pedidos'
  
  export default Vue.extend({
    props: {
      dataPedidos: {
        type: [Array, Object],
        required: true,
      },
      allPedidos: {
        type: [Array, Object],
        required: true,
      },
      index: {
        type: Number,
        required: true,
      },
    },
    data() {
      return {
        somaValeu: 0,
        selected: '',
        statuOrder: '',
        selectOrder: true,
        loading: false,
        modalPedido: false,
      }
    },
    methods: {
      exibirPedidos(dataPedidos) {
        this.$store.commit('DADOS_PEDIDOS', dataPedidos)
      },
      statusOrder() {
        this.modalPedido = true
      },
      currentDate() {
        const dateOrder = new Date(this.dataPedidos.dateOrder)
  
        const dia = dateOrder.getDate().toString()
        const mes = (dateOrder.getMonth() + 1).toString()
        const ano = dateOrder.getFullYear()
  
        const data = `${dia}/${mes}/${ano}`
        return data
      },
      cancelarStatus() {
        this.modalPedido = false
      },
      async saveStatus() {
        const statuOrder = {
          fk_orderstatus: this.selected,
        }
        this.loading = true
        await httpOrder
          .UpdateStatusOrder(this.dataPedidos.id, statuOrder)
          .then((res) => {
            this.$toast.success('Pedido atualizado com sucesso')
            this.loading = false
          })
          .catch((error) => {
            console.log(error)
          })
        this.modalPedido = false
        this.$nuxt.refresh()
      },
    },
  })
  </script>
  
  <style scoped lang="scss">
  h2 {
    font-size: 1rem;
  }
  
  .cardModalPedido {
    width: 338px;
    height: 100%;
    border: 1px solid var(--border);
    background: var(--white);
    border-radius: 10px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  
    .btnConfirm {
      width: 100%;
      display: flex;
      gap: 1rem;
  
      button {
        width: 6rem;
      }
    }
  }
  
  .cards {
    width: 100%;
    height: auto;
    border: 1px solid var(--border);
    background: var(--white);
    border-radius: 10px;
    padding: 1rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
    grid-gap: 1rem;
    gap: 1rem;
  
    .card {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  
    .titleCard {
      display: flex;
      height: auto;
      justify-content: space-between;
      padding: 0.3rem;
      gap: 1rem;
      border-bottom: 1px solid var(--border);
  
      .titleCompany {
        display: flex;
        align-items: center;
        gap: 0.7rem;
  
        .descriptionCompany {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
  
          .date-blue {
            color: var(--blue);
            font-weight: 600;
          }
  
          .date-red {
            color: var(--red);
            font-weight: 600;
          }
        }
  
        h2 {
          margin: -10px 0;
        }
      }
  
      .iconsStatus {
        .icons {
          display: flex;
          align-items: center;
          justify-content: end;
          gap: 1rem;
  
          img:nth-child(2) {
            cursor: pointer;
          }
        }
  
        .selectOrder {
          display: none;
        }
      }
    }
  
    .dataOrder {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      flex-direction: column;
      gap: 1rem;
  
      .descriptionOrder {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(100%, 1fr));
        gap: 1rem;
  
        span:nth-child(1) {
          color: grey;
        }
  
        span:nth-child(3) {
          font-weight: bold;
        }
      }
  
      .btn-options {
        display: flex;
        width: 100%;
        gap: 1rem;
  
        img {
          cursor: pointer;
        }
      }
    }
  }
  
  .loading {
    width: 100%;
    height: 30vh;
    border: 1px solid var(--border);
    background: var(--white);
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .loader {
    width: 48px;
    height: 48px;
    border: 5px solid var(--border);
    border-bottom-color: var(--red);
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
  }
  
  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
  
    100% {
      transform: rotate(360deg);
    }
  }
  </style>
  