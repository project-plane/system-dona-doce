<template>
  <div class="negativeSpace">
    <h2>Funcionários Cadastrados</h2>
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Email</th>
          <th>Empresas</th>
          <th>Opções</th>
        </tr>
      </thead>
      <tbody v-for="user in listUsers" :key="user.id">
        <tr>
          <td>{{ user.name }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>Opções</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
interface Users {
  id: string
  name: string
  username: string
  email: string
}

import httpUsers from '@/server/users'

import { onMounted, ref } from 'vue'

const listUsers = ref<Users[]>()

onMounted(async () => {
  await httpUsers.ListUsers().then((res) => {
    listUsers.value = res.data
  })
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
}
</style>