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
  qtdPedidos: 0,
  dadosPedidos: {},
  selectedAll: '',
  selectedTipo: '',
  selectedStatus: '',
  selectedClient: '',
  listAllOrder: [],
  pedidos: [],
  postCoffe:{
    fk_company:"",
    createOrderCoffeItemDto:[]
  },
  dadosCliente:[],
})

export const mutations = {
  LIST_ALL_ORDER(state, payload) {
    state.listAllOrder = payload
  },
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
  OPEN_MODAL_HISTORICO(state, payload) {
    state.openModalHistorico = payload
  },
  DADOS_PEDIDOS(state, payload) {
    state.dadosPedidos = payload
  },
  SELECTED_ALL(state, payload) {
    state.selectedTipo = payload
  },
  SELECTED_TIPO(state, payload) {
    state.selectedTipo = payload
  },
  SELECTED_STATUS(state, payload) {
    state.selectedStatus = payload
  },
  SELECTED_CLIENT(state, payload) {
    state.selectedClient = payload
    console.log(state.selectedClient );
  },
  adicionarPedido(state, pedido) {
    state.pedidos.push(pedido); 
    console.log(state.pedidos);
  },
  removerPedido(state, fk_revenue) {
    const index = state.postCoffe.createOrderCoffeItemDto.findIndex((pedido) => pedido.fk_revenue === fk_revenue);

    if (index !== -1) {
      
      state.postCoffe.createOrderCoffeItemDto.splice(index, 1);
     
    }
    const id = state.pedidos.findIndex((data) => data.fk_revenue === fk_revenue);

    if (id !== -1) {
      state.pedidos.splice(id, 1);
    }
  },
  atualizarAmountItem(state, { fk_revenue, novoAmountItem }) {
    const index = state.postCoffe.createOrderCoffeItemDto.findIndex((pedido) => pedido.fk_revenue === fk_revenue);

    if (index !== -1) {
      state.postCoffe.createOrderCoffeItemDto[index].amountItem += novoAmountItem;
}
    
    const pedido = state.pedidos.find((pedido) => pedido.fk_revenue === fk_revenue);

    if (pedido) {
      pedido.amountItem = pedido.amountItem + novoAmountItem;
    }
  },
  subtrairQuantidadeDoItem(state, { fk_revenue, novoAmountItem }) {
    const pedido = state.pedidos.find((pedido) => pedido.fk_revenue === fk_revenue);

    if (pedido) {
      pedido.amountItem = pedido.amountItem - novoAmountItem;
    }
  },
  addOrder(state, { id, data }) {
    state.postCoffe.fk_company = id;
    
    if (data !== null) {
      state.postCoffe.createOrderCoffeItemDto.push(data);
    }
  
    console.log(state.pedidos);
  }

}
