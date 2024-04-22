<template>
    <div class="negativeSpace">
    <div class="container">
      <div class="modal">
        <div class="header">
        <h2>{{titleModal}}</h2>

        <div>
          <img class="btnClose" src="~/assets/icons/close.svg" alt="" @click="closeModal" />
        </div>
      </div>
        <slot />
      </div>
    </div>
  </div>
  </template>
  
  <script lang="js">
  import Vue from 'vue'

  
  export default Vue.extend({
    data() {
      return {

      }
    },
    props:{
      titleModal: String
    },
    methods: {
    closeModal() {
      this.$store.commit('OPEN_visualizationFin', false)
    }
  }
  
  })
  </script>
  
  <style lang="scss" scoped>
  .container {
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
    z-index: 5;
  
    .negativeSpace {
    width: 64%;
    max-height: 90vh;
    height: 105%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background: var(--bg_color);
    border-radius: 7px;
}
    .modal {
      border-radius: 6px;
      background: var(--bgMain, #fdfdfb);
      height: 90%;
      min-width: 65%;
      display: flex;
      justify-content: flex-start;
      flex-direction: column;
      gap: 1rem;
      padding: 1rem;

    }
  
    .header {
        width: 100%;
        display: flex;
        justify-content: space-between;
        .btnClose {
          cursor: pointer;
        }
      }
  }
  
  @include screen("tablet") {
    .modal {
      border-radius: 6px;
      background: var(--bgMain, #fdfdfb);
      min-height: 320px !important;
      min-width: 240px !important;
      display: flex;
      justify-content: flex-start;
      flex-direction: column;
  
      img {
        min-width: 20% !important;
        object-fit: cover !important;
      }
  
      .containerImg {
        padding: 20px 20px 0px 20px;
        object-fit: cover;
      }
    }
  }
  </style>