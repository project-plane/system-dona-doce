<template>
    <TemplatePedidos />
</template>

<script lang="ts">
import Vue from 'vue'
import HttpMeusDados from '@/server/meusDados/index'
export default Vue.extend({
  layout: 'pedidos',

  data () {
    return {
      myData:{}
    }
  },

  async fetch() {
    await HttpMeusDados.MeusDados().then( (res) => {
      this.myData = res.data

      if(!this.myData.is_client) {
        this.$router.push('/login')
        this.$toast.error(`Opa! Parece que você não é um CLIENTE.\nUtilize uma conta de cliente para realizar as operações`)
      }
    }).catch( (error) => {
      console.log(error)
      this.$router.push('/login')
      this.$toast.error(`Acesso Não Autorizado`)
    })
  },

  head: {
    title: 'Fazer Pedido - Dona Doce'
  }
})
</script>

<style scoped>
</style>
