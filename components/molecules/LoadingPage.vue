<template>
    <div class="contentLoading">
      <div>
        <div class="containerImg">
          <img src="@/assets/img/cupCake.png" alt="">
          <div class="bite">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <h3>Carregando</h3>
      </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
        
    }
  }
})
</script>

<style lang="scss" scoped>
$size: 1.5rem;
.contentLoading{
  position: fixed;
  width: 100%;
  height: 100vh;
  background: var(--bg_color);
  z-index: 9;
  top: 0;
  left: 0;
  display: grid;
  place-items: center;

  .containerImg{
    animation: containerImg 2s cubic-bezier(1,-0.27, 0, 1) infinite alternate;
    transform-origin: center;
    transform-box: fill-box;
    width: fit-content;
    .bite{
      background: var(--bg_color);
      width: fit-content;
      height: 1rem;
      display: flex;
      position: relative;
      bottom: 6.3rem;
      left: 3.5rem;
      transform: rotateZ(-115deg);
      div{
        min-width: $size;
        height: $size;
        background: var(--bg_color);
        border-radius: 50%;
        position: relative;
        bottom: .4rem;
      }
      div:nth-child(2){
        position: relative;
        bottom: .7rem;
      }
      animation: bite 2s cubic-bezier(1,-0.27, 0, 1) infinite alternate;
    }
  }
  h3{
    position: relative;
    bottom: 1rem;
    width: 8rem
  }
  h3:after{
    content: '';
    animation: title 2s cubic-bezier(1,-0.27, 0, 1) infinite;
  }
}

@keyframes bite {
  from{
    opacity: 0;
  }
  to{
    opacity: 1;
  }
}

@keyframes containerImg {
  from{
    transform: rotateZ(0deg)
  }
  to{
    transform: rotateZ(-15deg)
  }
}

@keyframes title {
  0%{
    content: '.'
  }
  50%{
    content: '..'
  }
  100%{
    content: '...'
  }
}

</style>