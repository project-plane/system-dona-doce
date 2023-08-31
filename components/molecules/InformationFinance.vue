<template>
  <div class="informationFinance">
    <div class="finance">
      <h2>Financeiro</h2>
    </div>
    <!-- {{ orderFindClient }} -->
    <div v-if="orderFindClient" class="orderClient">
      <BeadFrame>
        <div class="order">
          <div>
            <h2>{{ orderFindClient.user.Clients.corporate_name }}</h2>
            <span>Coffee</span>
          </div>
          <table>
            <thead>
              <tr>
                <th>Quantidade</th>
                <th>Pedido</th>
                <th>Preço</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(dadosPedidos, index) in orderFindClient.orderItem"
                :key="index"
              >
                <td>{{ dadosPedidos.amountItem }}</td>
                <td>{{ dadosPedidos.revenues.description }}</td>
                <td>R$ {{ dadosPedidos.valueOrderItem.toFixed(2) }}</td>
              </tr>
              <tr class="totalOrder">
                <td>Total</td>
                <td colspan="2" style="text-align: end">
                  R$ {{ orderFindClient.valueOrder.toFixed(2) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </BeadFrame>
    </div>
    <div class="informationOrder" v-else>
      <h3>Informações do pedido</h3>
      <span
        >Clique no card de pedido para visualizar as informações
        secundárias</span
      >
      <img src="~/assets/icons/cooke.svg" alt="" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      dadosOrderFindClient: {},
    }
  },
  async fetch() {
    this.dadosOrderFindClient = this.$store.state.dadosPedidos
    // await this.$store.state.dadosPedidos
  },
  computed: {
    orderFindClient() {
      const objectValeu = this.$store.state.dadosPedidos
      if (Object.keys(objectValeu).length === 0) {
        console.log('vazio')
      } else {
        console.log('cheio')
        return objectValeu
      }
    },
  },
})
</script>

<style scoped lang="scss">
.informationFinance {
  width: 100%;
  height: 100%;
  padding: 0 1rem;
  .finance {
  }
  .orderClient {
    height: 225px;
    overflow: scroll;
    .order {
      padding: 1rem;
      table {
        width: 100%;
        text-align: center;
        border-collapse: collapse;
        thead {
          border-bottom: 1px solid var(--border);
          padding: 1rem 0;
          tr th {
            padding: 0.6rem 0;
          }
        }
        .totalOrder {
          border-top: 1px solid var(--border);
          font-size: 1.2rem;
          font-weight: bold;
          td {
            padding: 0.6rem 0;
          }
        }
      }
    }
  }

  .informationOrder {
    padding: 0 1rem;
    height: 265px;
    overflow: scroll;

    h3 {
      font-size: 1.3rem;
      color: var(--red);
    }

    img {
      display: flex;
      justify-content: center;
      align-items: center;
      width: auto;
      padding: 2rem;
    }
  }
}
</style>
