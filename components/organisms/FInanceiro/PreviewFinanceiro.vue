<template>
  <div>
  <Loading v-if="loading" /> 
  <ModalTable style="overflow: hidden;" titleModal="Lista de Pedidos / Faturamento">
    <div class="filter">
        <!-- Filtros -->
        <div class="input">
          <label class="titleFilter">Tipo Pedido</label>
          <select v-model="selectedType">
            <option value="">Todos</option>
            <option value="programmed">Programado</option>
            <option value="coffe">Coffee</option>
          </select>
        </div>
        <div class="input">
          <label class="titleFilter" >Status</label>
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
          <label class="titleFilter">Clientes</label>
          <select v-model="selectedClient">
            <option value="">Todos</option>
            <option v-for="item in listClient" :value="item.id" :key="item.id">{{ item.corporate_name }}</option>
          </select>
        </div>
        <div class="input">
          <label class="titleFilter">Unidade</label>
          <select v-model="selectedUnidade">
            <option value="">Todos</option>
            <option v-for="item in listEmpresa" :value="item.id" :key="item.id">{{ item.corporate_name }}</option> 
          </select>
        </div>

        <div class="input">
          <label class="titleFilter">Data Inicial</label>
          <input v-model="dataInicial"  type="date">

        </div>

        <div class="input">
          <label class="titleFilter">Data Final</label>
           <input  v-model="dataFinal" type="date">
        </div>

      </div>
    <div>
      <div class="containerTotal">
        <section>
         <strong> Valor Total:</strong>  {{ teste }}
        </section>
        <section>
          <Strong>Custo Total:</Strong> {{ custoTotal }}
        </section>
        <section>
          <strong>Lucro Total: </strong> {{ diferenca  }}
        </section>
      </div>
    
      <div class="containerTable">
        <!-- Tabela de Dados -->
        <div v-if="listOrders.length === 0" style=" display: flex; align-items: center; justify-content: center; height: 72%;">
          <img src="@/static/noInform.png" alt="" style="height: 8rem; margin: auto;">
        </div>
        <table v-else>
          <thead>
            <tr>
              <th>Data</th>
              <th>Empresa</th>
              <th>Fábrica</th>
              <th>Hora</th>
              <th>Produto</th>
              <th>Qtd.</th>
              <th>Valor Un.</th>
              <th>Valor Total</th>
              <th>Custo Un.</th>
              <th>Lucro Un.</th>
              <th>Custo Total</th>
              <th>Lucro Total</th>
             
            </tr>
           
          </thead>
       

          <tbody>
       
            <tr v-for="(list, id) in listOrders" :key="id">
              <td>{{ convertData(list.dateOrder) }}</td>
              <!-- <pre>{{ list }}</pre> -->
              <td>{{ list.company }}</td>
              <td>{{ list.client }}</td>
              <td>-</td>
              <td>{{ list.description }}</td>
              <td>{{ list.amountItem }}</td>
              <td>{{ list.valueOrderItem }}</td>
              <td>{{ list.valueItemTotal }}</td>
              <td>{{ list.unitcostofrevenue }}</td>
              <td> {{ list.valueOrderItem -  list.unitcostofrevenue}}</td>
              <td>{{ list.totalcostofrevenue }}</td>
              <td> {{ list.valueItemTotal -  list.totalcostofrevenue}}</td>
           </tr>
          </tbody>
        </table>
      </div>
      
    </div>
    <div class="footerModal">
        <!-- Exportar -->
        <button @click="exportToCsv()" class="button">
         Exportar
      </button>

      <button @click="find()" class="button">
         Buscar
      </button>

      
      </div>
  </ModalTable>ModalPreview
</div>
</template>

<script lang="js">
import Vue from 'vue';
import httpClients from './../../../server/cliente'
import httpEmpresa from './../../../server/empresa'
import httpOrder from './../../../server/pedidos'
import dayjs from "./../../../services/dayjs"
import * as XLSX from 'xlsx';


export default Vue.extend({
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
      teste: 0,
      custoTotal: 0,
      diferenca: 0,
    }
  },
  async fetch() {

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
  },
  methods: {
    calcularSoma(lista, chave) {
      const soma = lista.reduce((acumulador, item) => acumulador + item[chave], 0);
      return soma
    },
    totalValueItemTotal() {
      this.teste = this.calcularSoma(this.listOrders, 'valueItemTotal');
    },
    totalcostofrevenue() {
      this.custoTotal = this.calcularSoma(this.listOrders, 'totalcostofrevenue');
    },
    calcularResultadoFinal() {
      const diferenca = this.teste - this.custoTotal;
      this.diferenca = diferenca.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

      const valorTotal = this.teste 
      this.teste = valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

      const custo = this.custoTotal 
      this.custoTotal = custo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    },
    convertData(data){
      return dayjs.formtDateBr(data)
    },
    
    exportToCsv() {
      this.loading = true;
      
      const headers = [
        ["Data do Pedido", "Número do Pedido", "Status", "Descrição", "Quantidade", "Valor do Item", "Custo Unitário de Receita", "Custo Total de Receita"]
      ];
      
      // Renomear as chaves do objeto para corresponder aos novos cabeçalhos
      const updatedData = this.listOrders.map(item => ({
        "Data do Pedido": item.dateOrder,
        "Número do Pedido": item.numberOrder,
        "Status": item.descriptionStatus,
        "Descrição": item.description,
        "Quantidade": item.amountItem,
        "Valor do Item": item.valueOrderItem,
        "Custo Unitário de Receita": item.unitcostofrevenue,
        "Custo Total de Receita": item.totalcostofrevenue
      }));

      // Adicionar os cabeçalhos aos dados
      const worksheet = XLSX.utils.json_to_sheet([]);
      XLSX.utils.sheet_add_aoa(worksheet, headers);
      XLSX.utils.sheet_add_json(worksheet, updatedData, { skipHeader: true, origin: 'A2' });

      // Cria o workbook e adiciona a planilha
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Orders');
      
      // Gera o buffer de array do workbook
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      
      // Cria um blob a partir do buffer de array
      const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
      const excelUrl = window.URL.createObjectURL(blob);
      
      // Cria um link de download para o arquivo Excel
      const link = document.createElement('a');
      link.setAttribute('href', excelUrl);
      link.setAttribute('download', 'Faturamento.xlsx');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      this.loading = false;
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
        this.totalValueItemTotal()
        this.totalcostofrevenue()
        this.calcularResultadoFinal()
      })
      .catch((error) => {
        console.log(error)
      })
    }
  },
  computed: {
    
  }
})
</script>

<style scoped lang="scss">
.titleFilter{
  font-weight: 600;
}
.containerTotal{
  display: flex;
    justify-content: flex-start;
    gap: 4rem;
    padding: .5rem 0;
}
.containerTable{
  height: 400px;
  overflow-y: scroll;
}

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
  align-items: center;
  width: 100%;
  display: flex;
  padding: 0.5rem  0;
  flex-direction: row;
  gap: 10px;
  .input {
    // width: 100%;
    display: flex;
    flex-direction: column;
    select, input{
      border: solid 1px rgba(59, 56, 56, 0.637);
      border-top: none;
      border-left: none;
      border-right: none;
      border-radius: 0;
      background: #00000008;
      color: black;
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
  // position: sticky;
   

  span {
    font-size: 1.35rem;
    font-weight: 600;
  }
}

table {
  width: 100%;
  overflow: scroll;
  height: 350px;
  font-size: .95rem;

  border: solid 1px rgba(59, 56, 56, 0.637);
  border-top-left-radius: .6rem;
  border-top-right-radius: .6rem;
  border-collapse: collapse;
  text-align: left;
  
  th{
    height: 3.5rem;
    border-bottom: solid 1px black;
    padding: .5rem;
    position: sticky;
    top: 0;
    background-color: #fff;
    
  }
  td{
    height: 1rem;
    padding: .5rem;
  }
  

  tr:nth-child(even) {
  background-color: #ffefdb;
}
 
}
.footerModal{
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  bottom: 7%;
  width: 88%;
  position: fixed;
}
</style>
