<template>
    <button class="btn" @click="$emit('functionClick')">{{ title }}</button>
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

.btn {
  width: 9rem;
  height: 2.6rem;
  background-color: var(--red);
  color: var(--white);
  border-radius: 0.25rem;
  font-size: 1rem;
}
</style>
