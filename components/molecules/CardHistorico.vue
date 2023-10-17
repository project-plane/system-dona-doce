<template>
    <div class="card-historico-container">
        
        <div class="header-card">
            
            <span><strong>Data do Pedido:</strong> {{ formatDate(data.dateOrder) }}</span>
            <pre>{{ formatDate(data.dateOrder) }}</pre>
            <span><strong>Valor total:</strong> {{ valueorder(data.orderItem) }}</span>
    
        </div>

        <div class="footer-card">
            <span><strong>Status: </strong><br/>{{ data.orderStatus.description }}</span>
            
            <ButtonPirula title="Ver Detalhes" @click.native="() => showModal = true" style="width: 50%;"/>
        </div>

        <ModalHistorico v-if="showModal" :valueTotal="valueorder(data.orderItem)" :data="data" @closeModal="() => showModal = false" />

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
            showModal: false,
            totalOrderValue: 0,
            valorTotal: 0
        }
    },
   

    methods: {
        valueorder(listOrder) {
            this.totalOrderValue = 0
            listOrder.map( (item) => {
                this.totalOrderValue = this.totalOrderValue + (Number(item.amountItem) * Number(item.valueOrderItem))
            })
            
            return this.totalOrderValue.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
        },

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