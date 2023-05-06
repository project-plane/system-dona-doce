<template>
  <div class="content_cadastro">
    <MenuCreate @client="client" @users="users" />
    <div v-if="statusActive">
      <ContentCreateUser />
      <TableUsers />
    </div>
    <div v-else>
      <ContentCreateClient />
      <TableClients />
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
    },
    client() {
      this.statusActive = false
    },
  },
})
</script>

<style lang="scss" scoped>
.content_cadastro {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 3fr;
}
</style>