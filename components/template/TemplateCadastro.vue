<template>
  <div class="content_cadastro">
    <CardCreateUser />
    <div>
      <ContentCreateUser />
      <TableCliente />
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.content_cadastro {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 3fr;
}
</style>