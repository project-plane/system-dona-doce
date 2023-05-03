<template>
  <div class="input_form">
    <Label>{{ label }}</Label>
    <Input :type="type" :placeholder="placeholder" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: String
  placeholder: String
  type: String
}>()
</script>

<style scoped>
.input_form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>