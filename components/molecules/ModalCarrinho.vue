<template>
  <ModalPreview titleModal="Carrinho" @closeModal="closeModal">
    <div class="dataEmpresa" v-if="$fetchState.pending">
      Carregando dados do carrinho...
    </div>
    <div class="dataEmpresa" v-else>
      <h4>Dejejum</h4>
      <table class="resume-content">
        <thead>
          <tr v-if="dejejum.length !== 0">
            <th>Item</th>
            <th>Qtde</th>
            <th>V. Unidade</th>
            <th>Total</th>
            <th>Opções</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in dejejum" :key="index">
            <td v-if="item.receita_descricao">{{ item.receita_descricao }}</td>
            <td v-else>{{ item.receita_descricao_foraEstoque }}</td>
            <td class="tdQtde">
              <button @click="subtractValue(item)" v-if="item.qtde !== 1">
                <span>-</span>
              </button>
              <button class="btnDisabled" v-else>
                <span>-</span>
              </button>
              {{ item.qtde }}
              <button @click="addValue(item)">+</button>
            </td>
            <td v-if="item.v_unidade">R$ {{ item.v_unidade }}</td>
            <td v-else>R$ {{ item.v_unidade_foraEstoque }}</td>
            <td v-if="item.v_unidade">R$ {{ totalValue(item.v_unidade, item.qtde) }}</td>
            <td v-else>R$ {{ totalValue(item.v_unidade_foraEstoque, item.qtde) }}</td>
            <td>
              <img src="../../assets/icons/delete.svg" alt="" class="btnDelete" @click="deleteItem(item)">
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
          <th>Total</th>
          <th>Opções</th>
        </tr>

        <tr v-for="(item, index) in lanche01" :key="index">
          <td v-if="item.receita_descricao">{{ item.receita_descricao }}</td>
          <td v-else>{{ item.receita_descricao_foraEstoque }}</td>
          <td class="tdQtde">
            <button @click="subtractValue(item)" v-if="item.qtde !== 1">
              <span>-</span>
            </button>
            <button class="btnDisabled" v-else>
              <span>-</span>
            </button>
            {{ item.qtde }}
            <button @click="addValue(item)">+</button>
          </td>
          <td v-if="item.v_unidade">R$ {{ item.v_unidade }}</td>
          <td v-else>R$ {{ item.v_unidade_foraEstoque }}</td>
          <td v-if="item.v_unidade">R$ {{ totalValue(item.v_unidade, item.qtde) }}</td>
          <td v-else>R$ {{ totalValue(item.v_unidade_foraEstoque, item.qtde) }}</td>
          <td>
            <img src="../../assets/icons/delete.svg" alt="" class="btnDelete" @click="deleteItem(item)">
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
          <th>Total</th>
          <th>Opções</th>
        </tr>

        <tr v-for="(item, index) in lanche02" :key="index">
          <td v-if="item.receita_descricao">{{ item.receita_descricao }}</td>
          <td v-else>{{ item.receita_descricao_foraEstoque }}</td>
          <td class="tdQtde">
            <button @click="subtractValue(item)" v-if="item.qtde !== 1">
              <span>-</span>
            </button>
            <button class="btnDisabled" v-else>
              <span>-</span>
            </button>
            {{ item.qtde }}
            <button @click="addValue(item)">+</button>
          </td>
          <td v-if="item.v_unidade">R$ {{ item.v_unidade }}</td>
          <td v-else>R$ {{ item.v_unidade_foraEstoque }}</td>
          <td v-if="item.v_unidade">R$ {{ totalValue(item.v_unidade, item.qtde) }}</td>
          <td v-else>R$ {{ totalValue(item.v_unidade_foraEstoque, item.qtde) }}</td>
          <td>
            <img src="../../assets/icons/delete.svg" alt="" class="btnDelete" @click="deleteItem(item)">
          </td>
        </tr>
        <tr v-if="lanche02.length === 0">
          Não possui...
        </tr>
      </table>
      <div class="finalizar-pedido-content">
        <span>Total Pedido: R$ {{ countdejejum + countlanche01 + countlanche02 }}</span>
        <Button @click.native="finalizarPedido" title="Finalizar Pedido" />
      </div>
    </div>

  </ModalPreview>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    listaCompletaReceita: {
      type: [Array, Object],
      required: true,
    },
    listaForaEstoque: {
      type: [Array, Object],
      required: true,
    },
  },

  data() {
    return {
      dejejum: [],
      lanche01: [],
      lanche02: [],
      disabledBtn: true,

      countdejejum: 0,
      countlanche01: 0,
      countlanche02: 0
    }
  },

  async fetch() {
    await this.renderList()
  },

  watch: {
    listaCompletaReceita: {
      handler(newValue) {
        console.log(newValue)
        this.$emit('listaAtualizadaDoModal', newValue)
      },
      deep: true
    },
    listaForaEstoque: {
      handler(newValue) {
        console.log(newValue)
        this.$emit('listaAtualizadaForaEstoque', newValue)
      },
      deep: true
    },

    dejejum: {
      handler() {
        this.countdejejum = 0
        this.dejejum.map((res) => {
          if (res.v_unidade_foraEstoque === undefined) {
            this.countdejejum = this.countdejejum + (Number(res.qtde) * Number(res.v_unidade))
            return
          } else {
            this.countdejejum = this.countdejejum + (Number(res.qtde) * Number(res.v_unidade_foraEstoque))
          }
        })
      },
      deep: true
    },

    lanche01: {
      handler() {
        this.countlanche01 = 0
        this.lanche01.map((res) => {
          if (res.v_unidade_foraEstoque === undefined) {
            this.countlanche01 = this.countlanche01 + (Number(res.qtde) * Number(res.v_unidade))
            return
          } else {
            this.countlanche01 = this.countlanche01 + (Number(res.qtde) * Number(res.v_unidade_foraEstoque))
          }
        })
      },
      deep: true
    },

    lanche02: {
      handler() {
        this.countlanche02 = 0
        this.lanche02.map((res) => {
          if (res.v_unidade_foraEstoque === undefined) {
            this.countlanche02 = this.countlanche02 + (Number(res.qtde) * Number(res.v_unidade))
            return
          } else {
            this.countlanche02 = this.countlanche02 + (Number(res.qtde) * Number(res.v_unidade_foraEstoque))
          }
        })
      },
      deep: true
    }
  },

  methods: {
    totalValue(unity, qtde) {
      return Number(unity) * Number(qtde)
    },

    async renderList() {
      await this.listaCompletaReceita.map(async (item) => {
        if (
          item.fk_categoryOrderItem === '491aebc2-1c69-11ee-be56-0242ac120002'
        ) {
          this.dejejum.push({
            qtde: item.amountItem,
            receita_descricao: item.listReceita.descriptionRevenue,
            category: item.fk_categoryOrderItem,
            v_unidade: item.listReceita.valeuRevenue,
          })
        }

        if (
          item.fk_categoryOrderItem === '518a6828-1c69-11ee-be56-0242ac120002'
        ) {
          this.lanche01.push({
            qtde: item.amountItem,
            receita_descricao: item.listReceita.descriptionRevenue,

            category: item.fk_categoryOrderItem,
            v_unidade: item.listReceita.valeuRevenue,

          })
        }

        if (
          item.fk_categoryOrderItem === '57c25f34-1c69-11ee-be56-0242ac120002'
        ) {
          this.lanche02.push({
            qtde: item.amountItem,
            receita_descricao: item.listReceita.descriptionRevenue,

            category: item.fk_categoryOrderItem,
            v_unidade: item.listReceita.valeuRevenue,

          })
        }
      })

      await this.listaForaEstoque.map(async (item) => {
        if (
          item.fk_categoryOrderItem === '491aebc2-1c69-11ee-be56-0242ac120002'
        ) {
          this.dejejum.push({
            qtde: item.amountItem,
            receita_descricao: item.listReceita.descriptionRevenue,
            receita_descricao_foraEstoque: item.listReceita.description,
            category: item.fk_categoryOrderItem,
            v_unidade: item.listReceita.valeuRevenue,
            v_unidade_foraEstoque: item.listReceita.value
          })
        }

        if (
          item.fk_categoryOrderItem === '518a6828-1c69-11ee-be56-0242ac120002'
        ) {
          this.lanche01.push({
            qtde: item.amountItem,
            receita_descricao: item.listReceita.descriptionRevenue,
            receita_descricao_foraEstoque: item.listReceita.description,
            category: item.fk_categoryOrderItem,
            v_unidade: item.listReceita.valeuRevenue,
            v_unidade_foraEstoque: item.listReceita.value
          })
        }

        if (
          item.fk_categoryOrderItem === '57c25f34-1c69-11ee-be56-0242ac120002'
        ) {
          this.lanche02.push({
            qtde: item.amountItem,
            receita_descricao: item.listReceita.descriptionRevenue,
            receita_descricao_foraEstoque: item.listReceita.description,
            category: item.fk_categoryOrderItem,
            v_unidade: item.listReceita.valeuRevenue,
            v_unidade_foraEstoque: item.listReceita.value
          })
        }
      })
    },

    closeModal() {
      this.$emit('closeModal')
    },
    subtractValue(value) {
      value.qtde--

      this.listaCompletaReceita.map((item) => {
        if (item.listReceita.description === value.receita_descricao && item.fk_categoryOrderItem === value.category) {
          item.amountItem = value.qtde
        }
      })
    },
    addValue(value) {
      value.qtde++

      this.listaCompletaReceita.map((item) => {
        if (item.listReceita.description === value.receita_descricao && item.fk_categoryOrderItem === value.category) {
          item.amountItem = value.qtde
        }
      })
    },

    deleteItem(value) {
      const listaTemporaria = this.listaCompletaReceita
      listaTemporaria.map((item) => {
        if (item.listReceita.descriptionRevenue === value.receita_descricao && item.fk_categoryOrderItem === value.category) {
          const indice = listaTemporaria.indexOf(item);
          console.log(indice);

          // eslint-disable-next-line vue/no-mutating-props
          this.listaCompletaReceita.splice(indice, 1)
        }
      })

      const listaTemporariaForaEstoque = this.listaForaEstoque
      listaTemporariaForaEstoque.map((item) => {
        if (item.listReceita.descriptionRevenue === value.receita_descricao && item.fk_categoryOrderItem === value.category) {
          const indice = listaTemporariaForaEstoque.indexOf(item);

          // eslint-disable-next-line vue/no-mutating-props
          this.listaForaEstoque.splice(indice, 1)
        }
      })
      this.dejejum = []
      this.lanche01 = []
      this.lanche02 = []

      this.renderList()
    },

    finalizarPedido() {
      this.$emit('finalizarPedido')
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
