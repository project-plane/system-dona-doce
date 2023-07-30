<template>
  <ModalPreview titleModal="Detalhes do pedido" @closeModal="closeModal">
    <div class="dataEmpresa">
      <div class="header-order">
        <h3>Data do Pedido: {{ formatDate(data.dateOrder) }}</h3>
      </div>

      <div class="resume-content">
        <h4>Desjejum</h4>
        <div v-for="(item, index) in desjejum">
          <pre>{{ item }}</pre>
          
        </div>
        <span v-if="desjejum.length === 0">Não possui...</span>
      </div>

      <div class="resume-content">
        <h4>Lanche 01</h4>
        <div v-for="(item, index) in lanche01">
          <pre>{{ item }}</pre>
          
        </div>
        <span v-if="lanche01.length === 0">Não possui...</span>
      </div>

      <div class="resume-content">
        <h4>Lanche 02</h4>
        <div v-for="(item, index) in lanche02">
          <pre>{{ item }}</pre>
          
        </div>
        <span v-if="lanche02.length === 0">Não possui...</span>
      </div>


      
    </div>
  </ModalPreview>
</template>

<script lang="ts">
import Vue from 'vue';
import dayjs from 'dayjs'
export default Vue.extend({
  props: {
    data: Object
  },

  data () {
    return {
      desjejum: [],
      lanche01: [],
      lanche02: []
    }
  },

  created () {
      this.data.orderItem.map( (item) => {
        if(item.categoryOrderItem.description === 'Lanche 1') {
          this.lanche01.push(item)
        }
      })
    },
  methods: {
    closeModal() {
			this.$emit("closeModal");
		},

    formatDate(date) {
      return dayjs(date).format('DD/MM/YYYY')
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

  .resume-content {
    display: flex;
    flex-direction: column;
    border-bottom: 1px dotted var(--red);
  }
}
</style>
