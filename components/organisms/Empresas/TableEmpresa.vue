<template>
  <LoadingPage v-if="loading" />
  <ContainerTable v-else>
    <EditEmpresa v-if="$store.state.openModal" :findEmpresa="findEmpresa" />
    <PreviewEmpresa
      v-if="$store.state.openModalPreviewEmpresa"
      :findPreviewEmpresa="findPreviewEmpresa"
    />
    <div class="headerTable">
      <span>Unidades Cadastradas</span>
      <InputSearch v-model="textSearch" />
    </div>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Unidade</th>
          <th>Endereço</th>
          <th>Opções</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(empresa, index) in filterItems" :key="empresa.id">
          <td>{{ index + 1 }}</td>
          <td>{{ empresa.corporate_name }}</td>
          <td>{{ empresa.address }}-{{ empresa.district }}, {{ empresa.cep }}</td>
          <td>
            <div class="iconsOptions">
              <button @click="previewEmpresa(empresa.id)">
                <img src="~/assets/icons/eye.svg" alt="eyeReceitas" />
              </button>
              <button @click="editEmpresa(empresa)">
                <img src="~/assets/icons/edit.svg" alt="editReceitas" />
              </button>
              <button @click="deleteEmpresa(empresa.id)">
                <img src="~/assets/icons/delete.svg" alt="deleteReceitas" />
              </button>
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
      findPreviewEmpresa: [],
      findEmpresa: [],
      loading: true,
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
    this.loading = false
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
      this.$store.commit('OPEN_MODAL_PREVIEW_EMPRESA', true)
      await httpEmpresa
        .GetFindEmpresa(id)
        .then((res) => {
          this.findPreviewEmpresa = res.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    editEmpresa(dataEmpresa) {
      this.findEmpresa = dataEmpresa
      this.$store.commit('OPEN_MODAL', true)
    },

    async deleteEmpresa(id) {
      await httpEmpresa
        .DeleteEmpresa(id)
        .then((res) => {
          if (res.status === 200) {
            this.$toast.success('Empresa deletada com sucesso!!!')
          }

          this.$nuxt.refresh()
        })
        .catch((error) => {
          console.log(error)
        })
    },
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

      img {
        width: 1.2rem;
      }
    }
  }
}
</style>
