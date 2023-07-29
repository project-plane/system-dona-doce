<template>
    <div v-if="$fetchState.pending" class="historicoPedidos-container">Carregando histórico...</div>
    <div v-else class="historicoPedidos-container">
        <div class="list-historic">
            <div v-for="(item, index) in historico" :key="index">
                <CardHistorico :data="item"  />

                <ModalHistorico :data="item" v-if="$store.state.openModalHistorico"/>
            </div>
            
        </div>      
    </div>
</template>


<script lang="ts">
import Vue from 'vue'
import HttpHistoryClient from '@/server/pedidos'
export default Vue.extend({
    data () {
        return {
            historico: [],
            showModal: false
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
        width: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1rem;
    }

}
</style>