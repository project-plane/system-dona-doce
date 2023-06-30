<template>
  <Container class="newPassword">
    <div class="inputPassword">
      <Input
        v-model="newPassword"
        label="Digitar nova senha"
        type="text"
        placeholder="Digitar nova sennha"
      />
      <Input
        v-model="confirmPassword"
        label="Confirmar Senha"
        type="text"
        placeholder="Confirmar senha"
      />
    </div>
    <div class="btnNewPassword">
      <button>Salvar</button>
    </div>
  </Container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      newPassword: '',
      confirmPassword: '',
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
