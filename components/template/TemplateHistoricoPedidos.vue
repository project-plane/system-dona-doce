<template>
    <div v-if="$fetchState.pending" class="historicoPedidos-container">Carregando histórico...</div>
    <div v-else class="historicoPedidos-container">
        <div class="list-historic">
            <CardHistorico :date="item.dateOrder"  :valorPedido="item.valueOrder" :orderStatus="item.orderStatus.description" v-for="(item, index) in historico" :key="index"/>
        </div>
        <div class="details-historic">

            Detalhes do Produto
        </div>
        
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
    height: 100%;
    background-color: var(--red);
    padding: 6rem 4rem 4rem 4rem;
    display: flex;
    align-items: flex-start;

    .list-historic {
        width: 80%;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1rem;
    }

    .details-historic {
        padding-left: 1rem;
        width: 20%;
        height: 100%;
        background-color: red;
    }

}
</style>