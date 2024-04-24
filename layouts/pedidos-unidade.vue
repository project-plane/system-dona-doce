<template>

  <div class="templatePedidos">
    <NavBarPedidosUnidade />
    <Nuxt />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'


export default Vue.extend({
  methods: {
    routePedido() {
      this.$store.commit('BARRA_PEDIDOS_NAV', true)
      this.$router.push('/pedidos/newPedidos')
    },


  },

})
</script>

<style scoped lang="scss">

.templatePedidos {
  width: 100%;
  min-height: 100vh;
  background-color: var(--red);
}
</style>
