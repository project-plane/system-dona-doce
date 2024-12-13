<template>
  <LoadingPage v-if="loading" />
  <ContainerTable v-else>
    <EditIngrediente
      v-if="$store.state.openModal"
      :find-ingrediente="findIngrediente"
    />
    <div class="headerTable">
      <span>Lista de Ingredientes</span>
      <InputSearch v-model="textSearch" />
    </div>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Ingrediente</th>
          <th>Unidade de Medida</th>
          <th>Valor / U.M </th>
          <th>Preço Unitário</th>
          <th>Opções</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(ingrediente, index) in filterItems" :key="ingrediente.id">
          <td>{{ index + 1 }}</td>
          <td>{{ ingrediente.description }}</td>
          <td> {{
              ingrediente.unit_of_measurement.toLowerCase() === "u" ? "Unidade" :
              ingrediente.unit_of_measurement.toLowerCase() === "ml"? "ML" :
              ingrediente.unit_of_measurement.toLowerCase() === "g"? "Gramas" :
              ingrediente.unit_of_measurement.toLowerCase() === "l"? "Litros" :
              "Not Found Unit of Measurement"
          }}</td>
          <td>R$ {{ingrediente.value_per_serving}}/{{ingrediente.unit_of_measurement}}</td>
          <td>R$ {{ ingrediente.value.toFixed(2) }}</td>
          <td>
            <div class="iconsOptions">
              <button @click="editIngrediente(ingrediente.id)">
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
      loading: true,
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
    this.loading = false
  },

  computed: {
    filterItems() {
      let itemSearch = []
      itemSearch = this.listIngredientes.filter((item) => {
        return item.description
          .toLowerCase()
          .includes(this.textSearch.toLowerCase())
      })
      return itemSearch
    },
  },

  methods: {
    async deleteIngrediente(id) {
      this.loading = true
      await httpListIngredientes
        .DeleteIngredientes(id)
        .then((res) => {
          if (res.status === 200) {
            this.$toast.success('Ingrediente deletado com sucesso!!!')
          }
          this.loading = false
        })
        .catch((error) => {
          if (error.response.status === 500) {
            this.$toast.error(
              'Ingrediente não pode ser deletado, já vinculado a uma receita'
            )
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
}
</style>
