<template>
  <Container>
  <div v-if="loading">
   <Loading/>
  </div>
    <Title title="Estoque" />
    <div class="inputs">
      <div class="input">
        <span>Ingrediente</span>
        <select v-model="selected">
          <option disabled value="">Selecionar Ingrediente</option>
          <option
            v-for="ingrediente in listIngrediente"
            :key="ingrediente.id"
            :value="ingrediente.id"
          >
            {{ ingrediente.description }}
          </option>
        </select>
      </div>
      <div class="medida" v-if="exibirMedida">
        <span>Unidade Medida</span>
        {{ unidadeMedida }}
      </div>
      <Input
        label="Quantidade"
        type="number"
        :placeholder="holder"
        v-model="quantidade"
      />
    </div>
    <ContainerInput>
      <!-- <div class="radio">
        <input type="radio" v-model="is_output" name="status" :value="false" />
        <Label>Entrada</Label>
      </div> -->
    </ContainerInput>
    <div class="input_create"></div>
    <div class="row-button">
      <Button title="Salvar" @functionClick="saveEstoque" />
    </div>
  </Container>
</template>

<script lang="ts">
import Vue from 'vue'

import httpEstoque from '~/server/estoque'
import httpIngredientes from '~/server/ingredientes'

export default Vue.extend({
  data() {
    return {
      loading: false,
      valorUnitario: '',
      amount: '',
      medida: '',
      quantidade: '',
      selected: '',
      is_output: false,
      listIngrediente: [],
      unidadeMedida: '',
      exibirMedida: false,
      holder: 'Inserir Quantidade',
    }
  },

  async fetch() {

    await httpIngredientes
      .ListIngredientes()
      .then((res) => {
        this.listIngrediente = res.data
      })
      .catch((error) => {
        console.log(error)
      })
  },
  watch: {
    selected(newValue) {
      this.exibirMedida = true
      this.listIngrediente.map((e) => {
        if (e.id === newValue) {
          this.valorUnitario = Number(e.value).toFixed(2)
          this.amount = Number(e.amount).toFixed(2)
          this.medida = e.unit_of_measurement
          this.unidadeMedida = e.unit_of_measurement
        }
        if (e.unit_of_measurement === 'g') {
          this.holder = 'Ex: XXXX'
          return
        }
        if (e.unit_of_measurement === 'ml') {
          this.holder = 'Ex: XXXX'
          return
        }
        if (e.unit_of_measurement === 'u') {
          this.holder = 'Ex: X'
          return
        }
      })
      if (this.selected === '') {
        this.exibirMedida = false
      }
    },
  },
  methods: {
    async saveEstoque() {
      if (!this.selected || !this.quantidade) {
        this.$toast.error('Preencha todos os campos!!!')
        return
      }
      const dataEstoque = {
        fk_ingredient: this.selected,
        amount: Number(this.quantidade),
        unitary_value: Number(this.valorUnitario),
        is_output: false,
        unit_of_measurement: 'g',
      }
      this.loading = true

      await httpEstoque
        .CreateEstoque(dataEstoque)
        .then((res) => {
          this.exibirMedida = false
          if (res.status === 201) {
            const status = JSON.parse(res.config.data)
            if (!status.is_output) {
              this.$toast.success(
                'Ingrediente inserido no estoque com sucesso!!!'
              )
              return
            } else {
              this.$toast.success(
                'Saída de ingrediente do estoque com sucesso!!!'
              )
              return
            }
          }
        })
        .catch((error) => {
          this.$toast.error(error.response.data.message)
          return
        })
      this.loading = false

      this.valorUnitario = ''
      this.quantidade = ''
      this.selected = ''
      this.is_output = ''

      this.$nuxt.refresh()
    },
  },
})
</script>

<style scoped lang="scss">
.inputs {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.medida {
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.6rem;
}

.input {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;

  span {
    font-size: 1rem;
  }

  select {
    border: 0.06rem solid var(--border);
    border-radius: 0.25rem;
  }
}

.inputRadio {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.radio {
  display: flex;
  align-items: center;
  // justify-content: center;
  gap: 0.2rem;
}

.row-button {
  display: flex;
  justify-content: flex-end;
}
</style>
