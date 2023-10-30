<template>
   <div v-if="load == true" >
    <LoadingPage style="height: 80vh;" />
  </div>
  <ContainerTable  v-else>
    <div class="headerTable">
      <span>Prioridade de Rotas</span>
      <InputSearch v-model="textSearch" />
    </div>
    <table>
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
    </table>
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
</style>
