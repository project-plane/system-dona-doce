<template>
  <Container>
    <Title>
      <h1>Novo Ingrediente</h1>
    </Title>
    <div class="input_create">
      <div class="input">
        <Label>Nome</Label>
        <input
          type="text"
          placeholder="Digite o nome ingrediente"
          v-model="nameIngrediente"
        />
      </div>
      <div class="input">
        <Label>Preco</Label>
        <input
          type="number"
          placeholder="Digite o preco ingrediente"
          v-model="priceIngrediente"
        />
      </div>
    </div>
    <Button @click.native="createIngrediente" title="Salvar" />
  </Container>
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
  methods: {
    async createIngrediente() {
      const ingrediente = {
        description: this.nameIngrediente,
        value: Number(this.priceIngrediente),
      }

      await httpIngrediente
        .CreateIngredientes(ingrediente)
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