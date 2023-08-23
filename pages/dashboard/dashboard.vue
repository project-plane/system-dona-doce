<template>
  <div class="dashboardPage">
    <CalendarHeader />

    <ListDashboard />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  layout: 'dashboard',
})
</script>

<style scoped lang="scss">
.dashboardPage {
  width: 100%;
  padding: 2rem;

  .dashboard {
    display: flex;
    gap: 0.4rem;
    flex-wrap: wrap;
  }
}
</style>
