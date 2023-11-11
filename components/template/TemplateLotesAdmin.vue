<template>
  <div class="lotesPage">
    <div class="historicOrders">
        <HeaderLotes title="Gerar Lotes" @searchCliente="searchCliente"/>
    </div>
      <main >
        <div class="listCards">
            <CardInfoLotes v-for="(item, id) in dataPedidos" :key="id" :infoPedidos="item" @update-selection="updateSelectedCards" />
        
            <pre>{{ selectedCards }}</pre>
            <div v-if="dataPedidos.length === 0">
                Selecione um cliente 
            </div>
        
        </div>
      
        
      </main>
         <div class="containerSidebar">
          <section style="display: flex; align-items: center; justify-content: space-evenly;">

          <h3 :class="{ abaNotActive: abaNotActive }" class="abaActive" @click="pedidos">Itens do Pedido</h3>
          <h3 :class="{ abaNotActive: !abaNotActive }" class="abaActive" @click="entrega">Finalizar</h3>
    
          </section>

          <div  style="height: 75vh;      overflow: scroll;">
           <!-- <h3 style="margin-top: .4rem;"> {{ selectedCards[0].user }}</h3> -->
            <table v-if="abaNotActive === true">
              <tr v-if="selectedCards.length > 0">
                <th>Id</th>
                <th>Itens </th>
                <th>Qtd.</th>
                <th> Valor </th>
              </tr>
              <div v-else style="display: flex; align-items: center;">
                  <span style="text-align: center;">
                    Escolha os pedidos a serem incluídos na criação dos lotes.
                    <!-- <img src="../atoms/AnimationLotes.svg" alt="" srcset="" style="width: 20rem;"> -->
                  </span>
              </div>
              <tr v-for="(item, id) in selectedCards" :key="id">
                <td>{{item.numberOrder}}</td>
                <td>
                  <span  v-for="(receita, id) in item.orderItem" :key="id" style="width: 100%;display: flex; flex-direction: column;">
                    {{ receita.revenues.description }}</span>
                </td>
                <td>
                  <span  v-for="(receita, id) in item.orderItem" :key="id" style="width: 100%;display: flex; flex-direction: column;">
                    {{ receita.amountItem }}</span>
                </td>
                <td>
                  <span  v-for="(receita, id) in item.orderItem" :key="id" style="width: 100%;display: flex; flex-direction: column;">
                    R$ {{ receita.valueOrderItem }}</span>
                </td>
            
              </tr>
             
            </table>

            <div v-else style="display: flex; flex-wrap: wrap; flex-direction: column;">
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
                    <input
                      type="date"
                      v-model="initial_date"
                      style="width: 100%; height: 100%"
                      placeholder="000 001 001"
                    />
                  </div>
                  <span>Data final</span>
                  <div class="inputContainer">
                    <input
                      type="date"
                      v-model="end_date"
                      style="width: 100%; height: 100%"
                      placeholder="000 001 001"
                    />
                  </div>
                  
                <Button @click.native="lotes()" title="Gerar Lote" style="margin-left: auto; margin-top: 2rem;"></Button>
            </div>
          </div>
        </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import httpOrder from '~/server/pedidos'
export default Vue.extend({

  data(){
    return{
      abaNotActive: true,
      dataPedidos:[],
      listClient:[],
      selectedCards: [],
      cliente: "",
      previewNotaFiscal: null,
      aba: false,
      invoice_number: "",
      initial_date: "2023-11-28",
      end_date : "",
      OrderBatchItem:[]
    }
  },
  methods:{
    onFileChangeNF(event) {
      this.selectedFileNF = event.target.files[0]
      this.previewNotaFiscal = URL.createObjectURL(this.selectedFileNF)
    },
    pedidos() {
        this.abaNotActive = true  
    },
    entrega() {
        this.abaNotActive = false
 
    },
    async searchCliente(selectedClient){
      await httpOrder.GetOrderCliente2(selectedClient)
      .then((res) => {
        this.dataPedidos = res.data
        this.cliente = selectedClient
    
      })
      .catch((error) => {
        console.log(error)
      })
    },
    updateSelectedCards(selectedCard) {      
      
      if (selectedCard.selected) {
        const client = this.selectedCards.some(item => item.user != selectedCard.user);
          if (client) {
          this.selectedCards = [];
        }
       }
      if (selectedCard.selected) {
        const exists = this.selectedCards.some(item => item.numberOrder === selectedCard.numberOrder);

      if (!exists) {
        this.selectedCards = [...this.selectedCards, selectedCard];
      }
      }
      
      else{
        const itemToRemoveIndex = this.selectedCards.findIndex(item => item.fk_pedido === selectedCard.fk_pedido);

        if (itemToRemoveIndex !== -1) {
          this.selectedCards = this.selectedCards.filter((_, index) => index !== itemToRemoveIndex);
        }
      }
    },
    lotes(){
      this.selectedCards.map((element) => {
        this.OrderBatchItem.push( {
        'fk_order': element.fk_pedido
        
      })
        })

      const formData = new FormData()
      
        formData.append('fk_client', this.cliente)
        formData.append('file_invoice', '')
        formData.append('invoice_number',this.invoice_number   )
        formData.append('initial_date', this.formatDate(this.initial_date))
        formData.append('end_date', this.formatDate(this.end_date))
        formData.append('createOrderBatchItem ',this.OrderBatchItem)
    
        console.log( this.OrderBatchItem);
        this.postOrderLotes(formData)
        
    },
    async postOrderLotes(data){
      await httpOrder.PostLotes(data)
      .then((res) => {
        console.log(res);
        
      })
      .catch((error) => {
        console.log(error)
      })
    }
      
  },
})
</script>

<style scoped lang="scss">
label{
  display: flex;
  flex-direction: column;
  width: 9rem;
}
// input{
//   border: solid 1px lavender;
//     height: 2.4rem;
//     width: 8rem;
// }
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

  .historicOrders { grid-area: 1 / 1 / 2 / 2; }
    main { 
      grid-area: 2 / 1 / 3 / 2; 
      height: 60vh;
      overflow-y: scroll;
    }
  .containerSidebar { 
    grid-area: 1 / 2 / 3 / 3; 
    margin-top: 1rem;
  }

  // .historicOrders {
  //   width: 100%;
  //   height: 100%;
  //   display: flex;
  //   flex-direction: column;
  // }
  


.containerSidebar{
  padding: 1rem;
  // border-radius: 0.5rem;
  background: white;
  height: 85vh; 
  // overflow-y: scroll;
}
.listCards{
    margin: 0 auto;
    width: 95%;
    display: flex;
    flex-wrap: wrap;
    gap: 1.2rem;
    padding: 1rem;
    
}
table{
  width: 100%;
  border-spacing: 0px;
  th{
  background: #fa5c4f52;; 
  }
  td{
    border-bottom: 1px solid black;
    border-collapse: collapse;
    text-align: center;
  }
}

</style>
