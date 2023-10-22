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

<style lang="scss" scoped>
.buttonLogin {
  width: 100%;
  font-size: 1rem;
  font-weight: 400;
    &:hover{
      color: #ff0707b3;
      border: solid 1px #ff0707b3;
      background-color: white;
      font-weight: 600;
      
    }
}

.buttonLogin:disabled {
  cursor: not-allowed;
  opacity: 50%;
}
</style>