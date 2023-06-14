<template>
  <ContainerTable>
    <EditEstoque />
    <div class="headerTable">
      <h2>Lista do Estoque</h2>
      <InputSearch v-model="textSearch" />
    </div>
    <div class="statusControl">
      <h3
        @click="statusEntrada"
        :class="{ activeEntrada: activeEntrada }"
        class="statusEntrada"
      >
        Entrada
      </h3>
      <h3
        @click="statusSaida"
        :class="{ activeSaida: activeSaida }"
        class="statusSaida"
      >
        Saída
      </h3>
    </div>
    <table v-if="activeEntrada">
      <thead>
        <tr>
          <th>ID</th>
          <th>Quantidade</th>
          <th>Ingrediente</th>
          <th>Preço</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(estoque, index) in listEntrada" :key="estoque.id">
          <td>{{ index + 1 }}</td>
          <td>{{ estoque.amount_actual }}</td>
          <td>{{ estoque.description }}</td>
          <td v-for="status in estoque.Ingredient_control" :key="status.id" v-if="status.is_output === false">{{ status }}</td>
          <td>R$ {{ estoque.value }}</td>
        </tr>
      </tbody>
    </table>
    <table v-else>
      <thead>
        <tr>
          <th>ID</th>
          <th>Quantidade</th>
          <th>Ingrediente</th>
          <th>Preço</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(estoque, index) in listEntrada" :key="estoque.id">
          <td>{{ index + 1 }}</td>
          <td>{{ estoque.amount_actual }}</td>
          <td>{{ estoque.description }}</td>
          <td v-for="status in estoque.Ingredient_control" :key="status.id" v-if="status.is_output === true">{{ status }}</td>
          <td>R$ {{ estoque.value }}</td>
        </tr>
      </tbody>
    </table>
  </ContainerTable>
</template>

<script lang="ts">
import Vue from 'vue'

import httpEstoque from '~/server/estoque'

export default Vue.extend({
  data() {
    return {
      textSearch: '',
      status: true,
      activeEntrada: false,
      activeSaida: true,
      listEntrada: [],
      listSaida: [],
    }
  },
  async fetch() {
    await httpEstoque
      .GetAllEstoque(true)
      .then((res) => {
        this.listEntrada = res.data
      })
      .catch((error) => {
        console.log(error)
      })
  },
  methods: {
    async statusEntrada() {
      this.activeEntrada = false
      this.activeSaida = true
      await httpEstoque
        .GetAllEstoque(true)
        .then((res) => {
          this.listEntrada = res.data
        })
        .catch((error) => {
          console.log(error)
        })
    },

    async statusSaida() {
      this.activeSaida = false
      this.activeEntrada = true
      await httpEstoque
        .GetAllEstoque(false)
        .then((res) => {
          this.listSaida = res.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
})
</script>

<style scoped lang="scss">
.headerTable {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.statusControl {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 25px;
  .statusEntrada {
    width: 20%;
    padding: 0.5rem;
    text-align: center;
    background: var(--green);
    color: var(--white);
    cursor: pointer;
  }
  .statusSaida {
    width: 20%;
    padding: 0.5rem;
    text-align: center;
    background: var(--red);
    color: var(--white);
    cursor: pointer;
  }
  .activeEntrada,
  .activeSaida {
    background: rgb(146, 146, 146);
  }
}
table {
  width: 100%;
  border-collapse: collapse;
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
  tbody tr .img img {
    width: 50px;
    height: 50px;
  }
  tbody tr .iconsOptions {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-top: 25px;
    button {
      background: transparent;
    }
  }
}
</style>
