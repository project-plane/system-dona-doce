<template>
  <div class="container_edit_modal">
    <div class="negativeSpace">
      <Title class="headerModal">
        <h1>{{ titleModal }}</h1>
        <img @click="closeModal" src="~/assets/icons/close.svg" alt="close" />
      </Title>
      <div class="body">
        <h2>{{ historicoEstoque.description }}</h2>
        <div class="historico">
          <div class="entradas">
            <h3>Entradas</h3>
            <table>
              <thead>
                <th>Valor de Entrada</th>
                <th>Quantidade</th>
              </thead>
              <tbody>
                <tr
                  v-for="entrada in historicoEstoque.Ingredient_control"
                  :key="entrada.id"
                >
                  <td v-if="entrada.is_output === false">
                    R$ {{ entrada.unitary_value.toFixed(2) }}
                  </td>
                  <td v-if="entrada.is_output === false">
                    {{ entrada.amount }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="saidas">
            <h3>Saídas</h3>
            <table>
              <thead>
                <th>Valor de Saída</th>
                <th>Quantidade</th>
              </thead>
              <tbody>
                <tr
                  v-for="entrada in historicoEstoque.Ingredient_control"
                  :key="entrada.id"
                >
                  <td v-if="entrada.is_output === true">
                    R$ {{ entrada.unitary_value.toFixed(2) }}
                  </td>
                  <td v-if="entrada.is_output === true">
                    {{ entrada.amount }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    titleModal: {
      type: String,
      required: true,
    },
    historicoEstoque: {
      type: [Array, Object],
      required: true,
    },
  },
  methods: {
    closeModal() {
      this.$store.commit('OPEN_MODAL_PREVIEW_ESTOQUE', false)
    },
  },
})
</script>

<style scoped lang="scss">
.container_edit_modal {
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
  .negativeSpace {
    width: 70%;
    min-height: 50%;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background: var(--bg_color);
    border-radius: 7px;
    .headerModal {
      width: 100%;
      display: flex;
      justify-content: space-between;
      img {
        cursor: pointer;
      }
    }
    .body {
      width: 100%;
      background: var(--white);
      padding: 1rem;
      border-radius: 5px;
      .historico {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
        margin-top: 1rem;
        .entradas h3 {
          color: var(--blue);
        }
        .saidas h3 {
          color: var(--red);
        }
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 1rem;
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
        }
        tbody tr {
          button {
            background: transparent;
          }
        }
      }
    }
  }
}
</style>
