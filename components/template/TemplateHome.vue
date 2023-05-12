<template>
    <div class="content">
        <BusinessCard/>
    </div>
</template>

<style scoped lang="scss">
    .content{
        padding: 6rem var(--space) 0 var(--space);
        @include screen("tablet"){
            padding: calc(4rem + var(--space)) var(--space) 0 var(--space); 
        }
    }
</style>