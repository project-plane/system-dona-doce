<template>
    <div>
      <div class="title_create" @click="spaceMenu">
        
        <div class="cadastrar">
          <img src="~/assets/icons/kanban.svg" alt="user_create" />
          <h4>Kanban</h4>
        </div>
        <img
          class="setaDropdown"
          :class="{ isIconDropdown: isIconDropdown }"
          src="~/assets/icons/setaDropdown.svg"
          alt=""
        />
      </div>
      <nav v-show="isDropdown" class="menu_navigation">
        <ul>
          <li>
            <NuxtLink to="/kanban/producao">Ir para Produção</NuxtLink>
          </li>

          <li>
            <NuxtLink to="/kanban/entrega">Ir para Entrega</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/kanban/controleMateriais">Bandejas e Caixas</NuxtLink>
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
        isIconDropdown: false,
        isDropdown: false,
      }
    },
  
    methods: {
      spaceMenu() {
        this.isDropdown = !this.isDropdown
        this.isIconDropdown = !this.isIconDropdown
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
  
    .isIconDropdown {
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
  </style>
  