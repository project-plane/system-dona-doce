<template>
  <div class="contentCardPedido">
    <div class="header-pedidos">
      <MenuPedidos :data-pedido="dataPedido" :qtdPedidos="listaCompletaReceita" @lancheDesjejum="lancheDesjejum"
        @lanche1="lanche1" @lanche2="lanche2" @finalizarPedido="finalizarPedido" />
      <div class="qtdPedidos" @click="() => (showModal = true)">
        <img src="~/assets/icons/shopCar.svg" />
        <span v-if="listaCompletaReceita.length > 0 || listaForaEstoque.length > 0">
          <p>{{ listaCompletaReceita.length + listaForaEstoque.length }}</p>
        </span>
        <p style="margin-left: 0.5rem">Carrinho</p>
      </div>
    </div>

    <ModalCarrinho v-if="showModal" :listaCompletaReceita="listaCompletaReceita" :listaForaEstoque="listaForaEstoque"
      @closeModal="() => (showModal = false)" @finalizarPedido="finalizarPedido"
      @listaAtualizadaDoModal="listaAtualizadaDoModal" @listaAtualizadaForaEstoque="listaAtualizadaForaEstoque" />

    <div v-if="statusDesjejum || statusLanche1 || statusLanche2" class="cardsPedidos">
      <div v-for="pedidosProgramation in revenueClient" :key="pedidosProgramation.id">
        <CardProgramation :tipo-lanches="pedidosProgramation" :tipo-pedido="tipoPedido" @pedidos="pedidos" />
      </div>
    </div>
    <h2>Fora do Cardapio</h2>
    <div class="cardsPedidos" v-if="foraEstoque.length > 3">
      <div v-for="p in foraEstoque" :key="p.id">
        <CardForaEstoque :foraDeEstoque="p" :tipo-pedido="tipoPedido" @pedidosForeEstoque="pedidosForeEstoque" />
      </div>
    </div>

    <div class="cardsPedidos unique" v-else>
      <div v-for="p in foraEstoque" :key="p.id">
        <CardForaEstoque :foraDeEstoque="p" :tipo-pedido="tipoPedido" @pedidosForeEstoque="pedidosForeEstoque" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import httpCardapio from '~/server/cardapio'
import HttpPedidos from '@/server/pedidos'
import httpRevenueClient from '@/server/receitas'
import httpMeusDados from '@/server/meusDados'

export default Vue.extend({
  data() {
    return {
      listaCompletaReceita: [],
      listaForaEstoque: [],
      statusDesjejum: true,
      statusLanche1: false,
      statusLanche2: false,
      listPedidos: [],
      dataPedido: '',
      tipoPedido: '491aebc2-1c69-11ee-be56-0242ac120002',
      showModal: false,
      addPedidos: {
        fk_menu: this.$route.query.id,
        createOrderItemDto: [],
        createOrderNotMenuItemDto: [],
      },
      i: 0,
      listAllRevenueClient: [],
      revenueClient: [],
      listReceita: [],
      foraEstoque: [],
      listProgramation: [],
      idClient: '',
    }
  },

  async fetch() {
    const id = this.$route.query.id
    this.dataPedido = this.$route.query.dataPedido

    await httpCardapio
      .GetFindMenu(id)
      .then((res) => {
        this.listPedidos = res.data
      })
      .catch((error) => {
        console.log(error)
      })

    await httpMeusDados
      .MeusDados()
      .then((res) => {
        this.idClient = res.data.id
      })
      .catch((error) => {
        console.log(error)
      })

    await httpRevenueClient
      .GetAllReceitaPorCliente(this.idClient)
      .then((res) => {
        this.listAllRevenueClient = res.data
      })
      .catch((error) => {
        console.log(error)
      })

    await httpRevenueClient
      .GetReceitas()
      .then((res) => {
        this.listReceita = res.data
        this.listReceita.map((item) => {
          if (item.status === 1) {
            this.listProgramation.push(item)
          }
        })
      })
      .catch((error) => {
        console.log(error)
      })

    this.listPedidos.itemMenu.map((pedidos) => {
      this.listAllRevenueClient.map((revenueClient) => {
        if (pedidos.revenues.description === revenueClient.description) {
          this.revenueClient.push({
            fk_revenues: pedidos.fk_revenues,
            descriptionRevenue: revenueClient.description,
            valeuRevenue: revenueClient.sale_value,
            imagem: pedidos.revenues.imagem,
          })
        }
      })
    })

    const foraEstoqueAtualizado = []
    this.listProgramation.find((fora) => {
      var itemV = this.revenueClient.find(
        (itemMenu) =>
          itemMenu.fk_revenues === fora.id
      )
      if (!itemV) {
        foraEstoqueAtualizado.push(fora)
      }
    })
    this.foraEstoque = foraEstoqueAtualizado
  },

  methods: {
    pedidos(qtdOrder, fk_revenue, index) {
      const existecategoryOrderItem = this.listaCompletaReceita.find((item) => {
        return (
          item.fk_categoryOrderItem === this.tipoPedido &&
          item.fk_revenue === fk_revenue
        )
      })
      if (existecategoryOrderItem) {
        this.$toast.error('Receita já adicionada ao pedido!!!')
        return
      }
      this.listaCompletaReceita.push({
        fk_categoryOrderItem: this.tipoPedido,
        amountItem: Number(qtdOrder),
        fk_revenue: fk_revenue,
        listReceita: index,
      })
      this.listPedidos.itemMenu.map((item) => {
        if (fk_revenue === item.revenues.id) {
          this.$toast.info(
            `(${qtdOrder}X) ${item.revenues.description} ADICIONADO AO CARRINHO`
          )
        }
      })
    },

    pedidosForeEstoque(qtdOrder, fk_revenue, index) {
      const existecategoryOrderItem = this.listaForaEstoque.find((item) => {
        return (
          item.fk_categoryOrderItem === this.tipoPedido &&
          item.fk_revenue === fk_revenue
        )
      })
      if (existecategoryOrderItem) {
        this.$toast.error('Receita já adicionada ao pedido!!!')
        return
      }
      this.listaForaEstoque.push({
        fk_categoryOrderItem: this.tipoPedido,
        amountItem: Number(qtdOrder),
        fk_revenue: fk_revenue,
        listReceita: index,
      })
      this.foraEstoque.map((item) => {

        if (fk_revenue === item.id) {
          this.$toast.info(
            `(${qtdOrder}X) ${item.description} ADICIONADO AO CARRINHO`
          )
        }
      })
    },

    async finalizarPedido() {
      if (this.listaCompletaReceita.length === 0 && this.listaForaEstoque.length === 0) {
        this.$toast.error('Insira ao menos um item para realizar pedido.')
      } else {
        this.listaCompletaReceita.map((item) => {
          this.addPedidos.createOrderItemDto.push({
            fk_categoryOrderItem: item.fk_categoryOrderItem,
            amountItem: Number(item.amountItem),
            fk_revenue: item.fk_revenue,
          })
        })

        this.listaForaEstoque.map((item) => {
          this.addPedidos.createOrderNotMenuItemDto.push({
            fk_categoryOrderItem: item.fk_categoryOrderItem,
            amountItem: Number(item.amountItem),
            fk_revenue: item.fk_revenue,
          })

        })

        await HttpPedidos.CreateNewOrder(this.addPedidos)
          .then((res) => {
            this.$toast.success('Pedido realizado com sucesso!!!')
          })
          .catch((error) => {
            console.log(error)
            this.$toast.info('Ocorreu um erro!')
          })
      }
    },

    listaAtualizadaDoModal(e) {
      this.listaCompletaReceita = e
    },

    listaAtualizadaForaEstoque(e) {
      this.listaForaEstoque = e
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

  .header-pedidos {
    display: flex;
    align-items: flex-end;

    .qtdPedidos {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      border-bottom: 1px solid #e5d7c5;
      background: #ea4e42;
      padding: 0.5rem 1rem;
      color: var(--white);
      height: 2.5rem;
      width: 7.5rem;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;

      img {
        width: 35px;
      }

      span {
        position: relative;
        top: -15px;
        left: -15px;
        color: var(--text_color) !important;

        p {
          width: 25px;
          height: 25px;
          display: flex;
          justify-content: center;
          align-items: center;
          background: var(--bg_color);
          color: var(--red) !important;
          border-radius: 50%;
          position: absolute;
          top: -10px;
        }
      }
    }
  }

  .foraEstoque {
    display: flex;
    flex-direction: column;
  }
}

.cardsPedidos {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  padding: 20px 0;
}

.unique {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
    }
</style>
