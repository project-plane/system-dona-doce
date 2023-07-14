<template>
  <Container class="newPassword">
    <div class="inputPassword">
      <Input
        v-model="newPassword"
        label="Digitar nova senha"
        type="password"
        placeholder="Digitar nova senha"
      />
      <Input
        v-model="confirmPassword"
        label="Confirmar nova Senha"
        type="password"
        placeholder="Confirmar nova senha"
      />
    </div>
    <div class="btnNewPassword">
      <button @click="redefinePassword">Salvar</button>
    </div>
  </Container>
</template>

<script lang="ts">
import Vue from 'vue'

import httpRedefinePassword from '~/server/auth'

export default Vue.extend({
  data() {
    return {
      newPassword: '',
      confirmPassword: '',
      incorrectSenha: false,
    }
  },
  methods: {
    async redefinePassword() {
      if (!this.newPassword || !this.confirmPassword) {
        this.$toast.error('Preencha todos os campos!!!')
        return
      }
      if (this.confirmPassword !== this.newPassword) {
        this.$toast.error('Senha não confere!!!')
        this.newPassword = ''
        this.confirmPassword = ''
        return
      }
      const dataPassword = {
        token: this.$route.params.token,
        password: this.newPassword,
        confirmpassword: this.confirmPassword,
      }
      await httpRedefinePassword
        .RedefinePassword(dataPassword)
        .then((res) => {
          this.$toast.success('Senha redefinida com sucesso')
          this.$router.push('/login')
        })
        .catch((error) => {
          if (
            error.response.data.message === 'Este token foi usado anteriormente'
          ) {
            this.$toast.error('Solicite uma nova redefinição de senha!!!')
            this.$router.push('/login')
            return
          }
          if (
            error.response.data.message ===
            'Esta nova senha é igual a última senha, tente outra'
          ) {
            this.$toast.error(
              'Esta nova senha é igual a última senha, tente outra!!!'
            )
            this.newPassword = ''
            this.confirmPassword = ''
          }
          console.log(error.response.data.message)
        })

      console.log(dataPassword)
    },
  },
})
</script>

<style scoped lang="scss">
.newPassword {
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .inputPassword {
    width: 40%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
  }
  .btnNewPassword {
    width: 40%;
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
</style>
