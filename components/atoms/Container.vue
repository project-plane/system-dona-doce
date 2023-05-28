<template>
  <div class="negativeSpace">
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>

<style lang="scss" scoped>
.negativeSpace {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  border-bottom: 1px solid var(--border);
}
</style>