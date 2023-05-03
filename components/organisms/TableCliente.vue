<template>
  <div class="negativeSpace">
    <h2>Clientes Cadastrados</h2>
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Email</th>
          <th>Empresas</th>
          <th>Opções</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Cliente 1</td>
          <td>cliente1@gmail.com</td>
          <td>Empresa 1</td>
          <td>Opções</td>
        </tr>
        <tr>
          <td>Cliente 2</td>
          <td>cliente2@gmail.com</td>
          <td>Empresa 2</td>
          <td>Opções</td>
        </tr>
        <tr>
          <td>Cliente 3</td>
          <td>cliente3@gmail.com</td>
          <td>Empresa 3</td>
          <td>Opções</td>
        </tr>
        <tr>
          <td>Cliente 4</td>
          <td>cliente4@gmail.com</td>
          <td>Empresa 4</td>
          <td>Opções</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
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
}
</style>