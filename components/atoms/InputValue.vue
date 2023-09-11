<template>
  <the-mask :mask="['R$ #,##', 'R$ ##,##', 'R$ ###,##', 'R$ ####,##', 'R$ #####,##']" :value="value" @input="updateValue"
    type="text" :masked="true" :placeholder="placeholder" />
  <!-- <input
      :style="block"
      :type="type"
      :value="value"
      @input="updateValue"
      :placeholder="placeholder"
      :disabled="disabled"
    /> -->
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    value: {
      type: [String, Number],
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
  },
  methods: {
    updateValue(e) {
      this.$emit('input', e)
    },
  },
})
</script>

<style scoped lang="scss">
input {
  width: 130px;
  height: 30px;
  border: 0.06rem solid var(--border);
  border-radius: 0.25rem;
}
</style>
