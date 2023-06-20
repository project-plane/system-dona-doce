<template>
  <div class="input_column">
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>

<style scoped lang="scss">
.input_column {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  flex-direction: column;
  gap: 1rem;
}
</style>
