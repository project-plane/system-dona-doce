<template>
    <div v-if="$fetchState.pending" class="historicoPedidos-container">Carregando histórico...</div>
    <div v-else class="historicoPedidos-container">
        <h3>Histórico por data</h3>
        <v-date-picker v-model="range" is-range>
            <template v-slot="{ inputValue, inputEvents }">
                <input
                    :value="inputValue.start"
                    v-on="inputEvents.start"
                    class="input-range"
                />

                <img src="../../assets/icons/setaDropdown.svg" alt="">

                <input
                    :value="inputValue.end"
                    v-on="inputEvents.end"
                    class="input-range"
                />
            </template>
        </v-date-picker>


        <div class="list-historic" v-if="listFiltered.length > 3">
            


            <div v-for="(item, index) in listFiltered" :key="index">
                <CardHistorico :data="item" />
            </div>

            <span v-if="listFiltered.length === 0">Não há nada para mostrar aqui</span>
            
        </div>
        <div class="list-historic unique" v-else>

            <div v-for="(item, index) in listFiltered" :key="index">
                <CardHistorico :data="item" />
            </div>

            <span v-if="listFiltered.length === 0">Não há nada para mostrar aqui</span>

        </div>      
    </div>
</template>


<script lang="ts">
import Vue from 'vue'
import HttpHistoryClient from '@/server/pedidos'
import dayjs from 'dayjs'
export default Vue.extend({
    data () {
        return {
            historico: [],
            listFiltered: [],
            range: {
                start: new Date(2023, 8, 1),
                end: new Date()
            }
        }
    },

    async fetch () {
        await HttpHistoryClient.OrderHistory().then( (res) => {
            this.historico = res.data
        })

        this.listFiltered = this.historico
    },

    watch: {
        range: {
            handler(newValue) {
                this.filterByDateRange(new Date(newValue.start).toISOString().split('T')[0], new Date(newValue.end).toISOString().split('T')[0])
            },
            deep: true
        }
    },

    methods:{

        removeTimeInfo (date) { 
            return new Date(date.toISOString().split('T')[0]) 
        },

        filterByDateRange(startDate, endDate) {
            this.listFiltered = []
            this.historico.map( (item) => {
                item.dateOrder = new Date(item.dateOrder).toISOString().split('T')[0]
                if(new Date(item.dateOrder) >= new Date(startDate) && new Date(item.dateOrder) <= new Date(endDate)) {
                    this.listFiltered.push(item)
                }
            
            })
        }
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
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;

    .list-historic {
        margin-top: 1rem;
        width: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1rem;
    }

    .unique {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
    }

    .input-range {
        width: 9rem;
        height: 2.15rem;
        border: none;
        padding: 0.5rem;
        border-radius: 0.25rem;
        font-weight: 600;
        color: var(--text_color);
    }

    img {
        width: 1rem;
        transform: rotate(-90deg);
    }



}
</style>