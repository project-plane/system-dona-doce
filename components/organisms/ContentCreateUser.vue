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
              type="text"
              placeholder="Digite a senha"
              v-model="dataUser.password"
            />
          </div>
          <div class="input">
            <Label>Cargo</Label>
            <select v-model="selected">
              <option disabled value="">Selecionar cargo</option>
              <option :disabled="dataUser.is_admin">Administrador</option>
              <option :disabled="dataUser.is_enabled">Motorista</option>
              <option :disabled="dataUser.is_product">Confeiteiro(a)</option>
              <option :disabled="dataUser.is_stock">Faturamento</option>
              <option :disabled="dataUser.is_revenues">Empacotador</option>
            </select>
            <div
              class="excluirCargo"
              v-for="(cargo, index) in addCargo"
              :key="index"
            >
              <p>{{ index + 1 }} - {{ cargo }}</p>
              <span @click="removeCargo(cargo)">X</span>
            </div>
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
  fone: number
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
        fone: Number(0),
        is_enabled: false,
        is_admin: false,
        is_product: false,
        is_stock: false,
        is_revenues: false,
      },
      selected: '',
      addCargo: [],
      disabled: false,
    }
  },
  watch: {
    selected(newValue, oldValue) {
      this.addCargo.push(newValue)
      this.statusCargo()
    },
  },
  methods: {
    statusCargo() {
      if (this.selected === 'Administrador') {
        this.dataUser.is_admin = true
      }
      if (this.selected === 'Motorista') {
        this.dataUser.is_enabled = true
      }
      if (this.selected === 'Confeiteiro(a)') {
        this.dataUser.is_product = true
      }
      if (this.selected === 'Faturamento') {
        this.dataUser.is_stock = true
      }
      if (this.selected === 'Empacotador') {
        this.dataUser.is_revenues = true
        return
      }
    },
    async createUser() {
      const dadosUser = {
        name: this.dataUser.name,
        username: this.dataUser.username,
        email: this.dataUser.email,
        password: this.dataUser.password,
        cpf: this.dataUser.cpf,
        fone: Number(this.dataUser.fone),
        is_enabled: this.dataUser.is_enabled,
        is_admin: this.dataUser.is_admin,
        is_product: this.dataUser.is_product,
        is_stock: this.dataUser.is_stock,
        is_revenues: this.dataUser.is_revenues,
      }
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
        .CreateUser(dadosUser)
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
    removeCargo(cargo: never) {
      const removerCargo = this.addCargo.indexOf(cargo)
      this.addCargo.splice(removerCargo, 1)
      if (cargo === 'Administrador') {
        this.dataUser.is_admin = false
        return
      }
      if (cargo === 'Motorista') {
        this.dataUser.is_enabled = false
        return
      }
      if (cargo === 'Confeiteiro(a)') {
        this.dataUser.is_product = false
        return
      }
      if (cargo === 'Faturamento') {
        this.dataUser.is_stock = false
        return
      }
      if (cargo === 'Empacotador') {
        this.dataUser.is_revenues = false
        return
      }
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