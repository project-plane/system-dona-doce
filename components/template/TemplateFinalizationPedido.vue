<template>
  <div v-if="loading">
    <Loading/>

  </div>
  <div v-else class="contentCardPedido">
    <div class="selectUnidades" style="display: grid; width: 100%;justify-content: flex-end;">
        <label  class="titleInput">Unidade:</label>
        <select @change="handleChange" name="" id="" class="inputContainer" style=" width: 12rem; height: 2.5rem" v-model="selectedUnit">
          <option value="" disabled>Selecionar Unidade</option>
          <option v-for="item in dataClientes" :value="item.fk_company" :key="item.fk_company">{{ item.company.corporate_name }}</option>
        </select>
    </div>
    <div class="header-pedidos">

      <MenuPedidos :data-pedido="dataPedido" :qtdPedidos="listaCompletaReceita" @lancheDesjejum="lancheDesjejum"
        @lanche1="lanche1" @lanche2="lanche2" @finalizarPedido="finalizarPedido" />

        <div class="qtdPedidos" @click="showCar">
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
        <CardProgramation :tipo-lanches="pedidosProgramation" :tipo-pedido="tipoPedido" @pedidos="pedidos" :base_max_amount="pedidosProgramation.base_max_amount" :base_min_amount="pedidosProgramation.base_min_amount" />
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
import httpCompany from '@/server/ClientCompany'
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
      loading: false,
      selectedUnit: null,
      addPedidos: {
        fk_company: this.$store.state.unidadeCliente,
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
      dataClientes:[]
    }
  },

  async fetch() {
    const id = this.$route.query.id
    this.dataPedido = this.$route.query.dataPedido
   this.loading = true;
    await httpCompany.getUnidades().then((res) => {
        this.dataClientes =res.data

      })

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
      .GetReceitasForaDoMenu(id)
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
            base_max_amount: pedidos.revenues.base_max_amount,
            base_min_amount: pedidos.revenues.base_min_amount,
          
          })
        }

      })

    })

    const foraEstoqueAtualizado = []
    this.listProgramation.find((fora) => {
      var itemV = this.revenueClient.find(
        (itemMenu) => itemMenu.fk_revenues === fora.id
      )
      if (!itemV) {
        foraEstoqueAtualizado.push(fora)
      }
    })
    this.foraEstoque = foraEstoqueAtualizado
    this.loading = false;

  },

  methods: {
    handleChange() {
    this.addPedidos.fk_company= this.selectedUnit
    this.$store.commit('selectUnity',this.selectedUnit)


    },

    pedidos(qtdOrder, fk_revenue, index, typeOrder, pedidos) {
      
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
        method_of_preparation: typeOrder,
        observacoesDoPedido: pedidos
      })
      this.listPedidos.itemMenu.map((item) => {
        if (fk_revenue === item.revenues.id) {
          this.$toast.info(
            `(${qtdOrder}X) ${item.revenues.description} ADICIONADO AO CARRINHO`
          )
        }
      })
    },

    pedidosForeEstoque(qtdOrder, fk_revenue, index, typeOrder, pedidos) {
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
        method_of_preparation: typeOrder,
        observacoesDoPedido: pedidos
      })
      this.foraEstoque.map((item) => {
        if (fk_revenue === item.id) {
          this.$toast.info(
            `(${qtdOrder}X) ${item.description} ADICIONADO AO CARRINHO`
          )
        }
      })
    },
    showCar(){
      if (!this.$store.state.unidadeCliente) {
        this.$toast.error('Selecione uma unidade')
        return
      }
      else{
        this.showModal = true
      }
    },
    async finalizarPedido(e) {
      if (
        this.listaCompletaReceita.length === 0 &&
        this.listaForaEstoque.length === 0
      ) {
        this.$toast.error('Insira ao menos um item para realizar pedido.')
      } else {
        this.listaCompletaReceita.map((item) => {
          this.addPedidos.createOrderItemDto.push({
            fk_categoryOrderItem: item.fk_categoryOrderItem,
            amountItem: Number(item.amountItem),
            fk_revenue: item.fk_revenue,
            method_of_preparation: item.method_of_preparation,
            comment: item.observacoesDoPedido
          })
        })

        this.listaForaEstoque.map((item) => {
          this.addPedidos.createOrderNotMenuItemDto.push({
            fk_categoryOrderItem: item.fk_categoryOrderItem,
            amountItem: Number(item.amountItem),
            fk_revenue: item.fk_revenue,
            method_of_preparation: item.method_of_preparation,
            comment: item.observacoesDoPedido
          })
        })
        console.log(this.addPedidos);

        await HttpPedidos.CreateNewOrder(this.addPedidos)
          .then((res) => {
            this.$toast.success('Pedido realizado com sucesso!!!')
            this.showModal = false
            this.listaCompletaReceita = []
            this.listaForaEstoque = []
            this.$router.push('/pedidos/historico-pedidos')
            this.$store.commit('selectUnity','')
          })
          .catch((error) => {
            console.log(error)
            this.$toast.info('Ocorreu um erro!')
          })
      }

    },

    listaAtualizadaDoModal(e) {
      this.listaCompletaReceita = e
      console.log(e);
      
    },

    listaAtualizadaForaEstoque(e) {
      this.listaForaEstoque = e
      console.log(e);
      
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
