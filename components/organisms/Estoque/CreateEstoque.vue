<template>
  <Container>
    <Title title="Estoque" />
    <ContainerInput>
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
      <Input
        label="Quantidade"
        type="number"
        placeholder="Inserir Quantidade"
        v-model="quantidade"
      />
    </ContainerInput>
    <ContainerInput>
      <Input
        block="background: #d6d6d6; cursor: no-drop"
        label="Valor Ingrediente"
        type="number"
        placeholder=""
        v-model="valorUnitario"
        disabled="disabled"
      />
      <div class="inputRadio">
        <div class="radio">
          <input
            type="radio"
            v-model="is_output"
            name="status"
            :value="false"
          />
          <Label>Entrada</Label>
        </div>
        <div class="radio">
          <input type="radio" v-model="is_output" name="status" :value="true" />
          <Label>Saída</Label>
        </div>
      </div>
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
      valorUnitario: '',
      quantidade: '',
      selected: '',
      is_output: '',
      listIngrediente: [],
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
      this.listIngrediente.map((e) => {
        if (e.id === newValue) {
          this.valorUnitario = Number(e.value).toFixed(2)
        }
      })
    },
  },
  methods: {
    async saveEstoque() {
      if (!this.selected || !this.quantidade || !this.valorUnitario) {
        this.$toast.error('Preencha todos os campos!!!')
        return
      }
      const dataEstoque = {
        fk_ingredient: this.selected,
        amount: Number(this.quantidade),
        unitary_value: Number(this.valorUnitario),
        is_output: this.is_output,
      }

      await httpEstoque
        .CreateEstoque(dataEstoque)
        .then((res) => {
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
  .radio {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.2rem;
  }
}

.row-button {
  display: flex;
  justify-content: flex-end;
}
</style>
