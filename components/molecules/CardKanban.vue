<template>
    <div class="cardKanban-container">
        <div class="cardKanban-number">
            {{ dataObject.id }}
        </div>
        <div class="cardKanban-infos">
            <div class="legend">
                <span>Receita</span>
                <span>Qtde</span>
                <span>Horário</span>
                <span>ID</span>
                <span>Cliente</span>
            </div>
            <div class="value">
                <span>{{ dataObject.nameRecipe }}</span>
                <span>{{ dataObject.qtde }}</span>
                <span>{{ dataObject.horario }}</span>
                <span>{{ dataObject.idOrdem }}</span>
                <span>{{dataObject.cliente}}</span>
            </div>
        </div>
    </div>
</template>


<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    props: {
        // eslint-disable-next-line vue/require-default-prop
        dataObject: Object
    },

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

    .cardKanban-number {
        width: 15%;
        font-weight: 600;
        font-size: 1.3rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border-right: 2px solid #f8f8f8;
    }

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
        }
    }
}
</style>