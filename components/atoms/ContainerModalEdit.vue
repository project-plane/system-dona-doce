<template>
  <div class="container_edit_modal" v-if="closeModal">
    <div class="negativeSpace">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    closeModal: {
      type: Boolean,
      required: true,
    },
  },
})
</script>

<style scoped lang="scss">
.container_edit_modal {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  right: 0;
  background-color: var(--bg_color_modal);
  display: table;
  transition: opacity 0.2s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
  .negativeSpace {
    width: 70%;
    height: 80%;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background: var(--bg_color);
    border-radius: 7px;
  }
}
</style>