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
  display: flex;
  gap: 2rem;
  .historicOrders {
    width: 80%;
  }

  .informationOrders {
    width: 40%;
    border-left: 1px solid var(--border);
  }
}
</style>
