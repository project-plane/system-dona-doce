<template>
  <div class="headerBashboard">
    <div class="descriptionData">
      <div>
        <h2>Agenda</h2>
        <div class="btnData">
          <button>Hoje</button>
          <button>Calendario</button>
        </div>
      </div>
      <div>
        <div>
          <span>Sexta-feira</span>
          <span>12.04</span>
          <span>Abril</span>
        </div>
        <div>
          <img src="~/assets/icons/arrowDown.svg" alt="" />
          <span>08:26</span>
        </div>
      </div>
    </div>
    <div>
      <div>
        <div>
          <span>Valor total a receber</span>
          <span>R$: 7.854,00</span>
        </div>
        <div>
          <span>Compras</span>
          <span>R$: 2.000,00</span>
        </div>
      </div>
      <div>
        <div>
          <span>Lucro</span>
          <span>R$: 5.854,00</span>
        </div>
        <img src="~/assets/icons/eye.svg" alt="" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>

<style scoped lang="scss">
.headerBashboard {
  display: flex;
  justify-content: space-between;
  .descriptionData {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .btnData {
      width: 100%;
      button:nth-child(1) {
        background: var(--red);
      }
      button:nth-child(2) {
        background: transparent;
        border: 1px solid var(--border);
        border-radius: 5px;
      }
    }
  }
}
</style>
