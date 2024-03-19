<template>
    <TemplatePedidosUnidade />
</template>

<script lang="ts">
import Vue from 'vue'
import HttpMeusDados from '@/server/meusDados/index'
export default Vue.extend({
  layout: 'pedidos-unidade',
  data () {
    return {
      myData:{}
    }
  },

  async fetch() {
    await HttpMeusDados.MeusDados().then( (res) => {
      this.myData = res.data
      this.$store.commit('selectUnity', this.myData.Client_Company.company.id)

      if(!this.myData.is_company) {
        this.$router.push('/login')
        this.$toast.error(`Opa! Parece que você não é um CLIENTE.\nUtilize uma conta de cliente para realizar as operações`)
      }
    }).catch( (error) => {
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
