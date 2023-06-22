<template>
  <LoadingPage v-if="loading" />
  <ContainerTable v-else>
    <!-- <PreviewEstoque
      v-if="$store.state.openModal"
      :historicoEstoque="historicoEstoque"
    /> -->
    <div class="headerTable">
      <h2>Lista do Estoque</h2>
      <InputSearch v-model="textSearch" />
    </div>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Ingrediente</th>
          <th>Quantidade</th>
          <th>Preço Unitário</th>
          <!-- <th>Histórico</th> -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="(estoque, index) in filterItems" :key="estoque.id">
          <td>{{ index + 1 }}</td>
          <td>{{ estoque.description }}</td>
          <td>{{ estoque.amount_actual }}</td>
          <td>R$ {{ estoque.value.toFixed(2) }}</td>
          <!-- <td>
            <button>
              <img
                src="~/assets/icons/eye.svg"
                @click="previewHistorico(estoque)"
              />
            </button>
          </td> -->
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
  },
})
</script>

<style scoped lang="scss">
.headerTable {
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
  tbody tr {
    button {
      background: transparent;
    }
  }
}
</style>
