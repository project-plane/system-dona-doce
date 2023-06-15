export const state = () => ({
  openModal: false,
  openModalReceita: false,
  openModalEditReceita: false,
  openModalPreviewReceita: false,
  openModalPreviewEstoque: false,
  openModalPreviewEmpresa: false
})

export const mutations = {
  OPEN_MODAL(state, payload) {
    state.openModal = payload
  },
  OPEN_MODAL_RECEITA(state, payload) {
    state.openModalReceita = payload
  },
  OPEN_MODAL_EDIT_RECEITA(state, payload) {
    state.openModalEditReceita = payload
  },
  OPEN_MODAL_PREVIEW_RECEITA(state, payload) {
    state.openModalPreviewReceita = payload
  },
  OPEN_MODAL_PREVIEW_ESTOQUE(state, payload) {
    state.openModalPreviewEstoque = payload
  },
  OPEN_MODAL_PREVIEW_EMPRESA(state, payload) {
    state.openModalPreviewEmpresa = payload
  }
}
