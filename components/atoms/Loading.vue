<template>
  <div class="container_edit_modal">
    <div class="loading">
      <img src="~/assets/icons/loading.svg" alt="" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    titleModal: {
      type: String,
    },
  },
  methods: {
    closeModal() {
      this.$store.commit('OPEN_MODAL', false)
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
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  .loading {
    animation: loader 1.5s linear infinite;
  }

  .loading img {
    width: 60px;
    height: 60px;
  }

  @keyframes loader {
    to {
      transform: rotate(1turn);
    }
  }
}
</style>
