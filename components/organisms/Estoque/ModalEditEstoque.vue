<template>
  <div class="container">
    <div class="modal">
      <header class="headerModal">
        <h3>Editar valores</h3>
        <a @click="closeModal">
          <img src="../../../assets/icons/close.svg" alt="" srcset="" />
        </a>
      </header>

      <main>
        <!-- <pre>{{ $store.state.estoqueDataModal }}</pre> -->

        <label for="" class="containerLabel" style="width: 50%">
          <strong>Ingrediente</strong>
          <input
            type="text"
            class="inputForm"
            disabled
            v-model="dataEstoque.description"
            style="background: rgb(205 185 185 / 57%)"
          />
        </label>
        <label for="" class="containerLabel" style="width: 40%">
          <strong>Quantidade</strong>
          <input
            type="text"
            class="inputForm"
            v-model="dataEstoque.amount_actual"
          />
        </label>
        <label for="" class="containerLabel" style="width: 50%">
          <strong>Valor / U.M</strong>
          <input
            type="text"
            class="inputForm"
            disabled
            :value="dataEstoque.value_per_serving + dataEstoque.unit_of_measurement"
            style="background: rgb(205 185 185 / 57%)"
          />
        </label>
        <label for="" class="containerLabel" style="width: 40%">
          <strong>Base Calculada	</strong>
          <input
            type="text"
            class="inputForm"
            disabled
            :value="dataEstoque.amount + dataEstoque.unit_of_measurement + ' / R$ '   + dataEstoque.value"
            style="background: rgb(205 185 185 / 57%)"
          />
        </label>
        <section style="display: flex; justify-content: flex-end; width: 93%;">
          <Button @click.native="updateEstoque" title="Salvar"/>
        </section>
      </main>
      
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import httpEstoque from '~/server/estoque'

export default Vue.extend({
  data() {
    return {
      dataVuex: this.$store.state.estoqueDataModal,
      dataEstoque: {
        description: this.$store.state.estoqueDataModal.description,
        unit_of_measurement:
          this.$store.state.estoqueDataModal.unit_of_measurement,
        value_per_serving: this.$store.state.estoqueDataModal.value_per_serving,
        amount: this.$store.state.estoqueDataModal.amount,
        value: this.$store.state.estoqueDataModal.value,
        amount_actual: this.$store.state.estoqueDataModal.amount_actual,
      },
    }
  },

  methods: {
    closeModal() {
      this.$emit('closeModal', false)
    },
    async updateEstoque() {
      const Estoque = {
        description: this.$store.state.estoqueDataModal.description,
        unit_of_measurement:
          this.$store.state.estoqueDataModal.unit_of_measurement,
        value_per_serving: this.$store.state.estoqueDataModal.value_per_serving,
        amount: this.$store.state.estoqueDataModal.amount,
        value: this.$store.state.estoqueDataModal.value,
        amount_actual: Number(this.dataEstoque.amount_actual),
      }

      const id = this.dataVuex.id
      console.log(id, Estoque)
      try {
        await httpEstoque.updateEstoque(id, Estoque).then((response) => {
          this.$toast.info('Itens Atualizados!')
          this.$emit('closeModal')
          this.$nuxt.refresh()
        })
      } catch (error) {
        const message = error.response.data.message
        this.$toast.warning('Error,' + message)
      }
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
    background: var(--bg_color);
    min-height: 313px;
    width: 36%;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    padding: 1rem;
    gap: 0.5rem;
    .headerModal {
      display: flex;
      justify-content: space-between;

      a {
        background: transparent;
        width: 5%;
        cursor: pointer;
      }
    }
    main {
      display: flex;
      flex-wrap: wrap;
      gap: 15px;
      padding-top: 1.4rem;
    }
    input {
      box-shadow: 2px 2px 1px #dfd2d28a;
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
