<template>
   <div v-if="load == true" >
    <LoadingPage style="height: 80vh;" />
  </div>
  <ContainerTable  v-else>
    <div class="headerTable">
      <span>Prioridade de Rotas</span>
      <InputSearch v-model="textSearch" />
    </div>
    <div style="gap: 1rem; display: flex; flex-direction: column; font-size: small; margin-top: 1rem;">
      <div class="card" style="padding: 1rem; " v-for="(item, index) in filterItems" :key="index">
      
      <span class="spanNameCorporate">
        <strong> {{ item.corporate_name  }} </strong> </span>
      
      <span class="spanEndereco"> <strong>Endereço:</strong> {{ item.address }}, {{ item.district }}</span>
      <span class="spanData"><strong>Data:</strong> {{ formatDate(item.createdAt) }}</span>
      
      <span class="spanId">  
        <input style="width: 80%; text-align: center;" type="number"  v-model="item.priority" >
      </span>
      <section class="button">
        <Button class="btn" title="Alterar Ordem" type="submit" @click.native="saveData(item.id, item.priority)" />
      </section>
  

    </div>
    </div>
    <!-- <table>
      <thead>
        <tr>
          <th>Rotas</th>
          <th>Unidade</th>
          <th>Endereço</th>
          <th>Data</th>
          <th>Opções</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in filterItems" :key="index">
         
          <td>  <input style="width: 4.6rem; text-align: center;" type="number"  v-model="item.priority" ></td>
          <td >{{ item.corporate_name }}</td>
          <td>{{ item.address }}, {{ item.district }}</td>
          <td>{{ formatDate(item.createdAt) }}</td>
          <td>
            <Button title="Salvar" type="submit" @click.native="saveData(item.id, item.priority)" />
          </td>
        </tr>
      </tbody>
    </table> -->
  </ContainerTable>
  
</template>

<script lang="ts">
import Vue from 'vue'
import http from "@/server/kanban/index.js"
import dayjs from 'dayjs'
export default Vue.extend({
  data() {
    return {
      textSearch: '',
      listRoutes:[],
      message: 'Digitar prioridade de rota',
      novaOrdem: null,
      load: false
      
    }
  },
  computed:{
    filterItems() {
        let itemSearch = []
        itemSearch = this.listRoutes.filter((item) => {
          return (
            item.corporate_name
              .toLowerCase()
              .indexOf(this.textSearch.toLowerCase()) > -1
          )
        })
        return itemSearch
      },
  },
  fetch(){
    http.GetOrderRouteCompany().then((res) => {
      this.listRoutes = res.data
    })
      .catch((error) => {
        console.log(error)
      })
    
  },
  methods:{
    async saveData(index, item) {
        try {
          this.load = true
            const data = {
                "priority": parseInt(item)
            }
            await http.UpdateOrder(index, data);
            this.$toast.info('Prioridade de Rotas atualizadas');
            this.$nuxt.refresh();
            this.load = false
          } catch (error) {
              this.$toast.error('Erro ao atualizar a prioridade:', error);
              this.load = false
          }

      },
      formatDate(date) {
      return dayjs(date).format('DD/MM/YYYY')
    },
    },
})
</script>

<style scoped lang="scss">
input{
  border-radius: 0;
  border-bottom: solid 1px var(--red);
  
}
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
.headerTable {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    font-size: 1.35rem;
    font-weight: 600;
  }
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  font-size: 0.9rem;

  thead {
    width: 100%;
    background: var(--bg_heade_table);

    tr th {
      padding: 0.6rem 0;
    }
  }

  tbody tr td {
    text-align: center;
    padding: 1rem 0;
  }

  tbody tr .img img {
    width: 50px;
    height: 50px;
  }

  tbody tr .iconsOptions {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    button {
      background: transparent;

      img {
        width: 1.2rem;
      }
    }
  }

  .btnRota {
    display: flex;


  }
}

.card {
display: grid;
grid-template-columns: 60px 1fr 130px;
grid-template-rows: 30px 60px repeat(2);
grid-column-gap: 0px;
grid-row-gap: 5px;
background: white;
}

.spanId {grid-area: 1 / 1 / 4 / 2; }
.spanNameCorporate{ grid-area: 1 / 2 / 2 / 3; }
.spanData { grid-area: 1 / 3 / 2 / 4; }
.button { grid-area: 3 / 2 / 4 / 4;
  position: relative;
  margin-left: auto
 }



@include screen('mobile') {
  .card {
    display: grid;
    grid-template-columns: 60px 1fr;
    grid-template-rows: 30px auto repeat(2, 30px);
    grid-column-gap: 0px;
    grid-row-gap: 4px;
    background: white;
}

  .spanNameCorporate{ grid-area: 1 / 2 / 2 / 3; }
  .spanEndereco { 
    grid-area: 2 / 2 / 3 / 3;
    margin: inherit;
  }
  .spanData { grid-area: 3 / 2 / 4 / 3; 
    
  }
  .spanId { grid-area: 1 / 1 / 5 / 2; }
}
.button {grid-area: 4 / 2 / 5 / 4;
}
.btn {
    height: 2.2rem !important;

}
</style>
