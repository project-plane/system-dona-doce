<template>
  <div class="containerReceita">
    <BeadFrame>
      <div class="bodyModal">
        <div class="container">
          <div class="header">
            <div class="headerReceita">
              <img src="~/assets/img/coxinha.png" alt="" />
              <div class="textReceita">
                <h3>{{ dadosReceitas.receita }}</h3>
                <p class="coffee" v-if="dadosReceitas.status === 'Coffee'">
                  {{ dadosReceitas.status }}
                </p>
                <p class="programation" v-else>{{ dadosReceitas.status }}</p>
              </div>
            </div>
            <div @click="closeModal">
              <img src="~/assets/icons/close.svg" alt="" />
            </div>
          </div>
          <div class="body">
            <div class="input">
              <label for="qtd">Quantidade</label>
              <input
                type="number"
                id="qtd"
                placeholder="quantidade"
                v-model="qtdIngrediente"
              />
            </div>
            <div class="input">
              <label for="ingrediente">Ingrediente</label>
              <select name="" id="ingrediente" v-model="selected">
                <option disabled value="">Selecione Ingrediente</option>
                <option
                  v-for="itemIngredient in listIngredients"
                  :key="itemIngredient.id"
                >
                  {{ itemIngredient.description }}
                </option>
              </select>
            </div>
            <div class="btnIngrediente">
              <button @click="inserirIngrediente">Inserir</button>
            </div>
          </div>
          <div v-if="amountReceitas.length === 0">
            <h1 style="text-align: center">Tabela vazia</h1>
          </div>
          <div class="footer" v-else>
            <div class="footerHeader">
              <h4>QTD</h4>
              <h4>Ingrediente</h4>
              <h4>Preço</h4>
            </div>
            <div
              class="footerBody"
              v-for="amountReceita in amountReceitas"
              :key="amountReceita.id"
            >
              <span>{{ amountReceita.qtd }}</span>
              <span>{{ amountReceita.ingrediente }}</span>
              <span>R$ {{ amountReceita.valor }}</span>
            </div>
            <div class="footerFooter">
              <span class="total">Total</span>
              <span>R$ {{ valorTotal }}</span>
            </div>
            <ButtonPirula title="Salvar" @click.native="saveReceita" />
          </div>
        </div>
      </div>
    </BeadFrame>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import httpIngredientes from '~/server/ingredientes'
import httpReceitas from '~/server/receitas'

export default Vue.extend({
  data() {
    return {
      selected: '',
      qtdIngrediente: null,
      valorTotal: '',
      valueReceita: 0,
      listIngredients: [],
      amountReceitas: [],
      amountValue: [],
      ingredients: [],
    }
  },
  props: {
    dadosReceitas: {
      type: [Array, Object],
      required: true,
    },
  },

  async fetch() {
    await httpIngredientes
      .ListIngredientes()
      .then((res) => {
        this.listIngredients = res.data
      })
      .catch((error) => {
        console.log(error)
      })
  },
  methods: {
    closeModal() {
      this.$store.commit('OPEN_MODAL_RECEITA', false)
    },
    inserirIngrediente() {
      if (!this.qtdIngrediente || !this.selected) {
        this.$toast.error('Preencha todos os campos!!!')
        return
      }

      this.listIngredients.map((item) => {
        if (item.description === this.selected) {
          this.amountReceitas.push({
            qtd: this.qtdIngrediente,
            ingrediente: this.selected,
            valor: (item.value * this.qtdIngrediente).toFixed(2),
          })
          // array que armazena os valores
          this.amountValue.push(item.value * this.qtdIngrediente)
          this.ingredients.push({
            fk_ingredient: item.id,
            amount_ingredient: Number(this.qtdIngrediente),
          })
        }
      })

      console.log(this.amountReceitas)

      // soma os valores dentro do array
      const valorTotal = this.amountValue.reduce((soma, i) => {
        return soma + i
      })

      // valor total de soma dos ingredientes
      this.valorTotal = valorTotal.toFixed(2)

      this.qtdIngrediente = ''
      this.selected = ''
    },
    async saveReceita() {
      const saveReceita = {
        description: this.dadosReceitas.receita,
        value: Number(this.valorTotal),
        ingredients: this.ingredients,
        yield_per_quantity: 1,
        time_in_hours: 2,
        presumed_profit: 3,
      }
      console.log(saveReceita)
      await httpReceitas
        .CreateReceita(saveReceita)
        .then((res) => {
          if (res.status === 201) {
            this.$toast.success('Receita criada com sucesso!!!')
            this.$store.commit('OPEN_MODAL_RECEITA', false)
          }
        })
        .catch((error) => {
          console.log(error)
        })
      this.$nuxt.refresh()
    },
  },
})
</script>

<style scoped lang="scss">
.containerReceita {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  right: 0;
  background-color: var(--bg_color_modal);
  display: table;
  transition: opacity 0.2s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
  z-index: 1;
  .bodyModal {
    background: var(--white);
    min-height: 50%;
    .container {
      width: 100%;
      height: 90vh;
      padding: 2.5rem 2rem;
      display: flex;
      flex-direction: column;
      gap: 2rem;
      overflow-y: auto;
      .header {
        width: 100%;
        display: flex;
        justify-content: space-between;
        .headerReceita {
          width: 100%;
          display: flex;
          gap: 1rem;
          img{
            width: 30%;
          }
        }
        .coffee {
          color: var(--red);
        }
        .programation {
          color: var(--blue);
        }
        img {
          cursor: pointer;
        }
      }
      .body {
        width: 100%;
        display: grid;
        grid-template: 1fr/10rem repeat(2, minmax(min(2.3vw, 1rem), 1fr));
        border-bottom: 2px dashed var(--bg_opacity);
        padding-bottom: 1rem;
        gap: 1rem;
        .input {
          display: flex;
          flex-direction: column;
          input,
          select {
            border: 1px solid var(--bg_opacity);
          }
        }
        .btnIngrediente {
          width: 100%;
          display: flex;
          align-items: flex-end;
          button {
            width: 100%;
            padding: 0.6rem;
            background: var(--red);
            color: var(--white);
            font-weight: 700;
            border-radius: 4px;
          }
        }
      }
      .footer {
        width: 100%;
        .footerHeader {
          display: grid;
          grid-template-columns: 1fr 4fr 1fr;
          padding: 0.7rem 1rem;
          border-bottom: 2px solid var(--bg_opacity);
        }
        .footerBody {
          display: grid;
          grid-template-columns: 1fr 4fr 1fr;
          padding: 0.7rem 1rem;
        }
        .footerBody:nth-child(2n + 1) {
          background: #e9e9e9;
        }
        .footerFooter {
          display: grid;
          grid-template-columns: 6fr 2fr;
          padding: 0.7rem 1rem;
          margin-top: 20px;
          border-top: 2px solid var(--bg_opacity);
          span {
            font-size: 1.2rem;
            font-weight: 800;
          }
        }
      }
    }
  }
}
</style>
