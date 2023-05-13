<template>
  <div class="recoverPassword">
    <div class="titleRecover">
      <h2>Esqueceu a senha?</h2>
      <img src="~/assets/icons/faceRecover.svg" alt="faceRecover" />
    </div>
    <h3>Preencha com seu e-mail!</h3>
    <div class="inputRecover">
      <input type="email" placeholder="Digite seu email" />
      <div class="btnRecover">
        <Button @click.native="backPage" title="Voltar" />
        <Button title="Recuperar Senha" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  methods: {
    backPage() {
      this.$router.push('/login')
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