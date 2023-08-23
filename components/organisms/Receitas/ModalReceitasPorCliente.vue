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
                <th>Tipo de Pedido</th>
                <th>Valor Receita</th>
                <th>Valor Cliente</th>
                <th>Valor Cliente</th>
                <th>Opções</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(receita, index) in filterItems" :key="receita.id">
                <td>{{ index + 1 }}</td>
                <td>{{ receita.description }}</td>
                <td
                  v-if="receita.revenue_status === 1"
                  style="color: var(--blue)"
                >
                  <strong> Programado</strong>
                </td>
                <td v-else style="color: var(--red)">
                  <strong>Coffee</strong>
                </td>
                <td>R$ {{ receita.revenue_value }}</td>
                <td v-if="receita.unique_value === null">
                  <strong>R$ 0,00</strong>
                </td>
                <td v-else>
                  <strong>R$ {{ receita.sale_value }}</strong>
                </td>
                <td>
                  <InputValue
                    style="width: 100px"
                    v-model="valueReceitaPorCliente[index]"
                    placeholder="Digite o novo valor"
                  />
                </td>
                <td>
                  <div class="btnReceita">
                    <Button
                      @click.native="
                        salvarReceitaPorCliente(receita.fk_revenue, index)
                      "
                      title="Salvar"
                      v-if="receita.unique_value === null"
                    />
                    <Button
                      style="background: #fa5c4f"
                      @click.native="
                        updateReceitaPorCliente(receita.fk_revenue, index)
                      "
                      title="Atualizar"
                      v-else
                    />
                  </div>
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
      listAllReceita: [],
      textSearch: '',
    }
  },
  props: {
    dataClient: {
      type: [Array, Object],
      required: true,
    },
  },

  async fetch() {
    await httpReceitaPorCliente
      .GetAllReceitaPorCliente(this.dataClient.id)
      .then((res) => {
        this.listAllReceita = res.data
        console.log(res.data)
      })
      .catch((error) => {
        console.log(error)
      })
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
    },
  },

  methods: {
    closeModal() {
      this.$store.commit('OPEN_MODAL', false)
    },
    async salvarReceitaPorCliente(idReceita, index) {
      if (!this.valueReceitaPorCliente[index]) {
        this.$toast.error('Preencha o valor do cliente!!!')
        return
      }

      const convertValue = this.valueReceitaPorCliente[index]
        .replace('R$', '')
        .replace(',', '.')

      const dadosReceitaPorCliente = {
        fk_revenue: idReceita,
        fk_client: this.dataClient.id,
        unique_value: Number(convertValue),
      }

      await httpReceitaPorCliente
        .CreateReceitaPorCliente(dadosReceitaPorCliente)
        .then((res) => {
          if (res.status === 201) {
            this.$toast.success('Valor inserido com sucesso!!!')
            return
          }
        })
        .catch((error) => {
          this.$toast.info(
            `${error.response.data.message}, por favor atualizar valor`
          )
          return
        })

      this.valueReceitaPorCliente[index] = ''
      this.$nuxt.refresh()
    },
    async updateReceitaPorCliente(idRevenue, index) {
      if (!this.valueReceitaPorCliente[index]) {
        this.$toast.error('Preencha o valor do cliente!!!')
        return
      }
      const convertValue = this.valueReceitaPorCliente[index]
        .replace('R$', '')
        .replace(',', '.')

      const updateReceitaPorCliente = {
        fk_revenue: idRevenue,
        fk_client: this.dataClient.id,
        unique_value: Number(convertValue),
      }

      await httpReceitaPorCliente
        .UpdateReceitaPorCliente(updateReceitaPorCliente)
        .then((res) => {
          if (res.status === 200) {
            this.$toast.success('Valor Atualizado com sucesso!!!')
            return
          }
        })
        .catch((error) => {
          console.log(error)
        })

      this.valueReceitaPorCliente[index] = ''
      this.$nuxt.refresh()
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

      .btnReceita {
        display: flex;
        justify-content: center;
        gap: 1rem;

        button {
          background: var(--blue);
          height: 30px;
          width: 90px;
        }
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
