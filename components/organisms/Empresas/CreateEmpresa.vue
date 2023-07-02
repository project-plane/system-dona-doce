<template>
  <Container>
    <Title title="Nova Empresa" />
    <ContainerInput>
      <Input
        label="Empresa"
        type="text"
        placeholder="Digitar nome empresa"
        v-model="corporate_name"
      />
      <Input
        label="CNPJ"
        type="text"
        placeholder="Digitar CNPJ"
        v-model="cnpj"
      />
    </ContainerInput>
    <ContainerInput>
      <Input
        label="Endereço"
        type="text"
        placeholder="Digitar endereço"
        v-model="address"
      />
      <Input
        label="CEP"
        type="text"
        placeholder="ex: XXXXX-XXX"
        v-model="cep"
      />
    </ContainerInput>
    <ContainerInput>
      <Input
        label="Cidade"
        type="text"
        placeholder="Digitar cidade"
        v-model="county"
      />
      <Input
        label="Bairro"
        type="text"
        placeholder="Digitar bairro"
        v-model="district"
      />
    </ContainerInput>
    <ContainerInput>
      <Input label="UF" type="text" placeholder="ex: AM" v-model="uf" />
      <Input
        label="Fone"
        type="text"
        placeholder="Digitar fone"
        v-model="fone"
      />
    </ContainerInput>
    <ContainerInput>
      <Input
        v-model="email"
        label="E-mail"
        type="text"
        placeholder="Digitar e-mail"
      />
    </ContainerInput>
    <Button title="Salvar" @functionClick="saveClient"  />
  </Container>
</template>

<script lang="ts">
import Vue from 'vue'
import httpEmpresa from '~/server/empresa'

export default Vue.extend({
  data() {
    return {
      corporate_name: '',
      cnpj: '',
      address: '',
      cep: '',
      county: '',
      district: '',
      uf: '',
      fone: '',
      email: '',
    }
  },
  methods: {
    async saveClient() {
      this.loading = true
      const dataEmpresa = {
        corporate_name: this.corporate_name,
        cnpj: this.cnpj,
        address: this.address,
        cep: this.cep,
        county: this.county,
        district: this.district,
        uf: this.uf,
        fone: this.fone,
        email: this.email,
      }

      if (
        !this.corporate_name ||
        !this.cnpj ||
        !this.address ||
        !this.cep ||
        !this.county ||
        !this.district ||
        !this.uf ||
        !this.fone ||
        !this.email
      ) {
        this.$toast.error('Preencha todos os campos!!!')
        return
      }

      await httpEmpresa
        .CreateEmpresa(dataEmpresa)
        .then((res) => {
          if (res.status === 201) {
            this.$toast.success('Empresa criada com sucesso')
          }
          this.loading = false
        })
        .catch((error) => {
          console.log(error)
        })

      this.corporate_name = ''
      this.cnpj = ''
      this.address = ''
      this.cep = ''
      this.county = ''
      this.district = ''
      this.uf = ''
      this.fone = ''
      this.email = ''

      this.$nuxt.refresh()
    },
  },
})
</script>

<style lang="scss" scoped>
</style>
