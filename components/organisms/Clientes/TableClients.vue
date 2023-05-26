<template>
  <ContainerTable>
    <h2>Clientes Cadastrados</h2>
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Email</th>
          <th>Empresas</th>
          <th>Opções</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="client in listClient" :key="client.id">
          <td>{{ client.name }}</td>
          <td>{{ client.email }}</td>
          <td>{{ client.username }}</td>
          <td>
            <button>
              <img src="~/assets/icons/edit.svg" alt="editUser" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </ContainerTable>
</template>

<script lang="ts">
import Vue from 'vue'

import httpUsers from '@/server/users'

export default Vue.extend({
  data() {
    return {
      listClient: [],
    }
  },

  async mounted() {
    await httpUsers.ListUsers().then((res) => {
      this.listClient = res.data
    })
  },
})
</script>

<style lang="scss" scoped>
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