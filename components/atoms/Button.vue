<template>
  <div class="btnContainer" :class="classContainerEditBtn">
    <button
      @click="$emit('functionClick')"
      class="buttonPirula"
      :class="classEditBtn"
    >
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
    classEditBtn: {
      type: String,
    },
    classContainerEditBtn: {
      type: String,
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
  .editBtn {
    width: 150px;
  }
}
.classContainerEditBtn {
  width: 20%;
  display: flex;
  justify-content: flex-end;
}
</style>
