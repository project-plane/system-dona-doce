<template>
  <div v-if="loading" ></div>
    <ContainerTable v-else>
        <ModalEditCardapio  v-if="$store.state.openModal"/>
      <div class="headerTable">
        <span>Dias Cadastrados</span>
      </div>
      <table>
        <thead>
          <tr>
            <th>Data</th>
            <th>Desjejum</th>
            <th>Lanche 01</th>
            <th>Lanche 02</th>
            <th>Lanche 03</th>
            <th>Opções</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in listCardapio" :key="index">
            <td>{{ formatDate(item.dateMenu) }}</td>
            <td>{{ item.itemMenu[0].revenues.description }}</td>
            <td>{{ item.itemMenu[1].revenues.description }}</td>
            <td>{{ item.itemMenu[2].revenues.description }}</td>
            <td>{{ item.itemMenu[3].revenues.description }}</td>
            <td>

              <button @click="deleteMenu(item.id)">
                <img src="~/assets/icons/delete.svg" alt="deleteMenu" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </ContainerTable>
  </template>
  
  <script lang="ts">
  import Vue from 'vue'
  import dayjs from 'dayjs'
  import httpCardapio from '~/server/cardapio'
  
  export default Vue.extend({
    data() {
      return {
        listCardapio: [],
        findPreviewClient: [],
        textSearch: '',
        loading: true,
      }
    },
  
    async fetch() {
      await httpCardapio.GetMenu().then( (res) => {
        this.listCardapio = res.data
      })
      this.loading = false
    },
    computed: {
      filterItems() {
        let itemSearch = []
        itemSearch = this.listCardapio.filter((item) => {
          return (
            item.corporate_name
              .toLowerCase()
              .indexOf(this.textSearch.toLowerCase()) > -1
          )
        })
        return itemSearch
      },
    },
    methods: {
      previewClient(idClient) {
        this.$store.commit('OPEN_MODAL', true)
        this.findPreviewClient = idClient
      },

      async deleteMenu (id) {
        await httpCardapio.DeleteMenu(id).then( (res) => {
          this.$toast.success('Cardapio deletado')
          this.$nuxt.refresh()
        }).catch ( (error) => {
          console.log(error)
        })
      },

      formatDate(date) {
      return dayjs(date).format('DD/MM/YYYY')
    },
    },
  })
  </script>
  
  <style lang="scss" scoped>
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
    tbody tr button {
      background: transparent;

      img {
        width: 1.2rem;
      }
    }
  }
  </style>
  