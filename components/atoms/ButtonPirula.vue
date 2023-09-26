<template>
    <button class="buttonLogin" :disabled="isDisabled">{{ title }}</button>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    title: {
      type: String,
      default: '',
      required: true,
    },
    isDisabled: {
      type: Boolean,
      default: false,
      required: false
    },
  },
})
</script>

<style scoped>
.buttonLogin {
  width: 100%;
  font-size: 1rem;
  font-weight: 400;
}

.buttonLogin:disabled {
  cursor: not-allowed;
  opacity: 50%;
}
</style>