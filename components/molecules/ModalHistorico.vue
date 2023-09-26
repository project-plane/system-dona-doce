<template>
  <ModalPreview title-modal="Detalhes do pedido" @closeModal="closeModal">
    <div class="dataEmpresa">
      <div class="header-order">
        <h3>Data do Pedido: {{ formatDate(data.dateOrder) }}</h3>
        <h3>Status: {{ data.orderStatus.description }}</h3>
        <h3>Total: R${{ countdejejum + countlanche01 + countlanche02 }}</h3>
      </div>

      <h4>Desjejum</h4>
      <table class="resume-content">
        <tr v-if="dejejum.length !== 0">
          <th>Item</th>
          <th>Qtde</th>
          <th>Imagem</th>
          <th>V. Unidade</th>
          <th>V. Total</th>
        </tr>
        
        <tr v-for="(item, index) in dejejum" :key="index" class="order-line">
          <td>{{ item.revenues.description }}</td>
          <td>{{ item.amountItem }}</td>
          <td> <img :src="`https://api.donadoce.gedroid.com/img_revenue/${item.revenues.imagem}`" alt=""></td>
          <td>R$ {{ item.valueOrderItem }}</td>
          <td>R$ {{ totalValue(item.valueOrderItem, item.amountItem) }}</td>
        </tr>
        <tr v-if="dejejum.length === 0">Não possui...</tr>
      </table>


      <h4>Lanche 01</h4>
      <table class="resume-content">
        <tr v-if="lanche01.length !== 0">
          <th>Item</th>
          <th>Qtde</th>
          <th>Imagem</th>
          <th>V. Unidade</th>
          <th>V. Total</th>
        </tr>
        
        <tr v-for="(item, index) in lanche01" :key="index" class="order-line">
          <td>{{ item.revenues.description }}</td>
          <td>{{ item.amountItem }}</td>
          <td> <img :src="`https://api.donadoce.gedroid.com/img_revenue/${item.revenues.imagem}`" alt=""></td>
          <td>R$ {{ item.valueOrderItem }}</td>
          <td>R$ {{ totalValue(item.valueOrderItem, item.amountItem) }}</td>
        </tr>
        <tr v-if="lanche01.length === 0">Não possui...</tr>
      </table>

      <h4>Lanche 02</h4>
      <table class="resume-content">
        <tr v-if="lanche02.length !== 0">
          <th>Item</th>
          <th>Qtde</th>
          <th>Imagem</th>
          <th>V. Unidade</th>
          <th>V. Total</th>
        </tr>
        
        <tr v-for="(item, index) in lanche02" :key="index" class="order-line">
          <td>{{ item.revenues.description }}</td>
          <td>{{ item.amountItem }}</td>
          <td> <img :src="`https://api.donadoce.gedroid.com/img_revenue/${item.revenues.imagem}`" alt=""></td>
          <td>R$ {{ item.valueOrderItem }}</td>
          <td>R$ {{ totalValue(item.valueOrderItem, item.amountItem) }}</td>
        </tr>

        <tr v-if="lanche02.length === 0">Não possui...</tr>
      </table>

  
      <Button v-if="data.orderStatus.description === 'Solicitado' || data.orderStatus.description === 'Agendado' || data.orderStatus.description === 'Pré-Produção'" title="Cancelar pedido" :is-disabled="isDisabled" @click.native="cancelAnOrder(data.id)"/>

    </div>

  </ModalPreview>
</template>

<script lang="ts">
import Vue from 'vue';
import dayjs from 'dayjs'
import httpOrder from '@/server/pedidos/index'

export default Vue.extend({
  props: {
    data: Object
  },

  data () {
    return {
      dejejum: [],
      lanche01: [],
      lanche02: [],
      countdejejum: 0,
      countlanche01: 0,
      countlanche02: 0,
      isDisabled: false
    }
  },

  created () {
      this.data.orderItem.map( (item) => {
        if(item.categoryOrderItem.description === 'Lanche 1') {
          this.lanche01.push(item)
        }
        if(item.categoryOrderItem.description === 'Dejejum') {
          this.dejejum.push(item)
        }
        if(item.categoryOrderItem.description === 'Lanche 2') {
          this.lanche02.push(item)
        }
      })

      this.dejejum.map( (res) => {
        this.countdejejum = this.countdejejum + (Number(res.amountItem) * Number(res.valueOrderItem))
      })

      this.lanche01.map( (res) => {
        this.countlanche01 = this.countlanche01 + (Number(res.amountItem) * Number(res.valueOrderItem))
      })

      this.lanche02.map( (res) => {
        this.countlanche02 = this.countlanche02 + (Number(res.amountItem) * Number(res.valueOrderItem))
      })
    },

  methods: {
    closeModal() {
			this.$emit("closeModal");
		},

    totalValue(unity, qtde) {
      return  Number(unity) * Number(qtde)
    }, 

    formatDate(date) {
      return dayjs(date).format('DD/MM/YYYY')
    },

    async cancelAnOrder(id) {
      this.isDisabled = true
      await httpOrder.DeleteOrder(id).then( () => {
        this.isDisabled = false
        this.$toast.error('Pedido Cancelado')
        this.closeModal()
      })
    }
  }
})
</script>

<style scoped lang="scss">
.dataEmpresa {
  width: 100%;
  display: flex;
  gap: 1rem;
  flex-direction: column;

  .header-order {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid var(--bg_color_modal);
  }

  .resume-content {
    width: 100%;
    text-align: center;
    border-bottom: 1px dotted var(--red);
    table-layout: fixed;

    tr {
      width: 100%;

      td {

        img {
          width: 2.5rem;
        }
      }

      td:nth-child(1), th:nth-child(1) {
        text-align: left;
      }
    }
    
  }


}
</style>
