<template>
  <Container>
    <Title title="Novo Ingrediente" />
    <ContainerInput>
      <Input v-model="nameIngrediente" label="Nome" type="text" placeholder="Digite o nome ingrediente" />
      <Input v-model="priceIngrediente" label="Preço" type="number" placeholder="Digite o preco ingrediente" />
      <div class="input">
        <span>Medida</span>
        <select v-model="selected">
          <option disabled value="">Selecionar Tipo de Medida</option>
          <option>Kg</option>
          <option>Litro</option>
          <option>Unidade</option>
        </select>
      </div>
    </ContainerInput>
    <div class="row-button">
      <Button title="Salvar" @functionClick="createIngrediente" />
    </div>

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
      selected: ''
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
        unidade: this.selected
      }

      await httpIngrediente
        .CreateIngredientes(ingrediente)
        .then((res) => {
          if (res.status === 201) {
            this.$toast.success('Ingrediente criado com sucesso!!!')
          }

        })
        .catch((error) => {
          this.$toast.error('Ingrediente já existente!!!')
        })
      this.nameIngrediente = ''
      this.priceIngrediente = ''
      this.selected = ''
      this.$nuxt.refresh()
    },
  },
})
</script>

<style scoped lang="scss">
.input {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;


  span {
    font-size: 1rem;
  }

  select {
    border: 0.06rem solid var(--border);
    border-radius: 0.25rem;
  }
}

.row-button {
  display: flex;
  justify-content: flex-end;
}
</style>
