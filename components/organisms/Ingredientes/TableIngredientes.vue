<template>
  <ContainerTable>
    <EditIngrediente :findIngrediente="findIngrediente" />
    <div class="headerTable">
      <h2>Lista de Ingredientes</h2>
      <InputSearch v-model="textSearch" />
    </div>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Preço Unitário</th>
          <th>Opções</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(ingrediente, index) in filterItems"
          :key="ingrediente.id"
        >
          <td>{{ index + 1 }}</td>
          <td>{{ ingrediente.description }}</td>
          <td>R$ {{ ingrediente.value }}</td>
          <td>
            <div class="iconsOptions">
              <button @click="editIngrediente(ingrediente)">
                <img src="~/assets/icons/edit.svg" alt="" />
              </button>
              <button @click="deleteIngrediente(ingrediente.id)">
                <img src="~/assets/icons/delete.svg" alt="" />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </ContainerTable>
</template>

<script lang="ts">
import Vue from 'vue'

import httpListIngredientes from '~/server/ingredientes'

export default Vue.extend({
  data() {
    return {
      listIngredientes: [],
      findIngrediente: [],
      textSearch: '',
    }
  },

  async fetch() {
    await httpListIngredientes
      .ListIngredientes()
      .then((res) => {
        this.listIngredientes = res.data
      })
      .catch((error) => {
        if (error.response.status === 500) {
          this.$toast.error('Servidor fora do ar')
        }
      })
  },

  computed: {
    filterItems() {
      let itemSearch = []
      itemSearch = this.listIngredientes.filter((item) => {
        return(
          item.description.toLowerCase().indexOf(this.textSearch.toLowerCase()) > -1
        )
      })
      return itemSearch
    }
  },

  methods: {
    async deleteIngrediente(id) {
      await httpListIngredientes
        .DeleteIngredientes(id)
        .then((res) => {
          if (res.status === 200) {
            this.$toast.success('Ingrediente deletada com sucesso!!!')
          }
        })
        .catch((error) => {
          if (error.response.status === 500) {
            this.$toast.error(
              'Ingrediente não pode ser deletado, já vinculado a uma receita'
            )
            return
          }
        })
      this.$nuxt.refresh()
    },

    editIngrediente(dataIngrediente) {
      this.$store.commit('OPEN_MODAL', true)
      this.findIngrediente = dataIngrediente
    },
  },
})
</script>

<style scoped lang="scss">
.headerTable{
  width: 100%;
  display: flex;
  justify-content: space-between;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
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
    }
  }
}
</style>
