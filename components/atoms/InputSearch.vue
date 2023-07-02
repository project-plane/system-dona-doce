<template>
  <div class="search">
    <input type="text" placeholder="Pesquisar..." :value="valueText" @input="search"/>
    <img src="~/assets/icons/search.svg" alt="" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    valueText: {
      type: String,
      required: false
    },
  },
  methods: {
    search(e) {
      this.$emit('input', e.target.value)
    }
  },
})
</script>

<style scoped lang="scss">
.search {
  width: 40%;
  position: relative;
  display: flex;
  align-items: center;
  input {
    width: 100%;
    border: 0.03rem solid var(--border);
    border-radius: 0.25rem;
  }
  img {
    position: absolute;
    right: 5px;
  }
}
</style>