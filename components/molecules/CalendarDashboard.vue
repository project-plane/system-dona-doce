<template>
  <div class="descriptionCalendar">
    <div class="values">
      <div class="descriptionValue">
        <span class="vendas">Vendas</span>
        <div>
          <strong v-if="visualization">{{ valorVendas }}</strong>
          <strong v-else>R$: --------</strong>
        </div>
      </div>
      <div class="descriptionValue">
        <span class="compras">Compras</span>
        <div>
          <strong v-if="visualization">{{ valorCompras }}</strong>
          <strong v-else>R$: --------</strong>
        </div>
      </div>
      <div class="descriptionValue">
        <span class="lucro">Lucro</span>
        <div>
          <strong v-if="visualization">{{ valorTotal }}</strong>
          <strong v-else>R$: --------</strong>
        </div>
      </div>
    </div>
    <img v-if="visualization" @click="visualization = false" src="~/assets/icons/eye.svg" alt="" />
    <img v-else @click="visualization = true" src="~/assets/icons/eyeClose.svg" alt="" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import httpOrder from '@/server/pedidos'

export default Vue.extend({
  data() {
    return {
      visualization: true,
      valorVendas: null,
      valorCompras: null,
      valorTotal: null,
      listOrder: [],
    }
  },

  async fetch() {
    await httpOrder.OrderHistory().then((res) => {
      this.listOrder = res.data
      // console.log(this.listOrder)
    })

    const valorUniqOrder = []
    this.listOrder.map((e) => {
      valorUniqOrder.push(e.valueOrder)
    })

    const valorVendas = valorUniqOrder.reduce((soma, i) => {
      return soma + i
    })

    // converte o valor de vendas para moeda BRL
    const convertMoedasVendas = valorVendas.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
    })
    const convertyVendas = convertMoedasVendas.replace('R$', '').replace('.', '').replace(',', '.')

    this.valorVendas = convertMoedasVendas
    this.valorCompras = 2000

    // converte o valor de compras para moeda BRL
    const convertMoedasCompras = this.valorCompras.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
    })
    const convertyCompras = convertMoedasCompras.replace('R$', '').replace('.', '').replace(',', '.')

    this.valorCompras = convertMoedasCompras

    this.valorTotal = convertyVendas - convertyCompras
    // converte o valor total para moeda BRL
    const convertTotal = this.valorTotal.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
    })

    this.valorTotal = convertTotal
    // console.log(convertTotal);

  },
})
</script>

<style scoped lang="scss">
.descriptionCalendar {
  width: 100%;
  display: flex;
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
  }
}
</style>
