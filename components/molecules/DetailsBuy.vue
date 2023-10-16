<template>
  <div class="detailsBuy" v-if="this.$store.state.selectedStatus === 'Pré-Produção'">
    <div class="description">
      <div class="headerDetails">
        <h2>Compras</h2>
        <span>Total R$: 00.00</span>
      </div>
      <ul :class="{ space: spaceUl }">
        <li>
          <div class="qtdIngredients">
            <span>50kg de Farinha de trigo</span>
            <span>R$: 00.00</span>
          </div>
        </li>
        <li>
          <div class="qtdIngredients">
            <span>50kg de Farinha de trigo</span>
            <span>R$: 00.00</span>
          </div>
        </li>
        <li>
          <div class="qtdIngredients">
            <span>50kg de Farinha de trigo</span>
            <span>R$: 00.00</span>
          </div>
        </li>
        <li>
          <div class="qtdIngredients">
            <span>50kg de Farinha de trigo</span>
            <span>R$: 00.00</span>
          </div>
        </li>
        <li>
          <div class="qtdIngredients">
            <span>50kg de Farinha de trigo</span>
            <span>R$: 00.00</span>
          </div>
        </li>

        <li>
          <div class="qtdIngredients">
            <span>50kg de Farinha de trigo</span>
            <span>R$: 00.00</span>
          </div>
        </li>

        <li>
          <div class="qtdIngredients">
            <span>50kg de Farinha de trigo</span>
            <span>R$: 00.00</span>
          </div>
        </li>

        <li>
          <div class="qtdIngredients">
            <span>50kg de Farinha de trigo</span>
            <span>R$: 00.00</span>
          </div>
        </li>

        <li>
          <div class="qtdIngredients">
            <span>50kg de Farinha de trigo</span>
            <span>R$: 00.00</span>
          </div>
        </li>

        <li>
          <div class="qtdIngredients">
            <span>50kg de Farinha de trigo</span>
            <span>R$: 00.00</span>
          </div>
        </li>

        <li>
          <div class="qtdIngredients">
            <span>50kg de Farinha de trigo</span>
            <span>R$: 00.00</span>
          </div>
        </li>

        <li>
          <div class="qtdIngredients">
            <span>50kg de Farinha de trigo</span>
            <span>R$: 00.00</span>
          </div>
        </li>

        <li>
          <div class="qtdIngredients">
            <span>50kg de Farinha de trigo</span>
            <span>R$: 00.00</span>
          </div>
        </li>

        <li>
          <div class="qtdIngredients">
            <span>50kg de Farinha de trigo</span>
            <span>R$: 00.00</span>
          </div>
        </li>

        <li>
          <div class="qtdIngredients">
            <span>50kg de Farinha de trigo</span>
            <span>R$: 00.00</span>
          </div>
        </li>

        <li>
          <div class="qtdIngredients">
            <span>50kg de Farinha de trigo</span>
            <span>R$: 00.00</span>
          </div>
        </li>
      </ul>
    </div>
    <button class="btnExibir" @click="exibirTudo">Gerar PDF de Compras</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      spaceUl: false
    }
  },
  methods: {
    exibirTudo() {
      this.spaceUl = !this.spaceUl
    }
  },
})
</script>

<style scoped lang="scss">
.detailsBuy {
  height: 40%;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 2rem;
  border-bottom: 1px solid var(--border);

  .description {
    height: 100%;
    .headerDetails {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 1rem 0 1rem;

      span {
        color: var(--red);
      }

      span:nth-child(1) {
        font-size: 1.3rem;
        font-weight: bold;
      }
    }

    .space {
      height: 100%;
    }

    ul {
      height: 100%;
      overflow-y: auto;

      .qtdIngredients {
        display: flex;
        justify-content: space-between;
        padding: 0.2rem 1rem;
      }
    }
  }

  .btnExibir {
    width: 100%;
    background: var(--red);
    color: var(--white);
    font-weight: 600;
    padding: 0.5rem;
    font-size: 1rem;
    position: relative;
    bottom: 0;
  }
}
</style>
