<template>
  <div class="containerPage">
      <h1 style="    display: flex;
    align-items: center;
    justify-content: center;
    height: 80vh;"> Em desenvolvimento </h1>
  </div>
  <!-- <div class="containerPage">
    <div class="headerTable">
      <span>Controle de bandejas e caixas</span>
      <InputSearch />
    </div>
    <table>
      <thead>
        <tr>

          <th>Empresa</th>
          <th>CNPJ</th>
          <th>Endereço</th>
          <th>Fone</th>
          <th>Opções</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>HONDA</td>
          <td>client.corrate_name</td>
          <td>Rua José Romão-ALEIXO, 69099-762</td>
          <td>client.addss</td>
          <td>client.fon</td>
          <td>
  
          </td>
        </tr>
      </tbody>
    </table>
    <ModalMedium titleModal="Historico de Pedidos" v-if="modalControl">
      <div class="containertTable">
        <table style="width: 98%;">
          <thead>
            <tr>
              <th>Data</th>
              <th>Pedido</th>
              <th>Qtd. Caixa</th>
              <th>Qtd. Bandejas</th>
              <th>Opções</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in 14" :key="item">
              <td><input type="text" value="10/04/2024 " disabled /></td>
              <td>
                <input type="text" value="Enroladinho de Salsicha" disabled />
              </td>
              <td><input type="number" value="10" /></td>
              <td><input type="number" value="10" /></td>
              <td>
                <button>{{ item }}</button>
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </ModalMedium>
  </div> -->
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    data() {
        return{
            modalControl: false
        }
    },
})
</script>

<style lang="scss" scoped>
.containerPage {
  width: 100%;
  padding: 2rem;
  .containertTable {
    height: 90%;
    // background: red;
    overflow: scroll;
  }
  label {
    font-weight: 600;
  }
  input {
    min-width: 120px;
    background: #b9b9b91f;
    text-align: center;
  }

//   input:disabled {
//     cursor: default;
//     background-color: light-dark(rgb(250 92 79 / 17%), rgba(59, 59, 59, 0.3));
//     color: light-dark(rgb(84, 84, 84), rgb(170, 170, 170));
//     border-color: rgba(118, 118, 118, 0.3);
//   }
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
        padding: 0.6rem 0.4rem;
      }
    }
    tbody tr td {
      padding: 0.4rem 0px;
    }
    tbody tr button {
      background: transparent;
    }
  }
}
</style>
