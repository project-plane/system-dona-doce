<template>
  <div class="containerModal">
    <div class="modal-content">
      <div class="headerModal">
        <h2>Dados Cadastrais</h2>
        <span class="close" @click="closeModal">&times;</span>
      </div>
      <div class="dataModal">
        <section>
          <h4>Nome Empresa</h4>
          <p>{{ findPreviewEmpresa.corporate_name }}</p>
        </section>
        <section>
          <h4>CNPJ</h4>
          <p>{{ findPreviewEmpresa.cnpj }}</p>
        </section>
        <section>
          <h4>Endereço</h4>
          <p>{{ findPreviewEmpresa.address }}</p>
        </section>
        <section>
          <h4>CEP</h4>
          <p>{{ findPreviewEmpresa.cep }}</p>
        </section>
        <section>
          <h4>Bairro</h4>
          <p>{{ findPreviewEmpresa.district }}</p>
        </section>
       
      </div>
      <section class="data-update">
          <h4>Última Atualização: </h4>
          <p> {{ formatDate(findPreviewEmpresa.updateAt) }}</p>
        </section>
    </div>
  </div>
</template>

<script lang="ts">
import dayjs from '~/services/dayjs'
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
    formatDate(date) {
      return dayjs.formtDateBr(date)
    },
  },
})
</script>

<style scoped lang="scss">
.containerModal {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  right: 0;
  background-color: var(--bg_color_modal);
  display: table;
  transition: opacity 0.2s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
  z-index: 5;

  .modal-content {
    background: var(--bg_color);
    padding: 20px;
    border-radius: 5px;
    width: 80%;
    max-width: 600px;
    position: relative;
    min-height: 50%;
  }
  .headerModal{
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    h2{
      font-size: 1.35rem;
      color: var(--red);
      font-weight: 600;
    }
    .close {
      color: var(--red);
      position: absolute;
      top: 10px;
      right: 18px;
      cursor: pointer;
      font-size: 2rem;
  }
  }
  .dataModal {
    display: flex;
    flex-wrap: wrap;
    gap: 1.4rem;
  }
  .dataModal section {
    margin-bottom: 10px;
  }

  .dataModal h4 {
    margin: 0;
    font-size: 1.1em;
  }

  .dataModal p {
    margin: 0;
    font-size: 1em;
  }
  .data-update{
    display: flex;
    right: 28px;
    position: absolute;
    bottom: 28px;
  }
}
</style>
