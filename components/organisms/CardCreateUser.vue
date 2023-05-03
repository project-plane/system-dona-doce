<template>
  <div class="card_create">
    <div class="title_create">
      <img src="~/assets/icons/user.svg" alt="user_create" />
      <h4>Cadastro</h4>
    </div>
    <div class="menu_navigation">
      <nav>
        <ul>
          <li class="active">Clientes</li>
          <li>Funcionários</li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.card_create {
  width: 100%;
  height: 100%;
  padding-top: 90px;
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
    padding: 1.5rem;
    nav ul {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    nav ul li {
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