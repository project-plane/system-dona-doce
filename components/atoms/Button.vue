<template>
  <div class="btnContainer">
    <button @click="$emit('functionClick')" class="buttonPirula">
      {{ title }}
    </button>
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

<style scoped lang="scss">
.btnContainer {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  .buttonPirula {
    width: 30%;
  }
}
</style>
