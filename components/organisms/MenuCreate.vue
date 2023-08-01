<template>
  <div class="card_create">
    <div class="title_create" @click="spaceMenu">
      <div class="cadastrar">
        <img src="~/assets/icons/user.svg" alt="user_create" />
        <h4>Cadastro</h4>
      </div>
      <img class="setaDropdown" :class="{ isIconDropdownCadastrar: isIconDropdownCadastrar }"
        src="~/assets/icons/setaDropdown.svg" alt="">
    </div>
    <nav class="menu_navigation" v-show="isDropdownCadastrar">
      <ul>
        <li :class="{ active: isActiveEmpresa }" @click="buttonEmpresa(isActiveEmpresa)">
          Unidade
        </li>
        <li :class="{ active: isActiveClient }" @click="buttonClient(isActiveClient)">
          Cliente
        </li>
        <li :class="{ active: isActiveUser }" @click="buttonUsers(isActiveUser)">
          Funcionário
        </li>
        <li :class="{ active: isActiveIngredientes }" @click="buttonIngredientes(isActiveIngredientes)">
          Ingrediente
        </li>
        <li :class="{ active: isActiveEstoque }" @click="buttonEstoque(isActiveEstoque)">
          Estoque
        </li>
        <li>
          <span class="btnDropdown" :class="{ isIconDropdown: isIconDropdown }" @click="dropdownReceita">
            Receita
            <img src="~/assets/icons/setaDropdown.svg" alt="">
          </span>
          <div class="dropdown" v-show="isDropdown">
            <span :class="{ active: isActiveReceitas }" @click="buttonReceitas(isActiveReceitas)">
              Cadastrar Receita
            </span>
            <span :class="{ active: isActiveReceitasPorCliente }"
              @click="buttonReceitasPorCliente(isActiveReceitasPorCliente)">
              Valor Receita Por Cliente
            </span>
          </div>
        </li>
        <li :class="{ active: isActiveMenu }" @click="buttonMenu(isActiveMenu)">
          Cardápio
        </li>
      </ul>
    </nav>
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
      isActiveEmpresa: true,
      isActiveClient: false,
      isActiveUser: false,
      isActiveIngredientes: false,
      isActiveEstoque: false,
      isActiveReceitas: false,
      isActiveReceitasPorCliente: false,
      isActiveMenu: false,
      isDropdown: false,
      isIconDropdown: false,
      isIconDropdownCadastrar: false,
      isDropdownCadastrar: false
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
      this.isActiveReceitasPorCliente = false
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
      this.isActiveReceitasPorCliente = false
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
      this.isActiveReceitasPorCliente = false
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
      this.isActiveReceitasPorCliente = false
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
      this.isActiveReceitasPorCliente = false
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
      this.isActiveReceitasPorCliente = false
      this.isActiveMenu = false
      this.$emit('receitas')
    },
    buttonReceitasPorCliente(activeReceitas: boolean) {
      this.isActiveEmpresa = false
      this.isActiveClient = false
      this.isActiveUser = false
      this.isActiveIngredientes = false
      this.isActiveEstoque = false
      this.isActiveReceitas = false
      this.isActiveReceitasPorCliente = true
      this.isActiveMenu = false
      this.$emit('receitasPorCliente')
    },
    buttonMenu(isActiveMenu: boolean) {
      this.isActiveEmpresa = false
      this.isActiveClient = false
      this.isActiveUser = false
      this.isActiveIngredientes = false
      this.isActiveEstoque = false
      this.isActiveReceitas = false
      this.isActiveReceitasPorCliente = false
      this.isActiveMenu = true
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
  height: 91vh;
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
      img {
        rotate: 180deg;
      }
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
      padding: .5rem;
      gap: .5rem;

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
