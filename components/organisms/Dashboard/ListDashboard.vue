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
    </div>
</template>

<style lang="scss" scoped>

.cards-container {
    padding: 2rem 2vw;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1rem;
}
</style>