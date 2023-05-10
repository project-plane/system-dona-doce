<template>
  <div class="sider_bar negativeSpace">
    <div class="main_login">
      <div class="title_login">
        <p class="title">Dona</p>
        <p class="title">Doce</p>
      </div>
      <form action="" @submit.prevent="accessLogin">
        <div class="form_login">
          <Label>E-mail</Label>
          <Input
            @textInput="valueModel"
            :type="type"
            placeholder="Digite seu e-mail"
          />
          <Label>Password</Label>
          <Input
            @textInput="valueModel"
            :type="type"
            placeholder="Digite sua senha"
          />
          <div class="recupera_senha">
            <p>Esqueci a minha senha</p>
          </div>
          <ButtonPirula title="Login" />
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import httpAccess from '@/server/auth'

import { reactive, ref } from 'vue'

defineProps<{
  label: String
  placeholder: String
  type: String
}>()

const type = ref('text')

const dataLogin = reactive({
  email: '',
  password: '',
})

function valueModel(e: string) {
  dataLogin.email = e
  dataLogin.password = e
}

async function accessLogin() {
  await httpAccess.PostLogin(dataLogin).then((res) => {
    console.log(res)
  })
}
</script>

<style lang="scss" scoped>
.sider_bar {
  position: absolute;
  right: 0;
  height: 100vh;
  width: 50%;
  background: var(--bg_color);
  z-index: 10000;
  .main_login {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .form_login {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      .recupera_senha {
        color: var(--blue);
        cursor: pointer;
        margin-top: -1rem;
        margin-bottom: 2rem;
      }
    }
  }
}
.title_login {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}
.title {
  color: var(--red);
  font-size: 3rem;
  font-weight: bold;
}
</style>