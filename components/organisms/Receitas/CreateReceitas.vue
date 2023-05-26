<template>
  <Container>
    <Title>
      <h1>Receitas</h1>
    </Title>
    <div class="receitas">
      <div class="img">
        <img src="~/assets/img/coxinha.png" alt="" />
      </div>
      <div class="create_receita">
        <div class="input_receita">
          <label for="">Nome Receita</label>
          <input
            type="text"
            v-model="receita"
            placeholder="Digite nova receita"
          />
        </div>
        <button @click="createReceita">Criar</button>
        <div class="option_receita">
          <div class="input_radio">
            <input
              type="radio"
              name="programation"
              id="programation"
              v-model="status_receita"
              value="coffee"
            />
            <div class="input">
              <img src="~/assets/icons/coffee.svg" alt="" />
              <label class="coffee" for="programation"> Coffee </label>
            </div>
          </div>
          <div class="input_radio">
            <input
              type="radio"
              name="programation"
              id="programation"
              v-model="status_receita"
              value="programation"
            />
            <div class="input">
              <img src="~/assets/icons/programado.svg" alt="" />
              <label class="programado" for="programation"> Programado </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Container>
</template>

<script lang="ts">
import Vue from 'vue'

import httpReceitas from '~/server/receitas'

export default Vue.extend({
  data() {
    return {
      receita: '',
      status_receita: '',
    }
  },
  methods: {
    async createReceita() {
      const data = {
        description: 'Coxinha de Frango',
        value: 12,
        yield_per_quantity: 1,
        time_in_hours: 14,
        presumed_profit: 3,
        ingredients: [
          {
            fk_ingredient: '1',
            amount_ingredient: 30,
          },
          {
            fk_ingredient: '2',
            amount_ingredient: 60,
          },
        ],
      }
      await httpReceitas.CreateReceita(data).then((res) => {
        console.log(res)
      })
    },
  },
})
</script>

<style scoped lang="scss">
.receitas {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-gap: 1rem;
  gap: 1rem;
  align-items: start;
  .img img {
    width: 200px;
    height: 200px;
    background: var(--white);
  }
  .create_receita {
    width: 100%;
    display: grid;
    grid-template-columns: 3fr 3fr;
    align-items: flex-end;
    .input_receita {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      input {
        width: 100%;
      }
    }
    button {
      background: var(--txt_color);
      color: var(--white);
      width: 40%;
      height: 35px;
      font-weight: bold;
      font-size: 1.2rem;
    }

    .option_receita {
      width: 100%;
      display: flex;
      gap: 4rem;
      margin-top: 2rem;
      .input_radio {
        display: flex;
        gap: 1rem;
        align-items: center;
        justify-content: center;
        .input {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          gap: 0.5rem;
          .coffee {
            color: var(--red);
            font-weight: 500;
            font-size: 1.2rem;
          }
          .programado {
            color: var(--blue);
            font-weight: 500;
            font-size: 1.2rem;
          }
        }
      }
    }
  }
}
</style>
