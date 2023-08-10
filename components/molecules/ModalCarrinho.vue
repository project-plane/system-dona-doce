<template>
  <ModalPreview
    titleModal="Carrinho - Ainda em Desenvolvimento"
    @closeModal="closeModal"
  >
    <div class="dataEmpresa" v-if="$fetchState.pending">
      Carregando dados do carrinho...
    </div>
    <div class="dataEmpresa" v-else>
      <h4>Desjejum</h4>
      <table class="resume-content">
        <thead>
          <tr v-if="desjejum.length !== 0">
            <th>Item</th>
            <th>Qtde</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(item, index) in desjejum" :key="index">
            <td>{{ item.receita_descricao }}</td>
            <td class="tdQtde">
              <button
                class="btnValue"
                @click="subtractValue(item)"
                v-if="item.qtde !== 1"
              >
                <span>-</span>
              </button>
              {{ item.qtde }}
              <button class="btnValue" @click="addValue(item)">+</button>
            </td>
          </tr>
          <tr v-if="desjejum.length === 0">
            Não possui...
          </tr>
        </tbody>
      </table>

      <h4>Lanche 01</h4>
      <table class="resume-content">
        <tr v-if="lanche01.length !== 0">
          <th>Item</th>
          <th>Qtde</th>
        </tr>

        <tr v-for="(item, index) in lanche01" :key="index">
          <td>{{ item.receita_descricao }}</td>
          <td class="tdQtde">
            <button
              class="btnValue"
              @click="subtractValue(item)"
              v-if="item.qtde !== 1"
            >
              <span>-</span>
            </button>
            {{ item.qtde }}
            <button class="btnValue" @click="addValue(item)">+</button>
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
        </tr>

        <tr v-for="(item, index) in lanche02" :key="index">
          <td>{{ item.receita_descricao }}</td>
          <td class="tdQtde">
            <button
              class="btnValue"
              @click="subtractValue(item)"
              v-if="item.qtde !== 1"
            >
              <span>-</span>
            </button>
            {{ item.qtde }}
            <button class="btnValue" @click="addValue(item)">+</button>
          </td>
        </tr>
        <tr v-if="lanche02.length === 0">
          Não possui...
        </tr>
      </table>
      <Button @click.native="salvarPedido" title="Salvar" />
    </div>
  </ModalPreview>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    listaCompletReceita: {
      type: [Array, Object],
      required: true,
    },
  },

  data() {
    return {
      desjejum: [],
      lanche01: [],
      lanche02: [],
      disabledBtn: true,
    }
  },

  async fetch() {
    await this.listaCompletReceita.map(async (item) => {
      if (
        item.fk_categoryOrderItem === '491aebc2-1c69-11ee-be56-0242ac120002'
      ) {
        this.desjejum.push({
          qtde: item.amountItem,
          receita_descricao: item.listReceita.description,
        })
      }

      if (
        item.fk_categoryOrderItem === '518a6828-1c69-11ee-be56-0242ac120002'
      ) {
        this.lanche01.push({
          qtde: item.amountItem,
          receita_descricao: item.listReceita.description,
        })
      }

      if (
        item.fk_categoryOrderItem === '57c25f34-1c69-11ee-be56-0242ac120002'
      ) {
        this.lanche02.push({
          qtde: item.amountItem,
          receita_descricao: item.listReceita.description,
        })
      }
    })
  },

  methods: {
    closeModal() {
      this.$emit('closeModal')
    },
    subtractValue(value) {
      value.qtde--
    },
    addValue(value) {
      value.qtde++
    },
    salvarPedido() {
      const dataCarrinho = {
        desjejum: this.desjejum,
        lanche01: this.lanche01,
        lanche02: this.lanche02,
      }
      console.log(dataCarrinho)
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
        img {
          width: 2.5rem;
        }
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
      }

      td:nth-child(1),
      th:nth-child(1) {
        text-align: left;
      }

      .tdQtde {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
      }
    }
  }
}
</style>
