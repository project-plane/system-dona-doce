<template>
  <ModalEdit titleModal="Editar Empresa" @save="updateEmpresa">
    <Input
      label="Empresa"
      type="text"
      placeholder="Digitar nome empresa"
      v-model="findEmpresa.corporate_name"
    />
    <Input
      label="CNPJ"
      type="text"
      placeholder="Digitar CNPJ"
      v-model="findEmpresa.cnpj"
    />
    <Input
      label="Endereço"
      type="text"
      placeholder="Digitar endereço"
      v-model="findEmpresa.address"
    />
    <Input
      label="CEP"
      type="text"
      placeholder="ex: XXXXX-XXX"
      v-model="findEmpresa.cep"
    />
    <Input
      label="Cidade"
      type="text"
      placeholder="Digitar cidade"
      v-model="findEmpresa.county"
    />
    <Input
      label="Bairro"
      type="text"
      placeholder="Digitar bairro"
      v-model="findEmpresa.district"
    />
    <Input
      label="UF"
      type="text"
      placeholder="ex: AM"
      v-model="findEmpresa.uf"
    />
    <Input
      label="Fone"
      type="text"
      placeholder="Digitar fone"
      v-model="findEmpresa.fone"
    />
    <Input
      label="E-mail"
      type="text"
      placeholder="Digitar e-mail"
      v-model="findEmpresa.email"
    />
  </ModalEdit>
</template>

<script lang="ts">
import Vue from 'vue'

import httpEmpresa from '~/server/empresa'

export default Vue.extend({
  props: {
    findEmpresa: {
      type: [Array, Object],
      required: true,
    },
  },
  methods: {
    async updateEmpresa() {
      const dataEmpresa = {
        corporate_name: this.findEmpresa.corporate_name,
        cnpj: this.findEmpresa.cnpj,
        email: this.findEmpresa.email,
        fone: this.findEmpresa.fone,
        address: this.findEmpresa.address,
        cep: this.findEmpresa.cep,
        county: this.findEmpresa.county,
        district: this.findEmpresa.district,
        uf: this.findEmpresa.uf,
      }

      if (
        !this.findEmpresa.corporate_name ||
        !this.findEmpresa.cnpj ||
        !this.findEmpresa.email ||
        !this.findEmpresa.fone ||
        !this.findEmpresa.address ||
        !this.findEmpresa.cep ||
        !this.findEmpresa.county ||
        !this.findEmpresa.district ||
        !this.findEmpresa.uf
      ) {
        this.$toast.error('Preencha todos os campos!!!')
      }

      await httpEmpresa
        .UpdateEmpresa(this.findEmpresa.id, dataEmpresa)
        .then((res) => {
          this.$toast.success('Empresa atualizada com sucesso')
          this.$store.commit('OPEN_MODAL', false)
        })
        .catch((error) => {
          console.log(error)
        })
      this.$nuxt.refresh()
    },
  },
})
</script>

<style lang="scss" scoped>
</style>
