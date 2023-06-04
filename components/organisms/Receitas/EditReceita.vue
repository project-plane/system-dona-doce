<template>
  <ModalEdit
    v-if="this.$store.state.openModal"
    titleModal="Editar Receita"
    @save="updateReceita"
  >
    <div class="input_create">
      <div class="input">
        <Label>Ingrediente</Label>
        <input type="text" placeholder="Digite o nome ingrediente" />
      </div>
      <div class="input">
        <Label>Acrescentar</Label>
        <input type="number" placeholder="Digite a quantidade acrescentar" />
      </div>
    </div>
  </ModalEdit>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {}
  },
  methods: {
    updateReceita() {
      this.$store.commit('OPEN_MODAL', false)
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