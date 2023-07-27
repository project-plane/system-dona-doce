<template>
  <div class="contentCardPedido">
    <MenuPedidos
      :data-pedido="dataPedido"
      @lancheDesjejum="lancheDesjejum"
      @lanche1="lanche1"
      @lanche2="lanche2"
      @lanche3="lanche3"
    />

    <div v-if="statusDesjejum" class="cardsPedidos">
      <div
        v-for="pedidosProgramation in listPedidos"
        :key="pedidosProgramation.id"
      >
        <CardProgramation :tipo-lanches="pedidosProgramation" tipo-pedido="491aebc2-1c69-11ee-be56-0242ac120002" />
      </div>
    </div>
    <div v-if="statusLanche1" class="cardsPedidos">
      <div
        v-for="pedidosProgramation in listPedidos"
        :key="pedidosProgramation.id"
      >
        <CardProgramation :tipo-lanches="pedidosProgramation" tipo-pedido="518a6828-1c69-11ee-be56-0242ac120002"/>
      </div>
    </div>
    <div v-if="statusLanche2" class="cardsPedidos">
      <div
        v-for="pedidosProgramation in listPedidos"
        :key="pedidosProgramation.id"
      >
        <CardProgramation :tipo-lanches="pedidosProgramation" tipo-pedido="57c25f34-1c69-11ee-be56-0242ac120002"/>
      </div>
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
    },
    lanche1() {
      this.statusDesjejum = false
      this.statusLanche1 = true
      this.statusLanche2 = false
    },
    lanche2() {
      this.statusDesjejum = false
      this.statusLanche1 = false
      this.statusLanche2 = true
    },
    lanche3() {
      this.statusDesjejum = false
      this.statusLanche1 = false
      this.statusLanche2 = true
    },
  },
})
</script>

<style scoped lang="scss">
.contentCardPedido {
  width: 100%;
  margin-top: 10vh;
  padding: 2rem 4rem;
}
.cardsPedidos {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  padding: 20px 0;
}
</style>
