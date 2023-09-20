<template>
  <div v-if="loading" class="loading">
    <span>...Atualizando Status</span>
  </div>
  <div v-else>
    <div
      v-if="
        this.$store.state.selectedStatus ===
          this.dataPedidos.orderStatus.description ||
        this.$store.state.selectedStatus === ''
      "
      class="cards"
    >
      <div class="titleCard">
        <div class="titleCompany">
          <p>{{ index + 1 }}</p>
          <div class="descriptionCompany">
            <span v-if="dataPedidos.user.Clients === null"></span>
            <h2 v-else>{{ dataPedidos.user.Clients.corporate_name }}</h2>
            <span
              v-if="dataPedidos.order_type === 'programmed'"
              class="programado"
              >Programado</span
            >
            <span v-else class="coffee">Coffee</span>
          </div>
        </div>
        <div class="iconsStatus">
          <div class="icons">
            <img
              src="~/assets/icons/programado.svg"
              alt=""
              v-if="dataPedidos.order_type === 'programmed'"
            />
            <img src="~/assets/icons/coffee.svg" alt="" v-else />
            <img src="~/assets/icons/3dot.svg" alt="" @click="statusOrder" />
          </div>
          <div :class="{ selectOrder: selectOrder }">
            <select
              v-model="selected"
              style="
                border: 1px solid var(--border);
                height: 1.6rem;
                margin: 0.4rem 0;
              "
            >
              <option value="" disabled>Status</option>
              <option value="022ac120002-1c69-11ee-be56-0242ac120002">
                Solicitado
              </option>
              <option value="11ee6828-1c69-11ee-be56-c691200020241">
                Agendado
              </option>
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
              <option value="016b9c84-4e7f-81ee-be56-0242ac1200022fe2af">
                Revisão Admin
              </option>
              <option value="22afa4e4-4e7f-14ee-be56-0222afa2d22afb092">
                Revisão Cliente
              </option>
              <option value="55b4c3a6-4e7f-31ee-be56-0242ac12000224fe4">
                Cancelado
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="dataOrder">
        <div class="descriptionOrder">
          <span>Total R$ {{ dataPedidos.valueOrder.toFixed(2) }}</span>
          <span>Finalizar as</span>
          <span>09:30</span>
        </div>
        <ButtonPirula
          title="Exibir Pedidos"
          @click.native="exibirPedidos(dataPedidos)"
        />
      </div>
    </div>
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
    }
  },

  watch: {
    async selected(newValue, oldValue) {
      const statuOrder = {
        fk_orderstatus: newValue,
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
      this.selectOrder = true
      this.$nuxt.refresh()
    },
  },
  methods: {
    exibirPedidos(dataPedidos) {
      this.$store.commit('DADOS_PEDIDOS', dataPedidos)
    },
    statusOrder() {
      this.selectOrder = !this.selectOrder
    },
  },
})
</script>

<style scoped lang="scss">
h2 {
  font-size: 1.2rem;
}
.cards {
  width: 100%;
  height: 30vh;
  border: 1px solid var(--border);
  background: var(--white);
  border-radius: 10px;
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  grid-gap: 1rem;
  gap: 1rem;

  .loading {
    width: 100%;
    height: 30vh;
    background: #d59c9ce0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
  }

  .card {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .titleCard {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    border-bottom: 1px solid var(--border);

    .titleCompany {
      display: flex;
      align-items: center;
      gap: 0.7rem;

      .descriptionCompany {
        .programado {
          color: var(--blue);
        }

        .coffee {
          color: var(--red);
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
    gap: 3rem;
    align-items: flex-end;
    justify-content: space-between;

    .descriptionOrder {
      display: flex;
      flex-direction: column;

      span:nth-child(1) {
        color: grey;
      }

      span:nth-child(3) {
        font-weight: bold;
      }
    }
  }
}
</style>
