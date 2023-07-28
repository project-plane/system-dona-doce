<template>
    <div v-if="$fetchState.pending" class="historicoPedidos-container">Carregando histórico...</div>
    <div v-else class="historicoPedidos-container">
        oi
    </div>
</template>


<script lang="ts">
import Vue from 'vue'
import HttpHistoryClient from '@/server/pedidos'
export default Vue.extend({
    data () {
        return {
            historico: ''
        }
    },

    async fetch () {
        await HttpHistoryClient.OrderHistory().then( (res) => {
            this.historico = res.data
        })
    }
})
</script>

<style lang="scss" scoped>


.historicoPedidos-container {
    width: 100%;
    background-color: var(--red);
    padding: 6rem 4rem 4rem 4rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

}
</style>