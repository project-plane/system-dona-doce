<template>
  <div class="containerPage">
    <div class="headerTable">
      <span>Controle de bandejas e caixas</span>
      <InputSearch />
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
        <tr v-for="(item, id) in listTrayAndBoxes" :key="id">
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
              @click="updateItem(item.amount_of_boxes, item.amount_of_tray)"
            >
              Atualizar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script lang="js">
import http from '~/server/kanban/index'
import dayjs from 'dayjs'
export default {
  data() {
    return {
      listTrayAndBoxes: [],
      orderItem: [],
    }
  },
  async mounted() {
    try {
      const res = await http.GetTrayAndBoxes()
      console.log(res.data)
      this.listTrayAndBoxes = res.data
    } catch (error) {
      console.error('Erro ao obter os dados:', error)
    }
  },
  methods: {
    updateItem(boxes, tray, id) {
      const data = {
        amount_of_tray: Number(boxes),
        amount_of_boxes: Number(tray),
      }
      console.log(data)
      // try {
      //   const res = http.GetTrayAndBoxes()
      //   console.log(res.data)
      //   this.listTrayAndBoxes = res.data
      // } catch (error) {
      //   console.error('Erro ao obter os dados:', error)
      // }
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
  .containertTable {
    height: 90%;
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

  //   input:disabled {
  //     cursor: default;
  //     background-color: light-dark(rgb(250 92 79 / 17%), rgba(59, 59, 59, 0.3));
  //     color: light-dark(rgb(84, 84, 84), rgb(170, 170, 170));
  //     border-color: rgba(118, 118, 118, 0.3);
  //   }
  .headerTable {
    width: 80%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      font-size: 1.35rem;
      font-weight: 600;
    }
  }
  table {
    width: 80%;
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
