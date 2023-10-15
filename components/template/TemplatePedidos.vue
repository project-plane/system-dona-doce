<template>
  <div class="containerPedidos">
    <div class="headerPedidos">
      <div class="input_radio">
        <input
          id="programation"
          v-model="statusPedidos"
          type="radio"
          name="programation"
          :value="0"
        />
        <div class="input">
          <img src="~/assets/icons/programationWhite.svg" alt="" />
          <label class="programado" for="programation"> Programado </label>
        </div>
      </div>
      <div class="input_radio">
        <input
          id="programation"
          v-model="statusPedidos"
          type="radio"
          name="programation"
          :value="1"
        />
        <div class="input">
          <img src="~/assets/icons/coffeeWhite.svg" alt="" />
          <label class="programado" for="programation"> Coffee </label>
        </div>
      </div>
    </div>
    <h3 v-if="statusPedidos === 0 && !$fetchState.pending">Dias Disponiveis</h3>
    
    <div v-if="$fetchState.pending && statusPedidos === 0" class="containerLoad">
      <Loading/>
    </div>
  
    <div v-else>
      <div v-if="statusPedidos === 0" class="listPedidos" style="margin-top: 2rem" >
        <section style="width: 100%;">
          <div class="input-calendar">
      <v-date-picker v-model="range" is-range>
        <template v-slot="{ inputValue, inputEvents }">
          <button v-on="inputEvents.start" class="btn-calendar">
            <img src="../../assets/icons/calendar.svg" alt="" />
          </button>
        </template>
      </v-date-picker>

      <div class="label-calendar">
        <div class="date">
          <span><strong>Inicial</strong> </span>
          {{ formatDate(range.start) }}
        </div>
        <div class="date">
          <span><strong>Final</strong></span>
          {{ formatDate(range.end) }}
        </div>
      </div>
    </div>
        </section>


        <div v-for="pedido in itemsToShow" :key="pedido.id">
          <CardPedido
            :data-pedido="pedido"
            @click.native="openPedido(pedido)"
          />
        </div>
      </div>

      <div v-else class="listPedidos">
        <MenuPedidosCoffe />
        <div
          v-for="pedido in listOrderCoffee"
          :key="pedido.id"
          class="containerListCards"
        >
          <CardCoffee :info-coffee="pedido" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import httpPedidos from '~/server/cardapio'
import httpReceitas from '~/server/receitas'
import httpMeusDados from '@/server/meusDados'
import dayjs from 'dayjs'

export default Vue.extend({
  layout: 'pedidos',
  data() {
    return {
      listPedidos: [],
      listAllReceitas: [],
      listOrderCoffee: [],
      selected: '',
      statusPedidos: 0,
      listFiltered: [],
      range: {
        start: new Date(2023, 8, 1),
        end: new Date(),
      },
    }
  },

  async fetch() {
    await httpReceitas
      .GetReceitas()
      .then((res) => {
        this.listAllReceitas = res.data
        this.listAllReceitas.map((item) => {
          if (item.status === 0) {
            this.listOrderCoffee.push(item)
          }
        })
      })
      .catch((error) => {
        console.log(error)
      })

    await httpPedidos
      .GetMenu()
      .then((res) => {
        this.listPedidos = res.data
      })
      .catch((error) => {
        console.log(error)
      })

    await httpMeusDados
      .MeusDados()
      .then((res) => {
        console.log(res.data)
      })
      .catch((error) => {
        console.log(error)
      })
  },

  watch: {
    range: {
      handler(newValue) {
        this.filterByDateRange(
          new Date(newValue.start).toISOString().split('T')[0],
          new Date(newValue.end).toISOString().split('T')[0]
        )
      },
      deep: true,
    },
  },
  methods: {
    openPedido(pedido) {
      this.$router.push({
        path: '/pedidos/newPedidos',
        query: {
          id: pedido.id,
          dataPedido: pedido.dateMenu,
        },
      })
    },
    formatDate(date) {
      return dayjs(date).format('DD/MM/YYYY')
    },

    removeTimeInfo(date) {
      return new Date(date.toISOString().split('T')[0])
    },

    filterByDateRange(startDate, endDate) {
      this.listFiltered = []
      this.listPedidos.map((item) => {
        item.dateMenu = new Date(item.dateMenu).toISOString().split('T')[0]
        if (
          new Date(item.dateMenu) >= new Date(startDate) &&
          new Date(item.dateMenu) <= new Date(endDate)
        ) {
          this.listFiltered.push(item)
        }
        // console.log(this.listFiltered);
      })
    },
  },
  computed: {
    itemsToShow(): Array<any> {
      return this.listFiltered.length === 0
        ? this.listPedidos
        : this.listFiltered
    },
  },
})
</script>

<style scoped lang="scss">

.containerLoad{
  width: 100%;
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.containerPedidos {
  width: 100%;
  // height: 100vh;
  padding: 5rem 4rem 4rem 4rem;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 1370px;

  .headerPedidos {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    gap: 1rem;
    align-items: center;
    padding-bottom: 2rem;

    h3 {
      color: var(--white);
    }

    .inputPedido {
      width: 25%;
      display: flex;
      flex-direction: column;
      gap: 0.3rem;

      label {
        color: var(--white);
      }

      input {
        width: 100%;
      }
    }

    .input_radio {
      display: flex;
      gap: 0.5rem;
      align-items: center;
      justify-content: center;

      .input {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;

        img {
          color: var(--white);
          width: 1.2rem;
        }

        .coffee,
        .programado {
          color: var(--white);
          font-weight: 500;
          font-size: 1.2rem;
        }
      }
    }
  }

  .listPedidos {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    gap: 1rem;
    margin-top: 0.3rem;
    flex-wrap: wrap;
  }
}
.input-calendar {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  align-items: center;
  background-color: var(--white);
  padding: 0.3rem;
  gap: 0.5rem;
  width: 13rem;
  font-size: 0.7rem;
  border-radius: 0.25rem;
  color: var(--text_color);

  .btn-calendar {
    background-color: transparent;
    border: none;
    border-radius: 0.25rem;
  }

  .label-calendar {
    display: flex;
    flex-direction: column;

    .date {
      justify-content: space-between;
      gap: 0.25rem;
      display: flex;
    }
  }
}

.containerListCards {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
</style>
