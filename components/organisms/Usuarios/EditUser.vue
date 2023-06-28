<template>
  <ModalEdit titleModal="Editar Funcionário" @save="updateFindUser">
    <div class="input_edit">
      <div class="input_column">
        <Input label="Nome Completo" type="text" v-model="findUser.name" />
        <Input label="E-mail" type="text" v-model="findUser.user.email" />
        <Input label="Telefone" type="text" v-model="findUser.fone" />
      </div>
      <div class="input_column">
        <div class="input">
          <Label>Cargo</Label>
          <select v-model="selected">
            <option disabled value="">Selecionar cargo</option>
            <option>Administrador</option>
            <option>Motorista</option>
            <option>Operador(a)</option>
          </select>
        </div>
        <Label v-if="findUser.is_enabled">Ativado</Label>
        <Label v-else> Desativado</Label>
        <div class="inputCargo">
          <InactiveCargo
            @activeEnabled="enabled"
            :isEnabled="findUser.is_enabled"
          />
        </div>
      </div>
    </div>
  </ModalEdit>
</template>

<script lang="ts">
import httpUsers from '@/server/users'
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      selected: '',
      isEnabled: this.findUser.is_enabled,
    }
  },
  props: {
    findUser: {
      type: [Array, Object],
      required: true,
    },
  },
  methods: {
    async updateFindUser() {
      if (this.selected === 'Administrador') {
        this.findUser.is_admin = !this.findUser.is_admin
      }
      if (this.selected === 'Motorista') {
        this.findUser.is_stock = true
      }
      if (this.selected === 'Operador(a)') {
        this.findUser.is_product = true
      }
      const UpdateUser = {
        name: this.findUser.name,
        username: this.findUser.username,
        email: this.findUser.email,
        cpf: this.findUser.cpf,
        fone: this.findUser.fone,
        is_enabled: this.findUser.is_enabled,
        is_admin: this.findUser.is_admin,
        is_product: this.findUser.is_product,
        is_stock: this.findUser.is_stock,
        is_revenues: this.findUser.is_revenues,
      }

      const idUser = this.findUser.id

      await httpUsers
        .UpdateUser(idUser, UpdateUser)
        .then((res) => {
          if (res.status === 200) {
            this.$toast.success('Funcionário editado com sucesso')
            this.$store.commit('OPEN_MODAL', false)
          }
        })
        .catch((error) => {
          this.$toast.error('Verifique todos os campos')
        })
      this.$nuxt.refresh()
    },
    enabled() {
      this.findUser.is_enabled = !this.findUser.is_enabled
    },
  },
})
</script>

<style lang="scss" scoped>
.headerModal {
  width: 100%;
  display: flex;
  justify-content: space-between;
  img {
    cursor: pointer;
  }
}
.input_edit {
  width: 100%;
  display: flex;
  gap: 1.5rem;
  .input_column {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .inputCargo {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.5rem;
    }
  }
  .input {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }
}
.btnEdit {
  width: 100%;
  display: flex;
  gap: 4rem;
}
</style>
