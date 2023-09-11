<template>
  <div class="containerReceita">
    <BeadFrame>
      <div class="bodyModal">
        <div class="container">
          <div class="header">
            <div class="headerReceita">
              <img :src="dadosReceitas.imgPreview" alt="" />
              <div class="textReceita">
                <h3>{{ dadosReceitas.receita }}</h3>
                <p v-if="dadosReceitas.status === 0" class="coffee">Coffee</p>
                <p v-else class="programation">Programado</p>
              </div>
            </div>
            <div @click="closeModal">
              <img src="~/assets/icons/close.svg" alt="" />
            </div>
          </div>
          <div class="body">
            <div class="input">
              <Label for="ingrediente">Ingrediente</Label>
              <select id="ingrediente" v-model="selected" name="">
                <option disabled value="">Selecionar Ingrediente</option>
                <option v-for="itemIngredient in listIngredients" :key="itemIngredient.id">
                  {{ itemIngredient.description }}
                </option>
              </select>
            </div>
            <div class="input">
              <label for="qtd">Quantidade</label>
              <input id="qtd" v-model="qtdIngrediente" type="number" placeholder="quantidade" />
            </div>
            <div class="btnIngrediente">
              <button @click="inserirIngrediente">Inserir</button>
            </div>
          </div>
          <div v-if="amountReceitas.length === 0">
            <h1 style="text-align: center">Tabela vazia</h1>
          </div>
          <div v-else class="footer">
            <div class="footerHeader">
              <h4>Ingrediente</h4>
              <h4>QTD</h4>
              <h4>Valor Porção</h4>
              <h4>Valor Total</h4>
            </div>
            <div v-for="amountReceita in amountReceitas" :key="amountReceita.id" class="footerBody">
              <span>{{ amountReceita.ingrediente }}</span>
              <span>{{ amountReceita.qtd }}</span>
              <span>R$ {{ amountReceita.valorUnitario }}</span>
              <span>R$ {{ amountReceita.valor }}</span>
            </div>
            <div class="footerTable">
              <span class="total">Valor de Custo</span>
              <span>R$ {{ valorTotal }}</span>
              <span class="total">Valor de Venda Padrão</span>
              <input type="number" v-model="valorReceita" />
              <span class="total">Quantidade Mínima</span>
              <input type="number" v-model="qtdMinima" />
              <span class="total">Quantidade Máxima</span>
              <input type="number" v-model="qtdMaxima" />
            </div>
            <div class="alertMax" v-show="parseInt(this.qtdMinima) >= parseInt(this.qtdMaxima)">
              <p>
                OBS: A quantidade máxima não pode ser menor ou igual a
                quantidade mínima
              </p>
            </div>
            <Button title="Salvar" @functionClick="saveReceita" />
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
  props: {
    dadosReceitas: {
      type: [Array, Object],
      required: true,
    },
  },
  data() {
    return {
      selected: '',
      qtdIngrediente: null,
      valorTotal: '',
      valorReceita: '',
      valorTotalReceita: '',
      qtdMinima: '',
      qtdMaxima: '',
      yield_per_quantity: 0,
      time_in_hours: 0,
      presumed_profit: 0,
      listIngredients: [],
      amountReceitas: [],
      amountValue: [],
      ingredients: [],
    }
  },

  watch: {
    porcentagem(newValue, oldValue) {
      this.valorTotalReceita = (newValue * this.valorTotal).toFixed(2)
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
        console.log(item);

        if (item.description === this.selected) {
          const ingredienteExiste = this.amountReceitas.find(
            (amountReceita) => {
              return amountReceita.ingrediente == this.selected
            }
          )
          if (!ingredienteExiste) {
            this.amountReceitas.push({
              qtd: this.qtdIngrediente,
              ingrediente: this.selected,
              valorUnitario: item.value_per_serving,
              valor: (item.value_per_serving * this.qtdIngrediente).toFixed(2),
            })
            // array que armazena os valores
            this.amountValue.push(item.value_per_serving * this.qtdIngrediente)
            this.ingredients.push({
              fk_ingredient: item.id,
              amount_ingredient: Number(this.qtdIngrediente),
            })
          } else {
            this.$toast.error('Ingrediente já inserido!!!')
          }
        }
      })

      // soma os valores dentro do array
      const valorTotal = this.amountValue.reduce((soma, i) => {
        return soma + i
      })

      // valor total de soma dos ingredientes
      this.valorTotal = valorTotal.toFixed(2)

      this.qtdIngrediente = ''
      this.qtdMinima = ''
      this.qtdMaxima = ''
      this.valorReceita = ''
      this.selected = ''
    },
    async saveReceita() {
      if (!this.valorReceita || !this.qtdMinima || !this.qtdMaxima) {
        this.$toast.error('Preencha todos os campos!!!')
        return
      }

      if (parseInt(this.qtdMinima) >= parseInt(this.qtdMaxima)) {
        this.$toast.error(
          'A quantidade máxima não pode ser menor ou igual a quantidade mínima'
        )
        this.qtdMaxima = ''
        return
      }

      const status = this.dadosReceitas.status
      const formData = new FormData()
      formData.append('description', this.dadosReceitas.receita)
      formData.append('value', this.valorReceita)
      formData.append('ingredients', JSON.stringify(this.ingredients))
      formData.append('imagem', this.dadosReceitas.imgFile)
      formData.append('yield_per_quantity', this.yield_per_quantity)
      formData.append('time_in_hours', this.time_in_hours)
      formData.append('presumed_profit', this.presumed_profit)
      formData.append('base_min_amount', this.qtdMinima)
      formData.append('base_max_amount', this.qtdMaxima)
      formData.append('status', status)

      await httpReceitas
        .CreateReceita(formData)
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
        height: 40%;
        display: flex;
        justify-content: space-between;

        .headerReceita {
          width: 100%;
          display: flex;
          gap: 1rem;

          img {
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
        grid-template: 1fr/20rem repeat(2, minmax(min(2.3vw, 1rem), 1fr));
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
          grid-template-columns: 3fr 3fr 3fr 2fr;
          padding: 0.7rem 1rem;
          border-bottom: 2px solid var(--bg_opacity);
        }

        .footerBody {
          display: grid;
          grid-template-columns: 3fr 3fr 3fr 2fr;
          padding: 0.7rem 1rem;
        }

        .footerBody:nth-child(2n + 1) {
          background: #e9e9e9;
        }

        .footerTable {
          display: grid;
          grid-template-columns: 6fr 2fr;
          gap: 1rem;
          padding: 0.7rem 1rem;
          margin-top: 20px;
          border-top: 2px solid var(--bg_opacity);

          span {
            font-size: 1.2rem;
            font-weight: 800;
          }

          input {
            border: 1px solid var(--bg_opacity);
            height: 30px;
          }
        }

        .alertMax {
          color: var(--red);
          font-weight: bold;
          padding: 1rem 0;
        }
      }
    }
  }
}
</style>
