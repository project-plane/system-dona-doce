<template>
  <div class="card_create">
    <div class="title_create">
      <img src="~/assets/icons/user.svg" alt="user_create" />
      <h4>Cadastro</h4>
    </div>
    <div class="menu_navigation">
      <nav>
        <ul>
          <li
            :class="{ active: isActiveClient }"
            @click="buttonClient(isActiveClient)"
          >
            Clientes
          </li>
          <li
            :class="{ active: isActiveUser }"
            @click="buttonUsers(isActiveUser)"
          >
            Funcionários
          </li>
        </ul>
      </nav>
      <ButtonPirula @click.native="logout" title="Sair" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      isActiveClient: true,
      isActiveUser: false,
    }
  },

  methods: {
    buttonClient(activeClient: boolean) {
      this.isActiveClient = true
      this.isActiveUser = false
      this.$emit('client')
    },
    buttonUsers(activeUser: boolean) {
      this.isActiveClient = false
      this.isActiveUser = true
      this.$emit('users')
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
  position: fixed;
  width: 300px;
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
      font-size: 1.6rem;
    }
  }
  .menu_navigation {
    width: 100%;
    height: 80vh;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    nav ul {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    nav ul li {
      cursor: pointer;
      font-size: 1.5rem;
      list-style: none;
      border-bottom: 1px solid var(--border);
    }
    nav ul .active {
      color: var(--red);
      font-weight: bold;
    }
  }
}
</style>