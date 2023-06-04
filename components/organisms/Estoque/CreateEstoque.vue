<template>
  <Container>
    <Title>
      <h1>Estoque</h1>
    </Title>
    <div class="input_create">
      <Input
        label="Ingrediente"
        type="text"
        placeholder="Digite o nome ingrediente"
        v-model="nameIngrediente"
      />
      <Input
        label="Acrescentar"
        type="number"
        placeholder="Digite a quantidade acrescentar"
        v-model="qtdEstoque"
      />
    </div>
    <Button title="Salvar" @click.native="saveEstoque" />
  </Container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      nameIngrediente: '',
      qtdEstoque: '',
    }
  },
  methods: {
    saveEstoque() {
      const dataEstoque = {
        name: this.nameIngrediente,
        qtd: this.qtdEstoque,
      }

      this.nameIngrediente = ''
      this.qtdEstoque = ''
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