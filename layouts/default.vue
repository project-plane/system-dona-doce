<template>
  <div v-if="route === 'index'">
    <Navbar />
    <Nuxt />
  </div>
  <div v-else>
    <Navbar @showMenu="showMenu"/>
    <div class="content">
      <MenuCreate v-if="menu"/>
      <div class="scroll_container">
        <Nuxt />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      route: '',
      menu: true,
      windowWidth: window.innerWidth
    }
  },
  fetch() {
    const router = this.$route.name

    this.route = router
  },

  watch: {
    windowWidth(newWidth) {
      if (newWidth > 900 && !this.menu) {
        this.menu = true
      }
  }
},

  created() {
    window.addEventListener("resize", this.handleWindowResize);
  },

  methods: {
    showMenu(e){
      this.menu = e
    },

    handleWindowResize() {
      // Atualize a propriedade windowWidth com o novo tamanho da tela
      this.windowWidth = window.innerWidth;
    }
  }
})
</script>

<style lang="scss" scoped>
.content {
  margin-top: 3.9rem;
  display: flex;
  .scroll_container {
    width: 80%;
    height: 90vh;
    overflow-y: scroll;
  }
}


@media (max-width: 900px) {
  .content {
    display: flex;
    flex-direction: column;

    .scroll_container {
      width: 100%;
    }
  }
}
</style>
