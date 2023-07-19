<template>
  <LoadingPage v-if="loading" />
    <Container v-else>
        <Title title="Novo Cardápio" />
        <div class="calendar-content">
          <div class="calendar">
            <span>Selecione uma data</span>
            <v-date-picker v-model="date" :attributes="attributes" is-expanded mode="date" color="red"/>
          </div>
          
          <div v-if="formatDate(date) !== 'Invalid Date' && formatDate(date) !== '31/12/1969' && !existOnList" class="calendar-input">
            <span>Dia: {{ formatDate(date) }}</span>
            

            <div v-for="index in qtdeCardapio" :key="index" class="input-select">
              <div class="input-internal">
                <span>Opção {{ index }}</span>
                <select v-model="cardapio.createItensMenu[index - 1].fk_revenues">
                <option disabled value="">Selecionar Receita</option>
                <option v-for="(receita, index) in optionsReceitas" :key="index" :value="receita.id">
                  {{ receita.description }} 
                </option>
                </select>
                
                </div>

                <img src="../../../assets/icons/delete.svg" alt="" class="button-delete" @click="removeOnCardapio">
  
              </div>

            <button v-if="qtdeCardapio < 4" class="add-option" @click="addOnCardapio">+ Adicionar Opção</button>


          </div>
          
        </div>
        <div v-if="formatDate(date) !== 'Invalid Date' && formatDate(date) !== '31/12/1969' && !existOnList" class="row-button">
          <Button title="Salvar" @click.native="saveDayCardapio" />
        </div>
  </Container>
</template>

<script lang="ts">
import Vue from 'vue'
import dayjs from 'dayjs'
import httpCardapio from '~/server/cardapio'
import httpReceitas from '~/server/receitas'
export default Vue.extend({
  data() {
    return {
      days: [],
      optionsReceitas: [],
      date: '',
      toEdit: [],
      datesToVerify: [],
      loading: true,
      existOnList: false,
      qtdeCardapio: 0,
      cardapio: {
        dateMenu: '',
        createItensMenu: [
          {
            fk_revenues: '',
          },
          {
            fk_revenues: '',
          },
          {
            fk_revenues: '',
          },
          {
            fk_revenues: '',
          }
        ]
      },

    };
  },

  computed: {
    dates() {
      return this.days.map(day => day.dateMenu);
    },
    attributes() {
      return this.dates.map(date => ({
        highlight: true,
        dates: date,
      }));
    },
  },


  watch: {
    date (newValue) {
      if(this.days.length === 0) {
        this.cardapio.dateMenu = newValue
      }
      this.days.map ( (item) => {
        if(dayjs(item.dateMenu).format('DD/MM/YYYY') === dayjs(newValue).format('DD/MM/YYYY')) {
          console.log('existe na listagem')
          this.existOnList = true
        } else {
          console.log('não existe - n pode mostrar')
          this.existOnList = false
          this.cardapio.dateMenu = newValue
        }
      })
      

      this.existOnList = this.datesToVerify.includes(this.formatDate(this.date))


      this.date = new Date(newValue).toISOString()
    },
  },



  async mounted() {
    await httpReceitas.GetReceitas().then( (res) => {
      this.optionsReceitas = res.data
      })
  },
  

  async created() {
    await httpCardapio.GetMenu().then( (res) => {
        this.days = res.data
        this.days.map( (item) => {
          this.toEdit.push(item)
          this.datesToVerify.push(this.formatDate(item.dateMenu))
        })
    })


    this.loading = false

  },

  methods: {

    addOnCardapio () {
      this.qtdeCardapio ++
    },

    removeOnCardapio () {
      this.qtdeCardapio --
    },

    formatDate(date) {
      return dayjs(date).format('DD/MM/YYYY')
    },
    hasDuplicates(arr) {
      return new Set(arr).size !== arr.length;
    },

    async saveDayCardapio() {

      const fkCategoryList = this.cardapio.createItensMenu.map(item => item.fk_revenues);

    
      const hasDuplicatesFkCategory = this.hasDuplicates(fkCategoryList);

      if (hasDuplicatesFkCategory) {
        
        this.$toast.error('Não podem haver receitas duplicadas para o mesmo dia')
      } else {
        await httpCardapio.SetNewMenu(this.cardapio).then(async (res) => {
        this.$toast.success('Cardapio Cadastrado com Sucesso!')
        this.$nuxt.refresh()


        await httpCardapio.GetMenu().then( (res) => {
        this.days = res.data
        this.$nuxt.refresh()
    })
      }).catch( (error) => {
        console.log(error)
        this.$toast.error('Não foi possivel cadastrar o cardapio ')
      })
      }

      
     
    }
  },


  

})
</script>

<style lang="scss" scoped>

.calendar-content {
  margin-top: -1rem;
  display: flex;
  justify-content: space-between;

  

  .calendar {
    display: flex;
    flex-direction: column;
    width: 45%
  }

  .calendar-input {
    width: 50%;
    padding-left: 5%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    border-left: 1px solid var(--border);

    span {
      text-align: center;
      font-size: 1.2rem;
      color: var(--red);
      font-weight: 600;
    }

    .input-select {
      display: flex;
      align-items: flex-end;
      gap: 0.6rem;
      width: 100%;
      margin-bottom: 0.5rem;

      .input-internal {
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

      .button-delete {
        cursor: pointer;
        margin-bottom: 0.5rem;
      }
  
     
    }

    .add-option {
      border: 2px solid var(--red);
      width: 9rem;
      height: 2.5rem;
      font-weight: 600;
      color: var(--red);
      border-radius: 0.25rem;
    }
  }

  @media(max-width: 785px) {
    flex-direction: column;
    gap: 1rem;

    .calendar, .calendar-input {
      width: 100%;
      border-left: none;
      padding-left: 0;
    }
  }
}

.row-button {
  display: flex;
  justify-content: flex-end;
}
</style>
