<template>
  <div class="card">
    <div class="frameInform">
      <h1>
        Dona <br />
        Doce
      </h1>
      <p>
        Fornecemos bolos e salgados para sua empresa <br />
        com rapidez e qualidade
      </p>
      <NuxtLink to="/login">
        <button>Entrar</button>
      </NuxtLink>
    </div>
    <div class="frameIlustration">
      <IlustrationHand />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({})
</script>

<style scoped lang="scss">
.card {
  padding: 0 4vw;
  border-radius: 2rem;
  background: var(--red);
  width: 100%;
  height: 70vh;
  display: grid;
  grid-template: 1fr / 1fr 1fr;

  .frameInform {
    padding-top: var(--space);
    display: grid;
    gap: 2rem;
    grid-template: repeat(3, min-content) / 1fr;

    h1 {
      color: var(--bg_color);
      line-height: 4vw;
      font-size: 5vw;
    }
    p {
      color: var(--white);
    }
    button {
      color: var(--txt_color);
      background-color: #fee45e;
      width: max(20vw, 10rem);
      height: max(4vw, 3rem);
      border-radius: 20rem;
      font-size: 1.4rem;
      @include screen('mobile') {
        position: relative;
        top: 19rem;
        width: 100%;
        z-index: 9;
      }
    }
  }
  .frameIlustration {
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    height: inherit;
    width: 100%;
  }
  @include screen('tablet') {
    overflow: hidden;
    grid-template: 1fr 1rem / 1fr;
    .frameInform {
      gap: 1rem;
      h1 {
        line-height: 2rem;
        font-size: 2rem;
      }
      p {
        font-size: 0.7rem;
      }
    }
    .frameIlustration {
      height: auto;
    }
  }
}
</style>
