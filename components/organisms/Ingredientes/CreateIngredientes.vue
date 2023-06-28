<template>
  <Container>
    <Loading v-if="loading" />
    <Title>
      <h1>Novo Ingrediente</h1>
    </Title>
    <ContainerInput>
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
    </ContainerInput>
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
      loading: false,
    }
  },
  methods: {
    async createIngrediente() {
      this.loading = true
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
          this.loading = false
        })
        .catch((error) => {
          this.$toast.error('Ingrediente já existente!!!')
          this.loading = false
        })
      this.nameIngrediente = ''
      this.priceIngrediente = ''
      this.$nuxt.refresh()
    },
  },
})
</script>

<style scoped lang="scss">
</style>
