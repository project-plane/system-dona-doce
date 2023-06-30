<!-- eslint-disable vue/no-mutating-props -->
<template>
  <ModalEdit title-modal="Editar Ingrediente" @save="updateIngrediente">
    <Input
      v-model="nameIngrediente"
      label="Nome"
      type="text"
      placeholder="Digite o nome ingrediente"
    />
    <Input
      v-model="priceIngrediente"
      label="Preço"
      type="number"
      placeholder="Digite o preco ingrediente"
    />
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
      listFindIngredient: [],
    }
  },
  async fetch() {
    await httpIngrediente
      .FindIngrediente(this.findIngrediente)
      .then((res) => {
        this.listFindIngredient = res.data
        this.nameIngrediente = this.listFindIngredient.description
        this.priceIngrediente = Number(this.listFindIngredient.value).toFixed(2)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  methods: {
    async updateIngrediente() {
      const idIngrediente = this.findIngrediente

      const dataIngrediente = {
        description: this.nameIngrediente,
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
