<template>
  <ModalPreview title-modal="Detalhes do pedido" @closeModal="closeModal">
    <div class="menu-modal">
      <button v-if="typeContent" class="selected">Itens do Pedido</button>
      <button v-if="!typeContent" @click="() => (typeContent = true)">
        Itens do Pedido
      </button>
      <button v-if="!typeContent" class="selected">Itens do Entrega</button>
      <button v-if="typeContent" @click="() => (typeContent = false)">
        Itens do Entrega
      </button>
    </div>
    <div v-if="typeContent" class="dataEmpresa">
      <div class="header-order">
        <h4>Data do Pedido: {{ formatDate(data.dateOrder) }}</h4>
        <h4>Status: {{ data.orderStatus.description }}</h4>
        <h4 v-if="data.order_type === 'coffe'" >Total: R$ {{ valueTotal }}</h4>
        <h4 v-else>Total: R${{ countdejejum + countlanche01 + countlanche02 }}</h4>
      </div>
      <section class="sectionCoffe" v-if="data.order_type === 'coffe'">

        <table class="listProduts">
          <tr>
           <th>Id</th>
           <th>Item</th> 
           <th>Qtde</th> 
           <th>Valor Unit.</th> 
          </tr>

          <tr  v-for="(item, index) in data.orderItem " :key="index">
           <td> {{ index+1 }}</td>
           <td> {{ item.revenues.description}}</td> 
           <td> {{data.orderItem[index].amountItem}}</td> 
           <td> {{data.orderItem[index].valueOrderItem}}</td> 
          </tr>

        </table>

      </section>

     <section v-else>
     
      <h4>Desjejum</h4>
          <table class="resume-content">
            <tr v-if="dejejum.length !== 0">
              <th>Item</th>
              <th>Qtde</th>
              <th>Imagem</th>
              <th>V. Unidade</th>
              <th>V. Total</th>
            </tr>

            <tr v-for="(item, index) in dejejum" :key="index" class="order-line">
              <td>{{ item.revenues.description }}</td>
              <td>{{ item.amountItem }}</td>
              <td>
                <img
                  :src="`https://api.donadoce.gedroid.com/img_revenue/${item.revenues.imagem}`"
                  alt=""
                />
              </td>
              <td>R$ {{ item.valueOrderItem }}</td>
              <td>R$ {{ totalValue(item.valueOrderItem, item.amountItem) }}</td>
            </tr>
            <tr v-if="dejejum.length === 0">
              Não possui...
            </tr>
          </table>

          <h4>Lanche 01</h4>
          <table class="resume-content">
            <tr v-if="lanche01.length !== 0">
              <th>Item</th>
              <th>Qtde</th>
              <th>Imagem</th>
              <th>V. Unidade</th>
              <th>V. Total</th>
            </tr>

            <tr v-for="(item, index) in lanche01" :key="index" class="order-line">
              <td>{{ item.revenues.description }}</td>
              <td>{{ item.amountItem }}</td>
              <td>
                <img
                  :src="`https://api.donadoce.gedroid.com/img_revenue/${item.revenues.imagem}`"
                  alt=""
                />
              </td>
              <td>R$ {{ item.valueOrderItem }}</td>
              <td>R$ {{ totalValue(item.valueOrderItem, item.amountItem) }}</td>
            </tr>
            <tr v-if="lanche01.length === 0">
              Não possui...
            </tr>
          </table>

          <h4>Lanche 02</h4>
          <table class="resume-content">
            <tr v-if="lanche02.length !== 0">
              <th>Item</th>
              <th>Qtde</th>
              <th>Imagem</th>
              <th>V. Unidade</th>
              <th>V. Total</th>
            </tr>

            <tr v-for="(item, index) in lanche02" :key="index" class="order-line">
              <td>{{ item.revenues.description }}</td>
              <td>{{ item.amountItem }}</td>
              <td>
                <img
                  :src="`https://api.donadoce.gedroid.com/img_revenue/${item.revenues.imagem}`"
                  alt=""
                />
              </td>
              <td>R$ {{ item.valueOrderItem }}</td>
              <td>R$ {{ totalValue(item.valueOrderItem, item.amountItem) }}</td>
            </tr>

            <tr v-if="lanche02.length === 0">
              Não possui...
            </tr>
          </table>
    </section>

      <Button
        v-if="
          data.orderStatus.description === 'Solicitado' ||
          data.orderStatus.description === 'Agendado' ||
          data.orderStatus.description === 'Pré-Produção'
        "
        title="Cancelar pedido"
        :is-disabled="isDisabled"
        @click.native="cancelAnOrder(data.id)"
      />
    </div>

    <div v-else class="dataEmpresa">
      <div class="header-order">
        <h4>Data do Pedido: {{ formatDate(data.dateOrder) }}</h4>
        <h4>Status: {{ data.orderStatus.description }}</h4>
      </div>

      <div class="resumeItens" >
       
        <div>
            <label for="" class="titleInput">Comprovante de Pagamento</label>
            <div class="inputContainer">
           
            <input type="file" style="width: 85%" @change="onFileChangeComprovante"/>
              <img  v-if="previewComprovante" 
              src="../../assets/icons/Icon_uploadConcluido.svg" alt="Icon concluido" style="widows: 20px" 
              />
              <img v-else
                src="../../assets/icons/Icon_upload.svg"
                alt="Pré-visualização do PDF"
              />
            </div>

        </div>
       
        <div>
          <label for="" class="titleInput">Número de Bandejas</label>
          <input id="bandeja" type="number" v-model="amount_of_tray" class="inputContainer" style="width:12rem"/>
        </div>

       

        <div>
            <label for="" class="titleInput">Nota</label>
            <span>Disponivel pra download</span>
            <br>
            <button class="inputContainer" style="width: 10rem; background-color: var(--red); color: white; text-align: center; display: flex; justify-content: center; "> 
              Baixar arquivo 
            </button>
            <!-- <input type="file"  accept="image/*,.pdf" class="inputContainer"/> -->
        </div>

        <div class="inputPdf">
          <label for="" class="titleInput">Cautela</label>
          <br>
          <span v-if="data.file_caution == null"  style="font-size: 12px;"> Arquivo ainda não anexado</span>
            <br>
            <button v-show="data.file_caution != null" class="inputContainer" style="width: 10rem; background-color: var(--red); color: white; text-align: center; display: flex; justify-content: center; "> 
              Baixar arquivo
              </button> 
        </div>
      <pre>{{ data }}</pre>
      

        
  
        <Button title="Salvar" type.native="button" :is-disabled="isDisabled" @click.once="adicionarBandejas(data.id)" style="width: 100%; height: 2.8rem;" />
    </div>
  </div>
  </ModalPreview>
</template>

<script lang="ts">
import Vue from 'vue'
import dayjs from 'dayjs'
import httpOrder from '@/server/pedidos/index'

export default Vue.extend({
  props: {
    data: Object,
    valueTotal: Number,
  },

  data() {
    return {
      dejejum: [],
      lanche01: [],
      lanche02: [],
      countdejejum: 0,
      countlanche01: 0,
      countlanche02: 0,
      isDisabled: false,
      typeContent: false,
      selectedFile: null,
      previewUrl: null,
      selectedFileComprovante: null,
      previewComprovante: null,
      amount_of_tray: Number,
      
    }
  },

  created() {
    this.data.orderItem.map((item) => {
      if (item.categoryOrderItem.description === 'Lanche 1') {
        this.lanche01.push(item)
      }
      if (item.categoryOrderItem.description === 'Dejejum') {
        this.dejejum.push(item)
      }
      if (item.categoryOrderItem.description === 'Lanche 2') {
        this.lanche02.push(item)
      }
    })

    this.dejejum.map((res) => {
      this.countdejejum =
        this.countdejejum + Number(res.amountItem) * Number(res.valueOrderItem)
    })

    this.lanche01.map((res) => {
      this.countlanche01 =
        this.countlanche01 + Number(res.amountItem) * Number(res.valueOrderItem)
    })

    this.lanche02.map((res) => {
      this.countlanche02 =
        this.countlanche02 + Number(res.amountItem) * Number(res.valueOrderItem)
    })
  },

  methods: {
    closeModal() {
      this.$emit("closeModal");
    },

    totalValue(unity, qtde) {
      return Number(unity) * Number(qtde)
    },

    formatDate(date) {
      return dayjs(date).format('DD/MM/YYYY')
    },
    async cancelAnOrder(id) {
      this.isDisabled = true
      await httpOrder.DeleteOrder(id).then( () => {
        this.isDisabled = false
        this.$toast.error('Pedido Cancelado')
        this.closeModal()
      })
    },

    onFileChange(event) {
      this.selectedFile = event.target.files[0]
      this.previewUrl = URL.createObjectURL(this.selectedFile)
    },
    onFileChangeComprovante(event) {
      this.selectedFileComprovante = event.target.files[0]
      this.previewComprovante = URL.createObjectURL(this.selectedFileComprovante)
    },

    async uploadFile(id) {
    try{ 
        if (!this.selectedFile) {
          throw new Error('Selecione um arquivo PDF antes de enviar.')
        }

        const formData = new FormData()
        formData.append('file_caution', this.selectedFile)
        console.log(formData);
        
        const response = await httpOrder.UploadCautela(id, formData)
        console.log('Arquivo enviado com sucesso:', response.data)
      } catch (error) {
        console.error('Erro ao enviar o arquivo:', error)
        console.log(error, 'Deu ruim')
      }
    },
    async adicionarBandejas(id) {
    try{ 
          const data = {
            amount_of_tray: parseInt(this.amount_of_tray)
          }
          console.log(id, data);
          
          const response = await httpOrder.UploaQtdBandejas(id, data);
          this.isDisabled = false;
          console.log('Arquivo enviado com sucesso:', response);
          this.$toast.success('Número de bandejas ok');
        } catch (error) {
          console.error('Erro ao enviar o arquivo:', error);
          this.$toast.error('Houve um erro ao processar a solicitação.');
        }
      }
  
  },
})
</script>

<style scoped lang="scss">
.menu-modal {
  display: flex;
  justify-content: center;
  margin-bottom: 1.3rem;

  button {
    width: 50%;
    font-size: 1.2rem;
    background-color: transparent;
    font-weight: 600;
  }

  .selected {
    color: var(--red);
  }
}
.listProduts{
  width: 100%;
  th{
    text-align: left;
  }
}
.dataEmpresa {
  width: 100%;
  display: flex;
  gap: 1rem;
  flex-direction: column;

  .header-order {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid var(--bg_color_modal);
  }
  .resumeItens{
    display: flex;
    width: 90%;
    overflow: hidden;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 0.5rem;
    margin: auto;

    .inputContainer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: 1px solid var(--red);
        text-align: center;
        border-radius: 0.25rem;
        padding: 0.5rem;
        width: 22rem;
        height: 3rem;
        img {
          width: 2rem;
        }
      }

      .titleInput {
        font-size: 1rem;
        font-weight: 600;
      }
  }
  .resume-content {
    width: 100%;
    text-align: center;
    border-bottom: 1px dotted var(--red);
    table-layout: fixed;

    tr {
      width: 100%;

      td {
        img {
          width: 2.5rem;
        }
      }

      td:nth-child(1),
      th:nth-child(1) {
        text-align: left;
      }
    }

    .input {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-bottom: 1rem;

      label {
        font-size: 1rem;
        font-weight: 600;
      }

      input {
        width: 30%;
        text-align: center;
        border: 1px solid var(--red);
      }

      input[type='file'] {
        padding: 0.5rem;
        border-radius: 0.25rem;
      }

      input[type='date'] {
        padding: 0.5rem;
        border-radius: 0.25rem;
        filter: none;
      }

      input[type='date']::placeholder {
        color: red;
      }
    }
    .inputPdf {
      display: flex;
      flex-direction: column;
      width: 17rem;

      
    }
  }
}
</style>
