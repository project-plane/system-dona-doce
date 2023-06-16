<template>
  <ContainerTable>
    <PreviewEmpresa v-if="$store.state.openModal" :findEmpresa="findEmpresa" />
    <div class="headerTable">
      <h2>Lista de Empresas</h2>
      <InputSearch v-model="textSearch" />
    </div>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Empresa</th>
          <th>Fone</th>
          <th>E-mail</th>
          <th>Opções</th>
        </tr>
      </thead>
      <tbody>
        <!-- <pre>
          {{ filterItems }}
        </pre> -->
        <tr v-for="(empresa, index) in filterItems" :key="empresa.id">
          <td>{{ index + 1 }}</td>
          <td>{{ empresa.corporate_name }}</td>
          <td>{{ empresa.fone }}</td>
          <td>{{ empresa.email }}</td>
          <td>
            <div class="iconsOptions">
              <button @click="previewEmpresa(empresa.id)">
                <img src="~/assets/icons/eye.svg" alt="eyeReceitas" />
              </button>
              <button>
                <img src="~/assets/icons/edit.svg" alt="editReceitas" />
              </button>
              <!-- <button @click="deleteEmpresa(empresa.id)">
                <img src="~/assets/icons/delete.svg" alt="deleteReceitas" />
              </button> -->
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </ContainerTable>
</template>

<script lang="ts">
import Vue from 'vue'

import httpEmpresa from '~/server/empresa'

export default Vue.extend({
  data() {
    return {
      textSearch: '',
      listEmpresa: [],
      findEmpresa: [],
    }
  },

  async fetch() {
    await httpEmpresa
      .GetAllEmpresa()
      .then((res) => {
        this.listEmpresa = res.data
      })
      .catch((error) => {
        console.log(error)
      })
  },

  computed: {
    filterItems() {
      let itemSearch = []
      itemSearch = this.listEmpresa.filter((item) => {
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
    async previewEmpresa(id) {
      this.$store.commit('OPEN_MODAL', true)
      await httpEmpresa
        .GetFindEmpresa(id)
        .then((res) => {
          this.findEmpresa = res.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    // async deleteEmpresa(id) {
    //   await httpEmpresa
    //     .DeleteEmpresa(id)
    //     .then((res) => {
    //       if (res.status === 200) {
    //         this.$toast.success('Empresa deletada com sucesso!!!')
    //       }
    //     })
    //     .catch((error) => {
    //       console.log(error)
    //     })
    // },
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
    }
  }
}
</style>
