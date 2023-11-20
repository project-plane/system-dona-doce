<template>
  <div class="card_create">
    <div>
      <Dashboard />
      <Cadastro />
      <Kanban />
      <Lotes />
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
    return {}
  },

  methods: {
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
  height: 90vh;
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: auto;
  

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

@media (max-width: 900px) {
  .card_create {
    width: 100%;
    height: auto;
    position: absolute;
    background: var(--bg_heade_table);
    box-shadow: 10px 5px 10px rgba(0, 0, 0, 0.205);
    padding-bottom: 1rem;
    z-index: 10;

    .footerMenu {
      span {
        display: none;
      }
    }

  }
}
</style>
