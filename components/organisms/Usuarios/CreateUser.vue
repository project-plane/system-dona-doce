<template>
  <Container>
    <Title>
      <h1>Novo Funcionário</h1>
    </Title>
    <ContainerInput>
      <Input
        label="Nome Completo"
        type="text"
        placeholder="Digitar nome"
        v-model="name"
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
        label="Endereço"
        type="text"
        placeholder="Digitar endereço"
        v-model="address"
      />

      <Input label="CEP" type="text" placeholder="Digitar cep" v-model="cep" />
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
      />
    </ContainerInput>
    <ContainerInput>
      <div class="input">
        <Label>Cargo</Label>
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
        is_admin: true,
        is_client: false,
      },
      selected: '',
    }
  },

  methods: {
    async addUser() {
      // if (this.selected === 'Administrador') {
      //   this.dataUser.is_admin = true
      // }
      // if (this.selected === 'Motorista') {
      //   this.dataUser.is_stock = true
      // }
      // if (this.selected === 'Operador(a)') {
      //   this.dataUser.is_product = true
      // }
      const dadosUser = {
        name: this.name,
        fone: this.fone,
        address: this.address,
        cep: this.cep,
        createUser: {
          email: this.createUser.email,
          password: this.createUser.password,
          is_enabled: true,
          is_admin: true,
          is_client: false,
        },
      }

      console.log(dadosUser)

      // if (
      //   !this.dataUser.name ||
      //   !this.dataUser.username ||
      //   !this.dataUser.email ||
      //   !this.dataUser.password ||
      //   !this.dataUser.cpf ||
      //   !this.selected
      // ) {
      //   this.$toast.error('Preenchas todos os campos')
      //   return
      // }

      await httpUsers
        .CreateUser(dadosUser)
        .then((res) => {
          if (res.status === 201) {
            this.$toast.success('Funcionário criado com sucesso')
          }
        })
        .catch((error) => {
          if (error.response.data.statusCode === 400) {
            error.response.data.message.map((e: any) => {
              if (e === 'email must be an email') {
                this.$toast.error('Digite um e-mail válido')
                return
              }
              if (
                e ===
                'Esta variável de senha pode ter no mínimo 4 caracteres ou no máximo 50 caracteres'
              ) {
                this.$toast.error('Senha mínimo 4 e máximo 50 caracteres')
                return
              }
            })
          }
          if (error.response.data.message === 'CPF já existente') {
            this.$toast.error('CPF já existente')
          }
          if (error.response.data.message === 'Email já existente') {
            this.$toast.error('E-mail já existente')
          }
          if (error.response.data.message === 'Username já existente') {
            this.$toast.error('Usuário já existente')
          }
        })
      this.$nuxt.refresh()
      // ;(this.dataUser.name = ''), (this.dataUser.username = '')
      // this.dataUser.email = ''
      // this.dataUser.password = ''
      // this.dataUser.cpf = ''
      // this.dataUser.fone = ''
      // this.selected = ''
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
}
.btnSalve {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
</style>
