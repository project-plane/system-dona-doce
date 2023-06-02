<!-- eslint-disable vue/no-mutating-props -->
<template>
  <ContainerModalEdit :close-modal="closeModal">
    <Title class="headerModal">
      <h1>Novo Ingrediente</h1>
      <img
        src="~/assets/icons/close.svg"
        alt="close"
        @click="$emit('closeModal', closeModal)"
      />
    </Title>
    <div class="input_edit">
      <div class="input">
        <Label>Nome</Label>
        <input
          v-model="findIngrediente.description"
          type="text"
          placeholder="Digite o nome ingrediente"
        />
      </div>
      <div class="input">
        <Label>Preço</Label>
        <input
          v-model="findIngrediente.value"
          type="number"
          placeholder="Digite o preço ingrediente"
        />
      </div>
    </div>
    <div class="btnEdit">
      <Button
        title="Cancelar"
        @click.native="$emit('closeModal', closeModal)"
      />

      <Button title="Salvar" @click.native="updateIngrediente" />
    </div>
  </ContainerModalEdit>
</template>

<script lang="ts">
import Vue from 'vue'

import httpIngrediente from '~/server/ingredientes'

export default Vue.extend({
  props: {
    closeModal: {
      type: Boolean,
      required: true,
    },
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
            this.$emit('closeModal', this.closeModal)
            this.$toast.success('Ingrediente atualizado com sucesso!!!')
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
