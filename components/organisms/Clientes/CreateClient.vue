<template>
  <Container>

    <Title title="Cadastrar Cliente" />
    <ContainerInput>
      <Input label="Empresa" type="text" placeholder="Ex: Moto Honda da Amazonia LTDA" v-model="corporate_name" />
      <Input label="Nome Fantasia" type="text" placeholder="Ex: Honda" v-model="name_fantasy" />
    </ContainerInput>
    <ContainerInput>
      <Input label="CNPJ" type="text" placeholder="Ex: XX.XXX.XXX/0001-XX" v-mask="['##.###.###/####-##']"
        v-model="cnpj" />

      <Input label="Inscrição Estadual" type="text" placeholder="Ex: XX.XXX.XXX" v-model="ie" />
    </ContainerInput>
    <ContainerInput>
      <Input label="Endereço" type="text" placeholder="Ex: Rua Socorro Dutra, 37" v-model="address" />
      <Input label="CEP" type="text" placeholder="Ex: XXXXX-XXX" v-mask="['XXXXX-XXX']" v-model="cep" />
    </ContainerInput>
    <ContainerInput>
      <Input label="Fone" type="text" placeholder="Ex: XXXXXXXXX" v-model="fone" />
      <Input label="Bairro" type="text" placeholder="Ex: Centro" v-model="district" />
    </ContainerInput>
    <ContainerInput>
      <Input label="Cidade" type="text" placeholder="Digitar cidade" v-model="county" />
      <Input label="UF" type="text" placeholder="Ex: AM" v-model="uf" v-mask="['AA']" />
    </ContainerInput>
    <ContainerInput>
      <Input label="Responsável" type="text" placeholder="Digitar responsável" v-model="accountable" />
      <Input label="E-mail" type="text" placeholder="Digitar e-mail" v-model="createUser.email" />
    </ContainerInput>
    <ContainerInput>

      <Input v-model="createUser.password" label="Digitar nova senha" type="password" placeholder="Digitar nova senha"
        @input="validacaoCaracteres" />
    </ContainerInput>
    <section style="display: grid;">

      <span style="font-size: 11px; text-align: start;  margin-top: -2rem;">{{ createUser.password }}</span>
      <span v-if="quantidade <= 5" style="font-size: 11px; text-align: start; color: red; margin-top: -1rem;">
        Escolha uma senha com pelo menos seis caracteres</span>
    </section>

    <h3>Associar unidade - cliente</h3>

    <ContainerInput>
      <input style="border: 0.06rem solid var(--border);" v-model="email" label="E-mail" type="email" placeholder="Digitar e-mail" />
      <div class="line-pass">
        <input v-model="senha" ref="senha" label="Senha" type="password" placeholder="Digitar senha" />
        <button class="pass-button" @click="exibirSenha()">
          <img v-show="!eyeView" src="~/assets/icons/eye.svg" />
          <img v-show="eyeView" src="~/assets/icons/eyeClose.svg" />
        </button>

      </div>
    </ContainerInput>
    <div class="associarEmpresa">
      <div class="input">
        <span>Unidade</span>
        <select v-model="selected">
          <option disabled="true" selected="true">Selecione unidade</option>
          <option v-for="empresa in listEmpresa" :key="empresa.id">
            {{ empresa.corporate_name }}
          </option>
        </select>
      </div>
      <Input label="Responsável" type="text" placeholder="Digitar nome responsável" v-model="accountableCompany" />
      <Input label="Fone" type="text" placeholder="Digitar fone responsável" v-model="foneCompany" />
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
            <img src="~/assets/icons/close.svg" alt="" @click="removeEmpresaAssociada(company)" />
          </td>
        </tr>
      </tbody>
    </table>
    <div class="row-button">
      <Button @click.native="saveClient" title="Salvar" :isDisabled="isDisabled" />
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
      isDisabled: false,
      selected: '',
      eyeView: true,
      email: '',
      img: '~/assets/icons/eye.svg',
      senha: '',
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
      quantidade: 0
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
    exibirSenha() {
      // Acessa o elemento DOM do campo de senha usando $refs
      const campoSenha = this.$refs.senha;


      // Verifica se o tipo do campo de senha é 'password'
      if (campoSenha.type === 'password') {
        // Se for, altera o tipo para 'text' para exibir a senha
        campoSenha.type = 'text';
        this.eyeView = true;
        return;
      }
      campoSenha.type = 'password';
      this.eyeView = false;

    },
    validacaoCaracteres() {
      this.quantidade = this.createUser.password.length;
    },
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
        user: {
          email: this.email,
          password: this.senha,
          is_enabled: true,
          is_admin: true,
          is_client: true,
          is_driver: true,
          is_production: true,
          is_company: true
        }
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
      if (this.quantidade < 5) {
        this.$toast.info(' Escolha uma senha com pelo menos seis caracteres')
      }
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
        !this.createUser
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



      this.isDisabled = true

      await httpClient
        .CreateClient(dataClient)
        .then((res) => {
          this.$toast.success('Cliente criado com sucesso!!!')

        })
        .catch((error) => {
          console.log(error)
        })


      this.email = ''
      this.senha = ''
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
      this.createUser = {
        email: '',
        password: '',
        is_enabled: true,
        is_admin: true,
        is_client: true,
      }
      this.createCompany = []

      this.$nuxt.refresh()

      this.isDisabled = false
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

.line-pass {
  display: flex;
  align-items: center;
       input {
        border: 0.06rem solid var(--border);

        }
}

.pass-button {
  width: 40px;
  background: transparent;
  height: 40px;
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
