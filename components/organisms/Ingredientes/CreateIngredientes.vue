<template>
  <Container>
    <Title title="Novo Ingrediente" />
    <ContainerInput>
      <Input v-model="nameIngrediente" label="Nome" type="text" placeholder="Digite o nome ingrediente" />
      <div class="input">
        <span>Medida</span>
        <select v-model="selected">
          <option disabled value="">Selecionar Tipo de Medida</option>
          <option value="g">Grama</option>
          <option value="ml">Mililitro</option>
          <option value="u">Unidade</option>
        </select>
      </div>

      <div class="medida-input">
        <Input v-model="qtdIngrediente" label="Quantidade" type="number" :placeholder="holder" />

        <span v-if="selected === 'ml'">{{ qtdIngrediente/1000 }} Litros</span>
        <span v-if="selected === 'g'">{{ qtdIngrediente/1000 }} KG</span>
        <span v-if="selected === 'u'">{{ qtdIngrediente }} Unidades</span>
      </div>
      

      <!-- <Input v-model="priceIngrediente" label="Preço p/ quantidade" type="number"
        placeholder="Digite o preco ingrediente" /> -->
      <div class="input">
        <Label>Preço p/ quantidade </Label>
        <InputValue v-model="priceIngrediente" style="width: 100%; height: 2.8rem;" placeholder="Digite o novo valor" />
      </div>

      <Input
v-model="vlPorcaoIngrediente" block="background: #d6d6d6; cursor: no-drop" label="Valor p/ Porção"
        type="number" placeholder="R$ 0,00" disabled="disabled" />

    </ContainerInput>
    <div class="row-button">
      <Button title="Salvar" @functionClick="createIngrediente" />
    </div>

  </Container>
</template>

<script lang="ts">
import Vue from 'vue'

import httpIngrediente from '~/server/ingredientes'

export default Vue.extend({
  data() {
    return {
      nameIngrediente: '',
      priceIngrediente: '',
      qtdIngrediente: '',
      selected: '',
      vlPorcaoIngrediente: '',
      holder: 'Digite a qtd'
    }
  },
  watch: {
    priceIngrediente(newValue) {
      const convertValue = this.priceIngrediente
        .replace('R$', '')
        .replace(',', '.')
      newValue = convertValue

      this.priceIngrediente = convertValue

      this.vlPorcaoIngrediente = Number(newValue / this.qtdIngrediente).toFixed(3)
    },
    selected(newValue) {
      if (newValue === 'g') {
        this.holder = 'Ex: XXXX'
        return
      }
      if (newValue === 'ml') {
        this.holder = 'Ex: XXXX'
        return
      }
      if (newValue === 'u') {
        this.holder = 'Ex: X'
        
      }
    }
  },
  methods: {
    async createIngrediente() {
      this.loading = true
      if (!this.nameIngrediente || !this.priceIngrediente) {
        this.$toast.error('Preencha todos os campos!!!')
      }

      const ingrediente = {
        description: this.nameIngrediente,
        unit_of_measurement: this.selected,
        value_per_serving: Number(this.vlPorcaoIngrediente),
        amount: Number(this.qtdIngrediente),
        value: Number(this.priceIngrediente)
      }

      await httpIngrediente
        .CreateIngredientes(ingrediente)
        .then((res) => {
          if (res.status === 201) {
            this.$toast.success('Ingrediente criado com sucesso!!!')
          }

        })
        .catch((error) => {
          this.$toast.error('Ingrediente já existente!!!')
        })
      this.nameIngrediente = ''
      this.priceIngrediente = ''
      this.qtdIngrediente = ''
      this.selected = ''
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

.medida-input {
  span {
    font-weight: 600;
    font-size: 1.1rem;
    color: var(--red);
  }
}

.row-button {
  display: flex;
  justify-content: flex-end;
}
</style>
