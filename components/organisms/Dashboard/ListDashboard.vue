<template>
  <div class="cards-container">
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
    <CardDashboard />
    <CardDashboard />
    <CardDashboard />
    <CardDashboard />
    <CardDashboard />
    <CardDashboard />
    <CardDashboard />
    <CardDashboard />
  </div>
</template>

<style lang="scss" scoped>
.cards-container {
  height: 300px;
  padding: 2rem 2vw;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1rem;
  overflow-y: auto;
}
</style>
