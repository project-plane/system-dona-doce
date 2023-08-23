<template>
  <div class="detailsBuy">
    <div class="description">
      <div class="headerDetails">
        <span>Compras</span>
        <span>Total R$: 00.00</span>
      </div>
      <ul>
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
    <div class="btnExibir">
      <button>Exibir tudo</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>

<style scoped lang="scss">
.detailsBuy {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .description {
    padding: 2rem 2rem 0 2rem;
    .headerDetails {
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        color: var(--red);
      }
      span:nth-child(1) {
        font-size: 1.3rem;
        font-weight: bold;
      }
    }
    ul {
      height: 300px;
      overflow: scroll;
      .qtdIngredients {
        display: flex;
        justify-content: space-between;
        padding: 0.2rem 1rem;
      }
    }
  }
  button {
    width: 100%;
    background: var(--border);
    padding: 0.5rem;
    font-size: 1rem;
  }
}
</style>
