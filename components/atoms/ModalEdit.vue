<template>
  <div class="container_edit_modal">
    <div class="negativeSpace">
      <Title class="headerModal">
        <h1>{{ titleModal }}</h1>
        <img @click="closeModal" src="~/assets/icons/close.svg" alt="close" />
      </Title>
      <div class="container">
        <slot />
      </div>
      <div class="btnEdit">
        <Button
          @functionClick="closeModal"
          title="Cancelar"
          classEditBtn="editBtn"
          classContainerEditBtn="classContainerEditBtn"
        />

        <Button
          @functionClick="$emit('save')"
          title="Salvar"
          classEditBtn="editBtn"
          classContainerEditBtn="classContainerEditBtn"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    titleModal: {
      type: String,
      required: true,
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
  display: table;
  transition: opacity 0.2s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
  z-index: 1;
  .negativeSpace {
    width: 70%;
    min-height: 50%;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background: var(--bg_color);
    border-radius: 7px;
    .container {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }
    .headerModal {
      width: 100%;
      display: flex;
      justify-content: space-between;
      img {
        cursor: pointer;
      }
    }
    .btnEdit {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      gap: 2rem;
    }
  }
}
</style>
