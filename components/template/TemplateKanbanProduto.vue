<template>
  <div class="kanban-container">
    <div class="kanban-header">
      <h3>Produção {{ formatDate(new Date()) }}</h3>
      <div class="kanban-selects">
        <select v-model="typeProduct">
          <option value="">Todos</option>
          <option value="programmed">Programado</option>
          <option value="Coffe">Coffee</option>
        </select>

        <select v-model="typeKanban">
          <option value="client">Produção por cliente</option>
          <option value="product">Produção por produto</option>
        </select>

        <select v-if="typeKanban === 'client'" v-model="selectedUnidade" @change="filterByUnidade">
          <option value="">Todas unidades</option>
          <option v-for="item in listEmpresa" :value="item.corporate_name" :key="item.id">{{ item.corporate_name }}</option>
        </select>
      </div>
    </div>

    <div class="kanban-content">
      <KanbanColumn 
      :list="listLanche01" 
      :loading="loadingDejejum" 
      :typeProduct="typeProduct" 
      :typeKanban="typeKanban" 
      headerText="até as 10:00"
      defaultHeader="até as 10:00"
      hourCard="10:00"
    />
    
    <KanbanColumn 
      :list="listLanche02" 
      :loading="loadingDejejum" 
      :typeProduct="typeProduct" 
      :typeKanban="typeKanban" 
      headerText="10:00 às 13:00"
      defaultHeader="10:00 às 13:00"
      hourCard="15:00"
    />

    <!-- Coluna Dejejum - Coffe -->
    <KanbanColumn 
      v-if="typeProduct === 'Coffe'"
      :list="listDejejum" 
      :loading="loadingDejejum" 
      :typeProduct="typeProduct" 
      :typeKanban="typeKanban" 
      headerText="13:00 às 17:00"
      defaultHeader="Coffe"
      hourCard="15:00 "
    />
    
    <!-- Coluna Programmed -->
    <KanbanColumn 
      v-else-if="typeProduct === 'programmed'"
      :list="listProgammed" 
      :loading="loadingDejejum" 
      :typeProduct="typeProduct" 
      :typeKanban="typeKanban" 
      headerText="13:00 às 17:00"
      defaultHeader="13:00 às 17:00"
      hourCard="15:00"
    />

    <!-- Coluna All -->
    <KanbanColumn 
      v-else-if="typeProduct === ''"
      :list="listDejejum" 
      :loading="loadingDejejum" 
      :typeProduct="'all'" 
      :typeKanban="typeKanban" 
      headerText="13:00 às 17:00"
      defaultHeader="13:00 às 17:00"
      hourCard="10:00"
    />
  </div>
    
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import draggable from 'vuedraggable';
import dayjs from 'dayjs';
import httpKanban from '~/server/kanban/index';
import httpEmpresa from '~/server/empresa';

export default Vue.extend({
  components: { draggable, },
  data() {
    return {
      typeProduct: '',
      typeKanban: 'product',
      listKanban: [],
      listLanche01: [],
      listLanche02: [],
      listDejejum: [],
      listProgammed: [],
      listCoffe: [],
      listAll: [],
      listEmpresa: [],
      selectedUnidade: '',
      loadingDejejum: true,
    };
  },

  watch: {
    listLanche01: 'updateKanban',
    listLanche02: 'updateKanban',
    listCoffe: 'updateKanban',
    listAll: 'updateKanban',
    typeKanban: 'reqKanban',
  },

  async fetch() {
    await this.reqKanban();
    await httpEmpresa.GetAllEmpresa().then((res) => {
      this.listEmpresa = res.data;
    }).catch((error) => console.log(error));
  },

  methods: {
    async reqKanban() {
      this.loadingDejejum = true;
      await httpKanban.GetKanban(this.typeKanban).then((res) => {
        this.listKanban = res.data;
        this.filterKanban();
      });
      this.loadingDejejum = false;
    },

    filterKanban() {
      // Filtra diretamente de listKanban por intervalo de tempo
      this.listLanche01 = this.listKanban['06:00-10:00'] || [];
      this.listLanche02 = this.listKanban['10:00-13:00'] || [];
      this.listDejejum = this.listKanban['13:00-17:00'] || [];

    },

    updateKanban(newList) {
      const pos = newList.map((item, index) => ({ id: item.id, set: index + 1 }));
      httpKanban.UpdateKanban(pos);
    },

    filterByUnidade() {
      this.listLanche01 = this.listKanban['06:00-10:00'].filter(item => !this.selectedUnidade || item.company_name.includes(this.selectedUnidade));
      this.listLanche02 = this.listKanban['10:00-13:00'].filter(item => !this.selectedUnidade || item.company_name.includes(this.selectedUnidade));
      this.listDejejum =  this.listKanban['13:00-17:00'].filter(item => !this.selectedUnidade || item.company_name.includes(this.selectedUnidade));
     
      const listJoin = [...this.listLanche01, ...this.listLanche02, ...this.listDejejum];
     
      this.listCoffe = listJoin.filter(item => item.description_category === 'Coffe');
      this.listProgammed= listJoin.filter(item => item.description_category === 'programmed');
     
    },

    formatDate(date) {
      return dayjs(date).format('DD/MM/YY');
    },
  },
});
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

    .kanban-selects {
      display: flex;
      gap: 1rem;

      select {
        width: 11rem;
      }
    }
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

      .column-header,
      .kanban-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 100%;
        text-align: center;
        // padding: 1rem 0 0 1rem;
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
