<template>
    <div v-if="$fetchState.pending" class="historicoPedidos-container">
      <Loading/>
    </div>
    <div v-else class="historicoPedidos-container">
        <h3>Histórico por data</h3>
        <div class="input-calendar">
            <v-date-picker v-model="range" is-range>
                <template v-slot="{ inputEvents }">
                    <button v-on="inputEvents.start" class="btn-calendar">
                        <img src="../../assets/icons/calendar.svg" alt="">
                    </button>
                </template>
            </v-date-picker>
            <div class="label-calendar">
                <div class="date">
                    <span><strong>Inicial</strong> </span>
                    {{ formatDate(range.start) }}
                </div>
                <div class="date">
                    <span><strong>Final</strong></span>
                {{ formatDate(range.end) }}
                </div>

            </div>

        </div>


        <div class="list-historic" v-if="listFiltered.length > 3">



            <div v-for="(item, index) in listFiltered" :key="index">
                <CardHistorico :data="item" />

            </div>

            <span v-if="listFiltered.length === 0">
                Nenhum resultado encontrado.
                Tente ajustar os filtros da sua pesquisa
                 e tente novamente.</span>

      </div>
        <div class="list-historic unique" v-else>

            <div v-for="(item, index) in listFiltered" :key="index">
                <CardHistorico :data="item" />
            </div>

            <span   v-if="listFiltered.length === 0">Nenhum resultado encontrado.
                Tente ajustar os filtros da sua pesquisa e tente novamente.</span>
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
                start: new Date(),
                end: new Date()
            }
        }
    },

    async fetch () {
        await HttpHistoryClient.Orderspercustomer().then( (res) => {
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

        formatDate(date) {
            return dayjs(date).format('DD/MM/YYYY')
        },

        removeTimeInfo (date) {
            return new Date(date.toISOString().split('T')[0])
        },

        filterByDateRange(startDate, endDate) {
            this.listFiltered = []
            this.historico.map((item) => {
            item.dateOrder = new Date(item.dateOrder).toISOString().split('T')[0]
            const itemDate = new Date(item.dateOrder);
            if (itemDate >= new Date(startDate) && itemDate <= new Date(endDate)) {
            this.listFiltered.push(item);
            }
            });
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

    .input-calendar {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        align-items: center;
        background-color: var(--white);
        padding: 0.3rem;
        gap: 0.5rem;
        width: auto;
        font-size: 0.7rem;
        border-radius: 0.25rem;
        color: var(--text_color);


        .btn-calendar {
            background-color: transparent;
            border: none;
            border-radius: 0.25rem;
        }

        .label-calendar {
            display: flex;
            flex-direction: column;

            .date{
                justify-content: space-between;
                gap: 0.25rem;
                display: flex;
            }
        }
    }

    .list-historic {
        margin-top: 1rem;

        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
        // grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        // gap: 1rem;
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



}
</style>
