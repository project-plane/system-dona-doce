<template>
  <div>
    <Loading v-if="loading2" />
    <LoadingPage v-if="loading" />
    <ContainerTable v-else>
      <ModalEditReceita
        v-if="$store.state.openModal"
        :dataReceita="dataReceita"
      />
      <PreviewReceita
        v-if="$store.state.openModalPreviewReceita"
        :listFindReceita="listFindReceita"
      />
      <div class="headerTable">
        <span>Lista de Receitas</span>
        <InputSearch v-model="textSearch" />
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Imagem</th>
            <th>Receita</th>
            <th>Tipo Pedido</th>
            <th>Valor Total</th>
            <th>Opções</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(receita, index) in filterItems" :key="receita.id">
            <td>{{ index + 1 }}</td>
            <td class="img">
              <img
                :src="`https://api.donadoce.gedroid.com/img_revenue/${receita.imagem}`"
                alt=""
              />
            </td>
            <td>{{ receita.description }}</td>
            <td v-if="receita.status === 0">Coffee</td>
            <td v-else>Programado</td>
            <td>R$ {{ receita.value.toFixed(2) }}</td>
            <td>
              <div class="iconsOptions">
                <button @click="previewReceita(receita.id)">
                  <img src="~/assets/icons/eye.svg" alt="eyeReceitas" />
                </button>
                <button @click="editReceita(receita.id)">
                  <img src="~/assets/icons/edit.svg" alt="editReceitas" />
                </button>
                <button @click="deleteReceita(receita.id)">
                  <img src="~/assets/icons/delete.svg" alt="deleteReceitas" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </ContainerTable>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import httpReceitas from '~/server/receitas'

export default Vue.extend({
  data() {
    return {
      listReceitas: [],
      textSearch: '',
      dataReceita: [],
      listFindReceita: [],
      loading: false,
      loading2: false,
    }
  },
  async fetch() {
    await httpReceitas
      .GetReceitas()
      .then((res) => {
        this.listReceitas = res.data
      })
      .catch((error) => {
        console.log(error)
      })
    this.loading = false
  },

  computed: {
    filterItems() {
      let itemSearch = []
      itemSearch = this.listReceitas.filter((item) => {
        return (
          item.description
            .toLowerCase()
            .indexOf(this.textSearch.toLowerCase()) > -1
        )
      })
      return itemSearch
    },
  },

  methods: {
    async previewReceita(idReceita) {
      ;(this.loading2 = true),
        this.$store.commit('OPEN_MODAL_PREVIEW_RECEITA', true)
      await httpReceitas
        .GetFindReceita(idReceita)
        .then((res) => {
          console.log(res)

          this.listFindReceita = res.data
        })
        .catch((error) => {
          console.log(error)
        })
      this.loading2 = false
    },
    editReceita(dataReceita) {
      // alert('oi')
      this.dataReceita = dataReceita
      this.$store.commit('OPEN_MODAL', true)
    },
    async deleteReceita(id) {
      await httpReceitas
        .DeleteReceita(id)
        .then((res) => {
          this.$toast.success('Receita deletada com sucesso')
        })
        .catch((error) => {
          console.log(error)
        })
      this.$nuxt.refresh()
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
