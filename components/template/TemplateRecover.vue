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
        <Button @click.native="backPage" title="Voltar" />
        <Button @click.native="recoverEmail" title="Recuperar Senha" />
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
      if (this.email) {
        this.$toast.warning('Preencha todos os campos!!!')
      }
      await httpRecover
        .PostRecoverEmail(this.email)
        .then((res) => {
          sessionStorage.setItem('token', res.data)

        })
        .catch((error) => {
          console.log(error)
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
    }
  }
}
</style>