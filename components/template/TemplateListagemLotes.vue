<template>
    <div class="lotesPage">
      <div class="historicOrders">
        <HeaderLotes title="Consulta de Lotes" @searchCliente="request" :filterSearch="true" label="Pesquisar.." v-model="textSearch"  />
      
      </div>
      <LoadingPage v-if="loading" style="width: ;" />
      <main v-else>
        <div class="listCards">
          <CardLotes
            v-for="(item, id) in filteredItems"
            :key="id"
            :infoPedidos="item"
            :idLote="item.numberOrderBatch"
            :valueOrder="item.OrderBatchItem"
            @update-selection="updateSelectedCards"
            @aba-Lotes="pedidos"
          />
          
          <span v-show="filteredItems.length === 0" style="height: 60vh;  display: flex;
            align-items: center;  justify-content: center; width: 100%;">
           Não encontramos resultados, Escolha um cliente...
          </span>
        </div>
      </main>
      
      <div class="containerSidebar" >
        <section
          style=" display: flex;      align-items: center;
            justify-content: space-evenly; "
        >
          <h3
            :class="{ abaNotActive: abaNotActive }"
            class="abaActive"
            @click="pedidos"
          >
            Itens do Lote
          </h3>
          <h3
            :class="{ abaNotActive: !abaNotActive }"
            class="abaActive"
            @click="entrega"
          >
            Anexos
          </h3>
        </section>

        <div style="height: 75vh; overflow: scroll">
          <table v-if="abaNotActive === true">
            <tr v-if="listPedidos != null">
              <th>Pedido</th>
              <th>Valor</th>
    
              <th>Cautela</th>
            </tr>
            <div v-else style="display: flex; align-items: center" >
              <span style="text-align: center">
                Escolha os pedidos a serem incluídos na criação dos lotes.
                <AnimationLotes/>
              </span>
            </div>
            <tr v-for="(item, id) in listPedidos.OrderBatchItem" :key="id">
                <td> Nº {{ item.order.numberOrder }}</td>
                <td> R$ {{ item.order.valueOrder }}</td>
                <td v-if="item.order.file_caution != null ">
                  Anexado
                </td>
                  <td v-else>
                  Não Anexado
                  </td>
                
            </tr>
          </table>

          <div  v-else style="display: flex; flex-wrap: wrap; flex-direction: column; margin-top: 2rem;">
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
        
                <button class="btnDownload" @click="downloadCaution">
                  Baixar Arquivo 
                </button>
            </div>
            <span>Comprovante</span>
            <div>
              {{ listPedidos.file_payment_voucher }}
                <span v-if="listPedidos.file_payment_voucher == null" class="spanButton" >
                    Arquivo não anexado
                </span >
                <button @click="downloadFile" v-if="listPedidos.file_payment_voucher != null" class="btnDownload">
                  Baixar Comprovante
                </button>
            </div>

          </div>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import httpOrder from '~/server/pedidos'
export default Vue.extend({
  data() {
    return {
      abaNotActive: true,
      selectedCards: [],
      cliente: '',
      previewNotaFiscal: null,
      loading: false,
      listAllLotes:[],
      listPedidos: [],
      filesCaution: 0,
      textSearch: "",
    }
  },
  async fetch(){
    this.request()
  },
  methods: {
     async request(searchCliente){ 
       this.loading = true;
        await httpOrder.ListLotes(searchCliente).then((res) => {
          this.listAllLotes = res.data
          
          this.loading = false;
        })

    },
    pedidos() {
      this.abaNotActive = true
    },
    entrega() {
      this.abaNotActive = false
    },
    updateSelectedCards(selectedCard) {
     this.listPedidos =[]
     this.listPedidos = selectedCard
     
    },
    async downloadNF(url) {
      try {
        await fetch(
          'https://api.donadoce.gedroid.com/invoice/' + url
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
          'https://api.donadoce.gedroid.com/caution/' + item
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
.spanButton{
  font-size: 12px;
  width: 100%;
  background: #ffefdb;
  color: #fa5c4f;
  border: none;
  @extend .inputContainer
                  
}
.btnDownload {
  display: flex;
  align-items: center;
  border: 1px solid var(--red);
  text-align: center;
  border-radius: 0.25rem;
  padding: 0.5rem;
  height: 2.6rem;
  width: 8rem;
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
}



.containerSidebar {
  padding: 1rem;
  // border-radius: 0.5rem;
  background: white;
  height: 85vh;
  // overflow-y: scroll;
}
.listCards {
  margin: 0 auto;
  width: 95%;
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
