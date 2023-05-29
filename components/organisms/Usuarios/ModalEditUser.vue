<template>
  <ContainerModalEdit :closeModal="closeModal">
    <Title class="headerModal">
      <h1>Editar Funcionário</h1>
      <img
        @click="$emit('closeModal', closeModal)"
        src="~/assets/icons/close.svg"
        alt="close"
      />
    </Title>
    <div class="input_edit">
      <div class="input_column">
        <div class="input">
          <Label>Nome Completo</Label>
          <input type="text" v-model="findUser.name" />
        </div>
        <div class="input">
          <Label>E-mail</Label>
          <input type="text" v-model="findUser.email" />
        </div>
        <div class="input">
          <Label>CPF</Label>
          <input type="text" v-model="findUser.cpf" />
        </div>
        <div class="input">
          <Label>Telefone</Label>
          <input type="text" v-model="findUser.fone" />
        </div>
      </div>
      <div class="input_column">
        <div class="input">
          <Label>Usuário</Label>
          <input type="text" v-model="findUser.username" />
        </div>
        <div class="input">
          <Label>Senha</Label>
          <input type="text" v-model="findUser.password" />
        </div>
        <!-- {{ findUser }} -->
        <div class="input">
          <Label>Cargo</Label>
          <select v-model="selected">
            <option disabled value="">Selecionar cargo</option>
            <option :value="this.findUser.is_admin">Administrador</option>
            <option :value="this.findUser.is_stock">Motorista</option>
            <option :value="this.findUser.is_product">Operador(a)</option>
          </select>
        </div>
        {{ isEnabled }}
        <Label v-if="isEnabled">Ativado</Label>
        <Label v-else> Desativado</Label>
        <div class="inputCargo">
          <InactiveCargo @activeEnabled="enabled" :isEnabled="!isEnabled" />
        </div>
      </div>
    </div>

    <div class="btnEdit">
      <Button
        @click.native="$emit('closeModal', closeModal)"
        title="Cancelar"
      />

      <Button @click.native="updateFindUser" title="Salvar" />
    </div>
  </ContainerModalEdit>
</template>

<script lang="ts">
import Vue from 'vue'
import httpUsers from '@/server/users'

export default Vue.extend({
  data() {
    return {
      selected: true,
      isEnabled: this.findUser.is_enabled,
    }
  },
  props: {
    closeModal: {
      type: Boolean,
      required: true,
    },
    findUser: {
      type: [Array, Object],
      required: true,
    },
  },
  methods: {
    async updateFindUser() {
      const UpdateUser = {
        name: this.findUser.name,
        username: this.findUser.username,
        email: this.findUser.email,
        cpf: this.findUser.cpf,
        fone: this.findUser.fone,
        is_enabled: false,
        is_admin: false,
        is_product: this.findUser.is_product,
        is_stock: this.findUser.is_stock,
        is_revenues: this.findUser.is_revenues,
      }

      console.log(UpdateUser)

      const idUser = this.findUser.id

      await httpUsers
        .UpdateUser(idUser, UpdateUser)
        .then((res) => {
          if (res.status === 200) {
            this.$toast.success('Funcionário editado com sucesso')
            this.$emit('closeModal', this.closeModal)
          }
        })
        .catch((error) => {
          this.$toast.error('Verifique todos os campos')
        })
    },
    enabled() {
      this.isEnabled = !this.isEnabled
      console.log(this.isEnabled)
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
