<template>
  <div class="lotesPage">
    <div class="historicOrders">
        <HeaderLotes title="Gerar Lotes"/>
        <div class="listCards" style="display: flex; flex-wrap: wrap; gap: .5rem;">
            <section class="filter" style="width: 100%;">
                <label for=""> Selecionar Todos</label>
                <input type="checkbox" name="" id="" >

            </section>
            <CardInfoLotes/>
            <CardInfoLotes/>
            <CardInfoLotes/>
            <CardInfoLotes/>
            <CardInfoLotes/>
        </div>
    </div>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>

<style scoped lang="scss">
.lotesPage {
    margin: 0 auto;
  max-width: 1380px;
  width: 98%;
  height: 100vh;
  display: flex;

  .historicOrders {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

}
</style>
