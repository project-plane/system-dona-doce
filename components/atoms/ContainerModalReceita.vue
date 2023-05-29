<template>
  <div class="containerReceita">
    <div class="bodyModal">
      <div class="container">
        <div class="header">
          <img src="~/assets/img/coxinha.png" alt="" />
          <div class="textReceita">
            <h3>Coxinha de Frango</h3>
            <p>Coffee</p>
          </div>
          <div @click="$emit('closeModal', closeModal)">
            <img src="~/assets/icons/close.svg" alt="" />
          </div>
        </div>
        <div class="body">
          <div class="input">
            <label for="qtd">Quantidade</label>
            <input
              type="number"
              id="qtd"
              placeholder="quantidade"
              v-model="qtdIngrediente"
            />
          </div>
          <div class="input">
            <label for="ingrediente">Ingrediente</label>
            <select name="" id="ingrediente" v-model="selected">
              <option disabled value="">Selecione Ingrediente</option>
              <option>Leite</option>
              <option>Leite</option>
              <option>Açucar</option>
              <option>Trigo</option>
              <option>Ovo</option>
              <option>Frango</option>
            </select>
          </div>
          <div class="btnIngrediente">
            <button @click="inserirIngrediente">Inserir</button>
          </div>
        </div>
        <div class="tab">
          <table>
            <thead>
              <tr>
                <th>QTD</th>
                <th>Ingrediente</th>
                <th>Preço</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>35</td>
                <td>Trigo</td>
                <td>R$ 36,00</td>
              </tr>
              <tr>
                <td>35</td>
                <td>Trigo</td>
                <td>R$ 36,00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      selected: '',
      qtdIngrediente: '',
    }
  },
  props: {
    dadosReceitas: {
      type: [Array, Object],
      required: true,
    },
    closeModal: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    inserirIngrediente() {},
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
  .bodyModal {
    background: var(--white);
    width: 40%;
    min-height: 50%;
    .container {
      width: 100%;
      padding: 2.5rem 2rem;
      display: flex;
      flex-direction: column;
      gap: 2rem;
      .header {
        width: 100%;
        display: grid;
        grid-template: 1fr/10rem repeat(1, minmax(min(2.3vw, 1rem), 1fr));
        p {
          color: var(--red);
        }
      }
      .body {
        width: 100%;
        display: grid;
        grid-template: 1fr/10rem repeat(2, minmax(min(2.3vw, 1rem), 1fr));
        border-bottom: 2px dashed var(--bg_opacity);
        padding-bottom: 1rem;
        gap: 1rem;
        .input {
          display: flex;
          flex-direction: column;
          input,
          select {
            border: 1px solid var(--bg_opacity);
          }
        }
        .btnIngrediente {
          width: 100%;
          display: flex;
          align-items: flex-end;
          button {
            width: 100%;
            padding: 0.6rem;
            background: var(--red);
            color: var(--white);
            font-weight: 700;
            border-radius: 4px;
          }
        }
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 1rem;
        thead,
        tbody {
          width: 100%;
          border-bottom: 1px solid var(--bg_opacity);
          tr th {
            padding: 0.6rem 0;
          }
        }
        /* tbody{
         border-bottom: ; 
        } */
        tbody tr td {
          text-align: center;
          padding: 1rem 0;
        }
        tbody tr:nth-child(2n) {
          background: var(--border);
        }
      }
    }
  }
}
</style>