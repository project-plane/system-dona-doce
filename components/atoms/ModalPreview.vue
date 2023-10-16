<template>
  <div class="container_edit_modal">
    <div class="negativeSpace">
      <div class="headerModal">
        <Title class="" :title="titleModal" />
        <img @click="closeModal" src="~/assets/icons/close.svg" alt="close" />
      </div>
      <div class="body">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    titleModal: {
      type: String,
      required: true,
    },
  },
  methods: {
    closeModal() {
      this.$emit('closeModal')
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
  z-index: 1;
  .negativeSpace {
    width: 60%;
    min-height: 50%;
    height: 105%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background: var(--bg_color);
    border-radius: 7px;
    .headerModal {
      width: 100%;
      display: flex;
      justify-content: space-between;
      img {
        cursor: pointer;
      }
    }
    .body {
      width: 100%;
      background: var(--white);
      padding: 1rem;
      overflow-y: auto;
      border-radius: 5px;
      height: 70vh;
    }
  }
}
</style>
