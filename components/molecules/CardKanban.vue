<template>
    <div class="cardKanban-container">
        <div class="cardKanban-number">
        </div>
        <div v-if="typeCard !== 'entrega'" class="cardKanban-infos">
            <div class="legend">
                <span>Receita</span>
                <span>Qtde</span>
                <!-- <span>Horário</span> -->
                <!-- <span v-if="typeCard === 'client'">ID</span> -->
                <span v-if="typeCard === 'client'">Cliente</span>
            </div>
            <div class="value">
                <span>{{ dataObject.description }}</span>
                <span>{{ dataObject.amount_actual }}</span>
                <!-- <span>{{ hourCard }}</span> -->
                <!-- <span v-if="typeCard === 'client'">{{ dataObject.seq + 1 }}</span> -->
                <span v-if="typeCard === 'client'">{{dataObject.corporate_name}}</span>
            </div>
        </div>

        <table v-else class="cardKanban-infos">
            <div class="legend">
                <span>Unidade:</span>
                <span>Endereço:</span>
                <span>Bairro</span>
                <span>CEP:</span>
                <span>Horario: {{ formatTime(dataObject.deliveryDate) }}</span>
            </div>
            <div class="value" v-for="(item, id) in dataObject" :key="id">
                <span>{{ item.corporate_name }}</span>
                <span>{{ item.address }} </span>
                <span>{{ item.district }}</span>
                <span>{{ item.cep }}</span>
                
            </div>
        </table>
    </div>
</template>


<script lang="ts">
import Vue from 'vue'
import dayjs from 'dayjs'
import * as timezone from "dayjs/plugin/timezone"
export default Vue.extend({
    props: {
        // eslint-disable-next-line vue/require-default-prop
        dataObject: Object,
        typeCard: String,
        hourCard: String,
        idOrder: Number
    },
    methods:{
        formatTime(time) {
        const dataHoraFormatada = dayjs(time).local().format('HH:mm:ss');

        return dataHoraFormatada
        }
    }

})
</script>




<style lang="scss" scoped>
.cardKanban-container {
    width: 100%;
    height: 100%;
    background-color: var(--white);
    display: flex;
    border-radius: 0.25rem;
    padding: 0.5rem;
    // cursor: grab;



    .cardKanban-infos {
        padding-left: 0.5rem;
        width: 85%;
        display: flex;
        text-align: left;
        gap: 1rem;

        .legend, .value {
            display: flex;
            flex-direction: column;
        }

        .legend {
            color: var(--gray);
            font-weight: 600;
        }

        .value > span:first-child {
            font-weight: 600;
            color: var(--red);
            max-width: 18ch;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
}
</style>
