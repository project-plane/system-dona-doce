<template>
  <LoadingPage v-if="loading" />
  <ContainerTable v-else>

    <div class="headerTable">
      <span>Lista do Estoque</span>
      <InputSearch v-model="textSearch" />
    </div>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Ingrediente</th>
          <th>Quantidade</th>
          <th>Base Calculada</th>
          <th>Valor / U.M</th>
          <th>Opções</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(estoque, index) in filterItems" :key="estoque.id">
          <td>{{ index + 1 }}</td>
          <td>{{ estoque.description }}</td>
          <td>{{ estoque.amount_actual }}{{ estoque.unit_of_measurement}}</td>
          <td>{{ estoque.amount }}{{estoque.unit_of_measurement}}/R$ {{ estoque.value.toFixed(2) }}</td>
          <td>R$ {{ estoque.value_per_serving}}/{{estoque.unit_of_measurement}}</td>
          <td>
            <button @click="editReceita(estoque)">
                  <img src="~/assets/icons/edit.svg" alt="editReceitas" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </ContainerTable>
</template>

<script lang="ts">
import Vue from 'vue'

import httpEstoque from '~/server/estoque'

export default Vue.extend({
  data() {
    return {
      textSearch: '',
      listEstoque: [],
      historicoEstoque: [],
      loading: true
    }
  },
  async fetch() {
    await httpEstoque
      .GetAllEstoque(true)
      .then((res) => {
        this.listEstoque = res.data
      })
      .catch((error) => {
        console.log(error)
      })
      this.loading = false
  },
  computed: {
    filterItems() {
      let itemSearch = []
      itemSearch = this.listEstoque.filter((item) => {
        return (
          item.description
            .toLowerCase()
            .includes(this.textSearch.toLowerCase())
        )
      })
      return itemSearch
    },
  },
  methods: {
    previewHistorico(dataEstoque) {
      this.historicoEstoque = dataEstoque
      this.$store.commit('OPEN_MODAL', true)
    },
    editReceita(item){
      const dataModal = item
      this.$store.commit('EstoqueDataModal', dataModal)
      this.$store.commit('OpenModalEstoque', true);
    }
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
  tbody tr {
    button {
      background: transparent;

      img {
        width: 1.2rem;
      }
    }
  }
}
</style>
