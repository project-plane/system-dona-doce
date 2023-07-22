<template>
    <div class="meusDados-container">
        <span>Informações Pessoais</span>
        <div class="inputs-container">
            <Input label="Nome da Empresa" type="text" placeholder="nome da empresa..." disabled="true"/>
            <Input label="CNPJ" type="text" placeholder="cnpj da empresa..." disabled="true"/>
            <Input label="CEP" type="text" placeholder="cep da empresa..." disabled="true"/>
            <Input label="Endereço" type="text" placeholder="endereço da empresa..." disabled="true"/>
            <Input label="Telefone" type="text" placeholder="telefone da empresa..." disabled="true"/>
            <Input label="Email" type="text" placeholder="email da empresa..." disabled="true"/>
            <Input label="Responsável" type="text" placeholder="email da empresa..." disabled="true"/>
        </div>
    </div>
</template>


<style lang="scss" scoped>


.meusDados-container {
    width: 100%;
    padding: 6rem 4rem 4rem 4rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
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