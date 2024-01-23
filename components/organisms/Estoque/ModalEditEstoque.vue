<template>
  <div class="container">
    <div class="modal">
      <header class="headerModal">
        <h4>Editar valores</h4>
        <a @click="closeModal">
          <img src="../../../assets/icons/close.svg" alt="" srcset="" />
        </a>
      </header>

      <main>
        <!-- <pre>{{ $store.state.estoqueDataModal }}</pre> -->

        <label for="" class="containerLabel" style="width: 50%">
          <strong>Ingrediente</strong>
          <input type="text" class="inputForm"  v-model="dataEstoque.description" />
        </label>
        <label for="" class="containerLabel" style="width: 40%">
          <strong>Quantidade</strong>
          <input
            type="text"
            class="inputForm"

            v-model="dataEstoque.amount_actual"
          />
        </label>
        <label for="" class="containerLabel" style="width: 37%">
          <strong>Valor / U.M</strong>
          <input
            type="text"
            class="inputForm"

            v-model="dataEstoque.value_per_serving"
          />
        </label>
        <pre>{{ dataEstoque }}</pre>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      dataVuex: this.$store.state.estoqueDataModal,
      dataEstoque: {
        id: "",
        description: this.$store.state.estoqueDataModal.description,
        unit_of_measurement: "",
        updated_t: null,
        value: "",
        amount_actual: 0,
        value_per_serving: 0
      },
    }
  },

  methods: {
    closeModal() {
      this.$emit('closeModal', false)
    
    },
  },
})
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  z-index: 100;
  position: absolute;
  height: 100vh;
  display: flex;
  background: rgba(36, 55, 67, 0.72);
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(10.5px);
  font-family: var(--fontMontserrat);
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-top: -3.8rem;
  .modal {
    border-radius: 6px;
    background: var(--bgMain, #fdfdfb);
    min-height: 313px;
    min-width: 360px;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    padding: 1.4rem;
    .headerModal {
      display: flex;
      justify-content: space-between;

      a {
        background: transparent;
        width: 2%;
        cursor: pointer;
      }
    }
    main{
      display: flex;
      flex-wrap: wrap;
      gap: 15px;
      padding-top: 1.4rem;

    }
    input {
      box-shadow: 2px 2px 1px #a379798a;
    }
    .containerLabel {
      display: flex;
      flex-direction: column;

      .inputForm {
        border: solid 1px rgb(99, 99, 99);
        height: 2.4rem;
        width: auto;
      }
    }
  }
}
@include screen('tablet') {
  .modal {
    border-radius: 6px;
    background: var(--bgMain, #fdfdfb);
    min-height: 320px !important;
    min-width: 240px !important;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
  }
}
</style>
