<template>
  <div class="dashboardPage">
    <div class="historicOrders">
      <CalendarHeader />
      <ListDashboard />
    </div>
    <div class="informationOrders">
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

  .historicOrders {
    width: 65%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .informationOrders {
    width: 35%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-left: 1px solid var(--border);
  }
}
</style>
