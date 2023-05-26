<template>
  <Container>
    <Title>
      <h1>Estoque</h1>
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
    <Button title="Salvar" />
  </Container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      name_ingrediente: '',
      qtd_estoque: '',
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