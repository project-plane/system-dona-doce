<template>
  <div>
  <Loading v-if="loading" /> 
  <ModalPreview style="overflow: hidden;" titleModal="Lista de Pedidos / Faturamento" @closeModal="closeModal">
    <div>
      <div class="filter">
        <!-- Filtros -->
        <div class="input">
          <label>Tipo Pedido</label>
          <select v-model="selectedType">
            <option value="">Todos</option>
            <option value="programmed">Programado</option>
            <option value="coffe">Coffee</option>
          </select>
        </div>
        <div class="input">
          <label>Status</label>
          <select v-model="selectedAgenda">
            <option value="">Todos</option>
            <option value="022ac120002-1c69-11ee-be56-0242ac120002">Solicitado</option>
            <option value="11ee6828-1c69-11ee-be56-c691200020241">Agendado</option>
            <option value="314e2828-1c69-11ee-be56-c691200020241">Pré-Produção</option>
            <option value="45690813-1c69-11ee-be56-c691200020241">Em Processamento</option>
            <option value="789850813-1c69-11ee-be56-c691200020241">Em Entrega</option>
            <option value="1c69c120002-575f34-1c69-be56-0242ac1201c69">Entregue</option>
            <option value="22afa4e4-4e7f-14ee-be56-0222afa2d22afb092">Revisão do cliente</option>
            <option value="55b4c3a6-4e7f-31ee-be56-0242ac12000224fe4">Cancelados</option>
          </select>
        </div>
        <div class="input">
          <label>Clientes</label>
          <select v-model="selectedClient">
            <option value="">Todos</option>
            <option v-for="item in listClient" :value="item.id" :key="item.id">{{ item.corporate_name }}</option>
          </select>
        </div>
        <div class="input">
          <label>Unidade</label>
          <select v-model="selectedUnidade">
            <option value="">Todos</option>
            <option v-for="item in listEmpresa" :value="item.id" :key="item.id">{{ item.corporate_name }}</option> 
          </select>
        </div>

        <div class="input">
          <label>Data Inicial</label>
          <input v-model="dataInicial"  type="date">

        </div>

        <div class="input">
          <label>Data Final</label>
           <input  v-model="dataFinal" type="date">
        </div>

      </div>
      <div style="overflow: auto; height: 450px; overflow: scroll;">
        <!-- Tabela de Dados -->
        <table>
          <thead>
            <tr>
              <th>Data</th>
              <th>Status</th>
              <th>Empresa</th>
              <th>Fabrica</th>
              <th>Produto</th>
              <th>Quantidade</th>
              <th>Valor Unit.</th>
              <th>Valot Total</th>
            </tr>
          </thead>
          <tbody>
        <tr v-for="(list) in listOrders" :key="list"> 
        
                         
              <td>{{ convertData(list.dateOrder) }}</td>
              <td>{{ list.client }}</td>
              <td>{{ list.descriptionStatus }}</td>
              <td>{{ list.company }}</td>
              <td>{{ list.description }}</td>
              <td>{{ list.amountItem }}</td>
              <td>{{ list.valueOrderItem}}</td>
              <td>{{ list.valueItemTotal }}</td>
            </tr>
          </tbody>
        </table>

      </div>
      <div style="display: flex; justify-content: space-evenly; align-items: center;">
        <!-- Exportar -->
        <button @click="exportToCsv()" class="button">
         Exportar
      </button>

      <button @click="find()"class="button">
         Buscar
      </button>

      
      </div>
    </div>
  </ModalPreview>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import httpClients from './../../../server/cliente'
import httpEmpresa from './../../../server/empresa'
import httpOrder from './../../../server/pedidos'
import dayjs from "./../../../services/dayjs"


export default Vue.extend({
  props: {
    findPreviewEmpresa: {
      type: [Array, Object],
      required: true,
    },
  },
  data() {
    return {
      isToday: true,
      calendarStatus: false,
      date: new Date(),
      loading: false,
      selectedType: '',
      selectedAgenda: '',
      dataInicial: '',
      dataFinal: '',
      selectedClient: '',
      selectedUnidade: '',
      listOrders: [],
      listClient: [],
      listEmpresa: [],
    }
  },
  async fetch() {
    this.loading = true
    // ola mundo

    await httpClients
      .GetAllClients()
      .then((res) => {
        this.listClient = res.data
      })
      .catch((error) => {
        console.log(error)
      })

    await httpEmpresa
      .GetAllEmpresa()
      .then((res) => {
        this.listEmpresa = res.data
      })
      .catch((error) => {
        console.log(error)
      })

    await this.findList();
     this.loading = false
  },
  methods: {
    convertData(data){
      return dayjs.formtDateBr(data)
    },
     closeModal() {
      this.$emit('closeModal')
    },
    exportToCsv() {
      this.loading = true
      
      const csvContent = this.jsonToCsv(this.listOrders);
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const csvUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', csvUrl);
      link.setAttribute('download', 'data.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      this.loading = false
    },
    jsonToCsv(jsonData) {
      const header = Object.keys(jsonData[0]).join(',') + '\n';
      const rows = jsonData.map(obj => Object.values(obj).join(',')).join('\n');
      return header + rows;
    },
    async find(){
      this.loading = true
      await this.findList()
      this.loading = false
    },
    async findList(){
      const data = {
      orderStatus: this.selectedAgenda,
       orderType: this.selectedType,
       client: this.selectedClient,
       dataInicial: this.dataInicial,
       dataFinal: this.dataFinal
      }
      await httpOrder.findListExport(data).then((res) => {
        this.listOrders = res.data
      })
      .catch((error) => {
        console.log(error)
      })
    }
  },
})
</script>

<style scoped lang="scss">

button {
      width: 7rem;
      height: 2.5rem;
      border-radius: 6rem;
      font-size: 1rem;
      font-weight: 600;
      background-color: transparent;
      color: var(--red);
      border: 1px solid var(--red);
      margin-top: 1rem;
    }

button:hover {
  background-color: var(--red);
  color: #fff;
}

  


.filter {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  display: flex;

  .input {
    width: 100%;
    display: flex;
    flex-direction: column;
  
    label {
         padding: 10px;
   
         background: var(--bg_heade_table)
    }
  }
}

.dataEmpresa {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  padding: 2rem;

  p {
    height: 45px;
    padding: 0.5rem 0;
    border-radius: 5px;
    display: flex;
    align-items: center;
  }
}

.headerTable {
  width: 100%;
  height: 70vh;
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
      padding: 0.6rem 0;
    }
  }


  tbody tr td {
    text-align: center;
    padding: 1rem 0;
    max-width: 100px; /* largura máxima da célula */
  overflow: hidden; /* esconder o conteúdo excedente */
  white-space: nowrap; /* evitar quebra de linha */
  text-overflow: ellipsis; /* exibir reticências (...) quando o texto for cortado */
  }
 
  tbody tr td:hover {
  white-space: normal; /* exibir o texto completo ao passar o mouse */
  text-overflow: clip; /* evitar reticências ao passar o mouse */
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

    button {
      background: transparent;

      img {
        width: 1.2rem;
      }
    }
  }
}
</style>
