<template>
  <div class="containerPedidos">
    <div class="headerPedidos">
      <h2>Pedidos Programados</h2>
      <h3>
        {{ formatDate(dataPedido) }}
        <!-- {{ new Date(dataPedido).getDate() }}/{{
          new Date(dataPedido).getMonth() + 1
        }}/{{ new Date(dataPedido).getFullYear() }} -->
      </h3>
    </div>
    <div class="menu">
      <div class="titleLanches">
        <button :class="{ active: lancheDesjejum }" @click="desjejum">
          Desjejum
        </button>
        <button :class="{ active: lanche01 }" @click="lanche1">
          Lanche 01
        </button>
        <button :class="{ active: lanche02 }" @click="lanche2">
          Lanche 02
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import dayjs from 'dayjs'
import Vue from 'vue'

export default Vue.extend({
  layout: 'pedidos',
  props: {
    dataPedido: {
      type: String,
      required: true,
    },
    qtdPedidos: {
      type: [Array, Object],
      required: true,
    },
    listaCompletaReceita: {
      type: [Array, Object],
      required: true,
    },
  },
  data() {
    return {
      active: true,
      lancheDesjejum: true,
      lanche01: false,
      lanche02: false,
      showModal: false,
    }
  },
  methods: {
    openModalHistorico() {
      this.showModal = true
    },
    formatDate(date) {
      const novaData = dayjs(date).add(1, 'day');
      const dataFormatada = novaData.format('DD/MM/YYYY');

      return dataFormatada;
    },
    desjejum() {
      this.lancheDesjejum = true
      this.lanche01 = false
      this.lanche02 = false
      this.$emit('lancheDesjejum')
    },
    lanche1() {
      this.lancheDesjejum = false
      this.lanche01 = true
      this.lanche02 = false
      this.$emit('lanche1')
    },
    lanche2() {
      this.lancheDesjejum = false
      this.lanche01 = false
      this.lanche02 = true
      this.$emit('lanche2')
    },
    lanche3() {
      this.lancheDesjejum = false
      this.lanche01 = false
      this.lanche02 = true
      this.$emit('lanche3')
    },
    finalizarPedidosProgramados() {
      this.$emit('finalizarPedido')
    },
  },
})
</script>

<style scoped lang="scss">
.containerPedidos {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  .headerPedidos {
    h2 {
      font-size: 1.4rem;
      color: var(--white);
    }
  }

  .menu {
    width: 100%;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #e5d7c5;

    .titleLanches {
      display: flex;
      gap: 0.5rem;

      .active {
        background: var(--bg_color);
      }

      button {
        height: 2.5rem;
        width: 7.5rem;
        font-size: 1rem;
        background: #ea4e42;
        padding: 0.5rem 1rem;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
      }
    }

    .btnFinalizar {
      width: 50%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 1.4rem;

      img {
        width: 35px;
        height: 35px;
      }

      .qtdPedidos {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        span {
          position: relative;
          top: -15px;
          left: -15px;

          p {
            width: 25px;
            height: 25px;
            display: flex;
            justify-content: center;
            align-items: center;
            background: var(--bg_color);
            border-radius: 50%;
            position: absolute;
            top: -10px;
          }
        }
      }

      button {
        display: flex;
        align-items: center;
        gap: 1.3rem;
        padding: 0.5rem;
        font-size: 1.1rem;

        img {
          height: 20px;
        }
      }
    }
  }
}
</style>
