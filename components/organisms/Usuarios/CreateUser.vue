<template>
  <Container>
    <Title title="Novo Funcionário" />
    <ContainerInput>
      <Input
        label="Nome Completo"
        type="text"
        placeholder="Digitar nome"
        v-model="name"
      />
      <Input
        label="E-mail"
        type="email"
        placeholder="Digitar e-mail"
        v-model="createUser.email"
      />
    </ContainerInput>
    <ContainerInput>
      <Input
        label="Endereço"
        type="text"
        placeholder="Digitar endereço"
        v-model="address"
      />

      <Input
        label="CEP"
        type="text"
        placeholder="ex: XXXXX-XXX"
        v-model="cep"
      />
    </ContainerInput>
    <ContainerInput>
      <Input
        label="Telefone"
        type="number"
        placeholder="Digitar telefone"
        v-model="fone"
      />
      
      
      <Input
        label="Senha"
        type="password"
        placeholder="Digitar senha"
        v-model="createUser.password"
        @input="validatePassword"
      />
   

    </ContainerInput>
    <ContainerInput>
      <div class="input">
        <span>Cargo</span>
        <select v-model="selected">
          <option disabled value="">Selecionar Cargo</option>
          <option>Administrador</option>
          <option>Motorista</option>
          <option>Operador(a)</option>
        </select>
      </div>
    </ContainerInput>
    <div class="btnSalve">
      <Button @functionClick="addUser" title="Salvar" />
    </div>

  </Container>
</template>

<script lang="ts">
import httpUsers from '@/server/users'
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      name: '',
      fone: '',
      address: '',
      cep: '',
      createUser: {
        email: '',
        password: '',
        is_enabled: true,
        is_admin: false,
        is_client: false,
        is_driver: false,
        is_production: false,
      },
      selected: '',
    }
  },

  methods: {
    validatePassword() {
        if (this.password.length >= 5) {
          this.$toast.info('Senha válida');
        }
    },
    async addUser() {
      if (this.selected === 'Administrador') {
        this.createUser.is_admin = true
      }
      if (this.selected === 'Motorista') {
        this.createUser.is_driver = true
      }
      if (this.selected === 'Operador(a)') {
        this.createUser.is_production = true
      }
      const dadosUser = {
        name: this.name,
        fone: this.fone,
        address: this.address,
        cep: this.cep,
        createUser: {
          email: this.createUser.email,
          password: this.createUser.password,
          is_enabled: this.createUser.is_enabled,
          is_admin: this.createUser.is_admin,
          is_client: this.createUser.is_client,
          is_driver: this.createUser.is_driver,
          is_production: this.createUser.is_production,
        },
      }

      console.log(dadosUser)

      if (
        !this.name ||
        !this.fone ||
        !this.address ||
        !this.cep ||
        !this.createUser.email ||
        !this.createUser.password ||
        !this.selected
      ) {
        this.$toast.error('Preenchas todos os campos')
        return
      }

      await httpUsers
        .CreateUser(dadosUser)
        .then((res) => {
          if (res.status === 201) {
            this.$toast.success('Funcionário criado com sucesso')
          }
        })
        .catch((error) => {
          // if (error.response.data.statusCode === 400) {
          //   error.response.data.message.map((e: any) => {
          //     if (e === 'email must be an email') {
          //       this.$toast.error('Digite um e-mail válido')
          //       return
          //     }
          //     if (
          //       e ===
          //       'Esta variável de senha pode ter no mínimo 4 caracteres ou no máximo 50 caracteres'
          //     ) {
          //       this.$toast.error('Senha mínimo 4 e máximo 50 caracteres')
          //       return
          //     }
          //   })
          // }
          if (error.response.data.message === 'Email já existente') {
            this.$toast.error('E-mail já existente')
          }
        })
      this.$nuxt.refresh()

      this.name = ''
      this.fone = ''
      this.address = ''
      this.cep = ''
      this.createUser.email = ''
      this.createUser.password = ''
      this.selected = ''
    },
  },
})
</script>

<style lang="scss" scoped>
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
.btnSalve {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
</style>
