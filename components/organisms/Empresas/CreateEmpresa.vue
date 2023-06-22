<template>
  <Container>
    <Loading v-if="loading" />
    <Title>
      <h1>Nova Empresa</h1>
    </Title>
    <ContainerInput>
      <Input
        label="Empresa"
        type="text"
        placeholder="Digitar nome empresa"
        v-model="dataEmpresa.corporate_name"
      />
      <Input
        label="CNPJ"
        type="text"
        placeholder="Digitar CNPJ"
        v-model="dataEmpresa.cnpj"
      />
    </ContainerInput>
    <ContainerInput>
      <Input
        label="Endereço"
        type="text"
        placeholder="Digitar endereço"
        v-model="dataEmpresa.address"
      />
      <Input
        label="CEP"
        type="text"
        placeholder="Digitar CEP"
        v-model="dataEmpresa.cep"
      />
    </ContainerInput>
    <ContainerInput>
      <Input
        label="E-mail"
        type="text"
        placeholder="Digitar e-mail"
        v-model="dataEmpresa.email"
      />
      <Input
        label="Fone"
        type="text"
        placeholder="Digitar fone"
        v-model="dataEmpresa.phone"
      />
    </ContainerInput>
    <ContainerInput>
      <Input
        label="Senha"
        type="password"
        placeholder="Digitar senha"
        v-model="dataEmpresa.password"
      />
    </ContainerInput>
    <Button @functionClick="saveClient" title="Salvar" />
  </Container>
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
      loading: false,
    }
  },
  methods: {
    async saveClient() {
      this.loading = true
      const dataEmpresa = {
        corporate_name: this.dataEmpresa.corporate_name,
        cnpj: this.dataEmpresa.cnpj,
        address: this.dataEmpresa.address,
        cep: this.dataEmpresa.cep,
        email: this.dataEmpresa.email,
        fone: this.dataEmpresa.phone,
        password: this.dataEmpresa.password,
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
          this.loading = false
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
