<template>
  <div class="content_user">
    <div class="negativeSpace">
      <Title>
        <h1>Novo Funcionário</h1>
      </Title>
      <div class="input_create">
        <div class="input_column">
          <div class="input">
            <Label>Nome</Label>
            <Input
              type="text"
              placeholder="Digite nome"
              @textInput="valueName"
            />
          </div>
          <div class="input">
            <Label>Sobre Nome</Label>
            <Input
              type="text"
              placeholder="Digite sobre nome"
              @textInput="valueUserName"
            />
          </div>
          <div class="input">
            <Label>E-mail</Label>
            <Input
              type="text"
              placeholder="Digite e-mail"
              @textInput="valueEmail"
            />
          </div>
        </div>
        <div class="input_column">
          <div class="input">
            <Label>Senha</Label>
            <Input
              type="password"
              placeholder="Digite senha"
              @textInput="valuePassword"
            />
          </div>
          <div class="input">
            <Label>CPF</Label>
            <Input type="text" placeholder="Digite CPF" @textInput="valueCpf" />
          </div>
        </div>
      </div>
      <Button @click.native="createUser" title="Salvar" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import httpUsers from '@/server/users'
interface dataUser {
  name: String
  username: String
  email: String
  password: String
  cpf: String
  fone: Number
  is_enabled: Boolean
  is_admin: Boolean
  is_product: Boolean
  is_stock: Boolean
  is_revenues: Boolean
}
export default Vue.extend({
  data() {
    return {
      dataUser: <dataUser>{
        name: '',
        username: '',
        email: '',
        password: '',
        cpf: '',
        fone: 0,
        is_enabled: true,
        is_admin: true,
        is_product: true,
        is_stock: true,
        is_revenues: true,
      },
    }
  },
  methods: {
    async createUser() {
      if (
        !this.dataUser.name ||
        !this.dataUser.username ||
        !this.dataUser.email ||
        !this.dataUser.password ||
        !this.dataUser.cpf
      ) {
        this.$toast.error('Preenchas todos os campos')
        return
      }
      await httpUsers
        .CreateUser(this.dataUser)
        .then((res) => {
          if (res.status === 201) {
            this.$toast.success('Funcionário criado com sucesso')
          }
        })
        .catch((error) => {
          this.$toast.error('Verifique todos os campos')
          console.log(error)
        })
    },

    valueName(e: String) {
      this.dataUser.name = e
    },
    valueUserName(e: String) {
      this.dataUser.username = e
    },
    valueEmail(e: String) {
      this.dataUser.email = e
    },
    valuePassword(e: String) {
      this.dataUser.password = e
    },
    valueCpf(e: String) {
      this.dataUser.cpf = e
    },
  },
})
</script>

<style lang="scss" scoped>
.content_user {
  padding-top: 90px;
  .negativeSpace {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    border-bottom: 1px solid var(--border);
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
        }
      }
      .input {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 0.3rem;
      }
    }
  }
}
</style>