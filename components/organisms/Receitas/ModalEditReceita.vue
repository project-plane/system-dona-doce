<template>
  <div>
    <Loading v-if="loading" />
    <div class="containerReceita">
      <BeadFrame>
        <div class="bodyModal">
          <div class="container">
            <div class="header">
              <div class="headerReceita">
                <div class="img">
                  <label for="editInputFile">
                    <img
                      v-if="!editUrlImgPreview"
                      src="~/assets/icons/imgFile.svg"
                      alt=""
                    />
                    <img
                      v-if="editUrlImgPreview"
                      class="imgFile"
                      :src="editUrlImgPreview"
                      alt=""
                    />
                  </label>
                  <input
                    id="editInputFile"
                    type="file"
                    accept="image/*"
                    name="editInputFile"
                    @change="fileMethods"
                  />
                </div>
                <div class="textReceita">
                  <h1>Editar Receita</h1>
                  <Title :title="title" />
                  <div style="display: flex; gap: 11px;">

                      <input type="radio" id="one" :value="0" v-model="typePedido" />
                      <label for="coffe">coffe</label>

                      <input type="radio" id="two" :value="1" v-model="typePedido" />
                      <label for="programado">programado</label>

                  </div>
                  
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

            <div style="display: flex; justify-content: space-around;gap: 30px;">
              <Input
                label="Maximo"
                type="number"
                v-model="maximo"
              />
              <Input
                label="Minimo"
                type="number"
                v-model="minimo"

              />
            </div>

            <div class="btnAddIngrediente">
              <button @click="addIngrediente">Adicionar Ingrediente</button>
            </div>
            <div class="body" v-if="statusAddIngrediente">
              <div class="input">
                <Label for="ingrediente">Ingrediente</Label>

                <select name="" id="ingrediente" v-model="selected">
                  <option disabled value="">Selecionar Ingrediente</option>
                  <option  :value="itemIngredient.id"  v-for="itemIngredient in listIngredients"  :key="itemIngredient.id"
                  >
                    {{ itemIngredient.description}} - {{ refactorUnidadeMedida(itemIngredient.unit_of_measurement) }}
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
              <div class="input">
                <Label for="ingrediente">Custo R$</Label>
                <input
                  type="text"
                  placeholder="Valor Custo"
                  v-model="valorApro"
                  disabled
                />
              </div>
              <div class="btnIngrediente">
                <button @click="inserirIngrediente(idReceita)">Inserir</button>
              </div>
            </div>
            <div class="body" v-for="receita in listReceitas" :key="receita.id">
              <Input
                label="Ingrediente"
                v-model="receita.ingredients.description"
                type="text"
                disabled="disabled"
                block="background: #d6d6d6; cursor: no-drop"
              />

              <Input
                label="Valor Ingrediente"
                :value="
                  'R$ ' + receita.ingredients.value_per_serving
                "
                type="text"
                disabled="disabled"
                block="background: #d6d6d6; cursor: no-drop"
              />

              <Input
                label="Quantidade"
                v-model="receita.amount_ingredient"
                type="number"
              />
<!-- <pre>{{ receita }}</pre> -->
              <Input
                label="Unidade de Medida"
                :value="
                  refactorUnidadeMedida(receita.ingredients.unit_of_measurement)
                "
                type="text"
                disabled="disabled"
                block="background: #d6d6d6; cursor: no-drop"
              />

              <div class="close">
                <img
                  src="~/assets/icons/close.svg"
                  alt=""
                  @click="deletarIngrediente(receita)"
                />
              </div>
            </div>


            <div style="align-items: center; display: flex; gap: 10px;justify-content: space-around;">
              <div >
              <h3 style="color: var(--red)">Gastos da Receita</h3>
              <h3> R$ {{  this.listDeCompras }}</h3>
             </div>  <div>
              <h3 style="color: yellowgreen;">Valor de Venda</h3>
              <Input
                style="max-width: 150px; height: auto;"
                v-model="valorTotal"
                type="number"
              />
            </div>
            </div>

            <Button
              @click.native="editarIngredienteReceita(listReceitas)"
              title="Salvar"
            />

          </div>
        </div>
      </BeadFrame>
    </div>
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
      qtdIngrediente: 0,
      valorTotal: '',
      valorAtual: '',
      yield_per_quantity: 0,
      time_in_hours: 0,
      presumed_profit: 0,
      amountValue: [],
      ingredients: [],
      listFindReceita: [],
      listReceitas: [],
      idReceita: '',
      maximo: 0,
      minimo: 0,
      valorApro: 0,
      editUrlImgFile: null,
      editUrlImgPreview: null,
      title: '',
      updateIngrediente: [],
      selected: '',
      listIngredients: [],
      loading: false,
      status: null,
      listDeCompras: 0,
      ingredienteSel: null,
      typePedido: '',
    }
  },
  props: {
    dataReceita: {
      type: String,
      required: true,
    },
  },
  watch: {
    
    selected(newId){
      this.ingredienteSel = this.listIngredients.find((item) => newId == item.id);
      if(this.ingredienteSel){
      this.valorApro = this.ingredienteSel.value_per_serving * this.qtdIngrediente;
      }
    },
    qtdIngrediente(newQuantity){
      if(this.ingredienteSel!= null)
      {
        this.valorApro = this.ingredienteSel.value_per_serving * newQuantity;

      }
    },
    listReceitas: {
      deep: true,
      immediate: true,
      handler(newValue) {
        var soma = 0

        newValue.map((receita) => {
          
          soma = ((receita.ingredients.value_per_serving *  receita.amount_ingredient) *  receita.ingredients.amount) + soma
        
        }) 

     
        this.listDeCompras = soma

      },
    },
  },
  async fetch() {
    this.loading = true

    await httpReceitas
      .GetFindReceita(this.dataReceita)
      .then((res) => {

        this.listFindReceita = res.data
        this.typePedido = res.data.status
        this.maximo = this.listFindReceita.base_max_amount
        this.minimo = this.listFindReceita.base_min_amount
        this.status = this.listFindReceita.status
        this.idReceita = this.listFindReceita.id
        this.title = this.listFindReceita.description
        this.listReceitas = this.listFindReceita.ingredients_Revenues
        this.editUrlImgPreview = `https://api.donadoce.net/img_revenue/${this.listFindReceita.imagem}`
        this.valorAtual = this.listFindReceita.value
        this.valorTotal = this.listFindReceita.value
        this.valor = this.listFindReceita.value

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

    this.loading = false
  },
  methods: {
    addIngrediente() {
      this.statusAddIngrediente = true
    },

    fileMethods(e) {
      const file = e.target.files[0]
      this.editUrlImgPreview = URL.createObjectURL(file)
      this.editUrlImgFile = e.target.files[0]
    },
    valueOrder(listOrder) {
      const formattedTotal = listOrder.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      })

      return formattedTotal
    },

    refactorUnidadeMedida(unidadeMedida) {
      return unidadeMedida.toLowerCase() === 'u'
        ? 'Unidade'
        : unidadeMedida.toLowerCase() === 'ml'
        ? 'ML'
        : unidadeMedida.toLowerCase() === 'g'
        ? 'Gramas'
        : unidadeMedida.toLowerCase() === 'l'
        ? 'Litros'
        : 'Not Found Unit of Measurement'
    },

    // Inserir um ingrediente dentro da receita
    inserirIngrediente(id) {
      this.listIngredients.map(async (e) => {
        if (e.id === this.selected) {
          const dado = this.listReceitas.find((item) => {
            return item.ingredients.description === this.selected
          })
          const adicionarIngrediente = [
            {
              fk_ingredient: e.id,
              fk_revenues: id,
              value: e.value,
              amount_ingredient: Number(this.qtdIngrediente),
            },
          ]

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
                console.log(res)
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
    async editarIngredienteReceita(data) {
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
     
      await this.editReceita(this.idReceita);
      this.$toast.success('Valor Atualizado com sucesso!!!')


    },

    // Deleta um ingrediente da receita
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

    // Edita a receita
    async editReceita(id) {
      if (this.amountValue.length === 0) {
        this.$toast.info('Nada foi alterado na receita!!!')
        this.$store.commit('OPEN_MODAL', false)
        return
      }

      if (this.amountValue.length > 0) {
        const status = this.typePedido
        const formData = new FormData()
        formData.append('description', this.listFindReceita.description)
        formData.append('value', this.valorTotal)
        formData.append(
          'ingredients',
          JSON.stringify(this.listFindReceita.ingredients_Revenues)
        )
        formData.append('old_imagem', this.listFindReceita.imagem)
        formData.append('imagem', this.editUrlImgFile)
        formData.append('base_max_amount', this.maximo)
        formData.append('base_min_amount', this.minimo)
        formData.append('status', status)
        formData.append('yield_per_quantity', this.yield_per_quantity)
        formData.append('time_in_hours', this.time_in_hours)
        formData.append('presumed_profit', this.presumed_profit)

        await httpReceitas
          .UpdateReceita(id, formData)
          .then((res) => {
              this.$toast.success('Receita atualizada com sucesso!!!')
              this.$store.commit('OPEN_MODAL', false)
              this.$nuxt.refresh()
              return

          })
          .catch((error) => {
            this.$toast.error('Erro ao salvar receita.')
            console.log(error.response)
          })
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

          .img {
            width: 200px;
            height: 200px;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #ffffff;
            border: 0.06rem solid var(--border);
            border-radius: 0.25rem;
            label {
              width: 100%;
              height: 100%;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              font-weight: 800;
              font-size: 1.2rem;
              letter-spacing: 3px;
              cursor: pointer;
              img {
                width: 100px;
                height: 100x;
              }
              .imgFile {
                width: 100%;
                height: 100%;
              }
            }
            input[type='file'] {
              display: none;
            }
          }
        }
      }

      .body {
        width: 100%;
        display: grid;
        display: flex;
        align-items: center;
        grid-template-columns: minmax(2ch, 30ch) 3fr 3fr 1fr;
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
          padding: 1rem;

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
          margin-top: 30px;

          img {
            cursor: pointer;
            width: 20px;
            height: 20px;
          }
        }
      }
    }
  }

  .valorTotal {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    gap: 2rem;
    right: 50px;
  }
}
</style>
