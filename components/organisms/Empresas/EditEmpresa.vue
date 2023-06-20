<template>
  <ModalEdit titleModal="Editar Empresa">
    <ContainerInput>
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
    </ContainerInput>
    <ContainerInput>
      <Input
        label="Endereço"
        type="text"
        placeholder="Digitar endereço"
        v-model="findEmpresa.address"
      />
      <Input
        label="CEP"
        type="text"
        placeholder="Digitar CEP"
        v-model="findEmpresa.cep"
      />
    </ContainerInput>
    <ContainerInput>
      <Input
        label="E-mail"
        type="text"
        placeholder="Digitar e-mail"
        v-model="findEmpresa.email"
      />
      <Input
        label="Fone"
        type="text"
        placeholder="Digitar fone"
        v-model="findEmpresa.fone"
      />
    </ContainerInput>
  </ModalEdit>
</template>

<script lang="ts">
import Vue from 'vue'

import httpEmpresa from '~/server/empresa'

interface DataEmpresa {
  corporate_name: string
  cnpj: string
  address: string
  cep: string
  email: string
  phone: string
  password: string
}

export default Vue.extend({
  data() {
    return {
      dataEmpresa: <DataEmpresa>{
        corporate_name: '',
        cnpj: '',
        address: '',
        cep: '',
        email: '',
        phone: '',
        password: '',
      },
    }
  },

  props: {
    findEmpresa: {
      type: [Array, Object],
      required: true,
    },
  },
  methods: {
    async saveClient() {
      const dataEmpresa = {
        corporate_name: this.dataEmpresa.corporate_name,
        cnpj: this.dataEmpresa.cnpj,
        address: this.dataEmpresa.address,
        cep: this.dataEmpresa.cep,
        email: this.dataEmpresa.email,
        fone: this.dataEmpresa.phone,
      }

      if (
        !this.dataEmpresa.corporate_name ||
        !this.dataEmpresa.cnpj ||
        !this.dataEmpresa.address ||
        !this.dataEmpresa.cep ||
        !this.dataEmpresa.email ||
        !this.dataEmpresa.phone ||
        !this.dataEmpresa.password
      ) {
        this.$toast.error('Preencha todos os campos!!!')
      }

      await httpEmpresa
        .CreateEmpresa(dataEmpresa)
        .then((res) => {
          if (res.status === 201) {
            this.$toast.success('Empresa criada com sucesso')
          }
        })
        .catch((error) => {
          console.log(error)
        })

      this.dataEmpresa.corporate_name = ''
      this.dataEmpresa.cnpj = ''
      this.dataEmpresa.address = ''
      this.dataEmpresa.cep = ''
      this.dataEmpresa.email = ''
      this.dataEmpresa.phone = ''
      this.dataEmpresa.password = ''

      this.$nuxt.refresh()
    },
  },
})
</script>

<style lang="scss" scoped>
</style>
