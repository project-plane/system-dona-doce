<template>
  <div>
    <Navbar />
    <div class="content">
      <Nuxt />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({})
</script>

<style lang="scss" scoped>
.content {
  margin-top: 4rem;
}
</style>