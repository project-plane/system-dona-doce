<template>
     <div v-if="loading ===true" class="containerLoad">
      <Loading/>
    </div>
    <ModalPreview v-else titleModal="Editar Dados" @closeModal="closeModal" style="">
        <div class="inputs-container">
            <label for="" class="containerLabel" style="width: 60%;"> <strong>Nome da empresa</strong>
                 <input type="text" class="inputForm" placeholder="Nome da empresa..." v-model="infoCliente.Clients.corporate_name">
             </label>
             <label for="" class="containerLabel" style="width: 37%;"> <strong>CNPJ</strong>
                 <input type="text" class="inputForm" disabled :value="infoCliente.Clients.cnpj" placeholder="24.377.651/0001-63">
             </label>
             <label for="" class="containerLabel" style="width: 60%;"> <strong>Responsável</strong>
                 <input type="text" class="inputForm" placeholder="Fernanda Fernandes"  v-model="infoCliente.Clients.accountable">
             </label>
             <label for="" class="containerLabel" style="width: 37%;"> <strong>Telefone</strong>
                 <input type="text" class="inputForm" v-model="infoCliente.Clients.fone" placeholder="(00) 00000-0000">
             </label>
             <label for="" class="containerLabel" style="width: 37%;"> <strong>CEP</strong>
                <input type="number" class="inputForm" v-model="infoCliente.Clients.cep" placeholder="69075-771" >
            </label>
            <label for="" class="containerLabel" style="width: 60%;"> <strong>Bairro</strong>
                <input type="text" class="inputForm" v-model="infoCliente.Clients.district" placeholder="Nome do Bairro..">
            </label>
            <label for="" class="containerLabel" style="width: 20%;"> <strong>UF</strong>
                 <input type="text" class="inputForm" v-model=" this.infoCliente.Clients.uf"  placeholder="Nova Senha"  >
             </label>
             <label for="" class="containerLabel"> <strong>Cidade</strong>
                 <input type="text" class="inputForm" v-model="infoCliente.Clients.county" placeholder="Cidade...">
             </label>
             <label for="" class="containerLabel" style="width: 40%;"> <strong>Senha</strong>
                 <input type="text" class="inputForm" v-model="password"  placeholder="Nova Senha"  >
             </label>

        </div>
        <div class="containerButton">
            <ButtonPirula title="Atualizar dados" @click.native="updateData" style="width: 10rem;"/>
        </div>
    </ModalPreview>
    
  </template>
  <script lang="ts">
  import http from "../../server/cliente"
  import Vue from 'vue'
  export default Vue.extend({
    props:{
        infoCliente: {
            type: [Array, Object],
            required: true,
        },
    },
    data(){
        return{
            loading: false,
            password:'',
        }
    },
   
    methods:{
        closeModal() {
        this.$emit('closeModal')
        },
        async updateData(){
            const dadoCliente={
            corporate_name: this.infoCliente.Clients.corporate_name,
            cnpj: this.infoCliente.Clients.cnpj,
            fone: this.infoCliente.Clients.fone,
            name_fantasy: this.infoCliente.Clients.name_fantasy,
            county: this.infoCliente.Clients.county,
            district: this.infoCliente.Clients.district,
            ie: this.infoCliente.Clients.ie,
            uf: this.infoCliente.Clients.uf,
            address: this.infoCliente.Clients.address,
            cep: this.infoCliente.Clients.cep,
            accountable: this.infoCliente.Clients.accountable,
            updateUserDto: {
                email:  this.infoCliente.email,
                password: this.password,
                is_enabled: this.infoCliente.is_enabled,
                is_admin: this.infoCliente.is_admin,
                is_client: this.infoCliente.is_client,
                is_driver: this.infoCliente.is_driver,
                is_production: this.infoCliente.is_production,
            }
        } 
        this.loading = true
        try{
        await http.UpdateCustomerData(this.infoCliente.id, dadoCliente ).then(response => {
            this.loading = false
            this.$emit('closeModal')
            this.$toast.info('Dados Atualizados!')
        })  
     }
        catch (error) {
            this.$toast.error('Houve um erro ao processar a solicitação.');
            console.log(error);
            
            }
            this.$nuxt.refresh()
        }
    },
  })
  </script>
  <style scoped lang="scss">
  .dataEmpresa {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  
}
.containerButton{
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-top: 2rem;
}
.inputs-container{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 1rem;
    padding: .8rem;
    input{
            box-shadow: 2px 2px 1px #a379798a;
        }
.containerLabel{
    display: flex;
    flex-direction: column;
   
   
    .inputForm{
        border: solid 1px rgb(99, 99, 99);
        height: 2.4rem;
        width: auto;
       
    }
}
}
  </style>
  