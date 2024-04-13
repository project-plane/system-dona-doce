<template>
  <div v-if="loading">
    <Loading />
  </div>
  <div v-else class="dashboardPage">

    <div v-if="histOrderVisilble" class="historicOrders">
      <CalendarHeader />
      <ListDashboard />
    </div>
    <div v-show="histOrderVisilble" class="informationOrders">
      <InformationFinance :gerarPdfVariable="histOrderVisilble" @setVisibleInFi="setVisible" />
    </div>
    <div v-show="!histOrderVisilble" class="informationOrders2">
      <InformationFinance :gerarPdfVariable="histOrderVisilble" @setVisibleInFi="setVisible" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      histOrderVisilble: true,
      loading: false,
    }
  },
  methods: {
    async setVisible(payload) {
      this.histOrderVisilble = payload

      await new Promise(() =>
        setTimeout(() => {
          if (payload === false) {
            window.print()
          }
        }, 2000)
      )
    },
  },
})
</script>

<style scoped lang="scss">
.dashboardPage {
  width: 100%;
  height: 100vh;
  display: flex;

  .historicOrders {
    width: 65%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .informationOrders {
    width: 35%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-left: 1px solid var(--border);
  }

  .informationOrders2 {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-left: 1px solid var(--border);
  }
}
</style>
