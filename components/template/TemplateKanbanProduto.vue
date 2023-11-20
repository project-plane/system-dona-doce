<template>
  <div class="kanban-container">
    <div class="kanban-header">
      <h3>Produção {{ formatDate(new Date()) }}</h3>

      <div class="kanban-selects">
        <select v-model="typeProduct">
          <option value="programmed">Programado</option>
          <!-- <option value="coffe">Coffee</option> -->
        </select>

        <select v-model="typeKanban">
          <option value="client">Produção por cliente</option>
          <option value="product">Produção por produto</option>
        </select>
      </div>
    </div>

    <div class="kanban-content">
      <div class="kanban-column">
        <div class="column-header">
          <span v-if="typeProduct === 'programmed'">Lanche 01</span>
          <span v-else>09:00</span>
          <span>Total: {{ amountQtde(listLanche01) }}</span>
        </div>
        <LoadingPage v-if="loadingDejejum" />

        <draggable
          v-model="listLanche01"
          class="kanban-list"
          ghost-class="ghost"
        >
          <CardKanban
            v-for="(item, index) in listLanche01"
            :key="index"
            :data-object="item"
            :type-card="typeKanban"
            :id-order="index + 1"
            :hourCard="'10:00'"
          />
        </draggable>

        <span v-if="!loadingDejejum && listLanche01.length === 0"
          >Não há produção programada...</span
        >
      </div>

      <div class="kanban-column">
        <div class="column-header">
          <span v-if="typeProduct === 'programmed'">Lanche 02</span>
          <span v-else>15:00</span>
          <span>Total: {{ amountQtde(listLanche02) }}</span>
        </div>
        <LoadingPage v-if="loadingDejejum" />

        <draggable
          v-model="listLanche02"
          class="kanban-list"
          ghost-class="ghost"
        >
          <CardKanban
            v-for="(item, index) in listLanche02"
            :key="index"
            :id-order="index + 1"
            :data-object="item"
            :type-card="typeKanban"
            :hourCard="'15:00'"
          />
        </draggable>

        <span v-if="!loadingDejejum && listLanche02.length === 0"
          >Não há produção programada...</span
        >
      </div>

      <div class="kanban-column">
        <div class="column-header">
          <span v-if="typeProduct === 'programmed'"
            >Desjejum {{ formatDateTomorrow(new Date()) }}</span
          >
          <span v-else>15:00</span>
          <span>Total: {{ amountQtde(listDejejum) }}</span>
        </div>
        <LoadingPage v-if="loadingDejejum" />

        <draggable
          v-model="listDejejum"
          class="kanban-list"
          ghost-class="ghost"
        >
          <CardKanban
            v-for="(item, index) in listDejejum"
            :key="index"
            :id-order="index + 1"
            :data-object="item"
            :type-card="typeKanban"
            :hourCard="'15:00'"
          />
        </draggable>

        <span v-if="!loadingDejejum && listDejejum.length === 0"
          >Não há produção programada...</span
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import draggable from 'vuedraggable'
import dayjs from 'dayjs'
import httpKanban from '~/server/kanban/index'

export default Vue.extend({
  components: { draggable },
  data() {
    return {
      typeProduct: 'programmed',
      typeKanban: 'product',
      dragging: false,
      enabled: false,
      listKanban: [],
      listLanche01: [],
      listLanche02: [],
      listDejejum: [],
      localList: [],
      loadingDejejum: true,
    }
  },

  watch: {
    listLanche01(newValue, oldvalue) {
      if (oldvalue.length > 0) {
        const pos = []
        if (newValue.length > 0) {
          newValue.map((item, index) => {
            pos.push({ id: item.id, set: index + 1 })
          })
          httpKanban.UpdateKanban(pos);
        }
      }
    },

    listLanche02(newValue, oldvalue) {
      if (oldvalue.length > 0) {
        const pos = []
        if (newValue.length > 0) {
          newValue.map((item, index) => {
            pos.push({ id: item.id, set: index + 1 })
          })
          httpKanban.UpdateKanban(pos);
        }
      }
    },

     listDejejum(newValue, oldvalue) {
      if (oldvalue.length > 0) {
        const pos = []
        if (newValue.length > 0) {
          newValue.map((item, index) => {
            pos.push({ id: item.id, set: index + 1 })
          })
          httpKanban.UpdateKanban(pos);
        }
      }
    },

    typeKanban(newValue){
      this.reqKanban()

    }
  },

  async fetch() {
    // Verificador de mudanças
    // await httpKanban.GetKanban(this.typeProduct).then(async (res) => {

    //     if(localStorage.getItem('kanbanList') !==  JSON.stringify(res.data)) {
    await this.reqKanban()
    // })
    // }
  },

  methods: {
    async reqKanban() {
      this.loadingDejejum = true
      await httpKanban.GetKanban(this.typeKanban).then((res) => {
        ;[this.listLanche01, this.listLanche02, this.listDejejum] = [[], [], []]
        this.listKanban = res.data

        res.data.map((item) => {
          if (item.description_category === 'Lanche 1') {
            this.listLanche01.push(item)
          }

          if (item.description_category === 'Lanche 2') {
            this.listLanche02.push(item)
          }

          if (item.description_category === 'Dejejum') {
            this.listDejejum.push(item)
          }
        })
      })
      this.loadingDejejum = false
    },

    formatDate(date) {
      return dayjs(date).format('DD/MM/YY')
    },

    formatDateTomorrow(date) {
      return dayjs(date).add(1, 'day').format('DD/MM')
    },

    amountQtde(list) {
      let result = 0
      if (list.length > 0) {
        list.map((item) => {
          result = result + item.amount_actual
        })
      }

      return result
    },
  },
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
