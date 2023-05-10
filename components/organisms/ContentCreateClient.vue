<template>
  <div class="content_user">
    <div class="negativeSpace">
      <Title>
        <h1>Novo Cliente</h1>
      </Title>
      <div class="input_create">
        <div class="input_column">
          <div class="input">
            <Label>Nome</Label>
            <Input type="text" placeholder="Digite nome" />
          </div>
          <div class="input">
            <Label>Email</Label>
            <Input type="text" placeholder="Digite email" />
          </div>
          <div class="input">
            <Label>Senha</Label>
            <Input type="password" placeholder="Digite senha" />
          </div>
        </div>
        <div class="input_column">
          <div class="input_add">
            <div class="input">
              <Label>Empresas</Label>
              <Input type="password" placeholder="Digite empresa" />
            </div>
            <button>Adicionar</button>
          </div>
          <div class="list_empresa">
            <p>Empresa 1</p>
            <p>Empresa 2</p>
            <p>Empresa 3</p>
            <p>Empresa 4</p>
            <p>Empresa 5</p>
            <p>Empresa 6</p>
            <p>Empresa 7</p>
            <p>Empresa 8</p>
            <p>Empresa 9</p>
          </div>
        </div>
      </div>
      <Button title="Salvar" />
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.content_user {
  padding-top: 90px;
  .negativeSpace {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    border-bottom: 1px solid var(--border);
    .input_create {
      width: 100%;
      display: flex;
      gap: 1.5rem;
      .input_column {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        .input_add {
          display: flex;
          align-items: flex-end;
          button {
            background: var(--txt_color);
            color: var(--white);
            width: 40%;
            height: 35px;
            font-weight: bold;
            font-size: 1.2rem;
          }
        }
        .list_empresa {
          height: 120px;
          overflow-y: scroll;
        }
      }
      .input {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 0.3rem;
      }
    }
  }
}
</style>