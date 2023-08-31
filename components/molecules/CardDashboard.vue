<template>
  <div class="cardDashboard">
    <div class="titleCard">
      <div class="titleCompany">
        <p>{{ index + 1 }}</p>
        <div class="descriptionCompany">
          <span>{{ dataPedidos.empresa }}</span>
          <h2>{{ dataPedidos.cliente }}</h2>
          <span v-if="dataPedidos.status === 1" class="programado">Programado</span>
          <span v-else class="coffee">Coffee</span>
        </div>
      </div>
      <div>
        <img src="~/assets/icons/programado.svg" alt="" v-if="dataPedidos.status === 1">
        <img src="~/assets/icons/coffee.svg" alt="" v-else>
      </div>
    </div>
    <div class="dataOrder">
      <div class="descriptionOrder">
        <span>Total R$ {{ dataPedidos.total }}</span>
        <span>Finalizar as</span>
        <span>09:30</span>
      </div>
      <ButtonPirula title="Exibir Pedidos" @click.native="exibirPedidos(dataPedidos)" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    dataPedidos: {
      type: [Array, Object],
      required: true
    },
    index: {
      type: Number,
      required: true
    },
  },
  methods: {
    exibirPedidos(dataPedidos) {
      this.$store.commit('DADOS_PEDIDOS', dataPedidos)

    }
  },
})
</script>

<style scoped lang="scss">
.cardDashboard {
  width: 100%;
  border: 1px solid var(--border);
  background: var(--white);
  border-radius: 10px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: .5rem;

  .titleCard {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    border-bottom: 1px solid var(--border);

    .titleCompany {
      display: flex;
      gap: .7rem;

      .descriptionCompany {
        .programado {
          color: var(--blue);
        }

        .coffee {
          color: var(--red);
        }
      }

      h2 {
        margin: -10px 0
      }
    }
  }

  .dataOrder {
    display: flex;
    gap: 3rem;
    align-items: flex-end;
    justify-content: space-between;

    .descriptionOrder {
      display: flex;
      flex-direction: column;

      span:nth-child(1) {
        color: grey;
      }

      span:nth-child(3) {
        font-weight: bold;
      }
    }
  }
}
</style>
