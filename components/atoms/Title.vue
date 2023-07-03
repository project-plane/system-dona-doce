<template>
  <span class="title">{{ title }}</span>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    // eslint-disable-next-line vue/require-default-prop
    title: String,
  }
})
</script>

<style lang="scss" scoped>
.title {
  font-size: 1.35rem;
  color: var(--red);
  font-weight: 600;
}
</style>