<template>
  <ModalPreview title-modal="Detalhes do pedido" @closeModal="closeModal">
    <div class="menu-modal">
      <button v-if="typeContent" class="selected">Itens do Pedido</button>
      <button v-if="!typeContent" @click="() => (typeContent = true)">
        Itens do Pedido
      </button>
      <button v-if="!typeContent" class="selected">Itens da Entrega</button>
      <button v-if="typeContent" @click="() => (typeContent = false)">
        Itens da Entrega
      </button>
    </div>
    <div v-if="typeContent" class="dataEmpresa">
      <div class="header-order">
        <h4>Data do Pedido: {{ formatDate(data.dateOrder) }}</h4>
        <h4>Status: {{ data.orderStatus.description }}</h4>
        <h4 v-if="data.order_type === 'coffe'">Total: {{ valueTotal }}</h4>
        <h4 v-else>
          Total: R${{ countdejejum + countlanche01 + countlanche02 }}
        </h4>
      </div>
      <section class="sectionCoffe" v-if="data.order_type === 'coffe'">
        <table class="listProduts">
          <tr>
            <th>Id</th>
            <th>Item</th>
            <th>Qtde</th>
            <th>Valor Unit.</th>
            <th v-if="['Solicitado', 'Agendado'].includes(data.orderStatus.description)"> Opções</th>
          </tr>
          
          <tr v-for="(item, index) in data.orderItem" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ item.revenues.description }}
            </td>
        
            <td v-if="['Pré-Produção','Cancelado', 'Em Processamento', 'Em Entrega', 'Entregue', 'Revisão Cliente', 'Cancelado', ].includes(data.orderStatus.description)">
                {{ item.amountItem }}
              </td>
              <td v-else>
                <input type="number"  style="border-bottom: solid 1px #fa5c4fbf; width: 6rem; border-radius: 0rem;" v-model="data.orderItem[index].amountItem">
            </td>
        

            <td> R$ {{ data.orderItem[index].valueOrderItem }}</td>
            
            
            <td> 
              <Button v-if="['Solicitado', 'Agendado'].includes(data.orderStatus.description)" title="Atualizar"  @click.native="editItem(data.orderItem[index])" style="width: 6rem; height: 2.2rem;" />
            </td>
           
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
            <th v-if="['Solicitado', 'Agendado'].includes(data.orderStatus.description)" > Opções</th>
          </tr>

          <tr v-for="(item, index) in dejejum" :key="index" class="order-line">
     
            <td>{{ item.revenues.description }}</td>
       
            
            <!-- {{ data.orderStatus.description }} -->
            <td v-if="['Pré-Produção','Cancelado', 'Em Processamento', 'Em Entrega', 'Entregue', 'Revisão Cliente', 'Cancelado', ].includes(data.orderStatus.description)">
                {{ item.amountItem }}
              </td>
              <td v-else>
                <input type="number" style="border-bottom: solid 1px #fa5c4fbf; width: 6rem; border-radius: 0rem;" v-model="item.amountItem">
              </td>
            <td>
              <img
                :src="`https://api.donadoce.net/img_revenue/${item.revenues.imagem}`"
                alt=""
              />
            </td>
            <td>R$ {{ item.valueOrderItem }}</td>
            <td>R$ {{ totalValue(item.valueOrderItem, item.amountItem).toFixed(2) }}</td>

            <td v-if="['Solicitado', 'Agendado'].includes(data.orderStatus.description)"> 
              <Button  title="Atualizar"  @click.native="editItem(data.orderItem[index])" style="width: 6rem; height: 2.2rem;" />
            </td>

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
            <th v-if="['Solicitado', 'Agendado'].includes(data.orderStatus.description)"> Opções</th>
          </tr>

          <tr v-for="(item, index) in lanche01" :key="index" class="order-line">
            <td>{{ item.revenues.description }}</td>
          
            <td v-if="['Pré-Produção','Cancelado', 'Em Processamento', 'Em Entrega', 'Entregue', 'Revisão Cliente', 'Cancelado', ].includes(data.orderStatus.description)">
                {{ item.amountItem }}
              </td>
              <td v-else>
                <input type="number"  style="border-bottom: solid 1px #fa5c4fbf; width: 6rem; border-radius: 0rem;" v-model="item.amountItem">
            </td>
            <td>
              <img
                :src="`https://api.donadoce.net/img_revenue/${item.revenues.imagem}`"
                alt=""
              />
            </td>
            <td>R$ {{ item.valueOrderItem }}</td>
            <td>R$ {{ totalValue(item.valueOrderItem, item.amountItem).toFixed(2) }}</td>
            <td v-if="['Solicitado', 'Agendado'].includes(data.orderStatus.description)" > 
              <!-- <pre>{{ data.orderStatus.description }}</pre> -->
              <Button title="Atualizar"  @click.native="editItem(data.orderItem[index])" style="width: 6rem; height: 2.2rem;" />
            </td>
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
            <th v-if="['Solicitado', 'Agendado'].includes(data.orderStatus.description)"> Opções</th>
          </tr>

          <tr v-for="(item, index) in lanche02" :key="index" class="order-line">
            <td>{{ item.revenues.description }}</td>
           
            <td v-if="['Pré-Produção','Cancelado', 'Em Processamento', 'Em Entrega', 'Entregue', 'Revisão Cliente', 'Cancelado', ].includes(data.orderStatus.description)">
                {{ item.amountItem }}
              </td>
              <td v-else>
                <input type="number"  style="border-bottom: solid 1px #fa5c4fbf; width: 6rem; border-radius: 0rem;" v-model="item.amountItem">
            </td>
        
            <td>
              <img
                :src="`https://api.donadoce.net/img_revenue/${item.revenues.imagem}`"
                alt=""
              />
            </td>
            <td>R$ {{ item.valueOrderItem }}</td>
            <td>R$ {{ totalValue(item.valueOrderItem, item.amountItem).toFixed(2) }}</td>
            <td  v-if="['Solicitado', 'Agendado'].includes(data.orderStatus.description)"> 
              <Button title="Atualizar"  @click.native="editItem(data.orderItem[index])" style="width: 6rem; height: 2.2rem;" />
            </td>
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
      <div class="container">
        <div class="containerComprovantes">
          <div class="resumeItens">
            <div style="display: flex; justify-content: space-between">
              <!-- comprovantes -->
              <div class="containerComprovantes">
                <label for="" class="titleInput"
                  >Comprovante de Pagamento</label
                >
                <div
                  class="inputContainer"
                  v-if="data.orderStatus.description === 'Revisão Cliente'"
                >
                  <input
                    type="file"
                    style="width: 85%"
                    @change="onFileChangeComprovante"
                  />
                  <img
                    v-if="previewComprovante"
                    src="../../assets/icons/Icon_uploadConcluido.svg"
                    alt="Icon concluido"
                    style="widows: 20px"
                  />
                  <img
                    v-else
                    src="../../assets/icons/Icon_upload.svg"
                    alt="Pré-visualização do PDF"
                  />
                </div>
                <div class="inputContainer" v-else>
                  <span style="font-size: 14px"
                    >Não é possivel anexar um arquivo</span
                  >
                </div>
              </div>


            </div>
            <div
              style="
                display: flex;
                gap: 0.5rem;
                flex-wrap: wrap;
                justify-content: space-between;
              "
            >
              <!-- caixas -->
              <div class="containerBandejas">
                <label for="" class="titleInput">Número de Caixas</label>
                <span
                  v-if="data.amount_of_boxes === null"
                  class="inputContainer"
                  style="
                    width: 12rem;
                    font-size: 14px;
                    background: #ffefdb;
                    color: #fa5c4f;
                  "
                >
                  Qtd. não foi definida</span
                >
                <input
                  v-else
                  id="bandeja"
                  type="number"
                  :value="data.amount_of_boxes"
                  disabled
                  class="inputContainer"
                  style="width: 10rem"
                />
              </div>

              <!-- bandejas -->
              <div class="containerBandejas">
                <label for="" class="titleInput">Número de Bandejas</label>
                <span
                  v-if="data.amount_of_tray === null"
                  class="inputContainer"
                  style="
                    width: 12rem;
                    font-size: 14px;
                    background: #ffefdb;
                    color: #fa5c4f;
                  "
                >
                  Qtd. não foi definida</span
                >
                <input
                  v-else
                  id="bandeja"
                  type="number"
                  :value="data.amount_of_tray"
                  disabled
                  class="inputContainer"
                  style="width: 10rem"
                />
              </div>
              <!-- nota -->
              <div class="containerNf">
                <label for="" class="titleInput">Nota</label>

                <span
                  class="inputContainer"
                  v-if="data.file_invoice == null"
                  style="
                    font-size: 12px;
                    width: 10rem;
                    background: #ffefdb;
                    color: #fa5c4f;
                  "
                >
                  Arquivo não anexado</span
                >
                <br />

                <button
                  v-show="data.file_invoice != null"
                  @click="downloadNF()"
                  class="btnDownload"
                >
                  Baixar arquivo
                </button>
              </div>

              <!-- cautela -->
              <div class="inputPdf">
                <label for="" class="titleInput">Cautela</label>

                <span
                  class="inputContainer"
                  v-if="data.file_caution == null"
                  style="
                    font-size: 12px;
                    width: 10rem;
                    background: #ffefdb;
                    color: #fa5c4f;
                  "
                >
                  Arquivo não anexado</span
                >

                <a
                  :href="
                    'https://api.donadoce.net/caution/' +
                    this.data.file_caution
                  "
                  style="display: none"
                  class="dowload-file"
                />

                <button
                  v-show="data.file_caution != null"
                  @click="downloadFile()"
                  class="btnDownload"
                >
                  Baixar arquivo
                </button>
              </div>
            </div>
            <div class="conatinerMessager">
              <label for="" class="titleInput">Comentário</label>
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                v-model="messageClient"
                style="width: 100%; padding: 1rem"
                placeholder="Por favor, insira seu comentário..."
              ></textarea>
            </div>

            <Button
              v-if="data.orderStatus.description ==='Revisão Cliente'"
              class="save"
              title="Salvar"
              type.native="button"
              :is-disabled="isDisabled"
              @click.native="sendAll()"
              style="width: 100%; height: 2.8rem"
            />
          </div>
        </div>
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
    valueTotal: String,
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
      typeContent: true,
      selectedFile: null,
      previewUrl: null,
      selectedFileComprovante: null,
      previewComprovante: null,
      amount_of_tray: Number,
      messageClient: '',
      isModified: false,
      editObject: [],
      orderItem: [],
      id_categoryOrderItem:""
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
      this.$emit('closeModal')
    },

    totalValue(unity, qtde) {
      return Number(unity) * Number(qtde)
    },

    formatDate(date) {
      return dayjs(date).format('DD/MM/YYYY')
    },
    async cancelAnOrder(id) {
      this.isDisabled = true
      await httpOrder.PatchCancelOrderByClient(id).then(() => {
        this.isDisabled = false
        this.$toast.error('Pedido Cancelado')
        this.closeModal()
      })
    },

    onFileChangeComprovante(event) {
      this.selectedFileComprovante = event.target.files[0]
      this.previewComprovante = URL.createObjectURL(
        this.selectedFileComprovante
      )
    },

    async uploadComprovante(id) {
      try {
        if (!this.selectedFileComprovante) {
          this.$toast.warning('Selecione um arquivo PDF para enviar o Comprovante.');
        return;
        }

        const formData = new FormData()
        formData.append('file_payment_voucher', this.selectedFileComprovante)

        const response = await httpOrder.PostComprovante(id, formData);
        if (response.status === 200) {
          this.$toast.info('Arquivo enviado com sucesso!');
        setTimeout(function () {
          location.reload();
        }, 4000);
        }
        else {
        this.$toast.error('Houve um erro ao processar a solicitação.');
        }

      } catch (error) {
        console.error('Erro ao enviar o arquivo:', error.message);
      }
    },

    async downloadFile() {
      try {
        await fetch(
          'https://api.donadoce.net/caution/' + this.data.file_caution
        )
          .then((response) => response.blob())
          .then((blob) => {
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = 'ArquivoCautela'
            a.click()
            window.URL.revokeObjectURL(url)
          })
      } catch (error) {
        console.error('Erro ao baixar o arquivo:', error)
      }
    },
    async downloadNF() {
      try {
        await fetch(
          'https://api.donadoce.net/invoice/' + this.data.file_invoice
        )
          .then((response) => response.blob())
          .then((blob) => {
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = 'ArquivoNF'
            a.click()
            window.URL.revokeObjectURL(url)
          })
      } catch (error) {
        console.error('Erro ao baixar o arquivo:', error)
      }
    },
    async sendCommit(id) {
      try {
        if (!this.messageClient) {
          this.$toast.error('Preencha o campo comentário...')
        return;
        }

        const fk_order_Status = '016b9c84-4e7f-81ee-be56-0242ac1200022fe2af'
        const data = {
        fk_order_status: fk_order_Status,
        comment: this.messageClient,
       };

      const response = await httpOrder.PostCommitClient(id, data);
        if (response.status === 200) {
          this.$toast.info('Comentário enviado com sucesso!');
        } else {
          this.$toast.error('Houve um erro ao processar a solicitação.');
        }

        } catch (error) {
        this.$toast.error('Houve um erro ao processar a solicitação.');
        }
    },
    async sendAll() {
      try {
        await this.uploadComprovante(this.data.id);
        await this.sendCommit(this.data.id);
      } catch (error) {
        this.$toast.error('Erro: ' + error);
      }
    },
    async updateQtd() {
      try {
        await httpOrder.UpdateOrderItem(this.editObject);
        this.$toast.info('A atualização foi bem-sucedida.');

      } catch (error) {
        this.$toast.error('Erro, falha na atualização: ' + error);
      }
},
editItem(index) {
  this.editObject = {
      fk_order: this.data.id,
      fk_revenue: index.fk_revenue,
      fk_categoryOrderItem: index.categoryOrderItem.id,
      amountItem: parseInt(index.amountItem)
  };
  // console.log(this.editObject)
  
    this.updateQtd()
    
  }
  },
})
</script>

<style scoped lang="scss">
input:focus {
  box-shadow: 0 0 5px rgba(0, 0, 255, 0.5);
  font-weight: 400;
}
input{
  text-align: center;
    font-weight: 700;
}
.menu-modal {
  display: flex;
  justify-content: center;
  margin-bottom: 1.3rem;

  button {
    width: 50%;
    font-size: 1.2rem;
    background-color: transparent;
    font-weight: 600;
    box-shadow: 1px 1px 2px rgba(163, 121, 121, 0.5411764706);

    &:hover{
      background: #ce250fb4;
      transition-duration: 1s;
      color: white;
      border-top-left-radius: .2rem;
      border-top-right-radius: .2rem;

    }
  }

  .selected {
    color: white;
    padding: 0.8rem;
    border-bottom: solid 1px #6e10029f;
    border-bottom-right-radius: .2rem;
    border-bottom-left-radius: .2rem;
    background-color: var(--red);
    box-shadow: 2px 5px 1px rgba(163, 121, 121, 0.5411764706);


  }
}
.listProduts {
  width: 100%;
  th {
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
    padding-bottom: 0.8rem;
  }
  .resumeItens {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .conatinerMessager {
      grid-area: 3 / 1 / 4 / 3;
    }

    .inputContainer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border: 1px solid var(--red);
      text-align: center;
      border-radius: 0.25rem;
      padding: 0.5rem;
      width: 22rem;
      height: 2.6rem;
      box-shadow: 2px 2px 1px rgba(163, 121, 121, 0.5411764706);

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
    padding: 0.8rem;

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
        box-shadow: 2px 2px 1px rgba(163, 121, 121, 0.5411764706);
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
.btnDownload {
  display: flex;
  align-items: center;
  border: 1px solid var(--red);
  text-align: center;
  border-radius: 0.25rem;
  padding: 0.5rem;
  height: 2.6rem;
  width: 8rem;
  background-color: var(--red);
  color: white;
  text-align: center;
  display: flex;
  justify-content: center;

  &:hover {
    transform: scale(1.09);
    transition: 300ms linear;
    background: #ffefdb;
    color: #fa5c4f;
    margin-left: 0.5rem;
  }
}
</style>
