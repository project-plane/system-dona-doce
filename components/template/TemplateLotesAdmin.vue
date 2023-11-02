<template>
  <div class="lotesPage">
    <div class="historicOrders">
        <HeaderLotes title="Gerar Lotes" @searchCliente="searchCliente"/>
    <main style="display: grid;
grid-template-columns: 70% 30%;
grid-template-rows: 1fr;
grid-column-gap: 0px;">
      <div class="listCards">
          <!-- <section class="filter" style="width: 100%;">
              <label for="checkAll" style="cursor: pointer; display: flex; gap: .4rem;"> <h3>Selecionar Todos</h3>
              <input type="checkbox" name="" id="checkAll"  >
            </label >
          </section> -->
          
          <CardInfoLotes v-for="(item, id) in dataPedidos" :key="id" :infoPedidos="item" @update-selection="updateSelectedCards" />
          
          <!-- <pre>{{ selectedCards }}</pre> -->
          <div v-if="dataPedidos.length === 0">
              Selecione um cliente 
          </div>
       
      </div>
      
      <div class="containerSidebar">
        <h4> Resumo </h4>
        <!-- <label for=""> Data Inicial</label>
        <input type="date" style="border: solid 1px black;">
        <br>
        <label for=""> Data Final</label>
        <input type="date" style="border: solid 1px black;"> -->

        <div>
          <table>
          
            <tr>
              <th>Id</th>
              <th>Itens </th>
              <th>Qtd.</th>
              <th> Valor </th>
            </tr>
             
            <tr  v-for="(item, id) in selectedCards" :key="id" class="containerTr">
              <td>{{item.numberOrder}}</td>
              <td>
                <span  v-for="(data, index) in item.orderItem" :key="index" style="width: 100%;display: flex; flex-direction: column;">
                  {{ data.revenues.description }}</span>
              </td>
              <td >
                 <span v-for="(data, index) in item.orderItem" :key="index" style="width: 100%;display: flex; flex-direction: column;"> {{ data.amountItem}} </span>
              </td>
              <td>
                <span v-for="(data, index) in item.orderItem" :key="index" style="width: 100%;display: flex; flex-direction: column;" >
                {{ data.valueOrderItem }}</span>
              
              </td>

            </tr>
 


          </table>
        </div>
      </div>

    </main>
    </div>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import httpOrder from '~/server/pedidos'
export default Vue.extend({

  data(){
    return{
      dataPedidos:[],
      listClient:[],
      selectedCards: {},
    }
  },
  methods:{
    async searchCliente(selectedClient){
      await httpOrder.GetOrderCliente2(selectedClient)
      .then((res) => {
        this.dataPedidos = res.data
        console.log( this.dataPedidos);
        
    
      })
      .catch((error) => {
        console.log(error)
      })
    },
    updateSelectedCards(selectedCard) {
      if (selectedCard.selected) {
        console.log(this.selectedCards);
        
        this.$set(this.selectedCards, selectedCard.numberOrder, selectedCard);
      } else {
        this.$delete(this.selectedCards, selectedCard.numberOrder);
      }
    },
    getRevenuesDescription(orderItem) {
      return orderItem.map(item => item.revenues.description).join(', ');
    },
    getvalueOrderItem(orderItem) {
      return orderItem.map(item => item.valueOrderItem).join(', ');
    }
  
  },
})
</script>

<style scoped lang="scss">
.lotesPage {
  margin: 0 auto;
  max-width: 1380px;
  width: 98%;
  height: 100vh;
  display: flex;

  .historicOrders {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  
}

.containerSidebar{
  padding: 1rem;
  border-radius: 0.5rem;
  background: white;
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
  }
}
</style>
