<template>
  <div class="contentCardPedido">
    <MenuPedidos
      @lancheDesjejum="lancheDesjejum"
      @lanche1="lanche1"
      @lanche2="lanche2"
      @lanche3="lanche3"
      :dataPedido="dataPedido"
    />

    <div v-if="listPedidos[0] && statusDesjejum" class="cardsPedidos">
      <CardFinalizationPedido :tipoLanches="listPedidos[0]" />
    </div>
    <div v-if="listPedidos[1] && statusLanche1" class="cardsPedidos">
      <CardFinalizationPedido :tipoLanches="listPedidos[1]" />
    </div>
    <div v-if="listPedidos[2] && statusLanche2" class="cardsPedidos">
      <CardFinalizationPedido :tipoLanches="listPedidos[2]" />
    </div>
    <div v-if="listPedidos[3] && statusLanche3" class="cardsPedidos">
      <CardFinalizationPedido :tipoLanches="listPedidos[3]" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import httpPedidos from '~/server/cardapio'

export default Vue.extend({
  data() {
    return {
      statusDesjejum: true,
      statusLanche1: false,
      statusLanche2: false,
      statusLanche3: false,
      listPedidos: [],
      dataPedido: '',
    }
  },

  async fetch() {
    const id = this.$route.query.id
    this.dataPedido = this.$route.query.dataPedido

    await httpPedidos
      .GetFindMenu(id)
      .then((res) => {
        this.listPedidos = res.data.itemMenu
        console.log(res.data)
      })
      .catch((error) => {
        console.log(error)
      })
  },

  methods: {
    lancheDesjejum() {
      this.statusDesjejum = true
      this.statusLanche1 = false
      this.statusLanche2 = false
      this.statusLanche3 = false
    },
    lanche1() {
      this.statusDesjejum = false
      this.statusLanche1 = true
      this.statusLanche2 = false
      this.statusLanche3 = false
    },
    lanche2() {
      this.statusDesjejum = false
      this.statusLanche1 = false
      this.statusLanche2 = true
      this.statusLanche3 = false
    },
    lanche3() {
      this.statusDesjejum = false
      this.statusLanche1 = false
      this.statusLanche2 = false
      this.statusLanche3 = true
    },
  },
})
</script>

<style scoped lang="scss">
.cardsPedidos {
  padding: 20px 0;
}
</style>
