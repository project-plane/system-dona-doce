<template>
  <div class="contentCardPedido">
    <MenuPedidos
      @lancheDesjejum="lancheDesjejum"
      @lanche1="lanche1"
      @lanche2="lanche2"
      @lanche3="lanche3"
    />

    <div class="cardCardapio">
      <div v-if="statusDesjejum">
        <CardPedido :tipoLanches="dadosLanche.desjejum" />
      </div>
      <div v-if="statusLanche1">
        <CardPedido :tipoLanches="dadosLanche.lanche1" />
      </div>
      <div v-if="statusLanche2">
        <CardPedido :tipoLanches="dadosLanche.lanche2" />
      </div>
      <div v-if="statusLanche3">
        <CardPedido :tipoLanches="dadosLanche.lanche3" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      statusDesjejum: true,
      statusLanche1: false,
      statusLanche2: false,
      statusLanche3: false,
      dadosLanche: {
        desjejum: {
          img: 'https://salgadosparavender.com.br/wp-content/uploads/2022/10/coxinha-de-frango-com-catupiry.jpg',
          description: 'Coxinha de Frango',
          value: '250,00',
          qtd: '',
        },
        lanche1: {
          img: 'https://cdn0.tudoreceitas.com/pt/posts/2/9/9/bolo_de_chocolate_cremoso_5992_orig.jpg',
          description: 'Bolo Chocolate',
          value: '300,00',
          qtd: '',
        },
        lanche2: {
          img: 'https://preview.redd.it/como-voc%C3%AAs-chamam-esse-salgado-de-presunto-onde-vcs-moram-v0-6hzksfcnqoza1.jpg?width=640&crop=smart&auto=webp&s=87b8599ed74a668006e4fe6d600813ed21293c68',
          description: 'Jacaré',
          value: '150,00',
          qtd: '',
        },
        lanche3: {
          img: 'https://i.ytimg.com/vi/NtmGwskpiIQ/maxresdefault.jpg',
          description: 'Esfira',
          value: '100,00',
          qtd: '',
        },
      },
    }
  },
  methods: {
    lancheDesjejum() {
      this.statusDesjejum = true
      this.statusLanche1 = false
      this.statusLanche2 = false
      this.statusLanche3 = false
    },
    lanche1() {
      this.statusDesjejum = false
      this.statusLanche1 = true
      this.statusLanche2 = false
      this.statusLanche3 = false
    },
    lanche2() {
      this.statusDesjejum = false
      this.statusLanche1 = false
      this.statusLanche2 = true
      this.statusLanche3 = false
    },
    lanche3() {
      this.statusDesjejum = false
      this.statusLanche1 = false
      this.statusLanche2 = false
      this.statusLanche3 = true
    },
  },
})
</script>

<style scoped lang="scss">
.contentCardPedido {
  width: 100%;
  display: flex;
  flex-direction: column;
  .cardCardapio {
    padding: 2rem 0;
  }
}
</style>
