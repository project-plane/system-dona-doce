<template>
  <ModalPreview titleModal="Dados do Cliente" @closeModal="closeModal">
    <div class="dataEmpresa">
      <div>
        <h4>Nome Empresa</h4>
        <p>{{ findPreviewClient.corporate_name }}</p>
      </div>
      <div>
        <h4>CNPJ</h4>
        <p>{{ findPreviewClient.cnpj }}</p>
      </div>
      <div>
        <h4>Endereço</h4>
        <p>{{ findPreviewClient.address }}</p>
      </div>
      <div>
        <h4>CEP</h4>
        <p>{{ findPreviewClient.cep }}</p>
      </div>
    </div>
    <div class="empresaAssociada">
      <h3>Empresas Associadas</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Empresa</th>
            <th>Responsável</th>
            <th>Fone</th>
            <th>Opção</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(clientCompany, index) in listFindClientCompany"
            :key="clientCompany.id"
          >
            <td>{{ index + 1 }}</td>
            <td>{{ clientCompany.company.corporate_name }}</td>
            <td>{{ clientCompany.accountable }}</td>
            <td>{{ clientCompany.fone }}</td>
            <td>
              <button @click="deleteEmpresa(clientCompany)">
                <img src="~/assets/icons/delete.svg" alt="" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </ModalPreview>
</template>

<script lang="ts">
import Vue from 'vue'

import httpClientCompany from '~/server/ClientCompany'

export default Vue.extend({
  props: {
    findPreviewClient: {
      type: [Array, Object],
      required: true,
    },
  },
  data() {
    return {
      listFindClientCompany: [],
    }
  },
  async fetch() {
    await httpClientCompany
      .GetFindClientCompany(this.findPreviewClient.id)
      .then((res) => {
        this.listFindClientCompany = res.data
      })
      .catch((error) => {
        console.log(error)
      })
  },
  methods: {
    closeModal() {
      this.$store.commit('OPEN_MODAL', false)
    },
    async deleteEmpresa(empresa) {
      console.log(empresa)
      const deleteClientCompany = {
        fk_client: empresa.fk_client,
        fk_company: empresa.fk_company,
      }

      await httpClientCompany
        .DeleteClientCompany(deleteClientCompany)
        .then((res) => {
          if (res.status === 200) {
            this.$toast.success('Empresa deletada do cliente com sucesso!!!')
          }
        })
        .catch((error) => {
          console.log(error)
        })

      this.$nuxt.refresh()
    },
  },
})
</script>

<style scoped lang="scss">
.dataEmpresa {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  p {
    height: 45px;
    padding: 0.5rem 0;
    border-radius: 5px;
    display: flex;
    align-items: center;
  }
}
.empresaAssociada {
  margin-top: 30px;
  padding-top: 10px;
  border-top: 1px dashed black;
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
    thead {
      width: 100%;
      background: var(--bg_heade_table);
      tr th {
        padding: 0.6rem 0;
      }
    }
    tbody tr td {
      text-align: center;
      padding: 1rem 0;
    }
    tbody tr button {
      background: transparent;
    }
  }
}
</style>
