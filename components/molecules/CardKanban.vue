<template>
    <div class="cardKanban-container">
        <div class="cardKanban-number">
        </div>
        <div v-if="typeCard !== 'entrega'" class="cardKanban-infos">
            <div class="legend">
                <span>Receita</span>
                <span>Qtde</span>

                <span v-if="typeCard === 'client'">Cliente</span>
                <span v-if="typeCard === 'client'">Unidade</span>

            </div>
            <div class="value">
                <span>{{ dataObject.description }}</span>
                <span>{{ dataObject.amount_actual }}</span>
                <!-- <span>{{ dataObject.order_type }}</span> -->
                <!-- <span>{{ formatTime(dataObject.delivery_date) }}</span> -->
                <span v-if="typeCard === 'client'">{{ dataObject.corporate_name }}</span>
                <span v-if="typeCard === 'client'">{{ dataObject.company_name }}</span>

            </div>
        </div>

        <div v-else class="cardKanban">
            <div class="card">
                <div class="card-header">
                    <h3 class="customer-name">{{ name.corporate_name }}</h3>
                    <section class="header-info">
                        <h4>Unidade222:</h4>
                        <span v-for="(item, id) in dataObject" :key="id">{{ item.corporate_name }}</span>
                        <strong>Entrega às:</strong>
                        <span>{{ formatTime(dataObject.deliveryDate) }}</span>
                    </section>
                </div>

                <div class="card-body">
                    <div class="customer-info">
                        <h4>Responsável:</h4>
                        <span v-for="(item, id) in dataObject" :key="id">{{ item.accountable }}</span>
                        <h4>Fone:</h4>
                        <span v-for="(item, id) in dataObject" :key="id">{{ item.fone }}</span>
    
                        <h4>Endereço:</h4>
                        <span v-for="(item, id) in dataObject" :key="id">{{ item.address }}</span>
                        <h4>Bairro:</h4>
                        <span v-for="(item, id) in dataObject" :key="id">{{ item.district }}</span>
                        <h4>CEP:</h4>
                        <span v-for="(item, id) in dataObject" :key="id">{{ item.cep }}</span>
                    </div>

                    <ul class="order-list">
                        <li v-for="(item, id) in dataObject.item" :key="id" class="order-item">
                           <span> {{ item.revenues.description }}</span> <span>{{ item.amountItem }} UNID</span> 
                        </li>
                        <!-- <li v-for="(item, id) in dataObject.item" :key="id" class="order-item">
                           <span> {{ item.revenues.description }}</span> <span>{{ item.amountItem }} UNID</span> 
                        </li> -->
                    </ul>
                </div>
            </div>
        </div>
     
    </div>
</template>


<script lang="ts">
import Vue from 'vue'
import dayjs from 'dayjs'
import * as timezone from "dayjs/plugin/timezone"
export default Vue.extend({
    props: {
        // eslint-disable-next-line vue/require-default-prop
        dataObject: {
            required: true,
            type: Object
        },
        name: Object,
        typeCard: String,
        hourCard: String,
        idOrder: Number
    },
    methods: {
        formatTime(time) {
            const dataHoraFormatada = dayjs.utc(time).format('HH:mm');

            return dataHoraFormatada
        },
        formatItem(item) {
      if (item.amountItem !== undefined && item.revenues && item.revenues.description) {
        return `Qtd: ${item.amountItem} - Item: ${item.revenues.description}`;
      } else if (item.amountItem !== undefined) {
        return `${item.amountItem} `;
      } else {
        return null;
      }
    }

    }

})
</script>




<style lang="scss" scoped>
.cardKanban-container {

    height: 100%;
    display: flex;
    border-radius: 0.25rem;
    padding: 0.5rem;
    background-color: #fff;

    .cardKanban-infos {
        padding-left: 0.5rem;
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        text-align: left;
        gap: .5rem;

        .legend,
        .value {
            display: flex;
            flex-direction: column;
        }

        .legend {
            color: var(--gray);
            font-weight: 600;
        }

        .value>span:first-child {
            font-weight: 500;
            color: var(--red);
            max-width: 18ch;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
}
.card {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
    overflow: hidden;
    width: 22rem;


.card-header {
    background-color: var(--red);
    color: #fff;
    padding: 15px;
    text-align:  flex-start;
    .header-info{
        display: flex;
        gap: 2px;
    }
}

.customer-name {
    margin: 0;
    font-size: 18px;
}

.card-body {
    padding: 15px;
    .customer-info{
        display: flex;
        flex-wrap: wrap;
        h4{
            margin-left: 2px;
            margin-right: 5px;
        }
        
    }
}

.order-list {
    list-style-type: none;
    margin: 0;
    padding: 0;
    max-height: 15rem;
    min-height: 15rem;
    overflow-y: scroll;
}

.order-item {
    background-color: #f9f9f9;
    border-bottom: 1px solid #ddd;
    padding: 10px;
    display: flex;
    justify-content: space-between;
}

.order-item:last-child {
    border-bottom: none;
}
}
</style>
