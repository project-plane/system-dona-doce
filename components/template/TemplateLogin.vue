<template>
  <div>
    <Loading v-if="loading" />
    <div class="sider_bar negativeSpace">
      <div class="main_login">
        <div class="title_login">
          <span class="title"> Dona Doce </span>
        </div>
        <form class="form_login" @submit.prevent="accessLogin" v-if="login">
          <Input
            style="color: var(--red)"
            v-model="dataLogin.email"
            label="Email"
            type="text"
            placeholder="Digite seu e-mail"
          />
          <Input
            style="color: var(--red)"
            v-model="dataLogin.password"
            label="Password"
            type="password"
            placeholder="Digite sua senha"
          />
          <!-- <div class="recupera_senha">
            <span @click="recoverPassword">Esqueci a minha senha</span>
          </div> -->

          <ButtonPirula
            title="Login"
            :is-disabled="isDisabled"
            id="btnlogin"
            @click.native="accessLogin"
          />
          <ButtonPirula
            id="btnEsqueci"
            title="Esqueci a minha senha"
            :is-disabled="isDisabled"
            @click.native="recoverPassword"
          />
          <div v-if="statusMessage">
            <h5 style="color: var(--red)">{{ message }}</h5>
          </div>
        </form>
        <div class="resetSenha" v-else>
          <Input
            style="color: var(--red)"
            v-model="email"
            label="Email"
            type="text"
            placeholder="Digite seu e-mail "
          />

          <ButtonPirula
            @click.native="recoverEmail"
            title="Resgatar senha"
            style="border-radius: 0.25rem"
          />
          <ButtonPirula
            @click.native="backToLogin"
            title="Login"
            style="
              border-radius: 0.25rem;
              background: transparent;
              color: #fa5c4f;
            "
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import httpAccess from '@/server/auth'
import httpRecover from '@/server/auth'
export default Vue.extend({
  data() {
    return {
      dataLogin: {
        email: '',
        password: '',
      },
      email: '',
      statusMessage: false,
      message: '',
      isDisabled: false,
      loading: false,
      login: true,
    }
  },

  async created() {
    this.loading = true
    await new Promise((resolve) => setTimeout(resolve, 3000))
    this.loading = false
  },

  methods: {
    async accessLogin() {
      this.loading = true
      this.isDisabled = true
      await httpAccess
        .PostLogin(this.dataLogin)
        .then((res) => {
          if (res.data.is_client) {
            sessionStorage.setItem('token', res.data.token)

            sessionStorage.getItem('token')
            this.$router.push('/pedidos')
            this.$toast.success(
              'Bem-vindo à área de clientes do sistema Dona Doce!!!',
              {
                position: 'top-center',
                timeout: 5000,
                icon: false,
                closeButton: false,
              }
            )
          } else if (res.data.is_company) {

            sessionStorage.setItem('token', res.data.token)

            sessionStorage.getItem('token')
            this.$router.push('/pedidos-unidade')
            this.$toast.success(
              'Bem-vindo à área de Unidades do sistema Dona Doce!!!',
              {
                position: 'top-center',
                timeout: 5000,
                icon: false,
                closeButton: false,
              }
            )
          } else if (res.data.is_admin) {
            sessionStorage.setItem('token', res.data.token)

            sessionStorage.getItem('token')
            this.$toast.error('Bem-vindo ao Sistema Dona Doce!!!', {
              position: 'top-center',
              timeout: 5000,
              icon: false,
              closeButton: false,
            })
            this.$router.push('/dashboard/dashboard')
          } else {
            this.$toast.error(
              'Erro ao entrar, verifique com o administrador seu acesso!!!',
              {
                position: 'top-center',
                timeout: 5000,
                icon: false,
                closeButton: false,
              }
            )
          }
        })
        .catch((error) => {
          if (error.response.data.statusCode === 400) {
            this.$toast.error('Email e senha incorretos')
            return
          }

          if (error.response.data.statusCode === 401) {
            this.$toast.error('Usuario não autorizado!!!')
          }
        })
      this.loading = false
      this.isDisabled = false
    },
    recoverPassword() {
      this.login = false
    },
    async recoverEmail() {
      await httpRecover
        .PostRecoverEmail({ email: this.email })
        .then((res) => {
          this.$toast.success('E-mail de recuperação de senha enviado')
          this.login = true
          this.$router.push('/login')
        })
        .catch((error) => {
          const msg: string[] = error.response.data.message
          msg.map((item) => {
            this.$toast.warning(item)
          })
        })
    },
    backToLogin() {
      // this.$router.push('/login')
      this.login = true
    },
  },
})
</script>

<style lang="scss" scoped>
#btnEsqueci {
  background-color: #917b79;
}

#btnlogin:hover {
  background-color: bisque;
  border: 2px solid var(--red);
  color: var(--red);
  transition: background-color 1s ease-in-out;
}

#btnEsqueci:hover {
  background-color: bisque;
  transition: background-color 1s ease-in-out;
  border: 2px solid #917b79;
  color: #917b79;
}
.resetSenha {
  display: flex;
  flex-direction: column;
  height: 40vh;
  justify-content: center;
  gap: 2rem;
}
.sider_bar {
  position: absolute;
  right: 0;
  height: 100vh;
  width: 50%;
  background: var(--bg_color);
  animation: slidein 4s, fadeBackground 6s;
  animation-fill-mode: forwards;

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
      animation: fadeIn 10s;

      .recupera_senha {
        color: var(--blue);
        cursor: pointer;
        margin-bottom: 0.6rem;
        text-align: center;
      }
    }
  }
}

@keyframes slidein {
  from {
    margin-left: 100%;
    width: 0%;
    overflow: hidden;
  }

  to {
    margin-left: 0%;
    width: 50%;
    overflow: hidden;
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes fadeBackground {
  from {
    background-color: #fa5c4f;
  }
  to {
    background-color: #ffefdb;
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
