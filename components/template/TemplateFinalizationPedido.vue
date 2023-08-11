<template>
  <div class="contentCardPedido">
    <MenuPedidos :data-pedido="dataPedido" @lancheDesjejum="lancheDesjejum" @lanche1="lanche1" @lanche2="lanche2"
      @finalizarPedido="finalizarPedido" :qtdPedidos="addPedidos.createOrderItemDto"
      :listaCompletReceita="listaCompletReceita" />

    <div v-if="statusDesjejum || statusLanche1 || statusLanche2" class="cardsPedidos">
      <div v-for="pedidosProgramation in listPedidos" :key="pedidosProgramation.id">
        <CardProgramation :tipo-lanches="pedidosProgramation" :tipo-pedido="tipoPedido" @pedidos="pedidos" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import httpCardapio from '~/server/cardapio'
import HttpPedidos from '@/server/pedidos'

export default Vue.extend({
  data() {
    return {
      listaCompletReceita: [],
      statusDesjejum: true,
      statusLanche1: false,
      statusLanche2: false,
      listPedidos: [],
      dataPedido: '',
      tipoPedido: '491aebc2-1c69-11ee-be56-0242ac120002',
      addPedidos: {
        createOrderItemDto: [],
      },
    }
  },

  async fetch() {
    const id = this.$route.query.id
    this.dataPedido = this.$route.query.dataPedido

    await httpCardapio
      .GetFindMenu(id)
      .then((res) => {
        this.listPedidos = res.data.itemMenu
      })
      .catch((error) => {
        console.log(error)
      })
  },

  methods: {
    pedidos(qtdOrder, fk_revenue, index) {
      const existecategoryOrderItem = this.listaCompletReceita.find((item) => {
        return (
          item.fk_categoryOrderItem === this.tipoPedido &&
          item.fk_revenue === fk_revenue
        )
      })

      if (existecategoryOrderItem) {
        this.$toast.error('Receita já adicionada ao pedido!!!')
        return
      }

      this.addPedidos.createOrderItemDto.push({
        fk_categoryOrderItem: this.tipoPedido,
        amountItem: Number(qtdOrder),
        fk_revenue: fk_revenue,
      })
      this.listaCompletReceita.push({
        fk_categoryOrderItem: this.tipoPedido,
        amountItem: Number(qtdOrder),
        fk_revenue: fk_revenue,
        listReceita: index.revenues,
      })

      this.listPedidos.map((item) => {
        if (fk_revenue === item.revenues.id) {
          this.$toast.info(
            `(${qtdOrder}X) ${item.revenues.description} ADICIONADO AO CARRINHO`
          )
        }
        console.log(item.revenues.id)
      })
    },
    async finalizarPedido() {
      if (this.addPedidos.createOrderItemDto.length === 0) {
        this.$toast.error('Inserira ao menos um item para realizar pedido.')
        return
      }
      await HttpPedidos.CreateNewOrder(this.addPedidos)
        .then((res) => {
          this.$toast.success('Pedido realizado com sucesso!!!')
          console.log(res)
        })
        .catch((error) => {
          console.log(error)
          this.$toast.info('Ocorreu um erro!')
        })
    },
    lancheDesjejum() {
      this.tipoPedido = '491aebc2-1c69-11ee-be56-0242ac120002'
      this.statusDesjejum = true
      this.statusLanche1 = false
      this.statusLanche2 = false
    },
    lanche1() {
      this.tipoPedido = '518a6828-1c69-11ee-be56-0242ac120002'
      this.statusDesjejum = false
      this.statusLanche1 = true
      this.statusLanche2 = false
    },
    lanche2() {
      this.tipoPedido = '57c25f34-1c69-11ee-be56-0242ac120002'
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
  height: auto;
  background-color: var(--red);
  margin-top: 7vh;
  padding: 2rem 4rem;
}

.cardsPedidos {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  padding: 20px 0;
}
</style>
