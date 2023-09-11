<template>
  <ContainerTable>
    <div class="headerTable">
      <span>Prioridade de Rotas</span>
      <InputSearch v-model="textSearch" />
    </div>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Ingrediente</th>
          <th>Preço Unitário</th>
          <th>Prioridade de Rota</th>
          <th>Opções</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>teste</td>
          <td>dfdsfdsfds</td>
          <td>Rsdfsdfdsfds</td>
          <td>
            <input type="number" placeholder="Digitar prioridade de rota">
          </td>
          <td>
            <Button title="Salvar" />
          </td>
        </tr>
      </tbody>
    </table>
  </ContainerTable>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      textSearch: ''
    }
  },

})
</script>

<style scoped lang="scss">
.headerTable {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    font-size: 1.35rem;
    font-weight: 600;
  }
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  font-size: 0.9rem;

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

      img {
        width: 1.2rem;
      }
    }
  }

  .btnRota {
    display: flex;


  }
}
</style>
