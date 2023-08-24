<template>
  <div class="dashboardPage">
    <div class="historicOrders">
      <CalendarHeader />
      <ListDashboard />
    </div>
    <div class="informationOrders">
      <DetailsBuy />
      <InformationFinance />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>

<style scoped lang="scss">
.dashboardPage {
  width: 100%;
  height: 100vh;
  display: flex;
  gap: 2rem;

  .historicOrders {
    width: 70%;
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
