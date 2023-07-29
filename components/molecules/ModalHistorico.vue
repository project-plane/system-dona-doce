<template>
  <ModalPreview titleModal="Detalhes do pedido" @closeModal="closeModal">
    <div class="dataEmpresa">
      Em Andamento...
    </div>
  </ModalPreview>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    data: Object
  },
  methods: {
    closeModal() {
      this.$store.commit('OPEN_MODAL_HISTORICO', false)
    },
  },
})
</script>

<style scoped lang="scss">
.dataEmpresa {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  p {
    height: 45px;
    padding: 0.5rem 0;
    border-radius: 5px;
    display: flex;
    align-items: center;
  }
}
</style>
