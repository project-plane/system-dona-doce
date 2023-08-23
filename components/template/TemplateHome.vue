<template>
  <div class="content">
    <BusinessCard />
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {}
  },
})
</script>
<style scoped lang="scss">
.content {
  padding: 6rem var(--space) 0 var(--space);
  @include screen('tablet') {
    padding: calc(4rem + var(--space)) var(--space) 0 var(--space);
  }
}
</style>
