<template>
  <div class="content_cadastro">
    <MenuCreate @client="client" @users="users" />
    <div v-if="clientClick">
      <ContentCreateUser />
      <TableUsers />
    </div>
    <div v-else>
      <ContentCreateClient />
      <TableClients />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const clientClick = ref(false)
function client() {
  clientClick.value = false
}

function users() {
  clientClick.value = true
}
</script>

<style lang="scss" scoped>
.content_cadastro {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 3fr;
}
</style>