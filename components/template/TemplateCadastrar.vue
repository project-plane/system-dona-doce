<template>
  <div class="containerGrid">
    <MenuCreate @client="client" @users="users" />
    <div class="scroll_container">
      <div v-if="statusActive" class="container">
        <ContentCreateUser />
        <TableUsers />
      </div>
      <div v-else class="container">
        <ContentCreateClient />
        <TableClients />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      statusActive: false,
    }
  },
  methods: {
    users() {
      this.statusActive = true
      console.log(this.statusActive)
    },
    client() {
      this.statusActive = false
      console.log(this.statusActive)
    },
  },
})
</script>

<style lang="scss" scoped>
.containerGrid{
  display: grid;
  grid-template: calc(4rem - 100vh)/ 300px 1fr;
  .scroll_container{
    height: 90vh;
    overflow-y: scroll;
    border-left: 1px solid var(--border);
  }
}
</style>