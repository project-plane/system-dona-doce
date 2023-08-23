<template>
  <div class="dashboardPage">
    <HeaderDashboard />

    <div class="dashboard">
      <CardDashboard />
      <CardDashboard />
      <CardDashboard />
      <CardDashboard />
      <CardDashboard />
      <CardDashboard />
      <CardDashboard />
      <CardDashboard />
      <CardDashboard />
      <CardDashboard />
      <CardDashboard />
    </div>
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
  padding: 2rem;

  .dashboard {
    display: flex;
    gap: 0.4rem;
    flex-wrap: wrap;
  }
}
</style>
