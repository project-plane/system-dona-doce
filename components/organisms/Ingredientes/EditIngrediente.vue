<!-- eslint-disable vue/no-mutating-props -->
<template>
  <ModalEdit
    v-if="$store.state.openModal"
    title-modal="Editar Ingrediente"
    @save="updateIngrediente"
  >
    <div class="input_edit">
      <Input
        v-model="findIngrediente.description"
        label="Nome"
        type="text"
        placeholder="Digite o nome ingrediente"
      />
      <Input
        v-model="findIngrediente.value"
        label="Preço"
        type="number"
        placeholder="Digite o preco ingrediente"
      />
    </div>
  </ModalEdit>
</template>

<script lang="ts">
import Vue from 'vue'

import httpIngrediente from '~/server/ingredientes'

export default Vue.extend({
  props: {
    findIngrediente: {
      type: [Array, Object],
      required: true,
    },
  },
  data() {
    return {
      nameIngrediente: '',
      priceIngrediente: '',
    }
  },
  methods: {
    async updateIngrediente() {
      const idIngrediente = this.findIngrediente.id

      const dataIngrediente = {
        description: this.findIngrediente.description,
        value: Number(this.findIngrediente.value),
      }

      await httpIngrediente
        .UpdateIngredientes(idIngrediente, dataIngrediente)
        .then((res) => {
          if (res.status === 200) {
            this.$toast.success('Ingrediente atualizado com sucesso!!!')
            this.$store.commit('OPEN_MODAL', false)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
})
</script>

<style scoped lang="scss">
.headerModal {
  width: 100%;
  display: flex;
  justify-content: space-between;
  img {
    cursor: pointer;
  }
}
.input_edit {
  width: 100%;
  display: flex;
  gap: 1.5rem;
  .input {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }
}
.btnEdit {
  width: 100%;
  display: flex;
  gap: 4rem;
}
</style>
