<template>
  <ModalPreview titleModal="Carrinho" @closeModal="closeModal">
    <div class="dataEmpresa" v-if="$fetchState.pending">
      Carregando dados do carrinho...
    </div>
    <div class="dataEmpresa" v-else>
      <h4>Desjejum</h4>
      <table class="resume-content">
        <thead>
          <tr v-if="dejejum.length !== 0">
            <th>Item</th>
            <th>Qtde</th>
            <th>V Unidade</th>
            <th>Fora de Estoque</th>
            <th>Tipo de Pepraro</th>
            <th>Total</th>
            <th>Opções</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in dejejum" :key="index">
            <td v-if="item.receita_descricao">{{ item.receita_descricao }}</td>
            <td v-else>{{ item.receita_descricao_foraEstoque }}</td>

            <td v-if="item.type_preparation === 'Fora de Estoque'" class="tdQtde" style="display: flex; justify-content: center">
              <button class="btnValue" @click="removeQuantidade(item.id, item.category)">
              <span>-</span>
            </button>       
            <pre>{{ item.qtde }} </pre>
            <button class="btnValue" @click="addQuantidade( item.id, item.category)">
              <span>+</span>
            </button>
          </td>

          <td v-else class="tdQtde" style="display: flex; justify-content: center">
              <button class="btnValue" @click="diminuirQuantidade(item.id, item.category)">
              <span>-</span>
            </button>       
            <pre>{{ item.qtde }}</pre>
            <button class="btnValue" @click="aumentarQuantidade( item.id, item.category)">
              <span>+</span>
            </button>  
          </td>  


            <td v-if="item.v_unidade"> R$ {{ item.v_unidade }}</td>
            <td v-else>R$ {{ item.v_unidade_foraEstoque }}</td>
            <td v-if="item.type_preparation === 'Fora de Estoque'">Fora de Estoque</td>

            <td v-else></td>
            <td v-if="item.method_of_preparation === 'roast'">Assado</td>
            <td v-else>Congelado</td>
            <td v-if="item.v_unidade"> R$ {{ totalValue(item.v_unidade, item.qtde).toFixed(2) }}</td>
            <td v-else>R${{ totalValue(item.v_unidade_foraEstoque, item.qtde).toFixed(2) }}</td>
            <td v-if="item.type_preparation === 'Fora de Estoque'">
            <img
              src="../../assets/icons/delete.svg"
              alt=""
              class="btnDelete"
              @click="deleteItemForaEstoque(item.id)"
              
            />
          </td>
          <td v-else>
            <img
              src="../../assets/icons/delete.svg"
              alt="normas"
              class="btnDelete"
              @click="deleteItem(item.id)"
            />
          </td>
          </tr>

          <tr v-if="dejejum.length === 0">
            Não possui...
          </tr>
          
        </tbody>
      </table>

      <h4>Lanche 01</h4>
      <table class="resume-content">
        <tr v-if="lanche01.length !== 0">
          <th>Item</th>
          <th>Qtde</th>
          <th>V. Unidade</th>
          <th>Fora de Estoque</th>
          <th>Tipo de Pepraro</th>
          <th>Total</th>
          <th>Opções</th>
        </tr>

        <tr v-for="(item, index) in lanche01" :key="index">
          <td v-if="item.receita_descricao">{{ item.receita_descricao }}</td>
          <td v-else>{{ item.receita_descricao_foraEstoque }}</td>

          <td v-if="item.type_preparation === 'Fora de Estoque'" class="tdQtde" style="display: flex; justify-content: center">
              <button class="btnValue" @click="removeQuantidade(item.id, item.category)">
              <span>-</span>
            </button>       
            <pre>{{ item.qtde }} </pre>
            <button class="btnValue" @click="addQuantidade( item.id, item.category)">
              <span>+</span>
            </button>
          </td>

          <td v-else class="tdQtde" style="display: flex; justify-content: center">
              <button class="btnValue" @click="diminuirQuantidade(item.id, item.category)">
              <span>-</span>
            </button>       
            <pre>{{ item.qtde }}</pre>
            <button class="btnValue" @click="aumentarQuantidade( item.id, item.category)">
              <span>+</span>
            </button>  
          </td>   

          <td v-if="item.v_unidade">R$ {{ item.v_unidade }}</td>
          <td v-else>R$ {{ item.v_unidade_foraEstoque }}</td>
          <td v-if="item.type_preparation === 'Fora de Estoque'"> Fora de Estoque</td>
          <td v-else></td>
          <td v-if="item.method_of_preparation === 'roast'">Assado</td>
          <td v-else>Congelado</td>
          <td v-if="item.v_unidade"> R$ {{ totalValue(item.v_unidade, item.qtde) }}</td>
          <td v-else> R$ {{ totalValue(item.v_unidade_foraEstoque, item.qtde) }}</td>
          
          <td v-if="item.type_preparation === 'Fora de Estoque'">
            <img
              src="../../assets/icons/delete.svg"
              alt=""
              class="btnDelete"
              @click="deleteItemForaEstoque(item.id)"
              
            />
          </td>
          <td v-else>
            <img
              src="../../assets/icons/delete.svg"
              alt="normas"
              class="btnDelete"
              @click="deleteItem(item.id)"
            />
          </td>
        </tr>
        <tr v-if="lanche01.length === 0">
          Não possui...
        </tr>

      </table>

      <h4>Lanche 02</h4>
      <table class="resume-content">
        <tr v-if="lanche02.length !== 0">
          <th>Item</th>
          <th>Qtde</th>
          <th>V. Unidade</th>
          <th>Fora de Estoque</th>
          <th>Tipo de Pepraro</th>
          <th>Total</th>
          <th>Opções</th>
        </tr>

        <tr v-for="(item, index) in lanche02" :key="index">
          <td v-if="item.receita_descricao">{{ item.receita_descricao }}</td>
          <td v-else>{{ item.receita_descricao_foraEstoque }}</td>
          <td v-if="item.type_preparation === 'Fora de Estoque'" class="tdQtde" style="display: flex; justify-content: center">
              <button class="btnValue" @click="removeQuantidade(item.id, item.category)">
              <span>-</span>
            </button>       
            <pre>{{ item.qtde }} </pre>
            <button class="btnValue" @click="addQuantidade( item.id, item.category)">
              <span>+</span>
            </button>
          </td>

          <td v-else class="tdQtde" style="display: flex; justify-content: center">
              <button class="btnValue" @click="diminuirQuantidade(item.id, item.category)">
              <span>-</span>
            </button>       
            <pre>{{ item.qtde }}</pre>
            <button class="btnValue" @click="aumentarQuantidade( item.id, item.category)">
              <span>+</span>
            </button>  
          </td>  

          <td v-if="item.v_unidade">R$ {{ item.v_unidade }}</td>
          <td v-else>R$ {{ item.v_unidade_foraEstoque }}</td>
          <td v-if="item.type_preparation === 'Fora de Estoque'">Fora de Estoque</td>
          <td v-else></td>
          <td v-if="item.method_of_preparation === 'roast'">Assado</td>
          <td v-else>Congelado</td>
          <td v-if="item.v_unidade">R$ {{ totalValue(item.v_unidade, item.qtde) }}</td>
          <td v-else>R$ {{ totalValue(item.v_unidade_foraEstoque, item.qtde) }}</td>
          <td v-if="item.type_preparation === 'Fora de Estoque'">
            <img
              src="../../assets/icons/delete.svg"
              alt=""
              class="btnDelete"
              @click="deleteItemForaEstoque(item.id)"
              
            />
          </td>
          <td v-else>
            <img
              src="../../assets/icons/delete.svg"
              alt="normas"
              class="btnDelete"
              @click="deleteItem(item.id)"
            />
          </td>
        </tr>
        <tr v-if="lanche02.length === 0">
          Não possui...
        </tr>
      </table>

      <div class="finalizar-pedido-content">
        <span> 
          Total Pedido:
          {{ valueOrder(countdejejum + countlanche01 + countlanche02) }}</span
        >
        <Button @click.native="finalizarPedido" title="Finalizar Pedido" />
      </div>
      
    </div>
        
  </ModalPreview>
</template>

<script lang="ts">
import Vue from 'vue'
import HttpPedidos from '@/server/pedidos'
export default Vue.extend({
  data() {
    return {
      dejejum: [],
      lanche01: [],
      lanche02: [],
      disabledBtn: true,

      countdejejum: 0,
      countlanche01: 0,
      countlanche02: 0,
      pedidosP: [],
      pedidosForaEstoque: []
      }
  },

  fetch() {
    this.renderList()
  },
  watch: {
    listaCompletaReceita: {
      handler(newValue) {
        this.$emit('listaAtualizadaDoModal', newValue)
      },
      deep: true,
    },
    listaForaEstoque: {
      handler(newValue) {
        this.$emit('listaAtualizadaForaEstoque', newValue)
      },
      deep: true,
    },

    dejejum: {
      handler() {
        this.countdejejum = 0
        this.dejejum.map((res) => {
          if (res.v_unidade_foraEstoque === undefined) {
            this.countdejejum =
              this.countdejejum + Number(res.qtde) * Number(res.v_unidade)
            return
          } else {
            this.countdejejum =
              this.countdejejum +
              Number(res.qtde) * Number(res.v_unidade_foraEstoque)
          }
        })
      },
      deep: true,
    },

    lanche01: {
      handler() {
        this.countlanche01 = 0
        this.lanche01.map((res) => {
          if (res.v_unidade_foraEstoque === undefined) {
            this.countlanche01 =
              this.countlanche01 + Number(res.qtde) * Number(res.v_unidade)
            return
          } else {
            this.countlanche01 =
              this.countlanche01 +
              Number(res.qtde) * Number(res.v_unidade_foraEstoque)
          }
        })
      },
      deep: true,
    },

    lanche02: {
      handler() {
        this.countlanche02 = 0
        this.lanche02.map((res) => {
          if (res.v_unidade_foraEstoque === undefined) {
            this.countlanche02 =
              this.countlanche02 + Number(res.qtde) * Number(res.v_unidade)
            return
          } else {
            this.countlanche02 =
              this.countlanche02 +
              Number(res.qtde) * Number(res.v_unidade_foraEstoque)
          }
        })
      },
      deep: true,
    },
  },
  methods: {
    totalValue(unity, qtde) {
      return Number(unity) * Number(qtde)
    },
    valueOrder(listOrder) {
      const formattedTotal = listOrder.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      })

      return formattedTotal
    },
    aumentarQuantidade(fk_revenue, fk_categoryOrderItem ) {
      this.$store.commit( 'aumentarQuantidade', { fk_revenue, fk_categoryOrderItem });  
      this.renderList()
    },
    diminuirQuantidade(fk_revenue, fk_categoryOrderItem) {
      this.$store.commit('diminuirQuantidade', { fk_revenue, fk_categoryOrderItem });
      this.renderList()
    },
    addQuantidade(fk_revenue, fk_categoryOrderItem ) {
      this.$store.commit( 'addItemForaEstoque', { fk_revenue, fk_categoryOrderItem });  
      this.renderList()
    },
    removeQuantidade(fk_revenue, fk_categoryOrderItem) {
      this.$store.commit('removeItemForaEstoque', { fk_revenue, fk_categoryOrderItem });
      this.renderList()
    },
    async renderList() {
      await this.$store.state.carrinhoProgramado.map(async (item) => {
        this.adicionarItem(item, this.dejejum, '491aebc2-1c69-11ee-be56-0242ac120002');
        this.adicionarItem(item, this.lanche01, '518a6828-1c69-11ee-be56-0242ac120002');
        this.adicionarItem(item, this.lanche02, '57c25f34-1c69-11ee-be56-0242ac120002');
      });

      await this.$store.state.carrinhoForaEstoque.map(async (item) => {
        this.adicionarItem(item, this.dejejum, '491aebc2-1c69-11ee-be56-0242ac120002', 'Fora de Estoque');
        this.adicionarItem(item, this.lanche01, '518a6828-1c69-11ee-be56-0242ac120002', 'Fora de Estoque');
        this.adicionarItem(item, this.lanche02, '57c25f34-1c69-11ee-be56-0242ac120002', 'Fora de Estoque');
      });
    },
    adicionarItem(item, array, categoria, type_preparation = '') {
    if (item.pedidos.fk_categoryOrderItem === categoria) {
      const newItem = {
        qtde: item.pedidos.amountItem,
        receita_descricao: item.listReceita.descriptionRevenue || item.listReceita.description,
        id: item.pedidos.fk_revenue,
        fk_revenue: item.pedidos.fk_revenue,
        category: item.pedidos.fk_categoryOrderItem,
        v_unidade: item.listReceita.valeuRevenue || item.listReceita.value,
        method_of_preparation: item.pedidos.method_of_preparation,
        type_preparation: type_preparation,
      };

      const index = array.findIndex(existingItem => existingItem.id === newItem.id);

      if (index !== -1) {
        this.$set(array, index, newItem);
      } else {
        array.push(newItem);
      }
    }
  },

    closeModal() {
      this.$emit('closeModal')
    },

    deleteItem(value) {
      this.$store.commit('removerPedidoProgramado', value)
      this.dejejum = []
      this.lanche01 = []
      this.lanche02 = []

      this.renderList()
    },

    deleteItemForaEstoque(value) {
      this.$store.commit('removerPedidoForaEstoque', value)
      this.dejejum = []
      this.lanche01 = []
      this.lanche02 = []

      this.renderList()
    },
    finalizarPedido() {
      this.pedidosP = this.$store.state.carrinhoProgramado.map((item) => {
        const pedidos = item.pedidos; 
        return pedidos; 
    });    
      this.pedidosForaEstoque =this.$store.state.carrinhoForaEstoque.map((item) => {
        const pedidos = item.pedidos; 
        return pedidos; 
    });
    
      const request ={
        fk_company: this.$store.state.unidadeCliente,
        fk_menu: this.$route.query.id,
        createOrderItemDto: this.pedidosP,
        createOrderNotMenuItemDto:  this.pedidosForaEstoque,
      }
      this.savePedido(request);

      
    },
    async savePedido(pedido){      
      if (pedido.createOrderItemDto.length === 0 && pedido.createOrderNotMenuItemDto.length === 0) {
        this.$toast.warning('Revise, nenhum pedido foi selecionado' );
      } else {
        try {
          const res = await HttpPedidos.CreateNewOrder(pedido);
          this.$toast.success('Pedido realizado com sucesso!!!');
          this.showModal = false;
          this.listaCompletaReceita = [];
          this.listaForaEstoque = [];
          this.$router.push('/pedidos/historico-pedidos');
          this.$store.commit('selectUnity', '');
        } catch (error) {
          const message = error.response.data.message;
          this.$toast.warning('Revise,' + message);
        }
      }
      
    }   
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
  .btnValue {
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
}
</style>
