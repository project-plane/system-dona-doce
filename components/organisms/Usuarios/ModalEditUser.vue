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
    <div class="input_create">
      <div class="input_column">
        <div class="input">
          <Label>Nome</Label>
          <input type="text" v-model="dataUser.name" />
        </div>
        <div class="input">
          <Label>Sobre Nome</Label>
          <input type="text" v-model="dataUser.username" />
        </div>
      </div>
      <div class="input_column">
        <div class="input">
          <Label>E-mail</Label>
          <input type="text" v-model="dataUser.email" />
        </div>
        <Label v-if="isEnabled">Ativado</Label>
        <Label v-else> Desativado</Label>
        <div class="inputCargo">
          <InactiveCargo @activeEnabled="enabled" :isEnabled="!isEnabled" />
        </div>
      </div>
    </div>

    <div class="btnEdit">
      <Button title="Cancelar" />

      <Button @click.native="updateFindUser" title="Salvar" />
    </div>
  </ContainerModalEdit>
</template>

<script lang="ts">
import Vue from 'vue'
import httpUsers from '@/server/users'
interface DataUser {
  name: String
  username: String
  email: String
  cpf: String
  fone: Number
  is_enabled: Boolean
  is_admin: Boolean
  is_product: Boolean
  is_stock: Boolean
  is_revenues: Boolean
}
export default Vue.extend({
  data() {
    return {
      dataUser: <DataUser>{
        name: this.findUser.name,
        username: this.findUser.username,
        email: this.findUser.email,
        cpf: this.findUser.cpf,
        fone: 0,
        is_enabled: this.findUser.is_enabled,
        is_admin: false,
        is_product: this.findUser.is_product,
        is_stock: this.findUser.is_stock,
        is_revenues: this.findUser.is_revenues,
      },
      isEnabled: this.findUser.is_revenues,
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
      console.log(this.dataUser)

      const idUser = this.findUser.id

      await httpUsers
        .UpdateUser(idUser, this.dataUser)
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
.input_create {
  width: 100%;
  display: flex;
  gap: 1.5rem;
  .input_column {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .input_add {
      display: flex;
      align-items: flex-end;
      button {
        background: var(--txt_color);
        color: var(--white);
        width: 40%;
        height: 35px;
        font-weight: bold;
        font-size: 1.2rem;
      }
    }
    .list_empresa {
      height: 120px;
      overflow-y: scroll;
    }
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
