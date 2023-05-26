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
          v-model="name_ingrediente"
        />
      </div>
      <div class="input">
        <Label>Preco</Label>
        <input
          type="number"
          placeholder="Digite o preco ingrediente"
          v-model="price_ingrediente"
        />
      </div>
    </div>
    <Button title="Salvar" />
  </Container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      name_ingrediente: '',
      price_ingrediente: '',
    }
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