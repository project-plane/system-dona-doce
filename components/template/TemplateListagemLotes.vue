<template>
  <div class="lotesPage">
    <div class="historicOrders" style="padding-top: 1rem">
      <h1>Consulta de Lotes</h1>
      <div class="selectInput" style="display: flex; gap: 10px">
        <div class="input">
          <label>Clientes</label>
          <select v-model="selectedClient" @change="request">
            <option value="" disabled>Selecionar Cliente</option>
            <option v-for="(client, index) in listClient" :key="index" :value="client.id">
              {{ client.corporate_name }}
            </option>
          </select>
        </div>
        <div class="input">
          <label class="titleFilter">Unidade</label>
          <select v-model="selectedUnidade" @change="request">
            <option value="">Todos</option>
            <option v-for="item in listEmpresa" :value="item.id" :key="item.id">{{ item.corporate_name }}</option> 
          </select>
        </div>

        <div class="searchId">
          <label for="label">Buscar por id</label>
          <input placeholder="Pesquisar por Id" type="text" v-model="textSearch">
        </div>
      </div>

    </div>
    <Loading v-if="loading" />
    <main v-else>
      <div class="listCards">
        <CardLotes v-for="(item, id) in filteredItems" :key="id" :infoPedidos="item" :idLote="item.numberOrderBatch"
          :idDelete="item.id" :valueOrder="item.OrderBatchItem" @update-selection="updateSelectedCards"
          @aba-Lotes="pedidos" @change="abaAtiva" />

        <span v-show="filteredItems.length === 0" style="height: 60vh;  display: flex;
            align-items: center;  justify-content: center; width: 100%;">
          Não encontramos resultados, Escolha um cliente...
        </span>
      </div>
    </main>

    <div class="containerSidebar" v-if="sideBar">
      <section style=" display: flex;      align-items: center;
            justify-content: space-evenly; ">
        <h3 :class="{ abaNotActive: abaNotActive }" class="abaActive" @click="pedidos">
          Itens do Lote
        </h3>
        <h3 :class="{ abaNotActive: !abaNotActive }" class="abaActive" @click="entrega">
          Anexos
        </h3>
      </section>

      <div style="height: 75vh; overflow: scroll">
        <!-- {{ listPedidos.id }} -->
        <table v-if="abaNotActive === true">

          <tr v-if="listPedidos != null">
            <th>Pedido</th>
            <th>Valor</th>
            <th>Cautela</th>
          </tr>
          <div v-else style="display: flex; align-items: center">
            <span style="text-align: center">
              Escolha os pedidos a serem incluídos na criação dos lotes.
              <AnimationLotes />
            </span>
          </div>
          <tr v-for="(item, id) in listPedidos.OrderBatchItem" :key="id">
            <td> Nº {{ item.order.numberOrder }}</td>
            <td> R$ {{ item.order.valueOrder }}</td>

            <td v-if="item.order.file_caution != null">
              Anexado
            </td>
            <td v-else>
              Não Anexado
            </td>

          </tr>
        </table>

        <div v-else style="display: flex; flex-wrap: wrap; margin-top: 1rem; gap: 1rem; ">

          <div>
            <span>Download NF</span>
            <br />
            <span class="spanButton" v-if="listPedidos.file_invoice == null">
              Arquivo não anexado
            </span>
            <button v-show="listPedidos.file_invoice != null" @click="downloadNF(listPedidos.file_invoice)"
              class="btnDownload">
              Baixar arquivo
            </button>

          </div>

          <div>
            <span>Download Cautela</span>

            <button v-if="this.listPedidos.OrderBatchItem != null" class="btnDownload" @click="downloadCaution">
              Baixar Arquivo
            </button>
            <span v-else class="spanButton">
              Arquivo não anexado
            </span>
          </div>
          <div>
            <span>Comprovante</span>
            <span v-if="listPedidos.file_payment_voucher == null" class="spanButton">
              Arquivo não anexado
            </span>
            <button @click="downloadComprovante(listPedidos.file_payment_voucher)"
              v-if="listPedidos.file_payment_voucher != null" class="btnDownload">
              Baixar Comprovante
            </button>
            
          </div>
          <div>
            <span>Relatório</span>
            <button @click="downloadReport(listPedidos.id)" class="btnDownload">
              Download Excel
            </button>
            
          </div>
          <span>Nova NF ? <input type="checkbox" id="checkbox" v-model="checked"> </span>
          <section v-if="checked" class="stylesNewNF">
            <div class="inputContainer">
              <input type="file" accept="image/*,.pdf" style="width: 85%" @change="onFileChangeNF" />
              <img v-if="previewNotaFiscal" src="../../assets/icons/Icon_uploadConcluido.svg" alt="Icon concluido"
                style="width: 27px" />
              <img v-else src="../../assets/icons/download.svg" alt="Pré-visualização do PDF" style="width: 20px" />
            </div>
            <span>Nº da NF</span>
            <div class="inputContainer">
              <input type="text" v-model="invoice_number" style="width: 100%; height: 100%" placeholder="000 001 001" />

            </div>
            <Button @click.native="send(filteredItems[0].id)" title="Atualizar"> </Button>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import httpOrder from '~/server/pedidos'
import httpClients from '~/server/cliente'
import httpEmpresa from '~/server/empresa'
export default Vue.extend({
  data() {
    return {
      listClient: [],
      selectedClient: '',
      abaNotActive: true,
      selectedCards: [],
      cliente: '',
      invoice_number: '',
      previewNotaFiscal: null,
      loading: false,
      listAllLotes: [],
      listPedidos: [],
      filesCaution: 0,
      textSearch: "",
      selectedFileNF: "",
      checked: false,
      sideBar: false,
      selectedUnidade: '',
      listEmpresa: [],
    }
  },
  async fetch() {
    this.loading = true
    await httpClients
      .GetAllClients()
      .then((res) => {
        this.listClient = res.data
      })
      .catch((error) => {
        console.log(error)
      })
      await httpEmpresa
      .GetAllEmpresa()
      .then((res) => {
        this.listEmpresa = res.data
      })
      .catch((error) => {
        console.log(error)
      })

    this.loading = false

  },
  methods: {
    async request() {
      try {
        const res = await httpOrder.ListLotes(this.selectedClient, this.selectedUnidade)
        this.listAllLotes = res.data
        this.sideBar = true
        this.loading = false;
      } catch (error) {
        console.log(error);

      }


    },
    async send(item) {
      console.log(item);

      const formData = new FormData()
      formData.append('file_invoice', this.selectedFileNF)
      formData.append('invoice_number', this.invoice_number)

      try {
        const res = await httpOrder.updateNF(item, formData);
        // this.request();
        this.$toast.success('NF atualizada');
        setTimeout(function () {
          location.reload(true);
        }, 2000);
      } catch (error) {
        console.error(error);
        this.$toast.error('Erro ao enviar NF...');
        throw error;
      }
    },
    onFileChangeNF(event) {
      const [selectedFile] = event.target.files;

      if (selectedFile) {
        this.selectedFileNF = selectedFile;
        this.previewNotaFiscal = URL.createObjectURL(this.selectedFileNF);
      }
    },
    pedidos() {
      this.abaNotActive = true
    },
    entrega() {
      this.abaNotActive = false
    },
    updateSelectedCards(selectedCard) {
      this.listPedidos = []
      this.listPedidos = selectedCard

    },
    async downloadNF(url) {
      try {
        await fetch(
          'https://api.donadoce.net/invoice/' + url
        )
          .then((response) => response.blob())
          .then((blob) => {
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = 'ArquivoNF'
            a.click()
            window.URL.revokeObjectURL(url)
          })
      } catch (error) {
        console.error('Erro ao baixar o arquivo:', error)
      }
    },
    async downloadCaution() {

      const filesToDownload = this.listPedidos.OrderBatchItem
        .map(item => item.order.file_caution)
        .filter(file => file !== null);
      this.filesCaution = filesToDownload
      console.log(filesToDownload.length);

      if (filesToDownload.length === 0) {
        this.$toast.error('Não há arquivos disponíveis')
      } else {
        await Promise.all(filesToDownload.map(this.downloadFile));
      }
    },
    async downloadFile(item) {
      try {
        await fetch(
          'https://api.donadoce.net/caution/' + item
        )
          .then((response) => response.blob())
          .then((blob) => {
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            const fileName = url.split('/').pop();
            a.download = fileName;
            a.setAttribute('download', '');
            document.body.appendChild(a);
            a.click()
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url)
          })
      } catch (error) {
        console.error('Erro ao baixar o arquivo:', error)
      }
    },
    async downloadComprovante(item) {
      try {
        await fetch(
          'https://api.donadoce.net/payment/' + item
        )
          .then((response) => response.blob())
          .then((blob) => {
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = 'Comprovante'
            a.click()
            window.URL.revokeObjectURL(url)
          })
      } catch (error) {
        console.error('Erro ao baixar o arquivo:', error)
      }
    },
    async deleteLotes(id) {
      try {
        const res = await httpOrder.DeleteLote(id);
        this.$toast.success('Lote Deletado');
        this.$nuxt.refresh();
      } catch (error) {
        console.error(error);
        this.$toast.error('Erro ao deletar...');
        throw error;
      }
    },
    async downloadReport(id) {
      try {
        const res = await httpOrder.downloadExcelLotes(id);
        const data = res.data

          const blob = new Blob([data], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          })

          const url = URL.createObjectURL(blob)
          const link = document.createElement('a')
          link.href = url

          link.download = 'lotes.csv'

          document.body.appendChild(link)

          link.click()

          document.body.removeChild(link)

      } catch (error) {
        console.error(error);
        this.$toast.error('Erro no download');
      }
    },


  },
  computed: {
    filteredItems() {
      if (Array.isArray(this.listAllLotes)) {
        return this.listAllLotes.filter(
          (item) =>
            item.numberOrderBatch.toString().includes(this.textSearch.toLowerCase())
        );
      } else {
        return [];
      }
    },
  }
})
</script>

<style scoped lang="scss">
.spanButton {
  font-size: 12px;
  height: 2.6rem;
  width: 10rem;
  background: #ffefdb;
  color: #fa5c4f;
  border: none;
  @extend .inputContainer
}

.btnDelete {
  border: 1px solid var(--red);
  border-radius: 0.25rem;
  height: 2.4rem;
  display: flex;
  width: 10rem;
  align-items: center;
  justify-content: space-around;
  cursor: pointer;

  &:hover {
    transform: scale(1.09);
    transition: 300ms linear;
    background: #ffefdb;
    color: #fa5c4f;
    margin-left: 0.5rem;
  }
}

.stylesNewNF {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.btnDownload {
  display: flex;
  align-items: center;
  border: 1px solid var(--red);
  text-align: center;
  border-radius: 0.25rem;
  padding: 0.5rem;
  height: 2.6rem;
  width: 10rem;
  background-color: var(--red);
  color: white;
  text-align: center;
  display: flex;
  justify-content: center;

  &:hover {
    transform: scale(1.09);
    transition: 300ms linear;
    background: #ffefdb;
    color: #fa5c4f;
    margin-left: 0.5rem;
  }
}

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
  // max-width: 1380px;
  width: 98%;
  // height: 100vh;
  // display: flex;
  display: grid;
  grid-template-columns: 1fr 25rem;
  grid-template-rows: repeat(2, 10rem 19vh);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
}

.historicOrders {
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
  width: 98%;
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem;
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
