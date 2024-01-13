<template>
    <div class="kanban-container">
        <div class="kanban-header">
            <h3>Entregas: {{formatDate(new Date())}}</h3>
        </div>

        <div class="kanban-content">

            <div class="kanban-column">

                <div class="column-header">
                    <span>Ordem de Rota</span>
                </div>
                <div class="kanban-list" ghost-class="ghost">
                    
                    <CardKanban v-for="(item, index) in listRotas" :key="index" :data-object="item" :name="item.user.Clients" type-card="entrega"/>
                </div>
            </div>

        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import draggable from 'vuedraggable';
import httpRotas from "@/server/kanban/index.js"
import dayjs from 'dayjs'
export default Vue.extend({
    components: { draggable},
    data () {
        return {
            dragging: false,
            enabled: false, 
            list: [
                {id: 1, unidade: 'EcoGreen Unidade 01', endereco: 'Avenida das Árvores, 456', bairro: 'Armando Mendes'},
                {id: 2, unidade: 'EcoGreen Unidade 02', endereco: 'Avenida das Árvores, 456', bairro: 'Armando Mendes'},
                {id: 3, unidade: 'EcoGreen Unidade 03', endereco: 'Avenida das Árvores, 456', bairro: 'Armando Mendes'}
            ],
            listRotas:{},
        }
    },

    methods: {
        formatDate(date){
            return dayjs(date).format('DD/MM/YY')
        },
        formatDateTomorrow(date) {
            return dayjs(date).add(1, 'day').format('DD/MM')
        }
    },
    async fetch(){
    httpRotas.GetOrderRoute().then((res) => {
      this.listRotas = res.data
      })
      .catch((error) => {
        console.log(error)
      })
    
  }

})
</script>

<style lang="scss" scoped>


.kanban-container {
    width: 100%;
    height: 100%;
    padding: 1rem 4rem 4rem 4rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;

    .kanban-header {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .kanban-content {
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: flex-start;
        gap: 3rem;
    
        .kanban-column {
            width: 100%;
            height: auto;
            // border: 1px solid red;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 1rem;

            .column-header, .kanban-list {
                display: grid;
                gap: 1rem;
                width: 100%;
                text-align: center;
                
            }

            .column-header > span {
                background-color: var(--white);
                font-weight: 600;
                border-radius: 0.25rem;
                padding: 0.3rem 0;
            }
            .column-header > span:first-child {
                background-color: var(--red);
                padding: 1rem 0;
                color: var(--white);  
            }
        }
    }

    .ghost {
        opacity: 0.7;
        background: #c0bcbc;
    }
}
</style>