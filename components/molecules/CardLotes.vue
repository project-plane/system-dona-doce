<template>
    <div >
      <label class="cardModalPedido">
      <!-- <pre>{{ infoPedidos.user.Clients}}</pre> -->
        <div class="titleCard">
          <div class="titleCompany">
            <div
              class="descriptionCompany"
              style="display: flex; flex-direction: row; justify-content: space-between;" >
              <section>
                <h4 style="color: gray;"> Empresa</h4>
                <h2>{{ infoPedidos.user.Clients.corporate_name}}</h2>
              </section>
              <h4 class="containerId" style="color: gray;" >Id :{{idLote}} </h4>
            </div>
            <div class="bottomCard">
      
              
            <div  style="display: flex; gap: .5rem; ">  
                  <strong> Total:  </strong>
                  <span>R${{ valueLote()}} </span> 

                  <!-- <pre>{{ infoPedidos }}</pre> -->
            </div>
            <ButtonPirula title="Visualizar" style="font-size: 0.9rem; width: 46%;" :id="infoPedidos.infoPedidos" :value="infoPedidos" v-model="infoPedidos.selected" @click.native="updateSelection" />
            <!-- <input type="checkbox"  /> -->
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
        required: false,
      },
        idLote: Number,
        valueOrder:[Array, Object],
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
        this.$emit('update-selection', this.infoPedidos);
        
        this.$emit('aba-Lotes',  true);
        
      },
      valueLote() {
        let total = 0;
        for (const id in this.valueOrder) {
          if (this.valueOrder.hasOwnProperty(id)) {
            total += this.valueOrder[id].order.valueOrder;
          }
          
        }
        return total.toFixed(2) 
        
      },
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
    min-height: 8rem;
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
  