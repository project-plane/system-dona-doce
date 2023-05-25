<template>
  <div class="negativeSpace">
    <Title>
      <h1>Receitas</h1>
    </Title>
    <div class="receitas">
      <div class="img"></div>
      <div class="create_receita">
        <div class="input_receita">
          <label for="">Nome Receita</label>
          <input
            type="text"
            v-model="receita"
            placeholder="Digite nova receita"
          />
        </div>
        <button @click="createReceita">Criar</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      receita: '',
    }
  },
  methods: {
    createReceita() {
      alert(this.receita)
    },
  },
})
</script>

<style scoped lang="scss">
.receitas {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-gap: 1rem;
  gap: 1rem;
  align-items: start;
  .img {
    width: 200px;
    height: 200px;
    background: var(--white);
  }
  .create_receita {
    width: 100%;
    display: flex;
    align-items: flex-end;
    .input_receita {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      input {
        width: 100%;
      }
    }
    button {
      background: var(--txt_color);
      color: var(--white);
      width: 40%;
      height: 35px;
      font-weight: bold;
      font-size: 1.2rem;
    }
  }
}
</style>
