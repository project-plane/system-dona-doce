<template>
  <div class="cardDashboard">
    <div class="titleCard">
      <div class="titleCompany">
        <p>{{ index + 1 }}</p>
        <div class="descriptionCompany">
          <span v-if="dataPedidos.user.Clients === null"></span>
          <h2 v-else>{{ dataPedidos.user.Clients.corporate_name }}</h2>
          <span v-if="dataPedidos.status === 1" class="programado">Programado</span>
          <span v-else class="coffee">Coffee</span>
        </div>
      </div>
      <div class="iconsStatus">
        <div class="icons">
          <img src="~/assets/icons/programado.svg" alt="" v-if="dataPedidos.order_type === 'programmed'" />
          <img src="~/assets/icons/coffee.svg" alt="" v-else />
          <img src="~/assets/icons/3dot.svg" alt="" @click="statusOrder">
        </div>
        <div :class="{ selectOrder: selectOrder }">
          <select v-model="selected" style="border: 1px solid var(--border); height: 1.6rem; margin: 0.4rem 0;">
            <option value="" disabled>Status</option>
            <option value="Agendado">Agendado</option>
            <option value="Pré-Produção">Pré-Produção</option>
            <option value="Em Processamento">Em Processamento</option>
            <option value="Em Entrega">Em Entrega</option>
            <option value="Entregue">Entregue</option>
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
      <ButtonPirula title="Exibir Pedidos" @click.native="exibirPedidos(dataPedidos)" />
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
      selectOrder: true
    }
  },

  watch: {
    async selected(newValue, oldValue) {
      const statuOrder = {
        fk_orderstatus: newValue
      }
      console.log(newValue, this.dataPedidos.id);
      await httpOrder.UpdateStatusOrder(this.dataPedidos.id, statuOrder)
        .then((res) => {
          console.log(res);

        })
        .catch((error) => {
          console.log(error);

        })
    }
  },
  methods: {
    exibirPedidos(dataPedidos) {
      this.$store.commit('DADOS_PEDIDOS', dataPedidos)
    },
    statusOrder() {
      this.selectOrder = !this.selectOrder
    }
  },
})
</script>

<style scoped lang="scss">
.cardDashboard {
  width: 100%;
  border: 1px solid var(--border);
  background: var(--white);
  border-radius: 10px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .titleCard {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    border-bottom: 1px solid var(--border);

    .titleCompany {
      display: flex;
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
