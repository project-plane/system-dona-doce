<template>
  <div v-if="loading" ></div>
    <ContainerTable v-else >
        <ModalEditCardapio v-if="$store.state.openModal" :cardapioModal="cardapioModal"/>
      <div class="headerTable">
        <span>Dias Cadastrados</span>
        <div class="containerSearch" >
              <input  placeholder="Filtrar por Data" type="text" v-model="textSearch" >
          </div>
          
      </div>
      <table>
        <thead>
          <tr>
            <th>Data</th>
            <th>Opção 01</th>
            <th>Opção 02</th>
            <th>Opção 03</th>
            <th>Opção 04</th>
            <th>Opções</th>
          </tr>
        </thead>
        <tbody>
          <!-- <pre>{{ filterItems }}</pre> -->
          <tr v-for="(item, index) in filterItems" :key="index">
            <td>{{formatDate(item.dateMenu) }}</td>
            <td>{{ item.itemMenu[0].revenues.description }}</td>
            <td>{{ item.itemMenu[1].revenues.description }}</td>
            <td>{{ item.itemMenu[2].revenues.description }}</td>
            <td>{{ item.itemMenu[3].revenues.description }}</td>
            <td>

              <button @click="editCardapio(item)"><img src="~/assets/icons/edit.svg" alt="editMenu" /></button>
              <button @click="deleteMenu(item.id)">
                <img src="~/assets/icons/delete.svg" alt="deleteMenu" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <ButtonPagination />
    </ContainerTable>
  </template>

  <script lang="ts">
  import Vue from 'vue'
  import dayjs from '~/services/dayjs'
  import dayj from 'dayjs'
  
  import httpCardapio from '~/server/cardapio'

  export default Vue.extend({
    data() {
      return {
        listCardapio: [],
        findPreviewClient: [],
        textSearch: '',
        loading: true,
        cardapioModal: {}
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
        const searchText = this.textSearch.toLowerCase();
    return this.listCardapio.filter(item => {
        const formattedDate = dayj(item.dateMenu).add(1, 'day').format('DD/MM/YYYY');
        return formattedDate.includes(searchText);
    });
  },
    },
    methods: {
      previewClient(idClient) {
        this.$store.commit('OPEN_MODAL', true)
        this.findPreviewClient = idClient
      },
      editCardapio(cardapio) {
        this.cardapioModal = cardapio
        this.$store.commit('OPEN_MODAL', true)
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
        const data = dayjs.formtDateBr(date)
        return data
     }
    },
  })
  </script>

  <style lang="scss" scoped>
  .containerSearch{
    display: grid;
    input{
      background-image: url(../../../assets/icons/IconSearch.svg);
      background-repeat: no-repeat;
      background-position-x: right;
      background-position-y: center;
      background-size: 20px;
    }
  }
  .headerTable {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

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
