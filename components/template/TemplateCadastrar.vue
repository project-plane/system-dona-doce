<template>
  <div>
    <MenuCreate @client="client" @users="users" />
    <div v-if="statusActive" class="container">
      <ContentCreateUser />
      <TableUsers />
    </div>
    <div v-else class="container">
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
.container {
  position: absolute;
  width: calc(100% - 300px);
  left: 300px;
  z-index: -1;
}
</style>