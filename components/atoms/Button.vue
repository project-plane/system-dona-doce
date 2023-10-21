<template>
    <button class="btn " @click="$emit('functionClick')" :disabled="isDisabled">{{ title }}</button>
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
    classEditBtn: {
      type: String,
    },
    classContainerEditBtn: {
      type: String,
    },
    classExt:{

    }
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
  // font-size: 1rem;
  text-align: center;
  // padding: 1rem;
  transition: 0.2s;
}

.btn:hover {
  background-color: var(--red-opacity);
}

.btn:disabled {
  cursor: not-allowed;
  opacity: 50%;
}
</style>
