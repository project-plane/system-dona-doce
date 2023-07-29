<template>
    <div v-if="$fetchState.pending" class="meusDados-container">Carregando seus dados...</div>
    <div v-else class="meusDados-container">
        <span>Informações Pessoais</span>
        <div class="inputs-container">
            <Input label="Nome da Empresa" :value="myData.Clients.corporate_name" type="text" placeholder="nome da empresa..." disabled="true"/>
            <Input label="CNPJ" :value="myData.Clients.cnpj" type="text" placeholder="cnpj da empresa..." disabled="true"/>
            <Input label="CEP" type="text" :value="myData.Clients.cep" placeholder="cep da empresa..." disabled="true"/>
            <Input label="Cidade" type="text" :value="myData.Clients.county" placeholder="endereço da empresa..." disabled="true"/>
            <Input label="Bairro" type="text" :value="myData.Clients.district" placeholder="endereço da empresa..." disabled="true"/>
            <Input label="Telefone" type="text" :value="myData.Clients.fone" placeholder="telefone da empresa..." disabled="true"/>
            <Input label="Email" type="text" :value="myData.email" placeholder="email da empresa..." disabled="true"/>
            <Input label="Responsável" type="text" :value="myData.Clients.accountable" placeholder="email da empresa..." disabled="true"/>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import HttpMeusDados from '@/server/meusDados/index'
export default Vue.extend({
    data () {
        return {
            myData: [],
        }
    },

    async fetch() {
        await HttpMeusDados.MeusDados().then( (res) => {
            this.myData = res.data
        })
    },
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
    }
}
</style>