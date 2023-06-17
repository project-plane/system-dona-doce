<template>
  <ModalPreview titleModal="Dados da Empresa" @closeModal="closeModal">
    <div class="dataEmpresa">
      <div>
        <h4>Nome Empresa</h4>
        <p>{{ findPreviewEmpresa.corporate_name }}</p>
      </div>
      <div>
        <h4>CNPJ</h4>
        <p>{{ findPreviewEmpresa.cnpj }}</p>
      </div>
      <div>
        <h4>Endereço</h4>
        <p>{{ findPreviewEmpresa.address }}</p>
      </div>
      <div>
        <h4>CEP</h4>
        <p>{{ findPreviewEmpresa.cep }}</p>
      </div>
      <div>
        <h4>E-mail</h4>
        <p>{{ findPreviewEmpresa.email }}</p>
      </div>
      <div>
        <h4>Fone</h4>
        <p>{{ findPreviewEmpresa.fone }}</p>
      </div>
    </div>
  </ModalPreview>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    findPreviewEmpresa: {
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
    padding: 0.5rem 0;
    border-radius: 5px;
    display: flex;
    align-items: center;
  }
}
</style>
