<template>
  <Container>
    <ModalReceita
      v-if="$store.state.openModalReceita"
      :dados-receitas="dataReceita"
    />
    <Title>
      <h1>Receitas</h1>
    </Title>
    <div class="receitas">
      <div class="img">
        <label for="inputFile">
          <img v-if="!urlImgPreview" src="~/assets/icons/imgFile.svg" alt="" />
          <img
            v-if="urlImgPreview"
            class="imgFile"
            :src="urlImgPreview"
            alt=""
          />
        </label>
        <input
          id="inputFile"
          type="file"
          name="inputFile"
          @change="fileMethods"
        />
      </div>
      <div class="create_receita">
        <div class="input_receita">
          <Input
            v-model="receita"
            label="Nome Receita"
            type="text"
            placeholder="Digite nova receita"
          />
        </div>
        <button class="buttonAdd" @click="createReceita">Criar</button>
        <div class="option_receita">
          <div class="input_radio">
            <input
              id="programation"
              v-model="status_receita"
              type="radio"
              name="programation"
              :value="0"
            />
            <div class="input">
              <img src="~/assets/icons/coffee.svg" alt="" />
              <label class="coffee" for="programation"> Coffee </label>
            </div>
          </div>
          <div class="input_radio">
            <input
              id="programation"
              v-model="status_receita"
              type="radio"
              name="programation"
              :value="1"
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

export default Vue.extend({
  data() {
    return {
      receita: '',
      status_receita: '',
      dataReceita: [],
      urlImgFile: null,
      urlImgPreview: null,
    }
  },
  methods: {
    createReceita() {
      this.dataReceita = {
        receita: this.receita,
        status: this.status_receita,
        imgFile: this.urlImgFile,
        imgPreview: this.urlImgPreview,
      }

      if (!this.receita || (!this.status_receita && this.status_receita)) {
        this.$toast.error('Preencha todos os campos')
      } else {
        this.$store.commit('OPEN_MODAL_RECEITA', true)
        this.receita = ''
        this.status_receita = ''
        this.urlImgPreview = ''
      }
    },
    fileMethods(e) {
      const file = e.target.files[0]
      this.urlImgPreview = URL.createObjectURL(file)
      this.urlImgFile = e.target.files[0]
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

  .img {
    width: 200px;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f5d9d9;
    label {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-weight: 800;
      font-size: 1.2rem;
      letter-spacing: 3px;
      cursor: pointer;
      img {
        width: 80px;
        height: 80px;
      }
      .imgFile {
        width: 100%;
        height: 100%;
      }
    }
    input[type='file'] {
      display: none;
    }
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
