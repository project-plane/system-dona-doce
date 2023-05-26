<template>
  <button @click="$emit('functionClick')" class="buttonPirula">
    {{ title }}
  </button>
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
  },
})
</script>

<style scoped>
.buttonPirula {
  width: 100%;
}
</style>
