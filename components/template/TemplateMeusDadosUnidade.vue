<template>
    <div v-if="$fetchState.pending" class="meusDados-container">Carregando seus dados...</div>
    <div v-else class="meusDados-container">
        <span>Informações Pessoais</span>
        <div class="inputs-container">
            <Input class="input-local-style" label="Nome da Empresa" disa :value="myData.Client_Company.clients.corporate_name" type="text" placeholder="nome da empresa..." disabled="true"/>
            <Input class="input-local-style" label="CNPJ" :value="myData.Client_Company.clients.cnpj" type="text" placeholder="nome da empresa..." disabled="false"/>
            <Input class="input-local-style" label="Nome da Unidade" :value="myData.Client_Company.company.corporate_name" type="text" placeholder="nome da empresa..." disabled="true"/>
            <Input class="input-local-style" label="CNPJ" :value="myData.Client_Company.company.cnpj" type="text" disabled="true"/>
            <Input class="input-local-style" label="CEP" type="text" :value="myData.Client_Company.company.cep"  disabled="true"/>
            <Input class="input-local-style" label="Cidade" type="text" :value="myData.Client_Company.company.county"  disabled="true"/>
            <Input class="input-local-style" label="Bairro" type="text" :value="myData.Client_Company.company.district"  disabled="true"/>
            <Input class="input-local-style" label="Email" type="text" :value="myData.email"  disabled="true"/>
            <Input class="input-local-style" label="Responsável" type="text" :value="myData.Client_Company.accountable"  disabled="true"/>
            <Input class="input-local-style" label="Telefone" type="text" :value="myData.Client_Company.fone" disabled="true"/>
        </div>

        <!-- <ModalDadosCliente  :infoCliente="myData"  v-if="showModal"  @closeModal="() => (showModal = false)" />
        <button class="btnEdit" @click="() => (showModal = true)" >Atualizar dados</button> -->
    </div>
</template>

<script lang="js">
import Vue from 'vue'
import HttpMeusDados from '@/server/meusDados/index'
export default Vue.extend({
    data () {
        return {
            myData: [],
            showModal:false,

        }
    },

    async fetch() {
        await HttpMeusDados.MeusDados().then( (res) => {
            this.myData = res.data
        })
    },
    methods:{
        openModalHistorico() {
        this.showModal = true;
      },
    }
})
</script>


<style lang="scss" scoped>


.meusDados-container {
    width: 100%;
    height: 100vh;
    background-color: var(--red);
    padding: 6rem 4rem 4rem 4rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    span {
        color: var(--white);
        font-size: 1.2rem;
        font-weight: 600;
    }

    .inputs-container {
        margin-top: 1.4rem;
        min-width: 60%;
        display: grid;
        gap: 1rem;
        grid-template-columns: 1fr 1fr;

        .input-local-style {
            color: var(--white);
            font-weight: 500;
        }
    }
    .btnEdit{
    width: 10rem;
    height: 2.2rem;
    border-radius: 0.2rem;
    margin-top: 1rem;
    }
}
</style>
