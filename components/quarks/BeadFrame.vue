<template>
    <div class="containerFrame">
        <img class="svg" src="@/static/icon/cutEffect.svg" alt="">
        <div class="contentSlot">
            <slot/>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .containerFrame{
        max-width: 50rem;
        display: grid;
        .svg{
            width: 100%;
            position: relative;
            top: .5vw;
        }
        .contentSlot{
            background: var(--white);
        }

    }
</style>