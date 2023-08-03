<template>
  <div class="containerReceita">
    <BeadFrame>
      <div class="bodyModal">
        <div class="container">
          <div class="header">
            <div>
              <Title title="Receita por Cliente" />
              <h3>Empresa: {{ dataClient.corporate_name }}</h3>
            </div>
            <div @click="closeModal">
              <img class="btnClose" src="~/assets/icons/close.svg" alt="" />
            </div>
          </div>
          <InputSearch v-model="textSearch" />
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Receita</th>
                <th>Valor Atual</th>
                <th>Valor Cliente</th>
                <th>Opções</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(receita, index) in filterItems" :key="receita.id">
                <td>{{ index + 1 }}</td>
                <td>{{ receita.description }}</td>
                <td>R$ {{ receita.value.toFixed(2) }}</td>
                <td>
                  <input type="number" v-model="valueReceitaPorCliente[index]">
                </td>
                <td>
                  <ButtonPirula @click.native="salvarReceitaPorCliente(receita.id, index)" title="Salvar" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </BeadFrame>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import httpReceitaPorCliente from '~/server/receitas'

export default Vue.extend({
  data() {
    return {
      valueReceitaPorCliente: [],
      textSearch: ''
    }
  },
  props: {
    listAllReceita: {
      type: [Array, Object],
      required: true,
    },
    dataClient: {
      type: [Array, Object],
      required: true
    }
  },

  computed: {
    filterItems() {
      let itemSearch = []

      itemSearch = this.listAllReceita.filter((item) => {
        return (
          item.description
            .toLowerCase()
            .indexOf(this.textSearch.toLowerCase()) > -1
        )
      })
      return itemSearch
    }
  },

  methods: {
    closeModal() {
      this.$store.commit('OPEN_MODAL', false)
    },
    async salvarReceitaPorCliente(idReceita, index) {

      if (!this.valueReceitaPorCliente) {
        this.$toast.error('Preencha o valor do cliente!!!')
        return
      }

      const dadosReceitaPorCliente = {
        fk_revenue: idReceita,
        fk_client: this.dataClient.id,
        unique_value: Number(this.valueReceitaPorCliente[index])
      }

      await httpReceitaPorCliente.CreateReceitaPorCliente(dadosReceitaPorCliente)
        .then((res) => {
          if (res.status === 201) {
            this.$toast.success('Valor inserido com sucesso!!!')
            return
          }
        })
        .catch((error) => {
          this.$toast.error(error.response.data.message)
          return
        })
    },
  },
})
</script>

<style scoped lang="scss">
.containerReceita {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  right: 0;
  background-color: var(--bg_color_modal);
  display: table;
  transition: opacity 0.2s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
  z-index: 1;

  .bodyModal {
    background: var(--white);
    min-height: 50%;

    .container {
      width: 100%;
      height: 90vh;
      padding: 2.5rem 2rem;
      display: flex;
      flex-direction: column;
      gap: 2rem;
      overflow-y: auto;

      .header {
        width: 100%;
        display: flex;
        justify-content: space-between;
      }

      .btnClose {
        cursor: pointer;
      }
    }
  }
}

.headerTable {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    font-size: 1.35rem;
    font-weight: 600;
  }
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  font-size: 0.9rem;

  thead {
    width: 100%;
    background: var(--bg_heade_table);

    tr th {
      padding: 0.6rem 0;
    }
  }

  tbody tr td {
    text-align: center;
    padding: 1rem 0;

    input {
      border: 1px solid var(--bg_opacity);
      height: 30px;
    }
  }

  tbody tr button {
    background: transparent;

    img {
      width: 1.2rem;
    }
  }
}
</style>
