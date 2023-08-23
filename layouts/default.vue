<template>
  <div v-if="route === 'index'">
    <Navbar />
    <Nuxt />
  </div>
  <div v-else>
    <Navbar />
    <div class="content">
      <MenuCreate />
      <div class="scroll_container">
        <Nuxt />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      route: '',
    }
  },
  fetch() {
    const router = this.$route.name

    this.route = router
  },
})
</script>

<style lang="scss" scoped>
.content {
  margin-top: 3.9rem;
  display: flex;
  .scroll_container {
    width: 80%;
    height: 90vh;
    overflow-y: scroll;
  }
}
</style>
