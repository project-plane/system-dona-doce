<template>
    <div class="kanban-container">
        <h3>Produção</h3>

        <div class="kanban-content">

            <div class="kanban-column">

                <div class="kanban-header">
                    <span>Lanche 01</span>
                    <span>Total: 1.102</span>
                </div>

                <draggable v-model="list" class="kanban-list" ghost-class="ghost">
                    <CardKanban v-for="(item, index) in list" :key="index" :data-object="item"/>
                </draggable>
            </div>

            <div class="kanban-column">
                <div class="kanban-header">
                    <span>Lanche 02</span>
                    <span>Total: 1.102</span>
                </div>

                <div class="kanban-list">
                   
                </div>
            </div>

            <div class="kanban-column">
                <div class="kanban-header">
                    <span>Desjejum</span>
                    <span>Total: 1.102</span>
                </div>

          
                <draggable v-model="list" class="kanban-list" ghost-class="ghost">
                    <CardKanban v-for="(item, index) in list" :key="index" :data-object="item"/>
                </draggable>
      
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import draggable from 'vuedraggable';
export default Vue.extend({
    components: { draggable},
    data () {
        return {
            dragging: false,
            enabled: false,
            list: [
                {id: 0, nameRecipe: 'Bolo de Chocolate', qtde: 500, horario: '10:00', idOrdem: 0, cliente: 'Honda'},
                {id: 1, nameRecipe: 'Cookie', qtde: 200, horario: '10:00', idOrdem: 0, cliente: 'Honda'},
                {id: 2, nameRecipe: 'Jacaré', qtde: 500, horario: '10:00', idOrdem: 0, cliente: 'Honda'},
                {id: 3, nameRecipe: 'Bolo de Chocolate', qtde: 500, horario: '10:00', idOrdem: 0, cliente: 'Honda'}
            ]
        }
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
    gap: 0.5rem;

    .kanban-content {
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: flex-start;
    
        .kanban-column {
            width: 100%;
            height: auto;
            // border: 1px solid red;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            .kanban-header, .kanban-list {
                display: flex;
                flex-direction: column;
                gap: 1rem;
                width: 80%;
                text-align: center;
                padding: 1rem 0 0 1rem;
            }

           

            .kanban-header > span {
                background-color: var(--white);
                font-weight: 600;
                border-radius: 0.25rem;
                padding: 0.3rem 0;
            }
            .kanban-header > span:first-child {
                background-color: var(--red);
                padding: 1rem 0;
                color: var(--white);
                
            }
        }
    }

    .ghost {
        opacity: 0.1;
        background: #000000;
    }
}
</style>