<template>
  <div class="sider_bar negativeSpace">
    <div class="main_login">
      <div class="title_login">
        <span class="title"> Dona Doce </span>
      </div>
      <form class="form_login" @submit.prevent="accessLogin">
        <Input
          label="Email"
          v-model="dataLogin.email"
          type="text"
          placeholder="Digite seu e-mail"
        />
        <Input
          label="Password"
          v-model="dataLogin.password"
          type="password"
          placeholder="Digite sua senha"
        />
        <div class="recupera_senha">
          <span @click="recoverPassword">Esqueci a minha senha</span>
        </div>

        <ButtonPirula @click="accessLogin" title="Login" />
        <div v-if="statusMessage">
          <h5 style="color: var(--red)">{{ message }}</h5>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import httpAccess from '@/server/auth'
export default Vue.extend({
  data() {
    return {
      dataLogin: {
        email: '',
        password: '',
      },
      statusMessage: false,
      message: '',
    }
  },

  methods: {
    async accessLogin() {
      await httpAccess
        .PostLogin(this.dataLogin)
        .then((res) => {
          if (res.data.is_client) {
            sessionStorage.setItem('token', res.data.token)

            sessionStorage.getItem('token')
            this.$router.push('/pedidos')
            return
          } else {
            sessionStorage.setItem('token', res.data.token)

            sessionStorage.getItem('token')
            this.$toast.success('Bem-vindo ao Sistema Dona Doce!!!')
            this.$router.push('/cadastrar')
            return
          }
          console.log(res)
        })
        .catch((error) => {
          if (error.response.data.statusCode === 400) {
            this.$toast.error('Preencha todos os campos!!!')
            return
          }

          if (error.response.data.statusCode === 401) {
            this.$toast.error('Dados inválidos!!!')
            return
          }
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

  @include screen('mobile') {
    width: 100%;
    bottom: 0;
    height: 70vh;
    border-radius: 1rem 1rem 0 0;

    .main_login {
      justify-content: flex-start !important;
    }
  }
  .main_login {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    .form_login {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 1rem;

      .recupera_senha {
        color: var(--blue);
        cursor: pointer;
        margin-bottom: 0.6rem;
        text-align: center;
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
  text-align: center;
}
</style>
