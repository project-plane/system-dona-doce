<template>
    <LoadingPage v-if="loading" />
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
          <tr v-for="(item, index) in itemLocal" :key="index">
            <td>{{ formatDate(item.date) }}</td>
            <td>{{ item.desjejum }}</td>
            <td>{{ item.lanche01 }}</td>
            <td>{{ item.lanche02 }}</td>
            <td>{{ item.lanche03 }}</td>
            <td>

              <button @click="deleteReceita(receita.id)">
                <img src="~/assets/icons/delete.svg" alt="deleteReceitas" />
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
  import httpClients from '~/server/cliente'
  
  export default Vue.extend({
    data() {
      return {
        listClient: [],
        findPreviewClient: [],
        textSearch: '',
        loading: true,
        itemLocal: [
        { 
          id: "1",
          date: "2023-07-04T04:00:00.000Z",
          desjejum: 'coxinha',
          lanche01: 'kibe',
          lanche02: 'enroladinho de salsicha',
          lanche03: 'coxinha',
        },
        { 
          id: "2",
          date: "2023-07-09T04:00:00.000Z",
          desjejum: 'Kibe',
          lanche01: 'coxinha',
          lanche02: 'enroladinho de salsicha',
          lanche03: 'coxinha',
        }
        ]
      }
    },
  
    async fetch() {
      await httpClients
        .GetAllClients()
        .then((res) => {
          this.listClient = res.data
        })
        .catch((error) => {
          console.log(error)
        })
      this.loading = false
    },
    computed: {
      filterItems() {
        let itemSearch = []
        itemSearch = this.listClient.filter((item) => {
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
  