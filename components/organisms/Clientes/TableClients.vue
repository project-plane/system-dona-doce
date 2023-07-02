<template>
  <LoadingPage v-if="loading" />
  <ContainerTable v-else>
    <PreviewCliente
      v-if="$store.state.openModal"
      :findPreviewClient="findPreviewClient"
      :listClient="listClient"
    />
    <div class="headerTable">
      <h2>Clientes Cadastrados</h2>
      <InputSearch v-model="textSearch" />
    </div>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Empresa</th>
          <th>CNPJ</th>
          <th>Endereço</th>
          <th>Fone</th>
          <th>Opções</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(client, index) in filterItems" :key="client.id">
          <td>{{ index + 1 }}</td>
          <td>{{ client.corporate_name }}</td>
          <td>{{ client.cnpj }}</td>
          <td>{{ client.address }}</td>
          <td>{{ client.fone }}</td>
          <td>
            <button @click="previewClient(client)">
              <img src="~/assets/icons/eye.svg" alt="eyeReceitas" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </ContainerTable>
</template>

<script lang="ts">
import Vue from 'vue'

import httpClients from '~/server/cliente'

export default Vue.extend({
  data() {
    return {
      listClient: [],
      findPreviewClient: [],
      textSearch: '',
      loading: true,
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
  },
})
</script>

<style lang="scss" scoped>
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
  tbody tr button {
    background: transparent;
  }
}
</style>
