<template>
  <div class="input_container">
    <span>{{ label }}</span>
    <input 
      :style="block"
      :type="type"
      :value="value"
      @input="updateValue"
      :placeholder="placeholder"
      :disabled="disabled"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      required: false,
    },
    // eslint-disable-next-line vue/require-default-prop
    block: {
      type: String,
      required: false,
    },
  },
  methods: {
    updateValue(e) {
      this.$emit('input', e.target.value)
    },
  },
})
</script>

<style scoped lang="scss">
.input_container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  

  span {
    font-size: 1rem;
  }

  input {
    border: 0.06rem solid var(--border);
    border-radius: 0.25rem;
  }
}
</style>
