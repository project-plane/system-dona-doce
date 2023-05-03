<template>
  <button class="buttonPirula">{{ title }}</button>
</template>

<script setup lang="ts">
defineProps<{
  title: String
}>()
</script>

<style scoped>
.buttonLogin {
  width: 100%;
}
</style>