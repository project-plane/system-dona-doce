<template>
  <div>
    <NavBarPedidos />
    <div class="content">
      <Nuxt />
    </div>
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
.content {
  width: 100%;
  height: 90vh;
  margin-top: 10vh;
  background: var(--red);
  display: flex;
  flex-direction: column;
  padding: 2rem;
}
</style>
