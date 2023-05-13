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
          <input
            type="text"
            placeholder="Digite seu e-mail"
            v-model="dataLogin.email"
          />
          <Label>Password</Label>
          <input
            type="password"
            placeholder="Digite sua senha"
            v-model="dataLogin.password"
          />
          <div class="recupera_senha">
            <p @click="recoverPassword">Esqueci a minha senha</p>
          </div>
          <ButtonPirula @click="accessLogin" title="Login" />
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import httpAccess from '@/server/auth'

import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      dataLogin: {
        email: '',
        password: '',
      },
    }
  },

  methods: {
    async accessLogin() {
      await httpAccess
        .PostLogin(this.dataLogin)
        .then((res) => {
          sessionStorage.setItem('token', res.data)

          if (res.status === 201) {
            sessionStorage.getItem('token')

            this.$toast.success('Bem-vindo ao Sistema Dona Doce!!!')
          }
          this.$router.push('/cadastrar')
        })
        .catch((error) => {
          this.$toast.warning('Confira todos os campos!!!')
          console.log(error)
        })
    },
    recoverPassword() {
      this.$router.push('/recoverPassword')
    },
  },
})
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