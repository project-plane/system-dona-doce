<template>
    <div class="card-historico-container">
        <div class="header-card">
            <span><strong>Data do Pedido:</strong> {{ formatDate(date) }}</span>
            <span><strong>Valor:</strong> R$ {{ valorPedido }}</span>
        </div>

        <div class="footer-card">
            <span><strong>Status: </strong><br/>{{ orderStatus }}</span>
            <ButtonPirula title="Ver Detalhes" />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import dayjs from 'dayjs'
export default Vue.extend({
    props: {
        date: String,
        valorPedido: Number,
        orderStatus: String
    },

    methods: {
        formatDate(date) {
            return dayjs(date).format('DD/MM/YYYY')
        }
    }
    
})
</script>

<style lang="scss" scoped>
.card-historico-container {
    background-color: var(--white);
    border-radius: 0.3rem;
    padding: 1rem;
    height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .header-card {
        display: flex;
        flex-direction: column;
    }

    .footer-card {
        justify-content: space-between;
        align-items: end;
        display: flex;
    }

}
</style>