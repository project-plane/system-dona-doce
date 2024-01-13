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
                <span v-if="typeCard === 'client'">{{dataObject.corporate_name}}</span>
                <span v-if="typeCard === 'client'">{{ dataObject.company_name }}</span>
        
            </div>
        </div>

        <table v-else class="cardKanban-infos">
           
            <tr class="legend">
                <td>Cliente:</td>
                <td>Unidade:</td>
                <th>Endereço:</th>
                <th>Bairro</th>
                <th></th>
       
      
            </tr>
            <tr class="value" >
                <h4  style="color: var(--red);"> {{ name.corporate_name }}</h4>
                <td v-for="(item, id) in dataObject" :key="id">  {{ item.corporate_name }}</td>
                <td v-for="(item, id) in dataObject" :key="id"> {{ item.address }} </td>
                <td v-for="(item, id) in dataObject" :key="id">{{ item.district }}</td>
                
          
            </tr>
            <tr class="value" >
               
                <td><strong>Responsavel:</strong> <span v-for="(item, id) in dataObject" :key="id"> {{ item.accountable }}</span></td>
                <td><strong>Fone:</strong> <span v-for="(item, id) in dataObject" :key="id"> {{ item.fone }}</span> </td>
                <td><strong>Entrega às:</strong> {{ formatTime(dataObject.deliveryDate) }} </td>
                <td><strong>CEP:</strong> <span v-for="(item, id) in dataObject" :key="id"> {{ item.cep }}</span></td>
            </tr>
            <!-- <tr class="value"  v-for="(item, id) in dataObject" :key="id">
                <td> {{ item.corporate_name }}</td>
             
            </tr> -->

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
        dataObject: {
            required: true,
            type: Object
        },
        name:Object,
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
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        text-align: left;
        gap: .5rem;

        .legend, .value {
            display: flex;
            flex-direction: column;
        }

        .legend {
            color: var(--gray);
            font-weight: 600;
        }

        .value > span:first-child {
            font-weight: 500;
            color: var(--red);
            max-width: 18ch;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
}
</style>
