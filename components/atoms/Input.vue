<template>
  <input :type="type" :placeholder="placeholder" />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const textInput = ref('')
watch(textInput, (newValue) => {
  defineEmits(['valor', newValue])
})
defineProps<{
  placeholder: string
  type: string
}>()
</script>

<style scoped>
</style>