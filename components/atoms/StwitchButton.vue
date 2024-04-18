<template>
    <div class="containerSwitch">
        <span v-if="type === 'programmed'"> Programado</span>
      <label class="switch" for="checkMedico">
        <input type="checkbox" id="checkMedico" @click="toggleSwitch" />
        <span class="slider round"></span>
      </label>
      <span v-if="type === 'coffe'"> Coffe</span>
    </div>
  </template>
  
  <script>
    export default {
    data() {
        return {
        doctor: false
        };
    },
    props:{
        type: String
    },
    methods: {
        toggleSwitch() {
        this.doctor = !this.doctor;
        this.$emit('updateEmit', this.doctor);
        }
    },
};
  </script>
  
  <style lang="scss" scoped>
  .containerSwitch {
  
    display: flex;
    align-items: flex-end;
    gap: 6px;
  
    p {
      font-size: 14px;
      font-weight: 500;
    }
  
    .switch {
      position: relative;
      display: inline-block;
      width: 42px;
      height: 20px;
    }
  
    .switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }
  
    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #b2b299;
      -webkit-transition: 0.4s;
      transition: 0.4s;
    }
  
    .slider:before {
      position: absolute;
      content: "";
      height: 12px;
      width: 12px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      -webkit-transition: 0.4s;
      transition: 0.4s;
    }
  
    input:checked+.slider {
      background-color: var(--blue);
    }
  
    input:focus+.slider {
      box-shadow: 0 0 1px var(--blue);
    }
  
    input:checked+.slider:before {
      -webkit-transform: translateX(23px);
      -ms-transform: translateX(23px);
      transform: translateX(23px);
    }
  
    /* Rounded sliders */
    .slider.round {
      border-radius: 34px;
    }
  
    .slider.round:before {
      border-radius: 50%;
    }
  }
  </style>