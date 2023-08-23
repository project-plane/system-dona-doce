<template>
  <div class="card_create">
    <div>
      <Dashboard @dashboard="dashboard"/>
      <Cadastro v-show="midiaAba" @empresa="empresa" @client="client" @users="users" @ingredientes="ingredientes"
        @estoque="estoque" @receitas="receitas" @receitasPorCliente="receitasPorCliente" @menu="menu" />
    </div>

    <div class="footerMenu">
      <ButtonPirula title="Sair" @click.native="logout" />
      <span>Version 0.0.1 - Em Desenvolvimento</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      isActiveEmpresa: false,
      isActiveClient: false,
      isActiveUser: false,
      isActiveIngredientes: false,
      isActiveEstoque: false,
      isActiveReceitas: false,
      isActiveReceitasPorCliente: false,
      isActiveMenu: false,
      isDropdown: false,
      isIconDropdown: false,
      isIconDropdownCadastrar: true,
      isDropdownCadastrar: true,
      midiaAba: true
    }
  },

  methods: {
    dashboard() {
      this.$emit('dashboard')
    },
    empresa(activeEmpresa: boolean) {
      this.$emit('empresa')
    },
    client(activeClient: boolean) {
      this.$emit('client')
    },
    users(activeUser: boolean) {
      this.$emit('users')
    },
    ingredientes(activeIngredientes: boolean) {
      this.$emit('ingredientes')
    },
    estoque(activeEstoque: boolean) {
      this.$emit('estoque')
    },
    receitas(activeReceitas: boolean) {
      this.$emit('receitas')
    },
    receitasPorCliente(activeReceitas: boolean) {
      this.$emit('receitasPorCliente')
    },
    menu(isActiveMenu: boolean) {
      this.$emit('menu')
    },
    dropdownReceita() {
      this.isDropdown = !this.isDropdown
      this.isIconDropdown = !this.isIconDropdown
    },
    spaceMenu() {
      this.isDropdownCadastrar = !this.isDropdownCadastrar
      this.isIconDropdownCadastrar = !this.isIconDropdownCadastrar
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
  width: 20%;
  min-height: 91vh;
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .title_create {
    height: 4.5rem;
    background: var(--bg_heade_table);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 0 1.5rem;
    cursor: pointer;

    .cadastrar {
      display: flex;
      gap: 1rem;

      h4 {
        font-size: 1.2rem;
        font-weight: 600;
      }

      img {
        width: 2rem;
      }
    }

    .isIconDropdownCadastrar {
      rotate: 180deg;
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
        font-size: 1.1rem;
        list-style: none;
        border-bottom: 1px solid var(--border);
      }

      .active {
        color: var(--red);
        font-weight: bold;
      }
    }

    .btnDropdown {
      display: flex;
      justify-content: space-between;

      img {
        rotate: 360deg;
      }
    }

    .isIconDropdown {
      img {
        rotate: 180deg;
      }
    }

    .dropdown {
      display: flex;
      flex-direction: column;
      padding: 0.5rem;
      gap: 0.5rem;
    }
  }

  .footerMenu {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    padding: 0 1.5rem;

    span {
      text-align: center;
      font-size: 0.7rem;
    }
  }
}
</style>
