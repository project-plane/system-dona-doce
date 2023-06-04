<template>
  <ContainerTable>
    <EditReceita />
    <h2>Lista de Receitas</h2>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Imagem</th>
          <th>Nome</th>
          <th>Preço Unitário</th>
          <th>Opções</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(receita, index) in listReceitas" :key="receita.id">
          <td>{{ index + 1 }}</td>
          <td class="img"><img src="~/assets/img/coxinha.png" alt="" /></td>
          <td>{{ receita.description }}</td>
          <td>R$ {{ receita.value }}</td>
          <td>
            <div class="iconsOptions">
              <button>
                <img src="~/assets/icons/eye.svg" alt="eyeReceitas" />
              </button>
              <button @click="editReceita">
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
</template>

<script lang="ts">
import Vue from 'vue'

import httpReceitas from '~/server/receitas'

export default Vue.extend({
  data() {
    return {
      listReceitas: [],
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
  },

  methods: {
    editReceita() {
      this.$store.commit('OPEN_MODAL', true)
    },
    async deleteReceita(id) {
      await httpReceitas
        .DeleteReceita(id)
        .then((res) => {
          console.log(res)
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
})
</script>

<style scoped lang="scss">
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