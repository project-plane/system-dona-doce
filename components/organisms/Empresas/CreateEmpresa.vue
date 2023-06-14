<template>
  <Container>
    <Title>
      <h1>Nova Empresa</h1>
    </Title>
    <div class="input_column">
      <Input
        label="Empresa"
        type="text"
        placeholder="Digitar nome empresa"
        v-model="dataEmpresa.empresa"
      />
      <Input
        label="CNPJ"
        type="text"
        placeholder="Digitar CNPJ"
        v-model="dataEmpresa.cnpj"
      />
    </div>
    <div class="input_column">
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
    </div>
    <div class="input_column">
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
    </div>
    <div class="input_column">
      <Input
        label="Senha"
        type="password"
        placeholder="Digitar senha"
        v-model="dataEmpresa.password"
      />
    </div>
    <Button @click.native="saveClient" title="Salvar" />
  </Container>
</template>

<script lang="ts">
import Vue from 'vue'

interface DataEmpresa {
  empresa: string
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
        empresa: '',
        cnpj: '',
        address: '',
        cep: '',
        email: '',
        phone: '',
        password: '',
      },
      client: '',
      asd: '',
    }
  },
  methods: {
    saveClient() {
      const dataEmpresa = {
        empresa: this.dataEmpresa.empresa,
        cnpj: this.dataEmpresa.cnpj,
        address: this.dataEmpresa.address,
        cep: this.dataEmpresa.cep,
        email: this.dataEmpresa.email,
        phone: this.dataEmpresa.phone,
        password: this.dataEmpresa.password,
      }
      console.log(dataEmpresa);
      this.dataEmpresa.empresa = ''
        this.dataEmpresa.cnpj = ''
        this.dataEmpresa.address = ''
        this.dataEmpresa.cep = ''
        this.dataEmpresa.email = ''
        this.dataEmpresa.phone = ''
        this.dataEmpresa.password = ''
    },
  },
})
</script>

<style lang="scss" scoped>
.input_column {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  flex-direction: column;
  gap: 1rem;
}
</style>
