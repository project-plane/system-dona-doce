<template>
  <div class="containerReceita">
    <BeadFrame>
      <div class="bodyModal">
        <div class="container">
          <div class="header">
            <div class="headerReceita">
              <img
                :src="
                  `https://api.donadoce.gedroid.com/img_revenue/` +
                  listFindReceita.imagem
                "
                alt=""
              />
              <div class="textReceita">
                <Title :title="listFindReceita.description" />
              </div>
            </div>
            <div @click="closeModal">
              <img class="btnClose" src="~/assets/icons/close.svg" alt="" />
            </div>
          </div>
          <div
            class="body"
            v-for="receita in listFindReceita.ingredients_Revenues"
            :key="receita.id"
          >
            <div class="input">
              <h3>Ingrediente</h3>
              <p>{{ receita.ingredients.description }}</p>
            </div>
            <div class="input">
              <h3>Quantidade</h3>
              <p>{{ receita.amount_ingredient }}</p>
            </div>
            <div class="input">
              <h3>Valor Unitário</h3>
              <p>R$ {{ receita.ingredients.value.toFixed(2) }}</p>
            </div>
            <div class="input">
              <h3>Total</h3>
              <p>
                R$
                {{
                  (
                    receita.amount_ingredient * receita.ingredients.value
                  ).toFixed(2)
                }}
              </p>
            </div>
          </div>
          <!-- <div class="valorTotal">
            <h3>Valor Total</h3>
            <h3>R$ {{ listFindReceita.value }}</h3>
          </div> -->
        </div>
      </div>
    </BeadFrame>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {}
  },
  props: {
    listFindReceita: {
      type: [Array, Object],
      required: true,
    },
  },

  methods: {
    closeModal() {
      this.$store.commit('OPEN_MODAL_PREVIEW_RECEITA', false)
    },
  },
})
</script>

<style scoped lang="scss">
.containerReceita {
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
  z-index: 1;
  .bodyModal {
    background: var(--white);
    min-height: 50%;
    .container {
      width: 100%;
      height: 90vh;
      padding: 2.5rem 2rem;
      display: flex;
      flex-direction: column;
      gap: 2rem;
      overflow-y: auto;
      .header {
        width: 100%;
        height: 40%;
        display: flex;
        justify-content: space-between;
        .headerReceita {
          width: 100%;
          display: flex;
          gap: 1rem;
          img {
            width: 30%;
          }
        }
        .btnClose {
          cursor: pointer;
        }
      }
      .body {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        justify-items: center;
        border-bottom: 2px dashed var(--bg_opacity);
        padding-bottom: 1rem;
        gap: 1rem;
      }
    }
  }
  .valorTotal {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    gap: 2rem;
    right: 50px;
  }
}
</style>
