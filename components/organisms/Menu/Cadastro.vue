<template>
  <div>
    <div class="title_create" @click="spaceMenu">
      <div class="cadastrar">
        <img src="~/assets/icons/user.svg" alt="user_create" />
        <h4>Cadastro</h4>
      </div>
      <img
        class="setaDropdown"
        :class="{ isIconDropdownCadastrar: isIconDropdownCadastrar }"
        src="~/assets/icons/setaDropdown.svg"
        alt=""
      />
    </div>
    <nav class="menu_navigation" v-show="isDropdownCadastrar">
      <ul>
        <li>
          <NuxtLink to="/cadastrar/unidade">Unidade</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/cadastrar/cliente">Cliente</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/cadastrar/user">Funcionário</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/cadastrar/ingrediente">Ingrediente</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/cadastrar/estoque">Estoque</NuxtLink>
        </li>
        <li>
          <span
            class="btnDropdown"
            :class="{ isIconDropdown: isIconDropdown }"
            @click="dropdownReceita"
          >
            Receita
            <img src="~/assets/icons/setaDropdown.svg" alt="" />
          </span>
          <div class="dropdown" v-show="isDropdown">
            <span>
              <NuxtLink to="/cadastrar/receita/receita"
                >Cadastrar Receita</NuxtLink
              >
            </span>
            <span>
              <NuxtLink to="/cadastrar/receita/receitaporcliente"
                >Valor Receita Por Cliente</NuxtLink
              >
            </span>
          </div>
        </li>
        <li>
          <NuxtLink to="/cadastrar/cardapio">Cardápio</NuxtLink>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      isDropdown: false,
      isIconDropdown: false,
      isIconDropdownCadastrar: false,
      isDropdownCadastrar: false,
    }
  },

  methods: {
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
  padding: 1.5rem;

  ul {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    li {
      width: 100%;
      cursor: pointer;
      font-size: 1.1rem;
      list-style: none;
      border-bottom: 1px solid var(--border);
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
</style>
