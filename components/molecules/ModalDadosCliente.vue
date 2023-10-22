<template>
    <ModalPreview titleModal="Editar Dados" @closeModal="closeModal" style="">
        <div class="inputs-container">
            <label for="" class="containerLabel" style="width: 100%;"> <strong>Nome da empresa</strong>
                 <input type="text" class="inputForm" placeholder="Nome da empresa..." v-model="data.corporate_name">
             </label>
             <label for="" class="containerLabel" style="width: 60%;"> <strong>Responsável</strong>
                 <input type="text" class="inputForm" placeholder="Fernanda Fernandes"  v-model="data.corporate_name">
             </label>
             <label for="" class="containerLabel" style="width: 37%;"> <strong>CNPJ</strong>
                 <input type="text" class="inputForm" placeholder="24.377.651/0001-63">
             </label>
             <label for="" class="containerLabel" style="width: 37%;"> <strong>CEP</strong>
                 <input type="number" class="inputForm"  placeholder="69075-771" >
                </label>
                <label for="" class="containerLabel" style="width: 60%;"> <strong>Bairro</strong>
                    <input type="text" class="inputForm" placeholder="Nome do Bairro..">
                </label>
             <label for="" class="containerLabel"> <strong>Cidade</strong>
                 <input type="text" class="inputForm" placeholder="Cidade...">
             </label>
             <label for="" class="containerLabel" style="width: 26%;"> <strong>Telefone</strong>
                 <input type="text" class="inputForm" placeholder="(00) 00000-0000">
             </label>
             <label for="" class="containerLabel"> <strong>Email</strong>
                 <input type="text" class="inputForm"  placeholder="empresa@gmail.com"  >
             </label>
        
        </div>
        <div class="containerButton">
            <ButtonPirula title="Atualizar dados" style="width: 10rem;"/>
        </div>
    </ModalPreview>
  </template>
  <script lang="ts">
  import Vue from 'vue'
  export default Vue.extend({
    props:{
        infoCliente:Array
    },
    data () {
        return {
        data:{
                corporate_name: "",
                cnpj: "",
                address: "",
                cep: "",
                county: "",
                district: "",
                uf: ""
            }
     }
    },
    methods:{
        closeModal() {
        this.$emit('closeModal')
    },
    }
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
  