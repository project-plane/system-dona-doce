<template>
  <div class="informationFinance">
    <div v-if="orderFindClient" class="orderClient">
      <BeadFrame @pedidos="pedidos" @entrega="entrega">
        <div v-if="statusAba" class="order">
          <div>
            <h2>{{ orderFindClient.user.Clients.corporate_name }}</h2>
            <span style="color: var(--red);" v-if="orderFindClient.order_type === 'coffe'">Coffee</span>
     
            <span style="color: var(--blue);" v-if="orderFindClient.order_type === 'programmed'">Programado</span>
          </div>
 
          <div v-for="(dadosPedidos, index) in orderFindClient.orderItem" :key="index" class="order">
            <div v-if="dadosPedidos.categoryOrderItem.description === 'Dejejum'">
              <h3>Desjejum</h3>
              <table>
                <thead>
                  <tr>
                    <th>Quantidade</th>
                    <th>Pedido</th>
                    <th>Preço</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{{ dadosPedidos.amountItem }}</td>
                    <td>{{ dadosPedidos.revenues.description }}</td>
                    <td>R$ {{ dadosPedidos.valueOrderItem.toFixed(2) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div v-if="dadosPedidos.categoryOrderItem.description === 'Lanche 1'">
              <h3>Lanche 01</h3>
              <table>
                <thead>
                  <tr>
                    <th>Quantidade</th>
                    <th>Pedido</th>
                    <th>Preço</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{{ dadosPedidos.amountItem }}</td>
                    <td>{{ dadosPedidos.revenues.description }}</td>
                    <td>R$ {{ dadosPedidos.valueOrderItem.toFixed(2) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div v-if="dadosPedidos.categoryOrderItem.description === 'Lanche 2'">
              <h3>Lanche 02</h3>
              <table>
                <thead>
                  <tr>
                    <th>Quantidade</th>
                    <th>Pedido</th>
                    <th>Preço</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{{ dadosPedidos.amountItem }}</td>
                    <td>{{ dadosPedidos.revenues.description }}</td>
                    <td>R$ {{ dadosPedidos.valueOrderItem.toFixed(2) }}</td>
                  </tr>
                  <tr class="totalOrder">
                    <td>Total</td>
                    <td colspan="2" style="text-align: end">
                      R$ {{ orderFindClient.valueOrder.toFixed(2) }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div v-if="orderFindClient.order_type === 'coffe'">
       
              <table>
                <thead>
                  <tr>
                    <th>Quantidade</th>
                    <th>Descrição</th>
                    <th>Preço</th>
                  </tr>
                </thead>
                  <tr>
                    <td>{{ dadosPedidos.amountItem }}</td>
                    <td>{{ dadosPedidos.revenues.description }}</td>
                    <td>R$ {{ dadosPedidos.valueOrderItem.toFixed(2) }}</td>
                  </tr>
                  <!-- <tr class="totalOrder">
                    <td>Total</td>
                    <td colspan="2" style="text-align: end">
                      R$ {{ orderFindClient.valueOrder.toFixed(2) }}
                    </td>
                  </tr> -->
  
              </table>
         
            </div>
            
          </div>

          <h3 style="text-align: right; padding: 1.2rem;" v-if="orderFindClient.order_type === 'coffe'"> valor  R$ {{ orderFindClient.valueOrder.toFixed(2) }}</h3>
        </div>

        <div v-else>
          <div>
            <div class="inputs"  v-if="orderFindClient.orderStatus.description === 'Revisão Admin'|| orderFindClient.orderStatus.description === 'Entregue'||orderFindClient.orderStatus.description =='Em Entrega'"  >
              <!-- <span v-if="orderFindClient.amount_of_boxes != null"> 
                Já foi cadastrado um dado anteriormente, caso queira editar é só enviar novamente
              </span> -->

              <Input label="Bandeja" v-model="amount_of_tray" type="text" placeholder="Digita a quantidade de bandeja" />
              <Input label="Caixa"  v-model="amount_of_boxes" type="text" placeholder="Digita a quantidade de caixas" />
                
            <div v-if="orderFindClient.orderStatus.description === 'Revisão Admin'|| orderFindClient.orderStatus.description === 'Entregue' || orderFindClient.orderStatus.description === 'Em Entrega'"  class="containerNotaFiscal" >
              <span class="titleAnexo">Anexar Nota</span>
              <div class="inputAnexo">
                <input type="file" accept="image/*,.pdf" style="width: 85%" @change="onFileChangeNF"/>
                  <img  v-if="previewNotaFiscal" 
                  src="../../assets/icons/Icon_uploadConcluido.svg" alt="Icon concluido" style="width: 27px;" />
                  <img v-else
                    src="../../assets/icons/download.svg"
                    alt="Pré-visualização do PDF"
                    style="width: 20px;" />
              </div>
              <span class="titleNumber">Nº da NF</span>
              <div class="inputNumber">
                <input type="number" v-model="number_invoice" style="width: 100%; height: 100%;" placeholder="000 001 001"/>
                  
              </div>
            </div>
            <div v-if="orderFindClient.orderStatus.description === 'Revisão Admin'|| orderFindClient.orderStatus.description === 'Entregue' || orderFindClient.orderStatus.description === 'Em Entrega'" >
              <span>Anexar cautela</span>
              <div class="inputContainer"> 
                <input type="file" accept="image/*,.pdf" style="width: 85%" @change="onFileChange"/>
                  <img  v-if="previewCaution" 
                  src="../../assets/icons/Icon_uploadConcluido.svg" alt="Icon concluido" style="width: 27px;" />
                  <img v-else
                    src="../../assets/icons/download.svg"
                    alt="Pré-visualização do PDF"
                    style="width: 20px;" />
             </div>
            </div>
            <div>
              <span>Comprovante de Pagamento</span>
              <div class="img">
                <label for="inputComprovante" >
             
                  <span @click="downloadFile" v-if="orderFindClient.file_payment_voucher !=null" class="inputComprovante">
                   Baixar Comprovante 
                   <img  src="../../assets/icons/Icon_uploadConcluido.svg"  style="width: 20px;"  />
                  </span>
                  
                  <p class="inputComprovante" style="color: rgb(211, 60, 60);" v-else >Comprovante não enviado</p>
                
                </label>
              </div>
            </div>
         
            <!-- <pre>{{ orderFindClient}}</pre> -->

            <button class="btn" @click="sendData()"> Salvar</button>
          </div>
          <div v-else  class="inputs" >
            <span>O Status atual do pedido não permite acessar o formulário.</span>
          </div>
            </div>
         
        </div>
      </BeadFrame>
    </div>
    <div v-else class="informationOrder">
      <h3>Informações do pedido</h3>
      <span>Clique no card de pedido para visualizar as informações
        secundárias</span>
      <img src="~/assets/icons/cooke.svg" alt="" />
    </div>
  </div>
</template>

<script lang="ts">
import httpOrder from '@/server/pedidos/index'
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      dadosOrderFindClient: {},
      statusAba: true,
      amount_of_tray: "",
      amount_of_boxes: "",
      previewCaution: null,
      previewNotaFiscal: null,
      number_invoice: "",
      saveData: false
    }
  },
  async fetch() {
    this.dadosOrderFindClient = this.$store.state.dadosPedidos
  },
  computed: {
    orderFindClient() {
      const objectValeu = this.$store.state.dadosPedidos
      if (Object.keys(objectValeu).length === 0) {
        console.log('vazio')
      } else {
        console.log('cheio')
        return objectValeu
      }
    },
  },
  methods: {
    pedidos(e) {
      this.statusAba = e
    },
    entrega(e) {
      this.statusAba = e
    },
    onFileChangeNF(event) {
      this.selectedFileNF = event.target.files[0]
      this.previewNotaFiscal = URL.createObjectURL(this.selectedFileNF)
    },

    onFileChange(event) {
      this.selectedFile = event.target.files[0]
      this.previewCaution = URL.createObjectURL(this.selectedFile)
    },
    async adicionarBandejas(id) {
    try{ 
          const data = {
            amount_of_tray: parseInt(this.amount_of_tray),
            amount_of_boxes:parseInt(this.amount_of_boxes)
          }
          console.log(id, data);
          
          await httpOrder.UploaQtdBandejas(id, data);
          this.isDisabled = false;
          
          this.$toast.success('Número de bandejas inseridos');
          
        } catch (error) {
          this.$toast.error('Houve um erro ao processar a solicitação.');
        }
    },
    async uploadFile(id) {
    try{ 
        if (!this.selectedFile) {
          this.$toast.info('Selecione um arquivo antes de enviar.')
        }

        const formData = new FormData()
        formData.append('file_caution', this.selectedFile)
        // console.log(formData);
        
        const response = await httpOrder.UploadCautela(id, formData)
        this.$toast.info('Arquivo enviado com sucesso')
        
        setTimeout(function(){
          location.reload();
      }, 4000);
      } catch (error) {
        this.$toast.error('Houve um erro ao processar a solicitação');
      }
    },
    async uploadFileNF(id) {
   try{ 
        if (!this.selectedFileNF) {
          this.$toast.info('Selecione um arquivo PDF antes de enviar.')
        }
  
        const formData = new FormData()
          formData.append('file_invoice', this.selectedFileNF)
          formData.append('number_invoice', this.number_invoice)
        // console.log(formData);
        
        const response = await httpOrder.PostNotaFiscal(id, formData)
        this.$toast.info('Arquivo enviado com sucesso')
        
        setTimeout(function(){
          location.reload();
      }, 4000);

      } catch (error) {
        this.$toast.info('Erro ao enviar o arquivo:', error)
      }

    }, 

    async downloadFile() {
      try {
        await fetch('https://api.donadoce.gedroid.com/payment/' + this.orderFindClient.file_payment_voucher)
        .then((response) => response.blob())
        .then((blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "Arquivo"; 
          a.click();
          window.URL.revokeObjectURL(url);
        });
      } catch (error) {
        console.error("Erro ao baixar o arquivo:", error);
      }
    },
      sendData(){
      var values = [
        this.amount_of_tray,
        this.amount_of_boxes,
        this.previewCaution,
        this.number_invoice,
        this.previewNotaFiscal,
      ];


      const isValid = values.every((element) => {
      return this.validate(element);
  });

      if (isValid) {
        this.req();
      } else {
        this.$toast.info('Preencha todos os valores!');
      }
},

validate(value) {
  return !!value; // Verifica se o valor não é nulo ou indefinido
},

async req() {
  try {
    await this.uploadFile(this.orderFindClient.id);
    await this.uploadFileNF(this.orderFindClient.id);
    await this.adicionarBandejas(this.orderFindClient.id);

    this.$toast.info('Requisição feita com sucesso!');
  } catch (error) {
    this.$toast.error('Erro: ' + error); // Use this.$toast.error para indicar um erro
  }

    }
  },
})
</script>

<style scoped lang="scss">
.containerNotaFiscal{
  display: grid;
  grid-template-columns: 16rem 8rem;
  grid-template-rows: repeat(2, 2.6rem);
  grid-column-gap: 20px;
  grid-row-gap: 0px;


  .titleAnexo { grid-area: 1 / 1 / 2 / 2; }
  .titleNumber { 
    grid-area: 1 / 2 / 2 / 3;
    width: 100%; }
  .inputAnexo { 
    grid-area: 2 / 1 / 3 / 2; 
    @extend .inputContainer;
  }
  .inputNumber { 
    grid-area: 2 / 2 / 3 / 3;
    border: 0.06rem solid var(--border);
    border-radius: 0.25rem;
    width: 100%;
  }
}
.informationFinance {
  width: 100%;
  max-height: 100%;
  min-height: 60%;
  // background-color: red;
  padding: 2.3rem 1rem 1rem 1rem;


  .orderClient {
    height: 100%;
    overflow-y: scroll;

    .order {
      padding: 1rem;

      table {
        width: 100%;
        text-align: center;
        border-collapse: collapse;

        thead {
          border-bottom: 1px solid var(--border);
          padding: 1rem 0;

          tr th {
            padding: 0.6rem 0;
          }
        }

        .totalOrder {
          border-top: 1px solid var(--border);
          font-size: 1.2rem;
          font-weight: bold;

          td {
            padding: 0.6rem 0;
          }
        }
      }
    }

    .inputs {
      padding: 2rem 1rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;

      .img {
        width: 100%;
        height: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #ffffff;
        border: 0.06rem solid var(--border);
        border-radius: 0.25rem;

        label {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-end;
          font-weight: 800;
          font-size: 1.2rem;
          letter-spacing: 3px;
          cursor: pointer;

          span {
            width: 100%;
            font-size: 1rem;
            display: flex;
            justify-content: start;
            padding-left: 10px;
          }

          img {
            width: 20px;
            height: 20px;
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

    }
  }

  .inputContainer{
    border: solid 1px #b9b9b9;
    border-radius: 0.2rem;
    padding: 0.4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
 
  .informationOrder {
    padding: 0 1rem;
    min-height: 300px;
    max-height: 100vh;
    overflow-y: scroll;

    h3 {
      font-size: 1.3rem;
      color: var(--red);
    }

    img {
      display: flex;
      justify-content: center;
      align-items: center;
      width: auto;
      padding: 2rem;
    }
  }
  .inputComprovante{
    width: 100%;
    font-size: 1rem;
    display: flex;
    justify-content: start;
    padding-left: 10px;
    align-items: center;
    letter-spacing: 0px;
    color: #4caf50;
    gap: 0.5rem;
  }
}
.btn {
  width: 9rem;
  height: 2.6rem;
  background-color: var(--red);
  color: var(--white);
  border-radius: 0.25rem;
  font-size: 1rem;
  transition: 0.2s;
}
</style>
