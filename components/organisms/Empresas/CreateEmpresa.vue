<template>
  <Container>
    <Title title="Cadastrar Unidade" />
    <ContainerInput>
      <Input
        label="Unidade"
        type="text"
        placeholder="ex: Henda Carros da Amazonia..."
        v-model="dataEmpresa.corporate_name"
      />
      <Input
        label="CNPJ"
        type="text"
        placeholder="ex: XX.XXX.XXX/XXXX-XX"
        v-model="dataEmpresa.cnpj"
      />
    </ContainerInput>
    <ContainerInput>
      <Input
        label="Endereço"
        type="text"
        placeholder="ex: Rua Jabuti dos Santos..."
        v-model="dataEmpresa.address"
      />
      <Input
        label="CEP"
        type="text"
        placeholder="ex: XXXXX-XXX"
        v-model="dataEmpresa.cep"
      />
    </ContainerInput>
    <ContainerInput>
      <Input
        label="Cidade"
        type="text"
        placeholder="ex: Manaus"
        v-model="dataEmpresa.county"
      />
      <Input
        label="Bairro"
        type="text"
        placeholder="ex: Bairro Santos Augusto"
        v-model="dataEmpresa.district"
      />
    </ContainerInput>
    <ContainerInput>
      <Input
        label="UF"
        type="text"
        placeholder="ex: AM"
        v-model="dataEmpresa.uf"
      />
      <Input
        label="Fone"
        type="number"
        placeholder="ex: xxxxxxxx"
        v-model="dataEmpresa.fone"
      />
    </ContainerInput>
    <ContainerInput>
      <Input
        v-model="dataEmpresa.email"
        label="E-mail"
        type="email"
        placeholder="ex: email@email.com.br"
      />
    </ContainerInput>
    <div class="row-button">
      <Button title="Salvar" @functionClick="saveClient" :isDisabled="isDisabled"/>
    </div>
  </Container>
</template>

<script lang="ts">
import Vue from 'vue'
import httpEmpresa from '~/server/empresa'

export default Vue.extend({
  data() {
    return {
      isDisabled: false,
      dataEmpresa: {
        corporate_name: '',
        cnpj: '',
        address: '',
        cep: '',
        county: '',
        district: '',
        uf: '',
        fone: '',
        email: '',
      },
    }
  },
  methods: {
    async saveClient() {
      this.isDisabled = true
      if (
        !this.dataEmpresa.corporate_name ||
        !this.dataEmpresa.cnpj ||
        !this.dataEmpresa.address ||
        !this.dataEmpresa.cep ||
        !this.dataEmpresa.county ||
        !this.dataEmpresa.district ||
        !this.dataEmpresa.uf ||
        !this.dataEmpresa.fone ||
        !this.dataEmpresa.email
      ) {
        this.$toast.error('Preencha todos os campos!!!')
      } else {
        await httpEmpresa
          .CreateEmpresa(this.dataEmpresa)
          .then((res) => {
            if (res.status === 201) {
              this.$toast.success('Empresa criada com sucesso')
            }

            this.dataEmpresa.corporate_name = ''
            this.dataEmpresa.cnpj = ''
            this.dataEmpresa.address = ''
            this.dataEmpresa.cep = ''
            this.dataEmpresa.county = ''
            this.dataEmpresa.district = ''
            this.dataEmpresa.uf = ''
            this.dataEmpresa.fone = ''
            this.dataEmpresa.email = ''

            this.$nuxt.refresh()
          })
          .catch((error) => {
            const erros = JSON.parse(error.request.response)

            if (Array.isArray(erros.message)) {
              erros.message.map((item) => {
                this.$toast.error(item)
              })
            } else {
              this.$toast.error(erros.message)
            }
          })
      }
      this.isDisabled = false
    },
  },
})
</script>

<style lang="scss" scoped>
.row-button {
  display: flex;
  justify-content: flex-end;
}
</style>
