<template>
  <div>
    <button class="buttonLogin">{{ title }}</button>
  </div>
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
.buttonLogin {
  width: 100%;
  font-size: 1rem;
  font-weight: 400;
}
</style>