<template>
  <div class="recoverPassword">
    <div class="titleRecover">
      <h2>Esqueceu a senha?</h2>
      <img src="~/assets/icons/faceRecover.svg" alt="faceRecover" />
    </div>
    <h3>Preencha com seu e-mail!</h3>
    <div class="inputRecover">
      <input type="email" placeholder="Digite seu email" v-model="email" />
      <div class="btnRecover">
        <button @click="backPage">Voltar</button>
        <button @click="recoverEmail">Recuperar Senha</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import httpRecover from '@/server/auth'
export default Vue.extend({
  data() {
    return {
      email: '',
    }
  },
  methods: {
    backPage() {
      this.$router.push('/login')
    },
    async recoverEmail() {
      await httpRecover
        .PostRecoverEmail({ email: this.email })
        .then((res) => {
          this.$toast.success('E-mail de recuperação de senha enviado')
          this.$router.push('/login')
        })
        .catch((error) => {
          const msg: string[] = error.response.data.message
          msg.map((item) => {
            this.$toast.warning(item)
          })
        })
    },
  },
})
</script>

<style scoped lang="scss">
.recoverPassword {
  width: 100%;
  height: 91vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  .titleRecover {
    display: flex;
    gap: 1rem;
  }
  .inputRecover {
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.2rem;
    input,
    button {
      width: 50%;
    }
    .btnRecover {
      width: 50%;
      display: flex;
      gap: 2rem;
      button {
        background: var(--red);
        color: var(--white);
        border-radius: 4px;
        padding: 0.6rem;
        width: 100%;
        font-weight: 700;
        font-size: 1.5rem;
      }
    }
  }
}
</style>
