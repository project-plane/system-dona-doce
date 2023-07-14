export const state = () => ({
  openModal: false,
  openModalPreviewReceita: false,
  openModalPreviewEmpresa: false,
  openModalReceita: false,
  dadosPedidos: [],
  barraRoute: false,
  qtdPedidos: 0
})

export const mutations = {
  OPEN_MODAL(state, payload) {
    state.openModal = payload
  },
  OPEN_MODAL_PREVIEW_RECEITA(state, payload) {
    state.openModalPreviewReceita = payload
  },
  OPEN_MODAL_PREVIEW_EMPRESA(state, payload) {
    state.openModalPreviewEmpresa = payload
  },
  OPEN_MODAL_RECEITA(state, payload) {
    state.openModalReceita = payload
  },
  SAVE_DADOS_PEDIDOS_PROGRAMADOS(state, payload) {
    state.dadosPedidos.push(payload)
  },
  BARRA_PEDIDOS_NAV(state, payload) {
    state.barraRoute = payload
  },
  QTD_PDIDOS(state, payload) {
    console.log(payload);
  }
}
