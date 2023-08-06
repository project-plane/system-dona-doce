<!-- eslint-disable vue/attribute-hyphenation -->
<template>
  <ModalEdit :titleModal="'Atualizar dia: ' + formatDate(cardapioModal.dateMenu)" @save="updateCardapio">
    <div class="current">
      <span>Cardápio Atual</span>
      <span><strong>Desjejum:</strong> <br />{{ cardapioModal.itemMenu[0].revenues.description }}</span>
      <span><strong>Lanche 01:</strong><br /> {{ cardapioModal.itemMenu[1].revenues.description }}</span>
      <span><strong>Lanche 02:</strong> <br />{{ cardapioModal.itemMenu[2].revenues.description }}</span>
      <span><strong>Lanche 03:</strong> <br />{{ cardapioModal.itemMenu[3].revenues.description }}</span>
    </div>
    <div class="new">
      <span>Novo Cardápio</span>
      <div class="input-select">
        <span>Desjejum</span>
        <select v-model="cardapio.recreateItensMenu[0].fk_revenues">
          <option disabled value="">Selecionar Receita</option>
          <option :value="receita.id" v-for="(receita, index) in optionsReceitas" :key="index">
            {{ receita.description }}
          </option>
        </select>
      </div>
      <!-- {{ cardapioModal.itemMenu[0] }} -->
      <div class="input-select">
        <span>Lanche 1</span>
        <select v-model="cardapio.recreateItensMenu[1].fk_revenues">
          <option disabled value="">Selecionar Receita</option>
          <option :value="receita.id" v-for="(receita, index) in optionsReceitas" :key="index">
            {{ receita.description }}
          </option>
        </select>
      </div>
      <div class="input-select">
        <span>Lanche 2</span>
        <select v-model="cardapio.recreateItensMenu[2].fk_revenues">
          <option disabled value="">Selecionar Receita</option>
          <option :value="receita.id" v-for="(receita, index) in optionsReceitas" :key="index">
            {{ receita.description }}
          </option>
        </select>
      </div>
      <div class="input-select">
        <span>Lanche 3</span>
        <select v-model="cardapio.recreateItensMenu[3].fk_revenues">
          <option disabled value="">Selecionar Receita</option>
          <option :value="receita.id" v-for="(receita, index) in optionsReceitas" :key="index">
            {{ receita.description }}
          </option>
        </select>
      </div>
    </div>

  </ModalEdit>
</template>

<script lang="ts">
import Vue from 'vue'

import dayjs from 'dayjs'
import httpCardapio from '~/server/cardapio'
import httpReceitas from '~/server/receitas'

export default Vue.extend({
  props: {
    cardapioModal: Object
  },
  data() {
    return {
      optionsReceitas: [],
      cardapio: {
        recreateItensMenu: [
          {
            fk_revenues: this.cardapioModal.itemMenu[0].revenues.id,
          },
          {
            fk_revenues: this.cardapioModal.itemMenu[1].revenues.id,
          },
          {
            fk_revenues: this.cardapioModal.itemMenu[2].revenues.id,
          },
          {
            fk_revenues: this.cardapioModal.itemMenu[3].revenues.id,
          }
        ]
      }
    }
  },

  async mounted() {

    await httpReceitas.GetReceitas().then((res) => {
      this.optionsReceitas = res.data
    })
  },

  methods: {
    formatDate(date) {
      return dayjs(date).format('DD/MM/YYYY')
    },
    hasDuplicates(arr) {
      return new Set(arr).size !== arr.length;
    },

    async updateCardapio() {
      const fkCategoryList = this.cardapio.recreateItensMenu.map(item => item.fk_revenues);


      const hasDuplicatesFkCategory = this.hasDuplicates(fkCategoryList);

      if (hasDuplicatesFkCategory) {

        this.$toast.error('Não podem haver receitas duplicadas para o mesmo dia')
      } else {

        await httpCardapio.UpdateMenu(this.cardapioModal.id, this.cardapio).then((res) => {
          this.$store.commit('OPEN_MODAL', false)
          this.$toast.success('Cardápio atualizado com sucesso!')
          this.$nuxt.refresh()
        })
          .catch((error) => {
            console.log(error);

          })
        console.log('Não há fk_category iguais no objeto "cardapio".');
      }


    }
  }
})
</script>

<style lang="scss" scoped>
.current {
  display: flex;
  flex-direction: column;

  span {

    strong {
      color: var(--red);
    }
  }

  span:not(:first-child) {
    margin-bottom: 1.4rem;
  }

  span:first-child {
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
}

.new {
  display: grid;
  grid-template-columns: 1fr;

  span:first-child {
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .input-select {
    margin-bottom: 1rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.3rem;

    span {
      text-align: left;
      font-size: 1rem;
      font-weight: 600;
      color: var(--red);
    }

    select {
      border: 0.06rem solid var(--border);
      border-radius: 0.25rem;
    }
  }
}
</style>
