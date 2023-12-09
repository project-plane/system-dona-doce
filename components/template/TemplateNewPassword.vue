<template>
  <div class="newPassword">
    <div class="title_login">
      <span class="title"> Dona Doce </span>
    </div>
    <div class="inputPassword">
      <Input
        v-model="newPassword"
        label="Digitar nova senha"
        type="password"
        placeholder="Digitar nova senha"
        @input="contarCaractere"
      />
      <section style="width: 100%">
        <Input
          v-model="confirmPassword"
          label="Confirmar nova Senha"
          type="password"
          placeholder="Confirmar nova senha"
        />
        <span v-if="quantidade <= 5 " style="font-size: 11px; text-align: start; color: red">
          Escolha uma senha com pelo menos seis caracteres</span
        >
      </section>

      <button class="btnSave" @click="redefinePassword">Salvar</button>
    
    </div>
  </div>
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
      quantidade: 0
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
            error.response.data.message ==
            
            'Esta variável de senha pode ter no mínimo 4 caracteres ou no máximo 50 caracteres'
          ) {
            this.$toast.error(
              'Esta nova senha é igual a última senha, tente outra!!!'
            )

          }
          alert(error.response.data.message[0])
          this.$toast.error('Error na solicitação')
          this.newPassword = ''
          this.confirmPassword = ''

        })

      console.log(dataPassword)
    },
    
   contarCaractere() {
      this.quantidade = this.newPassword.length;
    }
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
  .inputPassword {
    width: 60%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
  }

  .btnSave {
    background: var(--red);
    color: var(--white);
    border-radius: 4px;
    padding: 0.6rem;
    width: 100%;
    font-weight: 700;
    font-size: 1rem;
  }
}
</style>
