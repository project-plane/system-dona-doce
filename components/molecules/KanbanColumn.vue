<template>
    <div class="kanban-column">
      <div class="column-header">
        <span v-if="typeProduct === 'Coffe'"> {{ headerText }}</span>
        <span v-else>{{ defaultHeader }}</span>
        <span>Total: {{ amountQtde(filteredItems) }}</span>
      </div>
      <LoadingPage v-if="loading" />
      <!-- <pre>{{ typeProduct }}</pre>
      <pre>{{defaultHeader  }}</pre>
      <pre>{{list  }}</pre> -->
      <draggable
        v-model="filteredItems"
        class="kanban-list"
        ghost-class="ghost"
      >
        <CardKanban
          v-for="(item, index) in filteredItems"
          :key="index"
          :id-order="index + 1"
          :data-object="item"
          :type-card="typeKanban"
          :hourCard="hourCard"
        />
      </draggable>
  
      <span v-if="!loading && filteredItems.length === 0">
        Não há produção programada...
      </span>
    </div>
  </template>
  
  <script lang="js">
  import { defineComponent, computed } from 'vue';
  import draggable from 'vuedraggable';
  import LoadingPage from './LoadingPage.vue';
  import CardKanban from './CardKanban.vue';
  
  export default defineComponent({
    components: { draggable, LoadingPage, CardKanban },
    props: {
      list: {
        type: Array,
        required: true,
      },
      loading: {
        type: Boolean,
        required: true,
      },
      typeProduct: {
        type: String,
        required: true,
      },
      typeKanban: {
        type: String,
        required: true,
      },
      headerText: {
        type: String,
        required: true,
      },
      defaultHeader: {
        type: String,
        required: true,
      },
      hourCard: {
        type: String,
        required: true,
      },
    },
    setup(props) {
      // Filtra a lista com base no tipo de produto selecionado (Coffe ou Programado)
      const filteredItems = computed(() => {
      if (props.typeProduct === 'Coffe') {
        // Filtra apenas os itens de "Coffe"
        return props.list.filter(item => item.description_category === 'Coffe');
      } else if (props.typeProduct === 'programmed') {
        // Exibe apenas os itens programados (sem filtro específico, exibe todos os itens programados)
        return props.list.filter(item => item.order_type === 'programmed');
      } else if (props.typeProduct === 'all') {
        // Exibe todos os itens
        return props.list;
      } else {
        // Exibe todos os itens se o filtro não for definido
        return props.list;
      }
    });
  
      const amountQtde = (list) => {
        return list.reduce((total, item) => total + item.amount_actual, 0);
      };
  
      return {
        filteredItems,
        amountQtde,
      };
    },
  });
  </script>
  
  <style lang="scss" scoped>
  .kanban-column {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  
    .column-header,
    .kanban-list {
      display: flex;
      flex-direction: column;
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
  
  .ghost {
    opacity: 0.7;
    background: #c0bcbc;
  }
  </style>
  