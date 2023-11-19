<template>
 
    <div class="lotesPage">
      <div class="historicOrders">
        <HeaderLotes title="Gerar Lotes" @searchCliente="request" />
      </div>
      <Loading v-if="loading"  />
      <main v-else>
        <div class="listCards">
 
           <!-- <pre> {{ listAllLotes[0].user }}</pre> -->
          <CardLotes
            v-for="(item, id) in listAllLotes"
            :key="id"
            :infoPedidos="item"
            :idLote="item.numberOrderBatch"
            :valueOrder="item.OrderBatchItem"
            @update-selection="updateSelectedCards"
          />
          <span v-show="listAllLotes.length === 0" style="height: 60vh;  display: flex;
            align-items: center;  justify-content: center; width: 100%;">
           Não encontramos resultados, Escolha um cliente...
          </span>
        </div>
      </main>
      
      <div class="containerSidebar">
        <section
          style="
            display: flex;
            align-items: center;
            justify-content: space-evenly;
          "
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
              <th>Id</th>
              <th>Itens</th>
              <th>Qtd.</th>
              <th>Valor</th>
            </tr>
            <div v-else style="display: flex; align-items: center" >
              <span style="text-align: center">
                Escolha os pedidos a serem incluídos na criação dos lotes.
                <AnimationLotes/>
              </span>
            </div>
            <tr v-for="(item, id) in listPedidos" :key="id">
              <pre>{{ item }}</pre>
         
            
            </tr>
          </table>

          <div  v-else style="display: flex; flex-wrap: wrap; flex-direction: column">
            <span>Download NF</span>
            <div class="inputContainer">
         
            </div>
            <span>Download Cautela</span>
            <div class="inputContainer">
             
            </div>
            <span>Comprovante</span>
            <div class="inputContainer">
             
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
      dataPedidos: [],
      listClient: [],
      selectedCards: [],
      cliente: '',
      previewNotaFiscal: null,
      aba: false,
      OrderBatchItem: [],
      loading: false,
      listAllLotes:[],
      listPedidos: [],
    }
  },
  computed: {},
  methods: {
     async request(searchCliente){ 
    await httpOrder.ListLotes(searchCliente).then((res) => {
      this.listAllLotes = res.data
      console.log(res)
      })

    },
    pedidos() {
      this.abaNotActive = true
    },
    entrega() {
      this.abaNotActive = false
    },
    onFileChangeNF(event) {
      this.selectedFileNF = event.target.files[0]
      this.previewNotaFiscal = URL.createObjectURL(this.selectedFileNF)
    },


    updateSelectedCards(selectedCard) {
     this.listPedidos = selectedCard
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
