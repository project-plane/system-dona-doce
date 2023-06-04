<template>
  <Container>
    <Title>
      <h1>Novo Cliente</h1>
    </Title>
    <div class="input_create">
      <div class="input_column">
        <Input
          label="Nome"
          type="text"
          placeholder="Digite nome"
          v-model="dataCLient.name"
        />
        <Input
          label="Email"
          type="text"
          placeholder="Digite email"
          v-model="dataCLient.email"
        />
        <Input
          label="Senha"
          type="password"
          placeholder="Digite senha"
          v-model="dataCLient.password"
        />
      </div>
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
  name: string
  email: string
  password: string
  empresa: string
  [addClients: number]: string
}

export default Vue.extend({
  data() {
    return {
      dataCLient: <DataCLient>{
        name: '',
        email: '',
        password: '',
        empresa: '',
        addClients: [],
      },
      client: '',
      asd: '',
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

<style lang="scss" scoped>
.input_create {
  width: 100%;
  display: flex;
  gap: 1.5rem;
  .input_column {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .input_add {
      display: flex;
      align-items: flex-end;
      button {
        background: var(--txt_color);
        color: var(--white);
        width: 40%;
        height: 35px;
        font-weight: bold;
        font-size: 1.2rem;
      }
    }
    .list_empresa {
      height: 120px;
      overflow-y: scroll;
      .add_clients {
        display: flex;
        justify-content: space-between;
        margin-right: 20px;
        span {
          color: var(--border);
          cursor: pointer;
        }
      }
    }
  }
  .input {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }
}
</style>