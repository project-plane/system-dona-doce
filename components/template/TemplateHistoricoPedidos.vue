<template>
  <div v-if="$fetchState.pending" class="historicoPedidos-container">
    <Loading />
  </div>
  <div v-else class="historicoPedidos-container">
    <h2>Histórico de Pedidos</h2>
    <section style="display: flex; width: 100%; justify-content: space-between;margin-top: 1rem;">
      <section style="display: flex; gap: 1rem; align-items: flex-end;">
      <div class="input">
        <label style="display: flex; width: 100%">Tipo Pedido</label>
        <select v-model="selectedType" @change="filterByType" style="width: 10rem;">
          <option value="">Todos</option>
          <option value="programmed">Programado</option>
          <option value="coffe">Coffee</option>
        </select>
      </div>
      <div class="input">
        <label style="display: flex; width: 100%">Status</label>
        <select v-model="selectedAgenda" @change="filterByType" style="width: 10rem;">
          <option value="">Todos</option>
          <option value="Solicitado">Solicitado</option>
          <option value="Agendado">Agendado</option>
          <option value="Pré-Produção">Pré-Produção</option>
          <option value="Em Processamento">Em Processamento</option>
          <option value="Revisão Admin">Revisão Admin</option>
          <option value="Em Entrega">Em Entrega</option>
          <option value="Entregue">Entregue</option>
        </select>
      </div>
      <!-- <div class="input">

          <label style="display: flex; width: 100%">Unidade</label>
          <select v-model="selectedUnidade" @change="filterByUnidade">
            <option value="" >Todos</option>
            <option v-for="item in listEmpresa" :value="item.corporate_name" :key="item.id">{{ item.corporate_name }}</option>
          </select>
        </div> -->
      </section>
      <section>
        <div class="input" style="width: 12rem; display: flex;flex-direction: column;">
        <label style="">Buscar por Id </label>
        <InputSearch v-model="textSearch" style="width: 100%;"/>
      </div>
      </section>
    </section>

    <div class="list-historic" v-if="this.filter === true">
      <div v-for="(item, index) in filterData" :key="index">
        <CardHistorico :data="item" />

      </div>
      <span v-if="filterData.length === 0" class="spanError">
        Nenhum resultado encontrado. Tente ajustar os filtros da sua pesquisa e
        tente novamente.</span
      >
    </div>

    <div class="list-historic" v-if="this.filter === false">
      <div v-for="(item, index) in filteredItems" :key="index">
        <CardHistorico :data="item" />
   
      </div>


      <span v-if="filteredItems.length === 0" class="spanError"
        >Nenhum resultado encontrado. Tente ajustar os filtros da sua pesquisa e
        tente novamente.</span
      >
    </div>
    </div>


</template>

<script lang="ts">
import Vue from 'vue'
import HttpHistoryClient from '@/server/pedidos'
import httpEmpresa from '~/server/empresa'
import dayjs from 'dayjs'
export default Vue.extend({
  data() {
    return {
      historico: [],
      filterData: [],
      listFiltered: [],
      listEmpresa: [],
      filter: false,
      selectedType: '',
      selectedAgenda: '',
      textSearch: '',
      selectedUnidade: '',
      filteredData: [],
      range: {
        start: new Date(),
        end: new Date(),
      },
    }
  },

  async fetch() {
    this.atualizar()

    await httpEmpresa
      .GetAllEmpresa().then((res) => {
        this.listEmpresa = res.data
      })
      .catch((error) => {
        console.log(error)
      })
    this.listFiltered = this.historico
  },

  watch: {

    range: {
      handler(newValue) {
        this.filterByDateRange(
          new Date(newValue.start).toISOString().split('T')[0],
          new Date(newValue.end).toISOString().split('T')[0]
        )
      },
      deep: true,
    },
  },

  methods: {
    async atualizar(){
      try{
        const res = await HttpHistoryClient.Orderspercustomer()
        this.historico = res.data

      }catch(error){
        console.log(error);

      }
    },

    formatDate(date) {
      return dayjs(date).format('DD/MM/YYYY')
    },

    removeTimeInfo(date) {
      return new Date(date.toISOString().split('T')[0])
    },

    filterByDateRange(startDate, endDate) {
      this.listFiltered = []
      this.filterData.map((item) => {
        item.dateOrder = new Date(item.dateOrder).toISOString().split('T')[0]
        const itemDate = new Date(item.dateOrder)
        if (itemDate >= new Date(startDate) && itemDate <= new Date(endDate)) {
          this.listFiltered.push(item)
        }
      })
    },
    filterByType() {
      if (this.selectedType === '' && this.selectedAgenda === '') {
        this.filter = false // Nenhuma seleção, então retornar os dados originais
      } else {
        this.filter = true
        this.filterData = this.historico.filter((item) => {
          let typeCondition =
            this.selectedType === '' || item.order_type === this.selectedType
          let agendaCondition =
            this.selectedAgenda === '' ||
            item.orderStatus.description === this.selectedAgenda

          return typeCondition && agendaCondition
        })
      }
    },
    filterByUnidade() {
      this.filter = true
      this.filterData = this.historico.filter((item) => {
        return this.selectedUnidade === '' ||
              item.company.corporate_name.includes(this.selectedUnidade);
      });
  }

  },
  computed: {
    filteredItems(): any {
    if (Array.isArray(this.historico)) {
      return this.historico.filter(
        (item) =>
          item.numberOrder.toString().includes(this.textSearch.toLowerCase())
      );
    } else {
      return [];
    }
  },
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

    .spanError{
    width: 100%;
    height: 50vh;
    display: flex !important;;
    align-items: center;
    justify-content: center;
    color: #f9f1e2;
    letter-spacing: 1px;
    text-align: center;

    }
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

      .date {
        justify-content: space-between;
        gap: 0.25rem;
        display: flex;
      }
    }
  }

  .list-historic {
    margin-top: 1rem;
    width: 100%;
    display: flex;
    /* display: grid; */
    /* grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); */
    grid-gap: 1rem;
    gap: 1rem;
    flex-wrap: wrap;
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
