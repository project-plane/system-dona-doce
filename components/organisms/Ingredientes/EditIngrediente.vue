<!-- eslint-disable vue/no-mutating-props -->
<template>
  <ModalEdit title-modal="Editar Ingrediente" @save="updateIngrediente">
    <Input v-model="nameIngrediente" label="Nome" type="text" placeholder="Digite o nome ingrediente" />
<!-- 
    <Input block="background: #d6d6d6; cursor: no-drop" v-if="unit_of_measurement === 'g'"
      v-model="grama" label="Medida" type="text" placeholder="Digite a medida do ingrediente" /> -->
      <div class="input" style="width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.3rem;">
        <span>Medida</span>
        <select v-model="unit_of_measurement" style="border: 0.06rem solid var(--border);">
          <option disabled value="">Selecionar Tipo de Medida</option>
          <option value="g" >Grama</option>
          <option value="ml">Mililitro</option>
          <option value="u">Unidade</option>
        </select>
      </div>
<!-- 
    <Input block="background: #d6d6d6; cursor: no-drop" disabled="disabled" v-if="unit_of_measurement === 'ml'"
      v-model="litro" label="Medida" type="text" placeholder="Digite a medida do ingrediente" />

    <Input block="background: #d6d6d6; cursor: no-drop" disabled="disabled" v-if="unit_of_measurement === 'u'"
      v-model="unidade" label="Medida" type="text" placeholder="Digite a medida do ingrediente" /> -->

    <Input v-model="amount" label="Quantidade" type="number" placeholder="Digite a quantidade do ingrediente" />

    <Input v-model="priceIngrediente" label="Preço p/ quantidade" type="number" />

    <Input block="background: #d6d6d6; cursor: no-drop" disabled="disabled" v-model="value_per_serving"
      label="Valor p/ Porção" type="number" placeholder="Digite o preco ingrediente" />
    <!-- <pre>{{ value_per_serving }}</pre> -->

      
  </ModalEdit>
</template>

<script lang="ts">
import Vue from 'vue'

import httpIngrediente from '~/server/ingredientes'

export default Vue.extend({
  props: {
    findIngrediente: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      nameIngrediente: '',
      priceIngrediente: '',
      unit_of_measurement: '',
      value_per_serving: '',
      amount: '',
      unidadeMedida: "",
      litro: 'Litro',
      unidade: 'Unidade',
      listFindIngredient: [],
      newValuePerPorcao: '',
      qtdAtual: 0
    }
  },

  watch: {
    priceIngrediente(newValue, oldValue) {
      this.newValuePerPorcao = Number(newValue / this.amount)
      this.value_per_serving = this.newValuePerPorcao
    }
  },
  async fetch() {
    await httpIngrediente
      .FindIngrediente(this.findIngrediente)
      .then((res) => {
        console.log(res);
        this.qtdAtual= Number(res.data.amount_actual)
        this.listFindIngredient = res.data
        this.nameIngrediente = this.listFindIngredient.description
        this.unit_of_measurement = this.listFindIngredient.unit_of_measurement
        this.amount = this.listFindIngredient.amount
        this.value_per_serving = this.listFindIngredient.value_per_serving
        this.priceIngrediente = Number(this.listFindIngredient.value)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  methods: {
    async updateIngrediente() {
      const idIngrediente = this.findIngrediente

      // const valorPorcao = 

      const dataIngrediente = {
        amount_actual: Number(this.qtdAtual),
        description: this.nameIngrediente,
        unit_of_measurement: this.unit_of_measurement,
        amount: Number(this.amount),
        value_per_serving: Number(this.value_per_serving),
        value: Number(this.priceIngrediente),
      }

      await httpIngrediente
        .UpdateIngredientes(idIngrediente, dataIngrediente)
        .then((res) => {
          if (res.status === 200) {
            this.$toast.success('Ingrediente atualizado com sucesso!!!')
            this.$store.commit('OPEN_MODAL', false)
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
</style>
