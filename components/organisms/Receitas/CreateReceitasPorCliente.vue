<template>
  <LoadingPage v-if="loading" />
  <ContainerTable v-else>
    <ModalReceitasPorCliente v-if="$store.state.openModal" :dataClient="dataClient" />
    <div class="headerTable">
      <span>Receitas por Clientes</span>
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
        <tr v-for="(client, index) in listAllClients" :key="client.id">
          <td>{{ index + 1 }}</td>
          <td>{{ client.corporate_name }}</td>
          <td>{{ client.cnpj }}</td>
          <td>{{ client.address }}</td>
          <td>{{ client.fone }}</td>
          <td>
            <button @click="openModalReceitaPorCliente(client)">
              <img src="~/assets/icons/vinculo.svg" alt="" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </ContainerTable>
</template>

<script lang="ts">
import Vue from 'vue'

import httpCliente from '~/server/cliente';
import httpReceita from '~/server/receitas';

export default Vue.extend({
  data() {
    return {
      loading: false,
      listAllClients: [],
      dataClient: ''
    }
  },

  async fetch() {
    await httpCliente.GetAllClients()
      .then((res) => {
        this.listAllClients = res.data
        this.loading = false
      })
      .catch((error) => {
        console.log(error)
      })
  },

  methods: {
    openModalReceitaPorCliente(client) {
      this.$store.commit('OPEN_MODAL', true)
      this.dataClient = client

    }
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
