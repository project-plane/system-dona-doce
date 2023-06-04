<template>
  <ContainerTable>
    <EditEstoque />
    <div class="headerTable">
      <h2>Lista do Estoque</h2>
<InputSearch v-model="textSearch" />
    </div>
    <table>
      <thead>
        <tr>
          <th>Quantidade</th>
          <th>Ingrediente</th>
          <th>Preco</th>
          <th>Opções</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>20kg</td>
          <td>Trigo</td>
          <td>R$ 160,00</td>
          <td>
            <div class="iconsOptions">
              <button @click="editEstoque">
                <img src="~/assets/icons/edit.svg" alt="" />
              </button>
              <button>
                <img src="~/assets/icons/delete.svg" alt="" />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </ContainerTable>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      textSearch: ''
    }
  },
  methods: {
    editEstoque() {
      this.openModal = this.$store.commit('OPEN_MODAL', true)
    },
    
  },
})
</script>

<style scoped lang="scss">
.headerTable{
  width: 100%;
  display: flex;
  justify-content: space-between;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  thead {
    width: 100%;
    background: var(--bg_heade_table);
    tr th {
      padding: 0.6rem 0;
    }
  }
  tbody tr td {
    text-align: center;
    padding: 1rem 0;
  }
  tbody tr .img img {
    width: 50px;
    height: 50px;
  }
  tbody tr .iconsOptions {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    button {
      background: transparent;
    }
  }
}
</style>
