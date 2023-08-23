<template>
  <div class="cardDashboard">
    <div class="titleCard">
      <div class="titleCompany">
        <p>1</p>
        <div class="descriptionCompany">
          <span>Amazonia Refeicoes</span>
          <h2>Cometais</h2>
          <span>Programado</span>
        </div>
      </div>
      <div>
        <img src="~/assets/icons/programado.svg" alt="">
      </div>
    </div>
    <div class="dataOrder">
      <div class="descriptionOrder">
        <span>Total R$ 145,00</span>
        <span>Finalizar as</span>
        <span>09:30</span>
      </div>
      <ButtonPirula title="Exibir Pedidos" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({

})
</script>

<style scoped lang="scss">
.cardDashboard {
  width: 100%;
  border: 1px solid var(--border);
  background: var(--white);
  border-radius: 10px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: .5rem;

  .titleCard {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    border-bottom: 1px solid var(--border);

    .titleCompany {
      display: flex;
      gap: .7rem;

      .descriptionCompany {
        span:nth-child(3) {
          color: var(--blue);
        }
      }

      h2 {
        margin: -10px 0
      }
    }
  }

  .dataOrder {
    display: flex;
    gap: 3rem;
    align-items: flex-end;
    justify-content: space-between;

    .descriptionOrder {
      display: flex;
      flex-direction: column;

      span:nth-child(1) {
        color: grey;
      }

      span:nth-child(3) {
        font-weight: bold;
      }
    }
  }
}
</style>
