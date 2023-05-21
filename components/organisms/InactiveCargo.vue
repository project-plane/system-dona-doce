<template>
  <div class="statusDisabled">
    <label
      for=""
      class="disabled"
      :class="{
        isDisabledMotorista: isDisabledMotorista,
        isDisabledConfeiteito: isDisabledConfeiteito,
        isDisabledEmpacotador: isDisabledEmpacotador,
        isDisabledFaturamento: isDisabledFaturamento,
      }"
      @click="activeDisabled"
    >
      <span></span>
    </label>
    <h5
      :class="{
        isActiveMotorista: isActiveMotorista,
        isActiveConfeiteito: isActiveConfeiteito,
        isActiveFaturamento: isActiveFaturamento,
        isActiveEmpacotado: isActiveEmpacotado,
      }"
    >
      {{ cargo }}
    </h5>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    isDisabledMotorista: {
      type: Boolean,
    },
    isDisabledConfeiteito: {
      type: Boolean,
    },
    isDisabledEmpacotador: {
      type: Boolean,
    },
    isDisabledFaturamento: {
      type: Boolean,
    },
    isActiveMotorista: {
      type: Boolean,
    },
    isActiveConfeiteito: {
      type: Boolean,
    },
    isActiveFaturamento: {
      type: Boolean,
    },
    isActiveEmpacotado: {
      type: Boolean,
    },
    cargo: {
      type: String,
    },
  },
  methods: {
    activeDisabled() {
      this.$emit('activeDisabled')
    },
  },
})
</script>

<style scoped lang="scss">
.statusDisabled {
  display: flex;
  gap: 1rem;
  .disabled {
    position: relative;
    width: 50px;
    height: 25px;
    background: var(--red);
    border-radius: 75px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    input {
      appearance: none;
    }
    span {
      position: absolute;
      left: 2px;
      width: 20px;
      height: 20px;
      background: var(--bg_color);
      border-radius: 100px;
      background-size: auto 150px;
      background-repeat: no-repeat;
      transition: 1.5s;
      transform: rotate(0deg);
      transform-origin: 75px;
    }
  }
  .isDisabledMotorista,
  .isDisabledConfeiteito,
  .isDisabledFaturamento,
  .isDisabledEmpacotador {
    position: relative;
    width: 50px;
    height: 25px;
    background: var(--bg_color_modal);
    border-radius: 75px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    input {
      appearance: none;
    }
    span {
      position: absolute;
      left: 28px;
      width: 20px;
      height: 20px;
      background: var(--bg_color);
      border-radius: 100px;
      background-size: auto 150px;
      background-repeat: no-repeat;
      transition: 1.5s;
      transform-origin: 75px;
    }
  }
  .isActiveMotorista,
  .isActiveConfeiteito,
  .isActiveFaturamento,
  .isActiveEmpacotado {
    color: var(--bg_color_modal);
  }
}
</style>