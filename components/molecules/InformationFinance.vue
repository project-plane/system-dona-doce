<template>
  <div class="informationFinance">
    <div class="finance">
      <h2>Financeiro</h2>
    </div>
    <!-- {{ orderFindClient }} -->
    <div v-if="orderFindClient" class="orderClient">
      <BeadFrame @pedidos="pedidos" @entrega="entrega">
        <div class="order" v-if="statusAba">
          <div>
            <h2>{{ orderFindClient.user.Clients.corporate_name }}</h2>
            <span>Coffee</span>
          </div>
          <div v-for="(dadosPedidos, index) in orderFindClient.orderItem" :key="index" class="order">
            <div v-if="dadosPedidos.categoryOrderItem.description === 'Dejejum'">
              <h3>Desjejum</h3>
              <table>
                <thead>
                  <tr>
                    <th>Quantidade</th>
                    <th>Pedido</th>
                    <th>Preço</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{{ dadosPedidos.amountItem }}</td>
                    <td>{{ dadosPedidos.revenues.description }}</td>
                    <td>R$ {{ dadosPedidos.valueOrderItem.toFixed(2) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div v-if="dadosPedidos.categoryOrderItem.description === 'Lanche 1'">
              <h3>Lanche 01</h3>
              <table>
                <thead>
                  <tr>
                    <th>Quantidade</th>
                    <th>Pedido</th>
                    <th>Preço</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{{ dadosPedidos.amountItem }}</td>
                    <td>{{ dadosPedidos.revenues.description }}</td>
                    <td>R$ {{ dadosPedidos.valueOrderItem.toFixed(2) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div v-if="dadosPedidos.categoryOrderItem.description === 'Lanche 2'">
              <h3>Lanche 02</h3>
              <table>
                <thead>
                  <tr>
                    <th>Quantidade</th>
                    <th>Pedido</th>
                    <th>Preço</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
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
          </div>
        </div>

        <div v-else>
          <div class="inputs">
            <Input label="Bandeja" type="text" placeholder="Digita a quantidade de bandeja" />
            <Input label="Caixa" type="text" placeholder="Digita a quantidade de caixa" />
            <div>
              <span>Anexar Nota</span>
              <div class="img">
                <label for="inputNota">
                  <img v-if="!urlImgNota" src="~/assets/icons/download.svg" alt="" />
                  <span v-else>Nota anexada com sucesso</span>
                </label>
                <input id="inputNota" type="file" accept="application/pdf" name="inputNota" @change="fileNota" />
              </div>
            </div>
            <div>
              <span>Comprovante de Pagamento</span>
              <div class="img">
                <label for="inputComprovante">
                  <img v-if="!urlImgComprovante" src="~/assets/icons/download.svg" alt="" />
                  <span v-else>Comprovante anexado com sucesso</span>
                </label>
                <input id="inputComprovante" type="file" accept="application/pdf" name="inputComprovante"
                  @change="fileComprovante" />
              </div>
            </div>
            <div>
              <span>Anexar cautela</span>
              <div class="img">
                <label for="inputCautela">
                  <img v-if="!urlImgCautela" src="~/assets/icons/download.svg" alt="" />
                  <span v-else>Cautela anexada com sucesso</span>
                </label>
                <input id="inputCautela" type="file" accept="application/pdf" name="inputCautela" @change="fileCautela" />
              </div>
            </div>
          </div>
        </div>
      </BeadFrame>
    </div>
    <div class="informationOrder" v-else>
      <h3>Informações do pedido</h3>
      <span>Clique no card de pedido para visualizar as informações
        secundárias</span>
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
      statusAba: true,
      urlImgNota: null,
      urlImgComprovante: null,
      urlImgCautela: null,
      urlImgFile: null
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
  methods: {
    pedidos(e) {
      this.statusAba = e
    },
    entrega(e) {
      this.statusAba = e
    },
    fileNota(e) {
      this.urlImgFile = e.target.files[0]
      this.urlImgNota = URL.createObjectURL(this.urlImgFile)
      console.log(this.urlImgNota);

    },
    fileComprovante(e) {
      this.urlImgFile = e.target.files[0]
      this.urlImgComprovante = URL.createObjectURL(this.urlImgFile)
      console.log(this.urlImgurlImgComprovanteNota);
    },
    fileCautela(e) {
      this.urlImgFile = e.target.files[0]
      this.urlImgCautela = URL.createObjectURL(this.urlImgFile)
      console.log(this.urlImgCautela);
    },
  },
})
</script>

<style scoped lang="scss">
.informationFinance {
  width: 100%;
  height: 100%;
  padding: 0 1rem;

  .finance {}

  .orderClient {
    height: 300px;
    overflow-y: scroll;

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

    .inputs {
      padding: 2rem 1rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;

      .img {
        width: 100%;
        height: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #ffffff;
        border: 0.06rem solid var(--border);
        border-radius: 0.25rem;

        label {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: end;
          font-weight: 800;
          font-size: 1.2rem;
          letter-spacing: 3px;
          cursor: pointer;

          span {
            width: 100%;
            font-size: 1rem;
            display: flex;
            justify-content: start;
            padding-left: 10px;
          }

          img {
            width: 20px;
            height: 20px;
          }

          .imgFile {
            width: 100%;
            height: 100%;
          }
        }

        input[type='file'] {
          display: none;
        }
      }

    }
  }

  .informationOrder {
    padding: 0 1rem;
    height: 300px;
    overflow-y: scroll;

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
