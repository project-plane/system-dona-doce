<template>
    <div class="card-historico-container">
        <div class="header-card">
            <span><strong>Data do Pedido:</strong> {{ formatDate(data.dateOrder) }}</span>
            <span><strong>Valor:</strong> R$ {{ data.valueOrder }}</span>
        </div>

        <div class="footer-card">
            <span><strong>Status: </strong><br/>{{ data.orderStatus.description }}</span>
            <ButtonPirula title="Ver Detalhes" @click.native="() => showModal = true"/>
        </div>

        <ModalHistorico v-if="showModal" :data="data" @closeModal="() => showModal = false" />

    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import dayjs from 'dayjs'
export default Vue.extend({
    props: {
        data: Object,
    },

    data () {
        return {
            showModal: false
        }
    },

    methods: {
        formatDate(date) {
            return dayjs(date).format('DD/MM/YYYY')
        },

        openModalHistorico() {
            this.showModal = true
            // this.$store.commit('OPEN_MODAL_HISTORICO', true)
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