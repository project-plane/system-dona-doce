<template>
  <div class="dashboardPage">
    <h1>Dashboard</h1>
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

})
</script>

<style scoped lang="scss">
.dashboardPage {
  padding: 2rem;

  .dashboard {
    display: flex;
    gap: .4rem;
    flex-wrap: wrap;
  }
}
</style>
