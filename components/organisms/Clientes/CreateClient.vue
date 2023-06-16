<template>
  <Container>
    <Title>
      <h1>Novo Cliente</h1>
    </Title>
    <ContainerInput>
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
    <ContainerInput>
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
        type="text"
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
    <div class="btnAssociarEmpresa">
      <button @click="associarEmpresa">Associar Empresa</button>
    </div>
    <div v-if="showEmpresa">
      <div class="associarEmpresa">
        <ContainerInput>
          <div class="input">
            <Label>Empresa</Label>
            <select v-model="selected">
              <option disabled value="">Selecionar Empresa</option>
              <option v-for="empresa in listEmpresa" :key="empresa.id">{{empresa.corporate_name}}</option>
              <!-- <option>{{empresa.corporate_name}}</option> -->
            </select>
          </div>
          <Input
            label="Responsável"
            type="text"
            placeholder="Digitar nome responsável"
            v-model="responsavelAssociado"
          />
        </ContainerInput>
        <button @click="addClient">Adicionar</button>
      </div>
      <table v-if="dataCLient.addClients.length !== 0">
        <thead>
          <th>ID</th>
          <th>Empresa</th>
          <th>Responsável</th>
          <th>Opção</th>
        </thead>
        <tbody>
          <tr v-for="(addClient, index) in dataCLient.addClients" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ addClient.empresa }}</td>
            <td>{{ addClient.responsavel }}</td>
            <td>
              <img
                src="~/assets/icons/close.svg"
                alt=""
                @click="removeClient(addClient)"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Button @click.native="saveClient" title="Salvar" />
  </Container>
</template>

<script lang="ts">
import Vue from 'vue'

import httpEmpresa from '~/server/empresa'

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
      selected: '',
      responsavelAssociado: '',
      showEmpresa: false,
      listEmpresa: []
    }
  },

  async fetch(){
    await httpEmpresa.GetAllEmpresa().then((res) => {
      this.listEmpresa = res.data
      
    })
    .catch((error) => {
      console.log(error);
      
    })
  },
  methods: {
    associarEmpresa() {
      this.showEmpresa = true
    },
    addClient() {
      if (!this.selected || !this.responsavelAssociado) {
        this.$toast.error('Preencha todos os campos!!!')
        return
      }
      this.dataCLient.addClients.push({
        empresa: this.selected,
        responsavel: this.responsavelAssociado,
      })
      this.selected = ''
      this.responsavelAssociado = ''
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


<style scoped lang="scss">
.btnAssociarEmpresa {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  button {
    border-radius: 0.3rem;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--blue);
    color: #ffffff;
    color: var(--white);
    font-size: 1.2rem;
    padding: 0.7rem;
    cursor: pointer;
  }
  button:hover {
    background: rgb(44, 11, 192);
  }
}
.associarEmpresa {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
  button {
    border-radius: 0.3rem;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--blue);
    color: #ffffff;
    color: var(--white);
    font-size: 1.2rem;
    padding: 0.5rem;
    cursor: pointer;
    margin-top: 30px;
  }
}
.inputCreate {
  width: 100%;
  padding: 1rem 0;
  display: flex;
  gap: 2rem;
}
.input {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  thead {
    width: 100%;
    background: var(--bg_heade_table);
    tr th {
      padding: 0.6rem 0;
    }
  }
  tbody tr td {
    text-align: center;
    padding: 1rem 0;
    img{
      width: 15px;
      height: 15px;
      cursor: pointer;
    }
  }
  tbody tr button {
    background: transparent;
  }
}
</style>