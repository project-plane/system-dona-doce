<template>
  <div class="containerReceita">
    <BeadFrame>
      <div class="bodyModal">
        <div class="container">
          <div class="header">
            <div class="headerReceita">
              <img :src="imgFile" alt="" />
              <div class="textReceita">
                <Title>
                  <h1>Editar Receita</h1>
                </Title>
                <h3>{{ listFindReceita.description }}</h3>
              </div>
            </div>
            <div @click="closeModal">
              <img
                style="cursor: pointer"
                src="~/assets/icons/close.svg"
                alt=""
              />
            </div>
          </div>
          <div
            class="body"
            v-for="receita in listFindReceita.ingredients_Revenues"
            :key="receita.id"
          >
            <div class="input">
              <label for="qtd">Quantidade</label>
              <input
                type="number"
                id="qtd"
                placeholder="quantidade"
                v-model="receita.amount_ingredient"
              />
            </div>
            <div class="input">
              <label for="ingrediente">Ingrediente</label>
              <input
                style="background: #d6d6d6; cursor: no-drop"
                type="text"
                disabled
                v-model="receita.ingredients.description"
              />
            </div>
            <div class="icons">
              <button
                style="
                  background: #1b6afc;
                  color: white;
                  font-weight: bold;
                  border-radius: 5px;
                "
                @click="editarIngrediente(receita)"
              >
                Atualizar
              </button>
              <button
                style="
                  background: #fc1b1b;
                  color: white;
                  font-weight: bold;
                  border-radius: 5px;
                "
                @click="deletarIngrediente(receita)"
              >
                Deletar
              </button>
            </div>
          </div>
          <Button
            @click.native="editReceita(listFindReceita.id)"
            title="Salvar"
          />
        </div>
      </div>
    </BeadFrame>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import httpReceitaIngrediente from '~/server/receitaIngrediente'
import httpReceitas from '~/server/receitas'

export default Vue.extend({
  data() {
    return {
      valorTotal: '',
      yield_per_quantity: 0,
      time_in_hours: 0,
      presumed_profit: 0,
      amountValue: [],
      ingredients: [],
      listFindReceita: [],
      imgFile: '',
    }
  },
  props: {
    dataReceita: {
      type: String,
      required: true,
    },
  },

  async fetch() {
    await httpReceitas
      .GetFindReceita(this.dataReceita)
      .then((res) => {
        this.listFindReceita = res.data
        this.imgFile = `https://api.doce.gedroid.com/img_revenue/${this.listFindReceita.imagem}`
      })
      .catch((error) => {
        console.log(error)
      })

    this.valorTotal = this.listFindReceita.value
    console.log(this.listFindReceita)
  },
  methods: {
    async editarIngrediente(data) {
      const dataUpdate = {
        fk_ingredient: data.fk_ingredient,
        fk_revenues: data.fk_revenues,
        amount_ingredient: Number(data.amount_ingredient),
      }

      await httpReceitaIngrediente
        .UpdateReceitaIngrediente(dataUpdate)
        .then((res) => {
          if (res.status === 200) {
            this.$toast.success(
              'Ingrediente atualizado na receita com sucesso!!!'
            )
          }
        })
        .catch((error) => {
          console.log(error)
        })

      this.amountValue.push(data.amount_ingredient * data.ingredients.value)

      const valorTotal = this.amountValue.reduce((soma, i) => {
        return soma + i
      })

      // valor total de soma dos ingredientes
      this.valorTotal = valorTotal.toFixed(2)
    },
    async deletarIngrediente(data) {
      const dataDelete = {
        fk_ingredient: data.fk_ingredient,
        fk_revenues: data.fk_revenues,
      }

      await httpReceitaIngrediente
        .DeleteReceitaIngrediente(dataDelete)
        .then((res) => {
          if (res.status === 200) {
            this.$toast.success(
              'Ingrediente deletado da receita com sucesso!!!'
            )
          }
        })
        .catch((error) => {
          console.log(error)
        })
      this.$nuxt.refresh()
    },
    closeModal() {
      this.$store.commit('OPEN_MODAL_EDIT_RECEITA', false)
    },
    async editReceita(id) {
      if (this.amountValue.length === 0) {
        this.$toast.info('Nada foi alterado na receita!!!')
        this.$store.commit('OPEN_MODAL_EDIT_RECEITA', false)
        return
      }

      if (this.amountValue.length > 0) {
        const formData = new FormData()
        formData.append('description', this.listFindReceita.description)
        formData.append('value', this.valorTotal)
        formData.append(
          'ingredients',
          JSON.stringify(this.listFindReceita.ingredients_Revenues)
        )
        formData.append('old_imagem', this.imgFile)
        formData.append('yield_per_quantity', this.yield_per_quantity)
        formData.append('time_in_hours', this.time_in_hours)
        formData.append('presumed_profit', this.presumed_profit)

        await httpReceitas
          .UpdateReceita(id, formData)
          .then((res) => {
            if (res.status === 200) {
              this.$toast.success('Receita atualizada com sucesso!!!')
              this.$store.commit('OPEN_MODAL_EDIT_RECEITA', false)
            }
          })
          .catch((error) => {
            console.log(error)
          })
        this.$nuxt.refresh()
        return
      }
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
          img {
            width: 30%;
          }
        }
      }
      .body {
        width: 100%;
        display: grid;
        grid-template: 1fr/15rem minmax(min(2.3vw, 1rem), 1fr) 11.5rem;
        padding-bottom: 1rem;
        gap: 1rem;
        .input {
          display: flex;
          flex-direction: column;
          input {
            border: 1px solid var(--bg_opacity);
          }
        }
        .icons {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 1rem;
          button {
            margin-top: 25px;
            width: 100%;
            cursor: pointer;
            padding: 0.6rem 1rem;
          }
        }
      }
    }
  }
}
</style>
