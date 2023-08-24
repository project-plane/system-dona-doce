<template>
  <div class="detailsBuy">
    <div class="description">
      <div class="headerDetails">
        <h3>Compras</h3>
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
  

      </ul>
    </div>
    <button class="btnExibir">Exibir tudo</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>

<style scoped lang="scss">
.detailsBuy {
  height: 50%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;


  .description {
    height: 100%;
    overflow-y: auto;

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
    ul {
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
    background: var(--border);
    padding: 0.5rem;
    font-size: 1rem;
  }
}
</style>
