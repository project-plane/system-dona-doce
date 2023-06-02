<template>
  <Container>
    <Title>
      <h1>Novo Ingrediente</h1>
    </Title>
    <div class="input_create">
      <div class="input">
        <Label>Nome</Label>
        <input
          v-model="nameIngrediente"
          type="text"
          placeholder="Digite o nome ingrediente"
        />
      </div>
      <div class="input">
        <Label>Preço</Label>
        <input
          v-model="priceIngrediente"
          type="number"
          placeholder="Digite o preço ingrediente"
        />
      </div>
    </div>
    <Button title="Salvar" @click.native="createIngrediente" />
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
          if (res.status === 201) {
            this.$toast.success('Ingrediente criado com sucesso!!!')
          }
          this.nameIngrediente = ''
          this.priceIngrediente = ''
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
