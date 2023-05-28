<template>
  <ContainerTable>
    <h2>Lista de Ingredientes</h2>
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Preço Unitário</th>
          <th>Opções</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Trigo</td>
          <td>R$ 59,99</td>
          <td>
            <div class="iconsOptions">
              <button>
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
import Vue from 'vue'

export default Vue.extend({})
</script>

<style scoped lang="scss">
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