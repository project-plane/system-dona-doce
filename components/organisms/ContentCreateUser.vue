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
              @textInput="valueModel"
            />
          </div>
          <div class="input">
            <Label>Sobre Nome</Label>
            <Input
              type="text"
              placeholder="Digite sobre nome"
              @textInput="valueModel"
            />
          </div>
          <div class="input">
            <Label>E-mail</Label>
            <Input
              type="text"
              placeholder="Digite e-mail"
              @textInput="valueModel"
            />
          </div>
        </div>
        <div class="input_column">
          <div class="input">
            <Label>Senha</Label>
            <Input
              type="password"
              placeholder="Digite senha"
              @textInput="valueModel"
            />
          </div>
          <div class="input">
            <Label>CPF</Label>
            <Input
              type="text"
              placeholder="Digite CPF"
              @textInput="valueModel"
            />
          </div>
        </div>
      </div>
      <Button @click.native="createUser" title="Salvar" />
    </div>
  </div>
</template>

<script setup lang="ts">
import httpUsers from '@/server/users'
import { reactive } from 'vue'

const dataUser = reactive({
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
})

function valueModel(e: string) {
  dataUser.name = e
  dataUser.username = e
  dataUser.email = e
  dataUser.password = e
  dataUser.cpf = e
}

async function createUser() {
  await httpUsers.CreateUser(dataUser).then((res) => {
    console.log(res)
  })
}
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