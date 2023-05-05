<template>
  <input :type="type" :placeholder="placeholder" v-model="inputValue" />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const emit = defineEmits(['textInput'])
const inputValue = ref('')

watch(inputValue, (newValue) => {
  emit('textInput', newValue)
})
defineProps<{
  placeholder: string
  type: string
}>()
</script>

<style scoped>
</style>