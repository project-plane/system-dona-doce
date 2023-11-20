<template>
  <!-- <div v-if="loading" class="loading">
    <span class="loader"></span>
  </div> -->
  <div >
    <label class="cardModalPedido">
      
      <div class="titleCard">
        <div class="titleCompany">
          <div
            class="descriptionCompany"
            style="display: flex; justify-content: space-between"
          >
            <div style="display: flex; flex-direction: column">
              <h3 class="containerId">Id :{{ infoPedidos.numberOrder }}</h3>
              <h4 class="containerDate" v-if="infoPedidos.order_type === 'programmed'" style="color: var(--blue) ;">
                {{ formatDate(infoPedidos.dateOrder) }}
              </h4>
              <h4 class="containerDate" v-if="infoPedidos.order_type === 'coffe'" style="color: var(--red) ;">
               <!-- <pre> {{ infoPedidos }}</pre> -->
                {{ formatDate(infoPedidos.dateOrder) }}
              </h4>
            </div>
  

            <h2>{{ infoPedidos.user.Clients.corporate_name }}</h2>

            <img v-if="infoPedidos.order_type === 'programmed'" src="../../assets/icons/programado.svg" />
            <img v-else src="../../assets/icons/coffee.svg" alt="" />
          </div>
          <pre>   </pre>
          <div class="bottomCard">
        
            
            <div style="display: flex;  flex-direction: column;">
              <span>
                <strong>  Status: </strong>
                {{ infoPedidos.orderStatus.description}}
              </span> 

              <span>
                  <strong> Total: </strong>
                 {{ infoPedidos.valueOrder.toFixed(2) }}
                </span>
            </div>
              
            <input type="checkbox" :id="infoPedidos.numberOrder" :value="infoPedidos.numberOrder" v-model="infoPedidos.selected" @change="updateSelection" />


          </div>
        </div>

      </div>
      
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import dayjs from 'dayjs'

export default Vue.extend({
  props: {
    infoPedidos: {
      type: [Array, Object],
      required: true,
    },
  },
  data() {
    return {
      checkboxSelections: [],
      selectedCards: {},
      
    }
  },
  methods: {
    
    formatDate(date) {
      return dayjs(date).format('DD/MM/YYYY')
    },
    updateSelection() {
      const key = this.infoPedidos;
      var pedidos = {
        fk_pedido: key.id,
        numberOrder: key.numberOrder,
        order_type: key.order_type,
        user: key.user.Clients.corporate_name,
        orderItem: key.orderItem,
        selected: this.infoPedidos.selected || false,
        dateOrderPedido: key.dateOrder
      }
      this.$emit('update-selection', pedidos);
      
      
    }
    
   
    
  },
})
</script>

<style scoped lang="scss">
h2 {
  font-size: 1rem;
}
.bottomCard {
  display: flex;
  width: 100%;
  padding-top: 0.8rem;
  border-top:  1px solid var(--border);
  align-items: center;
  justify-content: space-between;
}
.cardModalPedido {
  height: 100%;
  width: 340px;
  min-height: 10rem;
  max-height: 12rem;
  border: 1px solid var(--border);
  background: var(--white);
  
  border-radius: 10px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;

  &:hover {
    transform: scale(1.02);
    cursor: pointer;
    margin-top: 0.1rem;
  }

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
        justify-content: flex-end;
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
