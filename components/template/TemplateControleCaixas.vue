<template>
  <div class="containerPage">
    <div class="headerTable">
      <span>Controle de bandejas e caixas</span>
      <InputSearch v-model="textSearch"/>
    </div>
    <table>
      <thead>
        <tr>
          <th>ID do pedido</th>
          <th>Data</th>
          <th>Empresa</th>
          <th>Qtd. caixas</th>
          <th>Qtd. bandejas</th>
          <th>Opções</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, id) in itensToShow" :key="id">
          <td>{{ item.numberOrder }}</td>
          <td>{{ formatDate(item.dateOrder) }}</td>
          <td>{{ item.company.corporate_name }}</td>
          <td>
            <input type="number" v-model="item.amount_of_boxes" />
          </td>
          <td>
            <input type="number" v-model="item.amount_of_tray" />
          </td>
          <td>
            <button
            class="buttonUpdate"
              @click="updateItem(item.amount_of_boxes, item.amount_of_tray, item.id)"
            >
              Atualizar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <PaginationController
        :current-page.sync="currentPage"
        :total-pages="totalPages"
      />
  </div>
</template>
<script lang="js">
import http from '~/server/kanban/index'
import dayjs from 'dayjs'
export default {
  data() {
    return {
      listTrayAndBoxes: [],
      listBoxes: [],
      orderItem: [],
      posts:[],
      textSearch: '',
      currentPage: 1,
      itemsPerPage: 8,
    }
  },
  async mounted() {
    try {
      const res = await http.GetAllTrayAndBoxes()
      console.log(res.data)
      this.listTrayAndBoxes = res.data
    } catch (error) {
      console.error('Erro ao obter os dados:', error)
    }
  },
  computed: {
    totalPages() {
      this.posts = this.listTrayAndBoxes;
      return Math.ceil(this.posts.length / this.itemsPerPage);
    },
    itemsPagination() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.posts.slice(startIndex, endIndex);
    },

    filteredItems() {
      let itemSearch = []
      itemSearch = this.listTrayAndBoxes.filter((item) => {
        return (
          item.numberOrder.toString().includes(this.textSearch.toLowerCase())    
        )
      })
      return itemSearch
    },
    itensToShow() {
      return this.textSearch ? this.filteredItems
        : this.itemsPagination;
    },
  },

  methods: {
    updateItem(boxes, tray, id) {
      const data = {
        amount_of_tray: Number(tray),
        amount_of_boxes: Number(boxes),
      }
      console.log(data)
      try {
        const res = http.updateBandejas(id, data)
        this.$toast.success('Itens atualizados com sucesso !!')
      } catch (error) {
        this.$toast.error('Erro ao atualizar os dados:', error)
      }
    },
    formatDate(date) {
      return dayjs(date).format('DD/MM/YYYY')
    },
  },
}
</script>

<style lang="scss" scoped>
.containerPage {
  width: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  .buttonUpdate{
    width: 7rem;
    height: 2.6rem;
    background-color: var(--red);
    color: var(--white);
    border-radius: 0.25rem;
    text-align: center;
    transition: 0.2s;
  }
  .containertTable {
    height: 100%;
    margin: auto;
    // background: red;
    overflow: scroll;
  }
  label {
    font-weight: 600;
  }
  input {
    min-width: 120px;
    background: #b9b9b91f;
    text-align: center;
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
    margin: auto;
    border-collapse: collapse;
    margin-top: 1rem;
    font-size: 0.9rem;
    thead {
      width: 100%;
      background: var(--bg_heade_table);
      tr th {
        padding: 0.6rem 0.4rem;
      }
    }
    tbody tr td {
      padding: 0.6rem 0.4rem;
      text-align: center;
    }
    tbody tr button {
      background: transparent;
    }
  }
}
</style>
