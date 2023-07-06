<template>
  <LoadingPage v-if="loading" />
  <ContainerTable v-else>
    <EditUser :findUser="findUser" v-if="$store.state.openModal" />
    <div class="headerTable">
      <span>Funcionários Cadastrados</span>
      <InputSearch v-model="textSearch" />
    </div>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>E-mail</th>
          <th>Opções</th>
        </tr>
      </thead>
      <tbody v-for="(user, index) in filteredItem" :key="user.id">
        <tr>
          <td>{{ index + 1 }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.user.email }}</td>
          <td>
            <button @click="editModal(user)">
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
      listUsers: [],
      findUser: [],
      textSearch: '',
      loading: true,
    }
  },

  async fetch() {
    await httpUsers
      .ListUsers()
      .then((res) => {
        this.listUsers = res.data
      })
      .catch((error) => {
        if (error.response.status === 500) {
          this.$toast.error('Servidor fora do ar')
        }
      })
    this.loading = false
  },

  computed: {
    filteredItem() {
      let itemSearch = []
      itemSearch = this.listUsers.filter((item) => {
        return (
          item.name.toLowerCase().indexOf(this.textSearch.toLowerCase()) > -1
        )
      })
      return itemSearch
    },
  },

  methods: {
    editModal(user) {
      this.$store.commit('OPEN_MODAL', true)
      this.findUser = user
    },
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
