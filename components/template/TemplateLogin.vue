<template>
  <div class="sider_bar negativeSpace">
    <div class="main_login">
      <div class="title_login">
        <p class="title">Dona</p>
        <p class="title">Doce</p>
      </div>
      <div class="form_login">
        <InputForm label="E-mail" placeholder="Digite seu e-mail" type="text" />
        <InputForm
          label="Senha"
          placeholder="Digite sua senha"
          type="password"
        />
        <div class="recupera_senha">
          <p>Esqueci a minha senha</p>
        </div>
        <ButtonPirula title="Login" />
      </div>
    </div>
  </div>
</template>

<!-- <script>
export default {
  layout: 'main',
}
</script> -->

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