<template>
    <ModalPreview titleModal="Carrinho - Ainda em Desenvolvimento" @closeModal="closeModal">
      <div class="dataEmpresa" v-if="$fetchState.pending">Carregando dados do carrinho...</div>
      <div class="dataEmpresa" v-else>
        <h4>Desjejum</h4>
        <table class="resume-content">
          <tr v-if="dejejum.length !== 0">
            <th>Item</th>
            <th>Qtde</th>
          </tr>
          
          <tr v-for="(item, index) in dejejum" :key="index" class="order-line">
            <td>{{ item.receita_descricao }}</td>
            <td>{{ item.qtde }}</td>
          </tr>
          <tr v-if="dejejum.length === 0">Não possui...</tr>
        </table>

        <h4>Lanche 01</h4>
        <table class="resume-content">
          <tr v-if="lanche01.length !== 0">
            <th>Item</th>
            <th>Qtde</th>
          </tr>
          
          <tr v-for="(item, index) in lanche01" :key="index" class="order-line">
            <td>{{ item.receita_descricao }}</td>
            <td>{{ item.qtde }}</td>
          </tr>
          <tr v-if="lanche01.length === 0">Não possui...</tr>
        </table>

        <h4>Lanche 02</h4>
        <table class="resume-content">
          <tr v-if="lanche02.length !== 0">
            <th>Item</th>
            <th>Qtde</th>
          </tr>
          
          <tr v-for="(item, index) in lanche02" :key="index" class="order-line">
            <td>{{ item.receita_descricao }}</td>
            <td>{{ item.qtde }}</td>
          </tr>
          <tr v-if="lanche02.length === 0">Não possui...</tr>
        </table>
        
      </div>
    </ModalPreview>
  </template>
  
  <script lang="ts">
  import Vue from 'vue';
  import HttpReceita from '~/server/receitas/index'

  export default Vue.extend({
    props: {
      data: Object
    },

    data () {
    return {
      dejejum: [],
      lanche01: [],
      lanche02: [],

      countdejejum: 0,
      countlanche01: 0,
      countlanche02: 0
    }
  },

  async fetch () {
    this.dejejum = []
      this.lanche01 = []
      this.lanche02 = []

    await this.data.map( async (item) => {

      await HttpReceita.GetFindReceita(item.fk_revenue).then( (res) => {

        if(item.fk_categoryOrderItem === '491aebc2-1c69-11ee-be56-0242ac120002') {
        this.dejejum.push({
          qtde: item.amountItem,
          receita_descricao: res.data.description
        })
      
      }

      if(item.fk_categoryOrderItem === '518a6828-1c69-11ee-be56-0242ac120002') {
        this.lanche01.push({
          qtde: item.amountItem,
          receita_descricao: res.data.description
        })
      }

      if(item.fk_categoryOrderItem === '57c25f34-1c69-11ee-be56-0242ac120002') {
        this.lanche02.push({
          qtde: item.amountItem,
          receita_descricao: res.data.description
        })
      }

      })
      

      
    })
  },


    methods: {
      closeModal() {
          this.$emit("closeModal");
      },
    }
  })
  </script>
  
  <style scoped lang="scss">
 .dataEmpresa {
  width: 100%;
  display: flex;
  gap: 1rem;
  flex-direction: column;

  .header-order {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid var(--bg_color_modal);
  }

  .resume-content {
    width: 100%;
    text-align: center;
    border-bottom: 1px dotted var(--red);
    table-layout: fixed;

    tr {
      width: 100%;

      td {

        img {
          width: 2.5rem;
        }
      }

      td:nth-child(1), th:nth-child(1) {
        text-align: left;
      }
    }
    
  }


}
  </style>
  