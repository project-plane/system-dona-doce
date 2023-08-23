<template>
    <div class="calendar-container">
        <h1>Agenda</h1>

        <div class="row-calendar">
            <div class="calendar">
                <span> {{ formatDateDayOfWeek(date) }}</span>
                <h2> {{ formatDateDayAndMes(date) }} </h2>
            </div>

            <div class="btns">
                <button :class="{ focus: isToday }" @click="calendarShowOrNot(true)">Hoje</button>

                <v-date-picker v-model="date" mode="date">
                    <template v-slot="{ inputEvents }">
                        <button
                        :class="{ focus: !isToday }" @click="calendarShowOrNot(false)"
                        v-on="inputEvents"
                        >Calendário</button>

                    </template>
                    </v-date-picker>
            </div>
        </div>
        

        
        
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'

export default Vue.extend({
    
    data() {
        return {
            isToday: true,
            calendarStatus: false,
            date: new Date()
        }
    },

    watch: {
        date (newValue ) {
            if(newValue.toISOString().split('T')[0] !== new Date().toISOString().split('T')[0]) {
                this.isToday = false
            } else {
                this.isToday = true
            }
        }
    },

    methods: {

        formatDateDayOfWeek(date) {
            dayjs.locale('pt-br');
            return dayjs(date).format('dddd')
        },

        formatDateDayAndMes(date) {
            dayjs.locale('pt-br');
            return dayjs(date).format('DD.MMMM.YYYY')
        },

        formatDateYear(date) {
            dayjs.locale('pt-br');
            return dayjs(date).format('YYYY')
        },
        calendarShowOrNot(foo) {
            this.isToday = foo

            if(!this.isToday) {
                console.log('show modal, bro')
            } else {
                this.date = new Date()
            }
        }
    }


})
</script>


<style lang="scss" scoped>

.calendar-container {
    padding: 2rem 2vw;
    width: 100%;


    .row-calendar {
        margin-top: 1rem;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: end;

        .btns  {

            button {
                width: 7rem;
                height: 2.5rem;
                border-radius: 6rem;
                font-size: 1rem;
                font-weight: 600;
                background-color: transparent;
                border: 1px solid var(--red);
            }

            .focus {
                background-color: var(--red);
            }

        }
    }

    
    
}
</style>