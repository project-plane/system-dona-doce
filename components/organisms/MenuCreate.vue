<template>
  <div class="card_create">
    <div class="title_create">
      <img src="~/assets/icons/user.svg" alt="user_create" />
      <h4>Cadastro</h4>
    </div>
    <nav class="menu_navigation">
        <ul>
          <li
            :class="{ active: isActiveEmpresa }"
            @click="buttonEmpresa(isActiveEmpresa)"
          >
            Empresa
          </li>
          <li
            :class="{ active: isActiveClient }"
            @click="buttonClient(isActiveClient)"
          >
            Cliente
          </li>
          <li
            :class="{ active: isActiveUser }"
            @click="buttonUsers(isActiveUser)"
          >
            Funcionário
          </li>
          <li
            :class="{ active: isActiveIngredientes }"
            @click="buttonIngredientes(isActiveIngredientes)"
          >
            Ingrediente
          </li>
          <li
            :class="{ active: isActiveEstoque }"
            @click="buttonEstoque(isActiveEstoque)"
          >
            Estoque
          </li>
          <li
            :class="{ active: isActiveReceitas }"
            @click="buttonReceitas(isActiveReceitas)"
          >
            Receita
          </li>
          <li
            :class="{ active: isActiveMenu }"
            @click="buttonMenu(isActiveMenu)"
          >
          Cardápio
          </li>
        </ul>
      <div class="footerMenu">
        <ButtonPirula title="Sair" @click.native="logout" />
        <span>Version 0.0.1 - Em Desenvolvimento</span>
      </div>
    </nav>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      isActiveEmpresa: true,
      isActiveClient: false,
      isActiveUser: false,
      isActiveIngredientes: false,
      isActiveEstoque: false,
      isActiveReceitas: false,
      isActiveMenu: false
    }
  },

  methods: {
    buttonEmpresa(activeEmpresa: boolean) {
      this.isActiveEmpresa = true
      this.isActiveClient = false
      this.isActiveUser = false
      this.isActiveIngredientes = false
      this.isActiveEstoque = false
      this.isActiveReceitas = false
      this.isActiveMenu = false
      this.$emit('empresa')
    },
    buttonClient(activeClient: boolean) {
      this.isActiveEmpresa = false
      this.isActiveClient = true
      this.isActiveUser = false
      this.isActiveIngredientes = false
      this.isActiveEstoque = false
      this.isActiveReceitas = false
      this.isActiveMenu = false
      this.$emit('client')
    },
    buttonUsers(activeUser: boolean) {
      this.isActiveEmpresa = false
      this.isActiveClient = false
      this.isActiveUser = true
      this.isActiveIngredientes = false
      this.isActiveEstoque = false
      this.isActiveReceitas = false
      this.isActiveMenu = false
      this.$emit('users')
    },
    buttonIngredientes(activeIngredientes: boolean) {
      this.isActiveEmpresa = false
      this.isActiveClient = false
      this.isActiveUser = false
      this.isActiveIngredientes = true
      this.isActiveEstoque = false
      this.isActiveReceitas = false
      this.isActiveMenu = false
      this.$emit('ingredientes')
    },
    buttonEstoque(activeEstoque: boolean) {
      this.isActiveEmpresa = false
      this.isActiveClient = false
      this.isActiveUser = false
      this.isActiveIngredientes = false
      this.isActiveEstoque = true
      this.isActiveReceitas = false
      this.isActiveMenu = false
      this.$emit('estoque')
    },
    buttonReceitas(activeReceitas: boolean) {
      this.isActiveEmpresa = false
      this.isActiveClient = false
      this.isActiveUser = false
      this.isActiveIngredientes = false
      this.isActiveEstoque = false
      this.isActiveReceitas = true
      this.isActiveMenu = false
      this.$emit('receitas')
    },
    buttonMenu(isActiveMenu: boolean){
      this.isActiveEmpresa = false
      this.isActiveClient = false
      this.isActiveUser = false
      this.isActiveIngredientes = false
      this.isActiveEstoque = false
      this.isActiveReceitas = false
      this.isActiveMenu = true
      this.$emit('menu')
    },
    logout() {
      sessionStorage.removeItem('token')
      this.$router.push('/login')
    },
  },
})
</script>

<style lang="scss" scoped>
.card_create {
  height: 100%;
  border-right: 1px solid var(--border);

  .title_create {
    height: 90px;
    background: var(--bg_heade_table);
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0 1.5rem;

    h4 {
      font-size: 1.3rem;
      font-weight: 600;
    }

    img {
      width: 2rem;
    }
  }
  .menu_navigation {
    width: 100%;
    height: 76vh;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    
    ul {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;

      li {
        cursor: pointer;
        font-size: 1.2rem;
        list-style: none;
        border-bottom: 1px solid var(--border);
      }

      .active {
        color: var(--red);
        font-weight: bold;
      }
    }

    .footerMenu {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      justify-content: center;

      span {
        text-align: center;
        font-size: 0.7rem;
      }
    }
  }
}
</style>