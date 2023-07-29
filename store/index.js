export const state = () => ({
  openModal: false,
  openModalPreviewReceita: false,
  openModalPreviewEmpresa: false,
  openModalReceita: false,
  openModalHistorico: false,
  dataNewOrder: {
    createOrderItemDto: []
  },
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
  CREATE_NEW_ORDER(state, payload) {
    state.dataNewOrder.createOrderItemDto.push(payload)
  },
  BARRA_PEDIDOS_NAV(state, payload) {
    state.barraRoute = payload
  },
  QTD_PDIDOS(state, payload) {
    console.log(payload);
  },
  OPEN_MODAL_HISTORICO(state, payload){
    state.openModalHistorico = payload
  }
}
