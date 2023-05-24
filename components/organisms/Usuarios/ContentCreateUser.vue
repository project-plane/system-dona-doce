<template>
  <div class="content_user">
    <div class="negativeSpace">
      <Title>
        <h1>Novo Funcionário</h1>
      </Title>
      <div class="input_create">
        <div class="input_column">
          <div class="input">
            <Label>Nome Completo</Label>
            <input
              type="text"
              placeholder="Digite o nome"
              v-model="dataUser.name"
            />
          </div>
          <div class="input">
            <Label>E-mail</Label>
            <input
              type="text"
              placeholder="Digite o e-mail"
              v-model="dataUser.email"
            />
          </div>
          <div class="input">
            <Label>CPF</Label>
            <input
              type="text"
              placeholder="Digite o CPF"
              v-model="dataUser.cpf"
            />
          </div>
          <div class="input">
            <Label>Telefone</Label>
            <input
              type="number"
              placeholder="Digite o telefone"
              v-model="dataUser.fone"
            />
          </div>
        </div>
        <div class="input_column">
          <div class="input">
            <Label>Usuário</Label>
            <input
              type="text"
              placeholder="Digite o usuário"
              v-model="dataUser.username"
            />
          </div>
          <div class="input">
            <Label>Senha</Label>
            <input
              type="password"
              placeholder="Digite a senha"
              v-model="dataUser.password"
            />
          </div>
          <div class="input">
            <Label>Cargo</Label>
            <select v-model="selected">
              <option disabled value="">Selecionar cargo</option>
              <option>Administrador</option>
              <option>Motorista</option>
              <option>Operador(a)</option>
            </select>
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
interface DataUser {
  name: string
  username: string
  email: string
  password: string
  cpf: string

  fone: string

  is_enabled: boolean
  is_admin: boolean
  is_product: boolean
  is_stock: boolean
  is_revenues: boolean
}
export default Vue.extend({
  data() {
    return {
      dataUser: <DataUser>{
        name: '',
        username: '',
        email: '',
        password: '',
        cpf: '',

        fone: '',

        is_enabled: false,
        is_admin: false,
        is_product: false,
        is_stock: false,
        is_revenues: false,
      },
      selected: '',
    }
  },

  methods: {
    async createUser() {
      if (this.selected === 'Administrador') {
        this.dataUser.is_admin = true
      }
      if (this.selected === 'Motorista') {
        this.dataUser.is_stock = true
      }
      if (this.selected === 'Operador(a)') {
        this.dataUser.is_product = true
      }
      const dadosUser = {
        name: this.dataUser.name,
        username: this.dataUser.username,
        email: this.dataUser.email,
        password: this.dataUser.password,
        cpf: this.dataUser.cpf,
        fone: Number(this.dataUser.fone),
        is_admin: this.dataUser.is_admin,
        is_product: this.dataUser.is_product,
        is_stock: this.dataUser.is_stock,
        is_enabled: this.dataUser.is_enabled,
        is_revenues: this.dataUser.is_revenues,
      }

      if (
        !this.dataUser.name ||
        !this.dataUser.username ||
        !this.dataUser.email ||
        !this.dataUser.password ||
        !this.dataUser.cpf ||
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
              console.log(e)
            })
            // const email = error.response.data.message[0]
            // this.$toast.error(email)
            // console.log(email)
          }
          if (error.response.data.statusCode === 409) {
            this.$toast.error('E-mail já existente')
          }
        })
    },
  },
})
</script>

<style lang="scss" scoped>
.content_user {
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
        .excluirCargo {
          display: flex;
          justify-content: space-between;
          span {
            color: var(--border);
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>