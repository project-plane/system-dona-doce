<template>
  <Container>
    <Title>
      <h1>Novo Cliente</h1>
    </Title>
    <ContainerInput class="input_column">
      <Input
        label="Empresa"
        type="text"
        placeholder="Digitar nome empresa"
        v-model="dataCLient.empresa"
      />
      <Input
        label="CNPJ"
        type="text"
        placeholder="Digitar CNPJ"
        v-model="dataCLient.cnpj"
      />
    </ContainerInput>
    <ContainerInput>
      <Input
        label="Endereço"
        type="text"
        placeholder="Digitar endereço"
        v-model="dataCLient.address"
      />

      <Input
        label="CEP"
        type="text"
        placeholder="Digitar CEP"
        v-model="dataCLient.cep"
      />
    </ContainerInput>
    <ContainerInput class="input_column">
      <Input
        label="E-mail"
        type="text"
        placeholder="Digitar e-mail"
        v-model="dataCLient.email"
      />
      <Input
        label="Fone"
        type="text"
        placeholder="Digitar fone"
        v-model="dataCLient.fone"
      />
    </ContainerInput>
    <ContainerInput>
      <Input
        label="Responsável"
        type="password"
        placeholder="Digitar nome responsável"
        v-model="dataCLient.responsavel"
      />

      <Input
        label="Senha"
        type="password"
        placeholder="Digitar senha"
        v-model="dataCLient.password"
      />
    </ContainerInput>
    <ContainerInput>
      <Input
        label="Responsável"
        type="password"
        placeholder="Digitar nome responsável"
        v-model="dataCLient.responsavel"
      />
    </ContainerInput>
    <div class="input_create">
      <div class="input_column">
        <div class="input_add">
          <Input
            label="Empresas"
            type="text"
            placeholder="Digite empresa"
            v-model="dataCLient.empresa"
          />
          <button @click="addClient">Adicionar</button>
        </div>
        <div class="list_empresa">
          <div
            class="add_clients"
            v-for="(addClient, index) in dataCLient.addClients"
            :key="index"
          >
            <p>{{ index + 1 }} - {{ addClient }}</p>
            <span @click="removeClient(addClient)">X</span>
          </div>
        </div>
      </div>
    </div>
    <Button @click.native="saveClient" title="Salvar" />
  </Container>
</template>

<script lang="ts">
import Vue from 'vue'

interface DataCLient {
  [x: string]: any
  empresa: string
  cnpj: string
  address: string
  cep: string
  email: string
  fone: string
  responsavel: string
  password: string
  [addClients: number]: string
}

export default Vue.extend({
  data() {
    return {
      dataCLient: <DataCLient>{
        empresa: '',
        cnpj: '',
        address: '',
        cep: '',
        email: '',
        fone: '',
        responsavel: '',
        password: '',
        addClients: [],
      },
    }
  },
  methods: {
    addClient() {
      this.dataCLient.addClients.push(this.dataCLient.empresa)
      this.dataCLient.empresa = this.asd
    },
    removeClient(client: String) {
      const removeClient = this.dataCLient.addClients.indexOf(client)
      this.dataCLient.addClients.splice(removeClient, 1)
    },

    saveClient() {
      const dataClient = {
        name: this.dataCLient.name,
        email: this.dataCLient.email,
        password: this.dataCLient.password,
        empresas: this.dataCLient.addClients,
      }
      this.dataCLient.name = ''
      this.dataCLient.email = ''
      this.dataCLient.password = ''
    },
  },
})
</script>
