<template>
  <div class="lotesPage">
    <header class="grid_Header">
      <HeaderLotes
        title="Gerar Lotes"
        :typeOrder="true"
        :select="true"
        @searchCliente="searchCliente"
        :filterData="true"
        @dateRangeSelected="handleDateRangeSelected"
      />
    </header>
    <Loading v-if="loading" />
    <main v-else>
      <div class="listCards" v-if="!datasFiltradas || datasFiltradas.length === 0">

        <CardInfoLotes
          v-for="(item, id) in dataPedidos"
          :key="id"
          :infoPedidos="item"
          @update-selection="updateSelectedCards"
        />

        <span v-show="dataPedidos.length === 0" class="no-results-message">
          Não encontramos resultados, Escolha um cliente...
        </span>
      </div>

      <div class="listCards" v-else>
        <CardInfoLotes
          v-for="(item, id) in datasFiltradas"
          :key="id"
          :infoPedidos="item"
          @update-selection="updateSelectedCards"
          
        />

        <span v-show="datasFiltradas.length === 0" class="no-results-message">
          Não encontramos resultados nesse intervalo de tempo.
        </span>
      </div>
    </main>
    <div class="containerSidebar" v-if="sideBar">
      <section class="sectionSideBar">
        <h3
          :class="{ abaNotActive: abaNotActive }"
          class="abaActive"
          @click="pedidos"
        >
          Itens do Pedido
        </h3>
        <h3
          :class="{ abaNotActive: !abaNotActive }"
          class="abaActive"
          @click="entrega"
        >
          Finalizar
        </h3>
      </section>

      <div style="height: 75vh; overflow: scroll">
        <table v-if="abaNotActive === true">
          <tr v-if="selectedCards.length > 0">
            <th>Id</th>
            <th>Itens</th>
            <th>Qtd.</th>
            <th>Valor</th>
          </tr>
          <div v-else style="display: flex; align-items: center">
            <span style="text-align: center">
              Escolha os pedidos a serem incluídos na criação dos lotes.
              <AnimationLotes />
            </span>
          </div>
          <tr v-for="(item, id) in selectedCards" :key="id">
            <td>{{ item.numberOrder }}</td>
            <td>
              <span
                v-for="(receita, id) in item.orderItem"
                :key="id"
                style="width: 100%; display: flex; flex-direction: column"
              >
                {{ receita.revenues.description }}</span
              >
            </td>
            <td>
              <span
                v-for="(receita, id) in item.orderItem"
                :key="id"
                style="width: 100%; display: flex; flex-direction: column"
              >
                {{ receita.amountItem }}</span
              >
            </td>
            <td>
              <span
                v-for="(receita, id) in item.orderItem"
                :key="id"
                style="width: 100%; display: flex; flex-direction: column"
              >
                R$ {{ receita.valueOrderItem }}</span
              >
            </td>
          </tr>
        </table>

        <div
          v-else
          style="display: flex; flex-wrap: wrap; flex-direction: column"
        >
          <span>Anexar NF</span>
          <div class="inputContainer">
            <input
              type="file"
              accept="image/*,.pdf"
              style="width: 85%"
              @change="onFileChangeNF"
            />
            <img
              v-if="previewNotaFiscal"
              src="../../assets/icons/Icon_uploadConcluido.svg"
              alt="Icon concluido"
              style="width: 27px"
            />
            <img
              v-else
              src="../../assets/icons/download.svg"
              alt="Pré-visualização do PDF"
              style="width: 20px"
            />
          </div>
          <span>Nº da NF</span>
          <div class="inputContainer">
            <input
              type="text"
              v-model="invoice_number"
              style="width: 100%; height: 100%"
              placeholder="000 001 001"
            />
          </div>
          <span>Data inicial</span>
          <div class="inputContainer">
            <span v-if="selectedCards.length < 1"> Selecione um pedido </span>
            <input
              v-else
              type="text"
              v-model="formattedInitialDate"
              style="width: 100%; height: 100%"
            />
          </div>
          <span>Data final</span>
          <div class="inputContainer">
            <span v-if="selectedCards.length < 1"> Selecione um pedido </span>
            <input
              v-else
              type="text"
              v-model="formattedEndDate"
              style="width: 100%; height: 100%"
            />
          </div>

          <Button
            @click.native="lotes()"
            title="Gerar Lote"
            style="margin-left: auto; margin-top: 2rem"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import dayjs from 'dayjs'
import Vue from 'vue'
import httpOrder from '~/server/pedidos'
export default Vue.extend({
  data() {
    return {
      abaNotActive: true,
      dataPedidos: [],
      listClient: [],
      selectedCards: [],
      cliente: '',
      previewNotaFiscal: null,
      aba: false,
      invoice_number: '',
      initial_date: null,
      end_date: null,
      OrderBatchItem: [],
      loading: false,
      datasFiltradas: [],
      sideBar: false,
    }
  },
  computed: {
    formattedInitialDate() {
      return dayjs(this.initial_date).format('DD/MM/YYYY')
    },
    formattedEndDate() {
      return dayjs(this.end_date).format('DD/MM/YYYY')
    },

  },
  methods: {
   
    async searchCliente(selectedClient, selectedType) {
      try {
        this.loading = true;

        const typeLotes = 1;
        // const fkOrderStatus1 = "789850813-1c69-11ee-be56-c691200020241";
        const fkOrderStatus2 = "1c69c120002-575f34-1c69-be56-0242ac1201c69";

        const res = await this.fetchOrderData(typeLotes, selectedClient, selectedType);
        
        this.dataPedidos = res.data.filter(item =>
          item.fk_orderstatus === fkOrderStatus2
        );

        this.cliente = selectedClient;
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    async fetchOrderData(typeLotes, selectedClient, selectedType) {
      try {
        return await httpOrder.GetOrderCliente2(typeLotes, selectedClient, selectedType);
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    updateSelectedCards(selectedCard) {
      this.shoeSideBar()
      if (selectedCard.selected) {
        const client = this.selectedCards.some(
          (item) => item.user != selectedCard.user
        )
        if (client) {
          this.selectedCards = []
        }
      }
      if (selectedCard.selected) {
        const exists = this.selectedCards.some(
          (item) => item.numberOrder === selectedCard.numberOrder
        )

        if (!exists) {
          this.selectedCards = [...this.selectedCards, selectedCard]
        }
      } else {
        const itemToRemoveIndex = this.selectedCards.findIndex(
          (item) => item.fk_pedido === selectedCard.fk_pedido
        )

        if (itemToRemoveIndex !== -1) {
          this.selectedCards = this.selectedCards.filter(
            (_, index) => index !== itemToRemoveIndex
          )
        }
      }
    },
    lotes() {
      const formData = new FormData()
      formData.append('fk_client', this.cliente)
      formData.append('file_invoice', this.selectedFileNF)
      formData.append('invoice_number', this.invoice_number)
      formData.append('initial_date', this.initial_date)
      formData.append('end_date', this.end_date)

      const orderBatchItemArray = this.selectedCards.map((element) => ({
        fk_order: element.fk_pedido,
      }))
      formData.append(
        'createOrderBatchItem',
        JSON.stringify(orderBatchItemArray)
      )

      this.postOrderLotes(formData)
    },
    formatDate(date: Date) {
      return dayjs(date).format('YYYY/MM/DD')
    },
    async postOrderLotes(data) {
      this.loading = true
      await httpOrder
      .PostLotes(data)
      .then((res) => {
          this.$toast.success('Lote criado com sucesso')
        })
        .catch((error) => {
          console.log(error)
          this.$toast.error('Houve um erro ao processar a solicitação.');
          this.$toast.warning('Preencha Todos os campos.');
        })
        this.loading = false
        setTimeout(function () {
          location.reload()
        }, 4000)
    },
    encontrarDatas() {
      this.initial_date = null
      this.end_date = null

      this.selectedCards.forEach((item) => {
        const dataPedidoItem = new Date(item.dateOrderPedido)

        if (!isNaN(dataPedidoItem.getTime())) {
          if (
            this.initial_date === null ||
            dataPedidoItem < this.initial_date
          ) {
            this.initial_date = dataPedidoItem
          }

          if (this.end_date === null || dataPedidoItem > this.end_date) {
            this.end_date = dataPedidoItem
          }
        }
      })
    },

    handleDateRangeSelected({ startDate, endDate }) {
      const dataInicialObj = new Date(startDate)
      const dataFinalObj = new Date(endDate)

      this.datasFiltradas = this.dataPedidos.filter((data) => {
        const dataAtual = new Date(data.dateOrder);
        dataAtual.setDate(dataAtual.getDate() - 1);
        
        return dataAtual >= dataInicialObj && dataAtual <= dataFinalObj
      })
    },
    onFileChangeNF(event) {
      const [selectedFile] = event.target.files;

      if (selectedFile) {
        this.selectedFileNF = selectedFile;
        this.previewNotaFiscal = URL.createObjectURL(this.selectedFileNF);
      }
    },

    pedidos() {
      this.toggleAbaNotActive(true);
    },

    entrega() {
      this.toggleAbaNotActive(false);
    },

    toggleAbaNotActive(isPedidos) {
      this.abaNotActive = isPedidos;
    },
    shoeSideBar(){
      this.sideBar = true
    }
 
  },
  watch: {
    selectedCards: {
      handler: 'encontrarDatas',
      deep: true,
    },
  },
})
</script>

<style scoped lang="scss">
label {
  display: flex;
  flex-direction: column;
  width: 9rem;
}
.inputContainer {
  border: solid 1px #b9b9b9;
  border-radius: 0.2rem;
  padding: 0.4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.abaActive {
  width: 100%;
  height: 2.5rem;
  display: flex;
  background: var(--white);
  color: var(--red);

  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.abaNotActive {
  width: 100%;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
  background-color: var(--red);
}

.lotesPage {
  margin: 0 auto;
  width: 98%;
  display: grid;
  grid-template-columns: 1fr 25rem;
  grid-template-rows: repeat(2, 10rem 19vh);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
}

.grid_Header {
  grid-area: 1 / 1 / 2 / 2;

}
main {
  grid-area: 2 / 1 / 3 / 2;
  height: 60vh;
  overflow-y: scroll;
}
.containerSidebar {
  grid-area: 1 / 2 / 3 / 3;
  margin-top: 1rem;
  animation: slideInFromRight 1s ease-out;

  .sectionSideBar{
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }
}


.containerSidebar {
  padding: 1rem;
  // border-radius: 0.5rem;
  background: white;
  height: 85vh;
  // overflow-y: scroll;
}

@keyframes slideInFromRight {
  0% {
    transform: translateX(100%);
    opacity: 0;
  }
  100% {
   
    transform: translateX(0);
    opacity: 1;
  }
}
.listCards {
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem;
  padding: 1rem;
}
table {
  width: 100%;
  border-spacing: 0px;
  th {
    background: #fa5c4f52;
  }
  td {
    border-bottom: 1px solid black;
    border-collapse: collapse;
    text-align: center;
  }
}
</style>
