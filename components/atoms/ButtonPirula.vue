<template>
  <div>
    <button class="buttonLogin">{{ title }}</button>
  </div>
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