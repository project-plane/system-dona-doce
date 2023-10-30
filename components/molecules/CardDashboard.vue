<template>
  <div v-if="loading" class="loading">
    <span class="loader"></span>
  </div>
  <div v-else>
    <div v-if="modalPedido" class="cardModalPedido">
      <span>Mudar status do pedido</span>
      <select
        v-model="selected" style="
          border: 1px solid var(--border);
          height: 1.6rem;
          margin: 0.4rem 0;
        ">
        <option value="" disabled>Status</option>
        <option value="022ac120002-1c69-11ee-be56-0242ac120002">
          Solicitado
        </option>
        <option value="11ee6828-1c69-11ee-be56-c691200020241">Agendado</option>
        <option value="314e2828-1c69-11ee-be56-c691200020241">
          Pré-Produção
        </option>
        <option value="45690813-1c69-11ee-be56-c691200020241">
          Em Processamento
        </option>
        <option value="789850813-1c69-11ee-be56-c691200020241">
          Em Entrega
        </option>
        <option value="1c69c120002-575f34-1c69-be56-0242ac1201c69">
          Entregue
        </option>
        <!-- <option value="016b9c84-4e7f-81ee-be56-0242ac1200022fe2af">
          Revisão Admin
        </option> -->
        <option value="22afa4e4-4e7f-14ee-be56-0222afa2d22afb092">
          Revisão Cliente
        </option>
        <option value="55b4c3a6-4e7f-31ee-be56-0242ac12000224fe4">
          Cancelado
        </option>
      </select>
      <div class="btnConfirm">
        <ButtonPirula title="Cancelar" @click.native="cancelarStatus" />
        <ButtonPirula title="Salvar" @click.native="saveStatus" />
      </div>
    </div>
    <div v-else>
      <div
v-if="$store.state.selectedStatus ===
        dataPedidos.orderStatus.description ||
        $store.state.selectedStatus === ''
        " class="cards">

        <div class="titleCard">
          <div class="titleCompany">
            <p>{{ dataPedidos.numberOrder }}</p>
            <div class="descriptionCompany">
              <h2>{{ dataPedidos.user.Clients.corporate_name }}</h2>

              <span v-if="dataPedidos.order_type === 'programmed'" class="date-blue">{{ currentDate() }}</span>
              <span v-if="dataPedidos.order_type === 'coffe'" class="date-red">{{ currentDate() }}</span>
            </div>
          </div>

          <div class="iconsStatus">
            <div class="icons">
              <img v-if="dataPedidos.order_type === 'programmed'" src="~/assets/icons/programado.svg" alt="" />
              <img v-else src="~/assets/icons/coffee.svg" alt="" />
            </div>
          </div>
        </div>
        <div class="dataOrder">
          <div class="descriptionOrder">
            <span>
              Status:
              <strong>{{ dataPedidos.orderStatus.description }}</strong>
              <!-- <pre>{{ dataPedidos }}</pre> -->

            </span>
            <span>Total R$ {{ dataPedidos.valueOrder.toFixed(2) }}</span>
          </div>

          <div class="btn-options">
            <ButtonPirula title="Exibir Pedidos" @click.native="exibirPedidos(dataPedidos)" />

          <img v-if="dataPedidos.orderStatus.description !== 'Entregue'" src="~/assets/icons/3dot.svg" alt=""
                @click="statusOrder" />
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import httpOrder from '@/server/pedidos'
import dayjs from "~/services/dayjs"
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
      downloadUrl: null,
    }
  },
  methods: {
    // downloadPDF() {
    //   const pdfData = ""+ this.dataPedidos.file_caution;
    //   const blob = new Blob([pdfData], { type: 'application/pdf' });

    //   const url = window.URL.createObjectURL(blob);
    //   const a = document.createElement('a');
    //   a.style.display = 'none';
    //   a.href = url;
    //   a.download = 'arquivo.pdf';
    //   document.body.appendChild(a);

    //   a.click();

    //   window.URL.revokeObjectURL(url);
    //   document.body.removeChild(a);
    // },
    exibirPedidos(dataPedidos) {
      this.$store.commit('DADOS_PEDIDOS', dataPedidos)
    },
    statusOrder() {
      this.modalPedido = true
    },
    currentDate() {


      const data = dayjs.formtDateBr(this.dataPedidos.orderItem[0].delivery_date)
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
  width: 100%;
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
  max-width: 412.6px;
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
