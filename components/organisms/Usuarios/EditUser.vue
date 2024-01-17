<template>
  <ModalEdit titleModal="" @save="updateFindUser">
    <Input
      label="Nome Completo"
      type="text"
      placeholder="Digitar nome"
      v-model="findUser.name"
    />
    <Input
      label="E-mail"
      type="email"
      placeholder="Digitar e-mail"
      v-model="findUser.user.email"
    />
    <Input
      label="Endereço"
      type="text"
      placeholder="Digitar endereço"
      v-model="findUser.address"
    />

    <Input
      label="CEP"
      type="text"
      placeholder="ex: XXXXX-XXX"
      v-model="findUser.cep"
    />
    <Input
      label="Telefone"
      type="number"
      placeholder="Digitar telefone"
      v-model="findUser.fone"
    />
    <div class="input_cargo">
      <div class="input">
        <Label>Cargo</Label>
       <select v-model="selected">
          <option disabled value="">Selecionar cargo</option>
          <option>Administrador</option>
          <option>Motorista</option>
          <option>Operador(a)</option>
        </select>
      </div>
      <Label v-if="findUser.user.is_enabled">Ativado</Label>
      <Label v-else> Desativado</Label>
      <div class="inputCargo">
        <InactiveCargo
          @activeEnabled="enabled"
          :isEnabled="findUser.user.is_enabled"
        />
      </div>
    </div>
  </ModalEdit>
</template>

<script lang="ts">
import Vue from 'vue'

import httpUsers from '~/server/users'

export default Vue.extend({
  data() {
    return {
      selected: '',
      isEnabled: this.findUser.user.is_enabled,
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
        this.findUser.user.is_admin = true
      }
      else{
        this.findUser.user.is_admin = false
      }
      if (this.selected === 'Motorista') {
        this.findUser.user.is_driver = true
      }
      else{
        this.findUser.user.is_driver = false
      }
      if (this.selected === 'Operador(a)') {
        this.findUser.user.is_production = true
      }
      else{
        this.findUser.user.is_production = false
      }
      const UpdateUser = {
        name: this.findUser.name,
        fone: this.findUser.fone,
        address: this.findUser.address,
        cep: this.findUser.cep,
        updateUserDto: {
          email: this.findUser.user.email,
          is_enabled: this.findUser.user.is_enabled,
          is_admin: this.findUser.user.is_admin,
          is_driver: this.findUser.user.is_driver,
          is_production: this.findUser.user.is_production,
        },
      }

      console.log(UpdateUser)

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
      this.findUser.user.is_enabled = !this.findUser.user.is_enabled
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

.input_cargo {
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
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
}
</style>
