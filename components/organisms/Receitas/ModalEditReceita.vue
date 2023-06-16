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
                <h3>{{ title }}</h3>
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
          <div class="btnAddIngrediente">
            <button @click="addIngrediente">Adicionar Ingrediente</button>
          </div>
          <div class="body" v-if="statusAddIngrediente">
            <div class="input">
              <Label for="ingrediente">Ingrediente</Label>
              <select name="" id="ingrediente" v-model="selected">
                <option disabled value="">Selecionar Ingrediente</option>
                <option
                  v-for="itemIngredient in listIngredients"
                  :key="itemIngredient.id"
                >
                  {{ itemIngredient.description }}
                </option>
              </select>
            </div>
            <div class="input">
              <label for="qtd">Quantidade</label>
              <input
                type="number"
                id="qtd"
                placeholder="quantidade"
                v-model="qtdIngrediente"
              />
            </div>
            <div class="btnIngrediente">
              <button @click="inserirIngrediente(idReceita)">Inserir</button>
            </div>
          </div>
          <div class="body" v-for="receita in listReceitas" :key="receita.id">
            <div class="input">
              <Label for="ingrediente">Ingrediente</Label>
              <input
                style="background: #d6d6d6; cursor: no-drop"
                type="text"
                disabled
                v-model="receita.ingredients.description"
              />
            </div>
            <div class="input">
              <Label for="qtd">Quantidade</Label>
              <input
                type="number"
                id="qtd"
                placeholder="quantidade"
                v-model="receita.amount_ingredient"
              />
            </div>

            <div class="close">
              <img
                src="~/assets/icons/close.svg"
                alt=""
                @click="deletarIngrediente(receita)"
              />
            </div>
          </div>
          <Button
            @functionClick="editarIngredienteReceita(listReceitas)"
            title="Atualizar Dados"
            v-if="updateIngrediente.length === 0"
          />
          <Button
            v-else
            @functionClick="editReceita(idReceita)"
            title="Salvar"
          />
        </div>
      </div>
    </BeadFrame>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import httpReceitaIngrediente from '~/server/ingredienteReceita'
import httpIngredientes from '~/server/ingredientes'
import httpReceitas from '~/server/receitas'

export default Vue.extend({
  data() {
    return {
      statusAddIngrediente: false,
      qtdIngrediente: '',
      valorTotal: '',
      yield_per_quantity: 0,
      time_in_hours: 0,
      presumed_profit: 0,
      amountValue: [],
      ingredients: [],
      listFindReceita: [],
      listReceitas: [],
      idReceita: '',
      imgFile: '',
      title: '',
      updateIngrediente: [],
      selected: '',
      listIngredients: [],
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
        this.idReceita = this.listFindReceita.id
        this.title = this.listFindReceita.description
        this.listReceitas = this.listFindReceita.ingredients_Revenues
        this.imgFile = `https://api.doce.gedroid.com/img_revenue/${this.listFindReceita.imagem}`
      })
      .catch((error) => {
        console.log(error)
      })

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
    addIngrediente() {
      this.statusAddIngrediente = true
    },
    // Inserir um ingrediente dentro da receita
    inserirIngrediente(id) {
      this.listIngredients.map(async (e) => {
        if (e.description === this.selected) {
          const dado = this.listReceitas.find((item) => {
            return item.ingredients.description === this.selected
          })
          if (!dado) {
            const adicionarIngrediente = [
              {
                fk_ingredient: e.id,
                fk_revenues: id,
                amount_ingredient: Number(this.qtdIngrediente),
              },
            ]
            await httpReceitaIngrediente
              .CreateReceitaIngrediente(adicionarIngrediente)
              .then((res) => {
                this.$toast.success('Ingrediente inserido com sucesso!!!')
              })
              .catch((error) => {
                console.log(error)
              })
            this.$nuxt.refresh()
            this.statusAddIngrediente = false
          } else {
            this.$toast.error('Ingrediente existente na receita!!!')
          }
        }
      })
      this.selected = ''
      this.qtdIngrediente = ''
    },
    // Edita um ingrediente dentro da receita
    editarIngredienteReceita(data) {
      console.log(data)

      data.map((e) => {
        const dataUpdate = {
          fk_ingredient: e.fk_ingredient,
          fk_revenues: e.fk_revenues,
          amount_ingredient: Number(e.amount_ingredient),
          value: e.ingredients.value,
        }

        this.updateIngrediente.push(dataUpdate)
        this.amountValue.push(dataUpdate.amount_ingredient * dataUpdate.value)
      })

      this.updateIngrediente.map(async (e) => {
        await httpReceitaIngrediente
          .UpdateReceitaIngrediente(e)
          .then((res) => {
            console.log(res.data)
          })
          .catch((error) => {
            console.log(error)
          })
      })
      this.$toast.success('Valor Atualizado com sucesso!!!')

      // valor total de soma dos ingredientes
      const valorTotal = this.amountValue.reduce((soma, i) => {
        return soma + i
      })
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
      this.$store.commit('OPEN_MODAL', false)
    },

    // edita a receita
    async editReceita(id) {
      if (this.amountValue.length === 0) {
        this.$toast.info('Nada foi alterado na receita!!!')
        this.$store.commit('OPEN_MODAL', false)
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
        formData.append('old_imagem', this.listFindReceita.imagem)
        formData.append('yield_per_quantity', this.yield_per_quantity)
        formData.append('time_in_hours', this.time_in_hours)
        formData.append('presumed_profit', this.presumed_profit)

        await httpReceitas
          .UpdateReceita(id, formData)
          .then((res) => {
            if (res.status === 200) {
              this.$toast.success('Receita atualizada com sucesso!!!')
              this.$store.commit('OPEN_MODAL', false)
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
      .btnAddIngrediente {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        button {
          background: var(--blue);
          color: var(--white);
          padding: 0.5rem;
          border-radius: 5px;
        }
      }
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
        grid-template-columns: 3fr 3fr 1fr;
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
        .close {
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            cursor: pointer;
            width: 20px;
            height: 20px;
          }
        }
      }
    }
  }
}
</style>
