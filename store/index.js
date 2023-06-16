export const state = () => ({
  openModal: false,
  openModalPreviewReceita: false,
  openModalReceita: false,
})

export const mutations = {
  OPEN_MODAL(state, payload) {
    state.openModal = payload
  },
  OPEN_MODAL_PREVIEW_RECEITA(state, payload) {
    state.openModalPreviewReceita = payload
  },
  OPEN_MODAL_RECEITA(state, payload) {
    state.openModalReceita = payload
  }
}
