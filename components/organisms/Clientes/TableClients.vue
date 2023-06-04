<template>
  <ContainerTable>
    <div class="headerTable">
      <h2>Clientes Cadastrados</h2>
      <InputSearch v-model="textSearch" />
    </div>
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
        <tr>
          Em Desenvolvimento
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
      textSearch: ''
    }
  },

  async fetch() {
    await httpUsers
      .ListUsers()
      .then((res) => {
        this.listClient = res.data
      })
      .catch((error) => {
        if (error.response.status === 500) {
          this.$toast.error('Servidor fora do ar')
        }
      })
  },
})
</script>

<style lang="scss" scoped>
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
  tbody tr button {
    background: transparent;
  }
}
</style>
