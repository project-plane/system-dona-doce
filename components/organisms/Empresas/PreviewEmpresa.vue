<template>
  <ModalPreview titleModal="Dados da Empresa" @closeModal="closeModal">
    <div class="dataEmpresa">
      <div>
        <h4>Nome Empresa</h4>
        <p>{{ findEmpresa.corporate_name }}</p>
      </div>
      <div>
        <h4>CNPJ</h4>
        <p>{{ findEmpresa.cnpj }}</p>
      </div>
      <div>
        <h4>Endereço</h4>
        <p>{{ findEmpresa.address }}</p>
      </div>
      <div>
        <h4>CEP</h4>
        <p>{{ findEmpresa.cep }}</p>
      </div>
      <div>
        <h4>E-mail</h4>
        <p>{{ findEmpresa.email }}</p>
      </div>
      <div>
        <h4>Fone</h4>
        <p>{{ findEmpresa.fone }}</p>
      </div>
    </div>
  </ModalPreview>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    findEmpresa: {
      type: [Array, Object],
      required: true,
    },
  },
  methods: {
    closeModal() {
      this.$store.commit('OPEN_MODAL_PREVIEW_EMPRESA', false)
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
    background: rgb(235, 235, 235);
    padding: 0.5rem;
    border-radius: 5px;
    display: flex;
    align-items: center;
  }
}
</style>
