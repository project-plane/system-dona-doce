<template>
  <ContainerModalEdit :closeModal="closeModal">
    <Title class="headerModal">
      <h1>Novo Ingrediente</h1>
      <img
        @click="$emit('closeModal', closeModal)"
        src="~/assets/icons/close.svg"
        alt="close"
      />
    </Title>
    <div class="input_edit">
      <div class="input">
        <Label>Nome</Label>
        <input
          type="text"
          placeholder="Digite o nome ingrediente"
          v-model="findIngrediente.description"
        />
      </div>
      <div class="input">
        <Label>Preco</Label>
        <input
          type="number"
          placeholder="Digite o preco ingrediente"
          v-model="findIngrediente.value"
        />
      </div>
    </div>
    <div class="btnEdit">
      <Button
        @click.native="$emit('closeModal', closeModal)"
        title="Cancelar"
      />

      <Button @click.native="updateIngrediente" title="Salvar" />
    </div>
  </ContainerModalEdit>
</template>

<script lang="ts">
import Vue from 'vue'

import httpIngrediente from '~/server/ingredientes'

export default Vue.extend({
  data() {
    return {
      nameIngrediente: '',
      priceIngrediente: '',
    }
  },
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
