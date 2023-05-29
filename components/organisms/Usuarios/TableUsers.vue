<template>
  <ContainerTable>
    <ModalEditUser
      v-if="openModal"
      :closeModal="openModal"
      :findUser="findUser"
      @closeModal="closeModal"
    />
    <h2>Funcionários Cadastrados</h2>
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Cargo</th>
          <th>E-mail</th>
          <th>Opções</th>
        </tr>
      </thead>
      <tbody v-for="user in listUsers" :key="user.id">
        <tr>
          <td>{{ user.name }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>
            <button @click="modal(user)">
              <img src="~/assets/icons/edit.svg" alt="editUser" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </ContainerTable>
</template>

<script>
import Vue from 'vue'

import httpUsers from '@/server/users'
export default Vue.extend({
  data() {
    return {
      openModal: false,
      listUsers: [],
      findUser: [],
    }
  },

  async fetch() {
    await httpUsers
      .ListUsers()
      .then((res) => {
        this.listUsers = res.data
      })
      .catch((error) => {
        console.log(error.response)
        if (error.response.status === 500) {
          this.$toast.error('Servidor fora do ar')
        }
      })
  },

  methods: {
    modal(user) {
      this.openModal = true
      this.findUser = user
    },
    closeModal() {
      this.openModal = false
    },
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
