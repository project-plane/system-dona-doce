<template>
  <div class="lotesPage">
    <div class="historicOrders">
        <HeaderLotes title="Gerar Lotes" @searchCliente="searchCliente"/>
    
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
      await httpOrder.GetOrderCliente(selectedClient)
      .then((res) => {
        this.dataPedidos = res.data
    
      })
      .catch((error) => {
        console.log(error)
      })
    },
    updateSelectedCards(selectedCard) {
      if (selectedCard.selected) {
        this.$set(this.selectedCards, selectedCard.numberOrder, selectedCard);
      } else {
        this.$delete(this.selectedCards, selectedCard.numberOrder);
      }
    },
  
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
.listCards{
    margin: 0 auto;
    width: 82%;
    display: flex;
    flex-wrap: wrap;
    gap: 1.2rem;
    padding: 1rem;
}
</style>
