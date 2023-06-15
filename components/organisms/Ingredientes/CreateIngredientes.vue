<template>
  <Container>
    <Title>
      <h1>Novo Ingrediente</h1>
    </Title>
    <div class="input_create">
      <Input
        v-model="nameIngrediente"
        label="Nome"
        type="text"
        placeholder="Digite o nome ingrediente"
      />
      <Input
        v-model="priceIngrediente"
        label="Preço"
        type="number"
        placeholder="Digite o preco ingrediente"
      />
    </div>
    <Button title="Salvar" @functionClick="createIngrediente" />
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
      if (!this.nameIngrediente || !this.priceIngrediente) {
        this.$toast.error('Preencha todos os campos!!!')
      }
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
