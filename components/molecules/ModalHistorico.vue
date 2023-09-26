<template>
  <ModalPreview title-modal="Detalhes do pedido" @closeModal="closeModal">
    <div class="menu-modal">
      <button v-if="typeContent" class="selected">Itens do Pedido</button>
      <button v-if="!typeContent" @click="() => typeContent = true">Itens do Pedido</button>
      <button  v-if="!typeContent" class="selected">Itens do Entrega</button>
      <button v-if="typeContent" @click="() => typeContent = false">Itens do Entrega</button>
    </div>
    <div v-if="typeContent" class="dataEmpresa">
      <div class="header-order">
        <h4>Data do Pedido: {{ formatDate(data.dateOrder) }}</h4>
        <h4>Status: {{ data.orderStatus.description }}</h4>
        <h4>Total: R${{ countdejejum + countlanche01 + countlanche02 }}</h4>
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

    <div v-else class="dataEmpresa">
      <div class="header-order">
        <h4>Data do Pedido: {{ formatDate(data.dateOrder) }}</h4>
        <h4>Status: {{ data.orderStatus.description }}</h4>
      </div>

      <form class="resume-content">
        <!-- <pre>{{ data }}</pre> -->
          <div class="input">
            <label for="">Número de Bandejas</label>
            <input id="bandeja" type="number">
          </div>

          <div class="input">
            <label for="">Número de Bandejas</label>
            <input id="bandeja" type="date">
          </div>
          

          <div class="input">
            <label for="">Cautela</label>
            <input id="bandeja" type="file"  accept="image/*,.pdf">
          </div>

          <div class="input">
            <label for="">Nota</label>
            <input id="bandeja" type="file"  accept="image/*,.pdf">
          </div>

          <div class="input">
            <label for="">Comprovante de Pagamento</label>
            <input id="bandeja" type="file"  accept="image/*,.pdf">
          </div>


          <Button title="Salvar" type.native="submit" :is-disabled="isDisabled" @click.native=""/>

      </form>
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
      isDisabled: false,
      typeContent: false
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

.menu-modal {
  display: flex;
  justify-content: center;
  margin-bottom: 1.3rem;

  button {
    width: 50%;
    font-size: 1.2rem;
    background-color: transparent;
    font-weight: 600;
  }

  .selected {
    color: var(--red);
  }
}
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

    .input {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-bottom: 1rem;

        label {
          font-size: 1rem;
          font-weight: 600;
        }

        input {
          width: 30%;
          text-align: center;
          border: 1px solid var(--red);
        }

        input[type=file] {
          padding: 0.5rem;
          border-radius: 0.25rem;
        }

        input[type=date] {
          padding: 0.5rem;
          border-radius: 0.25rem;
          filter: none;
        }

        input[type=date]::placeholder {
          color: red;
        }

      }

  }


}
</style>
