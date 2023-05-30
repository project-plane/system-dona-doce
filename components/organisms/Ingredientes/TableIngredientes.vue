<template>
  <ContainerTable>
    <ModalEditIngrediente
      v-if="openModal"
      :closeModal="openModal"
      @closeModal="closeModal"
      :findIngrediente="findIngrediente"
    />
    <h2>Lista de Ingredientes</h2>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Preço Unitário</th>
          <th>Opções</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(ingrediente, index) in listIngredientes"
          :key="ingrediente.id"
        >
          <td>{{ index + 1 }}</td>
          <td>{{ ingrediente.description }}</td>
          <td>R$ {{ ingrediente.value }}</td>
          <td>
            <div class="iconsOptions">
              <button>
                <img
                  src="~/assets/icons/edit.svg"
                  alt=""
                  @click="modalEditIngrediente(ingrediente)"
                />
              </button>
              <button @click="deleteIngrediente(ingrediente.id)">
                <img src="~/assets/icons/delete.svg" alt="" />
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

import httpListIngredientes from '~/server/ingredientes'

export default Vue.extend({
  data() {
    return {
      listIngredientes: [],
      findIngrediente: [],
      openModal: false,
    }
  },

  async fetch() {
    await httpListIngredientes
      .ListIngredientes()
      .then((res) => {
        this.listIngredientes = res.data
      })
      .catch((error) => {
        if (error.response.status === 500) {
          this.$toast.error('Servidor fora do ar')
        }
      })
  },

  methods: {
    async deleteIngrediente(id) {
      await httpListIngredientes
        .DeleteIngredientes(id)
        .then((res) => {
          if (res.status === 200) {
            this.$toast.success('Ingrediente deletada com sucesso!!!')
          }
        })
        .catch((error) => {
          if (error.response.status === 500) {
            this.$toast.error(
              'Ingrediente não pode ser deletado, já vinculado a uma receita'
            )
            return
          }
        })
      this.$nuxt.refresh()
    },

    modalEditIngrediente(dataIngrediente) {
      this.openModal = true
      this.findIngrediente = dataIngrediente
    },

    closeModal() {
      this.openModal = false
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
