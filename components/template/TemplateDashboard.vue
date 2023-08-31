<template>
  <div class="dashboardPage">
    <div class="historicOrders">
      <CalendarHeader />
      <ListDashboard :dataPedidos="dataPedidos" />
    </div>
    <div class="informationOrders">
      <DetailsBuy />
      <InformationFinance />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      dataPedidos: [
        {
          empresa: 'Amazonia Refeicoes',
          cliente: 'Cometais',
          status: 1,
          total: 145
        },
        {
          empresa: 'AMAZÔNIA REFEIÇÕES',
          cliente: 'UNICOBA',
          status: 0,
          total: 2458
        },
        {
          empresa: 'SODEXO',
          cliente: 'COMPONEL',
          status: 0,
          total: 21548
        },
        {
          empresa: 'VV REFEIÇÕES',
          cliente: 'HALLEY DAVISON',
          status: 1,
          total: 260
        },
        {
          empresa: 'Amazonia Refeicoes',
          cliente: 'Cometais',
          status: 1,
          total: 145
        },
        {
          empresa: 'AMAZÔNIA REFEIÇÕES',
          cliente: 'UNICOBA',
          status: 0,
          total: 2458
        },
        {
          empresa: 'SODEXO',
          cliente: 'COMPONEL',
          status: 0,
          total: 21548
        },
        {
          empresa: 'VV REFEIÇÕES',
          cliente: 'HALLEY DAVISON',
          status: 1,
          total: 260
        },
        {
          empresa: 'Amazonia Refeicoes',
          cliente: 'Cometais',
          status: 1,
          total: 145
        },
        {
          empresa: 'AMAZÔNIA REFEIÇÕES',
          cliente: 'UNICOBA',
          status: 0,
          total: 2458
        },
        {
          empresa: 'SODEXO',
          cliente: 'COMPONEL',
          status: 0,
          total: 21548
        },
        {
          empresa: 'VV REFEIÇÕES',
          cliente: 'HALLEY DAVISON',
          status: 1,
          total: 260
        }
      ]
    }
  },
})
</script>

<style scoped lang="scss">
.dashboardPage {
  width: 100%;
  height: 100vh;
  display: flex;
  gap: 2rem;

  .historicOrders {
    width: 70%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .informationOrders {
    width: 30%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-left: 1px solid var(--border);
  }
}
</style>
