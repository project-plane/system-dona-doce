<template>
  <div class="content_user" v-if="closeModal">
    <div class="negativeSpace">
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
          <div class="input">
            <Label>Cargo</Label>
            <select name="" id="">
              <option disabled value="">Selecionar cargo</option>
              <option v-if="dataUser.is_admin">Administrador</option>
              <option v-if="dataUser.is_enabled">Motorista</option>
              <option v-if="dataUser.is_product">Confeiteiro(a)</option>
              <option v-if="dataUser.is_stock">Faturamento</option>
              <option v-if="dataUser.is_revenues">Empacotador</option>
            </select>
          </div>
        </div>
      </div>
      <pre>
        {{ findUser }}
      </pre>
      <button class="buttonPirula" @click="updateFindUser">Salvar</button>
    </div>
  </div>
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
        is_admin: this.findUser.is_admin,
        is_product: this.findUser.is_product,
        is_stock: this.findUser.is_stock,
        is_revenues: this.findUser.is_revenues,
      },
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
  },
})
</script>

<style lang="scss" scoped>
.content_user {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  right: 0;
  background-color: var(--bg_color_modal);
  display: table;
  transition: opacity 0.2s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
  .negativeSpace {
    width: 70%;
    height: 80%;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background: var(--bg_color);
    border-radius: 7px;
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
      }
      .input {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 0.3rem;
      }
    }
  }
}
</style>