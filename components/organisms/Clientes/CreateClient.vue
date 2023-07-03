<template>
  <Container>
    <Title title="Novo Cliente" />
    <ContainerInput>
      <Input
        label="Empresa"
        type="text"
        placeholder="Digitar nome empresa"
        v-model="corporate_name"
      />
      <Input
        label="Nome Fantasia"
        type="text"
        placeholder="Digitar nome fantasia"
        v-model="name_fantasy"
      />
    </ContainerInput>
    <ContainerInput>
      <Input
        label="CNPJ"
        type="text"
        placeholder="Digitar CNPJ"
        v-model="cnpj"
      />

      <Input
        label="Inscrição Estadual"
        type="text"
        placeholder="Digitar inscrição estadual"
        v-model="ie"
      />
    </ContainerInput>
    <ContainerInput>
      <Input
        label="Endereço"
        type="text"
        placeholder="Digitar endereço"
        v-model="address"
      />
      <Input label="CEP" type="text" placeholder="Digitar CEP" v-model="cep" />
    </ContainerInput>
    <ContainerInput>
      <Input
        label="Fone"
        type="text"
        placeholder="Digitar fone"
        v-model="fone"
      />
      <Input
        label="Bairro"
        type="text"
        placeholder="Digitar bairro"
        v-model="district"
      />
    </ContainerInput>
    <ContainerInput>
      <Input
        label="Estado"
        type="text"
        placeholder="Digitar estado"
        v-model="uf"
      />
      <Input
        label="Cidade"
        type="text"
        placeholder="Digitar cidade"
        v-model="county"
      />
    </ContainerInput>
    <ContainerInput>
      <Input
        label="Responsável"
        type="text"
        placeholder="Digitar responsável"
        v-model="accountable"
      />
      <Input
        label="E-mail"
        type="text"
        placeholder="Digitar e-mail"
        v-model="createUser.email"
      />
    </ContainerInput>
    <ContainerInput>
      <Input
        label="Senha"
        type="password"
        placeholder="Digitar senha"
        v-model="createUser.password"
      />
    </ContainerInput>

    <h2>Associar Empresa - Cliente</h2>
    <div class="associarEmpresa">
      <div class="input">
        <Label>Empresa</Label>
        <select v-model="selected">
          <option disabled value="">Selecionar Empresa</option>
          <option v-for="empresa in listEmpresa" :key="empresa.id">
            {{ empresa.corporate_name }}
          </option>
        </select>
      </div>
      <Input
        label="Responsável"
        type="text"
        placeholder="Digitar nome responsável"
        v-model="accountableCompany"
      />
      <Input
        label="Fone"
        type="text"
        placeholder="Digitar fone responsável"
        v-model="foneCompany"
      />
      <button @click="addClient">Adicionar</button>
    </div>
    <table v-if="createCompany.length !== 0">
      <thead>
        <th>ID</th>
        <th>Empresa</th>
        <th>Responsável</th>
        <th>Fone</th>
        <th>Opção</th>
      </thead>
      <tbody>
        <tr v-for="(company, index) in createCompany" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ company.company }}</td>
          <td>{{ company.accountable }}</td>
          <td>{{ company.fone }}</td>
          <td>
            <img
              src="~/assets/icons/close.svg"
              alt=""
              @click="removeEmpresaAssociada(company)"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <div class="row-button">
      <Button @click.native="saveClient" title="Salvar" />
    </div>
  </Container>
</template>

<script lang="ts">
import Vue from 'vue'

import httpClient from '~/server/cliente'
import httpEmpresa from '~/server/empresa'

export default Vue.extend({
  data() {
    return {
      selected: '',
      corporate_name: '',
      cnpj: '',
      fone: '',
      name_fantasy: '',
      county: '',
      district: '',
      ie: '',
      uf: '',
      address: '',
      cep: '',
      accountable: '',
      createUser: {
        email: '',
        password: '',
        is_enabled: true,
        is_admin: true,
        is_client: true,
      },
      createCompany: [],
      accountableCompany: '',
      foneCompany: '',
      listEmpresa: [],
    }
  },

  async fetch() {
    await httpEmpresa
      .GetAllEmpresa()
      .then((res) => {
        this.listEmpresa = res.data
      })
      .catch((error) => {
        console.log(error)
      })
  },
  methods: {
    addClient() {
      let idEmpresa
      this.listEmpresa.map((e) => {
        if (this.selected === e.corporate_name) {
          idEmpresa = e.id
        }
      })
      if (!this.selected || !this.accountableCompany || !this.foneCompany) {
        this.$toast.error('Preencha todos os campos!!!')
        return
      }
      const existeEmpresa = this.createCompany.find((item) => {
        return item.fk_company === idEmpresa
      })
      const existeAccountable = this.createCompany.find((item) => {
        return item.accountable === this.accountableCompany
      })
      if (existeEmpresa) {
        this.$toast.error('Empresa já associada a esse cliente')
        this.selected = ''
        this.accountableCompany = ''
        this.foneCompany = ''
        return
      }
      if (existeAccountable) {
        this.$toast.error('Responsável já associado a uma empresa')
        this.selected = ''
        this.accountableCompany = ''
        this.foneCompany = ''
        return
      }
      this.createCompany.push({
        fk_company: idEmpresa,
        company: this.selected,
        accountable: this.accountableCompany,
        fone: this.foneCompany,
      })
      this.selected = ''
      this.accountableCompany = ''
      this.foneCompany = ''
    },
    removeEmpresaAssociada(empresaAssociada: String) {
      const removeEmpresaAssociada =
        this.createCompany.indexOf(empresaAssociada)
      this.createCompany.splice(removeEmpresaAssociada, 1)
    },

    async saveClient() {
      if (
        !this.corporate_name ||
        !this.cnpj ||
        !this.fone ||
        !this.name_fantasy ||
        !this.county ||
        !this.district ||
        !this.ie ||
        !this.uf ||
        !this.address ||
        !this.cep ||
        !this.accountable ||
        !this.createUser ||
        this.createCompany.length === 0
      ) {
        this.$toast.error('Preencha todos os campos!!!')
        return
      }

      const dataClient = {
        corporate_name: this.corporate_name,
        cnpj: this.cnpj,
        fone: this.fone,
        name_fantasy: this.name_fantasy,
        county: this.county,
        district: this.district,
        ie: this.ie,
        uf: this.uf,
        address: this.address,
        cep: this.cep,
        accountable: this.accountable,
        createUser: this.createUser,
        createCompany: this.createCompany,
      }

      await httpClient
        .CreateClient(dataClient)
        .then((res) => {
          console.log(res)
        })
        .catch((error) => {
          console.log(error)
        })

      this.corporate_name = ''
      this.cnpj = ''
      this.fone = ''
      this.name_fantasy = ''
      this.county = ''
      this.district = ''
      this.ie = ''
      this.uf = ''
      this.address = ''
      this.cep = ''
      this.accountable = ''
      this.createUser = ''
      this.createCompany = []

      this.$nuxt.refresh()
    },
  },
})
</script>


<style scoped lang="scss">
.btnAssociarEmpresa {
  border-top: 1px solid var(--border);
  padding: 1rem 0 1rem 0;
  width: 100%;
  button {
    border-radius: 0.25rem;
    font-weight: bold;
    border: 1px solid var(--red);
    color: var(--red);
    font-size: 1.2rem;
    padding: 0.7rem;
    cursor: pointer;
    transition: 0.2s;
  }
}

.row-button {
  display: flex;
  justify-content: flex-end;
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
    border: 1px solid var(--red);
    color: var(--red);
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

  span {
    font-size: 1rem;
  }

  select {
    border: 0.06rem solid var(--border);
    border-radius: 0.25rem;
  }
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
    img {
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
