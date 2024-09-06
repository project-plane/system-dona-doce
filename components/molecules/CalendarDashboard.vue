<template>
  <div class="descriptionCalendar">
    <div class="values">
      <div class="descriptionValue">
        <span class="vendas">Vendas</span>
        <div>
          <strong v-if="visualization"> {{ valueorder(valorVendas)  }}</strong>
          <strong v-else>R$: --------</strong>
        </div>
      </div>
      <div class="descriptionValue">
        <span class="compras">Compras</span>
        <div>
          <strong v-if="visualization"> {{ valueorder(valorCompras)  }}</strong>
          <strong v-else>R$: --------</strong>
        </div>
      </div>
      <!-- <div class="descriptionValue">
        <span class="lucro">Lucro</span>
        <div>
          <strong v-if="visualization">R$: {{ valorTotal }}</strong>
          <strong v-else>R$: --------</strong>
        </div>
      </div> -->
    </div>
    <div class="d-options">
      <div>
        <img @click="visualizationFin" class="img-carteira" src="~/assets/icons/icon-carteira.png" alt="" />
         <PreviewFinanceiro v-show="this.$store.state.openModalRelatorio" />
  
      </div>
      <div>
        <img v-if="visualization" @click="visualization = false" src="~/assets/icons/eye.svg" alt="" />
        <img v-else @click="visualization = true" src="~/assets/icons/eyeClose.svg" alt="" />
      </div>
    </div>
  </div>

</template>

<script lang="ts">
import Vue from 'vue'
import dayjs from '~/services/dayjs'
export default Vue.extend({
  data() {
    return {
      visualization: true,
      valorVendas: 0,
      valorCompras: this.$store.state.value_buy,
      valorComprasUpdate: 0,
      valorTotal: 0,
      listOrder: this.$store.state.listAllOrder,
    }
  },
  watch: {
    async listAllOrderComputed(newValue) {
      this.listOrder = []
      this.listOrder = newValue
      await this.atualizar();


    },

    async valueBuyComputed(newValue) {
      this.valorComprasUpdate = newValue
      await this.atualizar();


    }
  },
  computed: {
    listAllOrderComputed() {
      return this.$store.state.listAllOrder
    },

    valueBuyComputed() {
      return this.$store.state.value_buy
    },
    async fetch() {
      // await httpOrder.OrderHistory().then((res) => {
      // this.listOrder = this.$store.state.listAllOrder
      // console.log(this.listOrder)
      // })

      await this.atualizar();


      // console.log(convertTotal);
    },

  },
  methods: {
    visualizationFin(){
      this.$store.commit('OPEN_visualizationFin', true)
    },
    valueorder(number) {
      const value = dayjs.valueorder(number)
      return value
    },
    async atualizar() {
      const valorUniqOrder = []
      var valorVendasOrder = 0;
      this.listOrder.map((e) => {
        valorUniqOrder.push(e.valueOrder)
        valorVendasOrder += e.valueOrder
      })

      const valorVendas = valorVendasOrder

      // converte o valor de vendas para moeda BRL
      // const convertMoedasVendas = valorVendas.toLocaleString('pt-br', {
      //   style: 'currency',
      //   currency: 'BRL',
      // })
      // const convertyVendas = convertMoedasVendas
      //   .replace('R$', '')
      //   .replace('.', '')
      //   .replace(',', '.')

      this.valorVendas = valorVendasOrder

      this.valorCompras = this.valorComprasUpdate

      this.valorTotal = valorVendas - this.valorCompras

      // converte o valor de compras para moeda BRL
      // const convertMoedasCompras = this.valorCompras.toLocaleString('pt-br', {
      //   style: 'currency',
      //   currency: 'BRL',
      // })
      // const convertyCompras = convertMoedasCompras
      //   .replace('R$', '')
      //   .replace('.', '')
      //   .replace(',', '.')

      // this.valorCompras = convertMoedasCompras

      // converte o valor total para moeda BRL
      // const convertTotal = this.valorTotal.toLocaleString('pt-br', {
      //   style: 'currency',
      //   currency: 'BRL',
      // })

      // this.valorTotal = convertTotal
    }
  }
})
</script>

<style scoped lang="scss">
.descriptionCalendar {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4rem;
  padding: 1rem 0;
  border-bottom: 1px solid var(--border);

  .values {
    display: flex;
    gap: 3rem;
  }

  .descriptionValue {
    .vendas {
      color: var(--blue);
      font-weight: bold;
    }

    .compras {
      color: var(--red);
      font-weight: bold;
    }

    .lucro {
      color: var(--green);
      font-weight: bold;
    }

    strong {
      font-size: 1.6rem;
    }
  }

  img {
    cursor: pointer;
    height: 2rem;
  }

  .img-carteira{
    cursor: pointer;
    height: 2.5rem;
  }

  .d-options{
    gap: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
