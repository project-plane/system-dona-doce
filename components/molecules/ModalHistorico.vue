<template>
  <ModalPreview titleModal="Detalhes do pedido" @closeModal="closeModal">
    <div class="dataEmpresa">
      <div class="header-order">
        <h3>Data do Pedido: {{ formatDate(data.dateOrder) }}</h3>
        <h3>Valor do Pedido: R${{ data.valueOrder }}</h3>
      </div>

      <h4>Desjejum</h4>
      <table class="resume-content">
        <tr v-if="dejejum.length !== 0">
          <th>Item</th>
          <th>Qtde</th>
          <th>Imagem</th>
          <th>Valor</th>
        </tr>
        
        <tr v-for="(item, index) in dejejum" :key="index" class="order-line">
          <td>{{ item.revenues.description }}</td>
          <td>{{ item.amountItem }}</td>
          <td> <img :src="`https://api.donadoce.gedroid.com/img_revenue/${item.revenues.imagem}`" alt=""></td>
          <td>R$ {{ item.valueOrderItem }}</td>
        </tr>
        <tr v-if="dejejum.length === 0">Não possui...</tr>
      </table>


      <h4>Lanche 01</h4>
      <table class="resume-content">
        <tr v-if="lanche01.length !== 0">
          <th>Item</th>
          <th>Qtde</th>
          <th>Imagem</th>
          <th>Valor</th>
        </tr>
        
        <tr v-for="(item, index) in lanche01" :key="index" class="order-line">
          <td>{{ item.revenues.description }}</td>
          <td>{{ item.amountItem }}</td>
          <td> <img :src="`https://api.donadoce.gedroid.com/img_revenue/${item.revenues.imagem}`" alt=""></td>
          <td>R$ {{ item.valueOrderItem }}</td>
        </tr>
        <tr v-if="lanche01.length === 0">Não possui...</tr>
      </table>

      <h4>Lanche 02</h4>
      <table class="resume-content">
        <tr v-if="lanche02.length !== 0">
          <th>Item</th>
          <th>Qtde</th>
          <th>Imagem</th>
          <th>Valor</th>
        </tr>
        
        <tr v-for="(item, index) in lanche02" :key="index" class="order-line">
          <td>{{ item.revenues.description }}</td>
          <td>{{ item.amountItem }}</td>
          <td> <img :src="`https://api.donadoce.gedroid.com/img_revenue/${item.revenues.imagem}`" alt=""></td>
          <td>R$ {{ item.valueOrderItem }}</td>
        </tr>

        <tr v-if="lanche02.length === 0">Não possui...</tr>
      </table>


      
    </div>
  </ModalPreview>
</template>

<script lang="ts">
import Vue from 'vue';
import dayjs from 'dayjs'
export default Vue.extend({
  props: {
    data: Object
  },

  data () {
    return {
      dejejum: [],
      lanche01: [],
      lanche02: []
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
    },
  methods: {
    closeModal() {
			this.$emit("closeModal");
		},

    formatDate(date) {
      return dayjs(date).format('DD/MM/YYYY')
    },
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
  }

  .resume-content {
    text-align: left;
    border-bottom: 1px dotted var(--red);

    td {

      img {
        width: 2.5rem;
      }
    }
  }
}
</style>
