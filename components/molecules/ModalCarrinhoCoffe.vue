<template>
  <ModalPreview titleModal="Carrinho" @closeModal="closeModal">
    <div class="dataEmpresa" v-if="$fetchState.pending">
      Carregando dados do carrinho...
    </div>
    <div class="dataEmpresa" v-else>
      <h4>Pedido</h4> 
         <div class="selectUnidades">
            <label for="" class="titleInput">Unidade:</label>
            <select @change="handleChange" name="" id="" class="inputContainer" style=" width: 12rem;" v-model="selectedUnit">
              <option value="" disabled>Selecionar Unidade</option>
              <option v-for="item in infoncliente" :value="item.fk_company" :key="item.fk_company">{{ item.company.corporate_name }}</option>
            </select>

        </div>   
      <table class="resume-content">
        <thead>
          <tr>
            <th colspan="2">Item</th>
            <th>Qtde</th>
            <th>V. Unidade</th>
            <th>Tipo de Pepraro</th>
            <th>Total</th>
            <th>Opções</th>
          </tr>
        </thead>
        <tr v-for="(data, index) in listaCompletaReceita" :key="index">
          <td colspan="2"> <span> {{ data.infoProduct.description }}</span> <br>
          <span style="font-size: 10px; color: var(--red); font-weight: 600; ">  Qtd. min: {{ data.infoProduct.base_min_amount }}</span>
          <span style="font-size: 10px; color: var(--red); font-weight: 600;" > x Qtd. max: {{ data.infoProduct.base_max_amount }}</span>
          </td> 
          <td class="tdQtde">
            <button @click="subtrairQuantidadeDoItem(data.infoProduct.id, -1)">
              <span>-</span>
            </button>
            {{ data.amountItem }}
            <button @click="atualizarAmountItem(data.infoProduct.id, +1)">
              <span>+</span>
            </button>
          </td>

          <td>R$ {{ data.infoProduct.value }}</td>
          <td>{{ data.method_of_preparation }}</td>
          
          <td>R$ {{ totalValue(data.infoProduct.value, data.amountItem) }}</td>
          <td>
            <img
              src="../../assets/icons/delete.svg"
              alt=""
              class="btnDelete"
              @click="deleteItem(data.infoProduct.id)"
            />
          </td>
        </tr>
      </table>
      <div class="finalizar-pedido-content">
        <span>Total Pedido: R$ {{ totalPedido }}</span>
        <Button @click.native="finalizarPedido" title="Finalizar Pedido" />
      </div>
    </div>

  </ModalPreview>
</template>

<script lang="ts">
import Vue from 'vue'
import http from "../../server/pedidos/index.js"
export default Vue.extend({
  props: {
    infoncliente:Object,
    listaCompletaReceita: {
      type: [Array, Object],
      required: true,
    },
  },

  data() {
    return {
      disabledBtn: true,
      dejejum: [],
      countdejejum: 0,
      dadosCarrinhoVuex: [],
      selectedUnit:null ,
      selectedValue: null 
    }
  },

  async fetch() {
    await this.renderList()
  },
  computed: {
    totalPedido() {
      let total = 0
      this.listaCompletaReceita.forEach((data) => {
        total += data.infoProduct.value * data.amountItem
      })
      return total
    },
  },
  methods: {
    handleChange() {
    console.log(this.selectedUnit);
    this.$store.commit("addOrder", { id: this.selectedUnit, data: null });
    },
    totalValue(unity, qtde) {
      return Number(unity) * Number(qtde)
    },
    closeModal() {
      this.$emit('closeModal')
    },
    atualizarAmountItem(fk_revenue, novoAmountItem) {
      this.$store.commit('atualizarAmountItem', { fk_revenue, novoAmountItem })
    },
    subtrairQuantidadeDoItem(fk_revenue, novoAmountItem) {
      this.$store.commit('atualizarAmountItem', { fk_revenue, novoAmountItem })
    },
    deleteItem(value) {
      this.$store.commit('removerPedido', value)
      
    },
    async finalizarPedido() {
     
     try{
      if(!this.selectedUnit) {
        this.$toast.error('Selecione uma unidade.');
      }
      await http.CreateNewOrderCoffe(this.$store.state.postCoffe).then(response => {
      console.log('Resposta da requisição:', response.data);
      this.$emit('closeModal')
      this.$toast.info('Pedidos Realizados!')
      setTimeout(function(){
          location.reload();
      }, 4000);
      
      })
     }
     catch (error) {
      this.$toast.error('Houve um erro ao processar a solicitação.');
      }
      },
  },

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
        button {
          width: 30px;
          height: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          color: var(--white);
          background: var(--blue);
          font-size: 1rem;
        }

        .btnDisabled {
          background: gray;
          cursor: no-drop;
        }
      }

      .btnDelete {
        width: 1.2rem;
        cursor: pointer;
      }

      td:nth-child(1),
      th:nth-child(1) {
        text-align: left;
      }

      .tdQtde {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
      }
    }
  }

  .finalizar-pedido-content {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      font-weight: 600;
      font-size: 1.4rem;
    }
  }
}
</style>
