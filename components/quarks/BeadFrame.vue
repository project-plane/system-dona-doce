<template>
    <div class="containerFrame" v-if="route === '/dashboard/dashboard'">
        <img class="svg" src="@/static/icon/cutEffect.svg" alt="">
        <div class="contentSlot">
            <div class="abaItens">
                <h3 @click="pedidos" :class="{ abaNotActive: !abaNotActive }" class="abaActive">Itens do Pedidos</h3>
                <h3 @click="entrega" :class="{ abaNotActive: abaNotActive }" class="abaActive">Itens do Entrega</h3>
            </div>
            <slot />
        </div>
    </div>
    <div class="containerFrame" v-else>
        <img class="svg" src="@/static/icon/cutEffect.svg" alt="">
        <div class="contentSlot">
            <slot />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    data() {
        return {
            route: '',
            abaNotActive: true,
        }
    },
    fetch() {
        this.route = this.$route.path
    },
    methods: {
        pedidos() {
            this.abaNotActive = true
            this.$emit('pedidos', this.abaNotActive)
        },
        entrega() {
            this.abaNotActive = false
            this.$emit('entrega', this.abaNotActive)
        }
    },
})
</script>

<style lang="scss" scoped>
.containerFrame {
    max-width: 50rem;
    display: grid;

    .svg {
        width: 100%;
        position: relative;
        top: .5vw;
    }

    .contentSlot {
        background: var(--white);

        .abaItens {
            display: flex;
            justify-content: space-between;

            .abaActive {
                width: 100%;
                height: 2.5rem;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .abaNotActive {
                width: 100%;
                height: 2.5rem;
                display: flex;
                align-items: center;
                justify-content: center;
                background: var(--txt_color);
                color: var(--white);
            }
        }
    }

}
</style>
