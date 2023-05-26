<template>
  <ContainerModalEdit :closeModal="closeModal">
    <Title class="headerModal">
      <h1>Editar Estoque</h1>
      <img
        @click="$emit('closeModal', closeModal)"
        src="~/assets/icons/close.svg"
        alt="close"
      />
    </Title>
    <div class="input_create">
      <div class="input">
        <Label>Ingrediente</Label>
        <input
          type="text"
          placeholder="Digite o nome ingrediente"
          v-model="name_ingrediente"
        />
      </div>
      <div class="input">
        <Label>Acrescentar</Label>
        <input
          type="number"
          placeholder="Digite a quantidade acrescentar"
          v-model="qtd_estoque"
        />
      </div>
    </div>
    <Button title="Cancelar" />

    <Button title="Salvar" />
  </ContainerModalEdit>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      name_ingrediente: 'Trigo',
      qtd_estoque: '20kg',
    }
  },
  props: {
    closeModal: {
      type: Boolean,
      required: true,
    },
    titleModal: {
      type: String,
      required: true,
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
.input_create {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  .input_column {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .input {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }
}
</style>