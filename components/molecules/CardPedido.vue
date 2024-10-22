<template>
  <div class="card">
    <img  src="/_nuxt/static/icon/cutEffect.svg" alt="" class="svg">
  <div class="containerCard">
    <div class="dataPedido">
      <span>Cardapio - {{ convertData(dataPedido.dateMenu) }}</span>

    </div>


    <div class="dcardapio">

      <div class="titlecardapio">
      <div>Descrição</div>
      <div>Valor</div>
    </div>
      <div   v-for="(iten, index) in dataPedido.itemMenu" :key="index">
     <div class="dpedidos">
      <div>  {{ iten.revenues.description }} </div>
      <div> R$: {{ iten.revenue_value_on_the_day.toFixed(2) }} </div>
      </div>

      <div style="border: 1px dashed rgba(69, 64, 64, 0.968) "></div>
      </div>
    </div>
    <div class="pedidos">
      <!-- <div class="qtdPedidos">
        <span>Qtd. Pedidos</span>
        <span>{{ this.$store.state.qtdPedidos }}</span>
      </div> -->
      <ButtonPirula title="Visualizar" style="font-size: 0.9rem; width: 46%;" />
    </div>
  </div>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import dayjs from "~/services/dayjs"

export default Vue.extend({
  props: {
    infoCliente: Object,
    dataPedido: {
      type: [Object, Array],
      required: true,
    },
  },
  data() {
    return {
      qtdPedido: 0,
    }
  },
  methods: {
     convertData(data){
      return dayjs.formtDateBr(data)
    }
  },
})
</script>

<style scoped lang="scss">
.card {
        display: flex;
        flex-direction: column;
}

.titlecardapio {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid var(--border);
  font-weight: 100;
}
.card img {
  width: 24rem;
    position: relative;
    top: 0.2999vw;

}
.dcardapio {
  display: flex;
  justify-content: space-between;
   width: 100%;
  flex-direction: column;
}

.dpedidos {
   display: flex;
  justify-content: space-between;
   width: 100%;

}

.containerCard {
  width: 24rem;
  height: 100%;
  background: var(--white);
  border-radius: 0.3rem;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  cursor: pointer;

  &:hover{
    transform: translateY(-6px);
  }
  td{
    font-size: 12px;
    text-align:  flex-start;
  }
  .dataPedido {
    display: flex;
    flex-direction: column;
    padding-bottom: 1.2rem;

    span {
      font-weight: 600;
      font-size: 1.1rem;
    }
  }

  .pedidos {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 1rem;
    padding-top: 1rem;

    .qtdPedidos {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
