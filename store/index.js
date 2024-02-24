export const state = () => ({
  openModal: false,
  openModalPreviewReceita: false,
  openModalPreviewEmpresa: false,
  openModalReceita: false,
  openModalHistorico: false,
  listaCompras:[],
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
  unidadeSelecionada: '',
  listAllOrder: [],
  value_buy: 0,
  pedidos: [],
  postCoffe:{
    fk_company:"",
    createOrderCoffeItemDto:[]
  },
  dadosCliente:[],
  unidadeCliente:"",
  nomeCliente:"",
  dataPedido:"",
  dateCalendar: null,
  openModalEstoque:false,
  estoqueDataModal:[],
  carrinhoProgramado:[],
  carrinhoForaEstoque:[],
})

export const mutations = {
  NEWDATECALENDAR(state, payload){
    state.dateCalendar = payload

  },
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
    console.log(payload);
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
  },
  select_Unidade(state, payload) {
    state.unidadeSelecionada = payload
    console.log(payload);
  },
  VALUE_COMPRAS(state, payload) {
    state.value_buy = payload
  },
  SELECTED_NAME_CLIENT(state, payload) {
    state.nomeCliente = payload
    console.log(state.nomeCliente );
  },
  limparDadosPedidos(state) {
    state.dadosPedidos = {};
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
  },
  selectUnity(state, id) {
    state.unidadeCliente = id;

  },
  setDataOrder(state, date){
    state.dataPedido = date;
  },
  listaDeCompras(state, payload){
    state.listaCompras = payload;
    console.log(payload);
    console.log(state);
  },
  OpenModalEstoque(state, payload){
    state.openModalEstoque = payload;
  },
  EstoqueDataModal(state, payload){
    state.estoqueDataModal = payload;
  },
  adicionarPedidoProgramado(state, pedido) {
    const existePedido = state.carrinhoProgramado.find(item =>  item.listReceita.fk_revenues === pedido.listReceita.fk_revenues &&
      item.pedidos.fk_categoryOrderItem === pedido.pedidos.fk_categoryOrderItem);
    if (!existePedido) {
      state.carrinhoProgramado.push(pedido);
      this.$toast.success('Pedido adicionado.' );
    } else {
      this.$toast.warning('Pedido duplicado. Receita já adicionada ao pedido!!!')
    }
},
  adicionarPedidoForaEstoque(state, pedido) {
    const existePedido = state.carrinhoForaEstoque.find(item => item.listReceita.id === pedido.pedidos.fk_revenue &&
      item.pedidos.fk_categoryOrderItem === pedido.pedidos.fk_categoryOrderItem );
    if (!existePedido) {
      state.carrinhoForaEstoque.push(pedido);
      this.$toast.success('Pedido adicionado.' );
    } else {
      this.$toast.warning('Pedido duplicado. Receita já adicionada ao pedido!!!')
      console.log(pedido);
    }

  },
  removerPedidoProgramado(state, fk_revenue) {
    const indexProgramado = state.carrinhoProgramado.findIndex((pedido) => pedido.pedidos.fk_revenue === fk_revenue);

    if (indexProgramado !== -1) {
      state.carrinhoProgramado.splice(indexProgramado, 1);
    }
    
  },
  removerPedidoForaEstoque(state, fk_revenue) {

    const indexProgramado = state.carrinhoForaEstoque.findIndex((pedido) => pedido.pedidos.fk_revenue === fk_revenue);

    if (indexProgramado !== -1) {
      state.carrinhoForaEstoque.splice(indexProgramado, 1);
    }

  },
  aumentarQuantidade(state, { fk_revenue, fk_categoryOrderItem }) {
    console.log(state);
    
    const item = state.carrinhoProgramado.find(item => 
      item.pedidos.fk_revenue === fk_revenue && item.pedidos.fk_categoryOrderItem === fk_categoryOrderItem
    );
  
    if (item) {
      item.pedidos.amountItem++;
      console.log("Quantidade aumentada:", item.pedidos.amountItem);
    } else {
      console.log("Item não encontrado ou valores de fk_categoryOrderItem e fk_revenue inválidos.");
    }
  },
  diminuirQuantidade(state,  { fk_revenue, fk_categoryOrderItem }) {
    const item = state.carrinhoProgramado.find(item => 
      item.pedidos.fk_revenue === fk_revenue && item.pedidos.fk_categoryOrderItem === fk_categoryOrderItem
    );
  
    if (item) {
      item.pedidos.amountItem--;
      console.log("Quantidade aumentada:", item.pedidos.amountItem);
    } else {
      console.log("Item não encontrado ou valores de fk_categoryOrderItem e fk_revenue inválidos.");
    }
},
  addItemForaEstoque(state, { fk_revenue, fk_categoryOrderItem }) {
    
    const item = state.carrinhoForaEstoque.find(item => 
      item.pedidos.fk_revenue === fk_revenue && item.pedidos.fk_categoryOrderItem === fk_categoryOrderItem
    );

    if (item) {
      item.pedidos.amountItem++;
      
      
    } else {
      console.log("Item não encontrado ou valores de fk_categoryOrderItem e fk_revenue inválidos.");
    }
  },
  removeItemForaEstoque(state,  { fk_revenue, fk_categoryOrderItem }) {
    const item = state.carrinhoForaEstoque.find(item => 
      item.pedidos.fk_revenue === fk_revenue && item.pedidos.fk_categoryOrderItem === fk_categoryOrderItem
    );

    if (item) {
      item.pedidos.amountItem--;
    } else {
      console.log("Item não encontrado ou valores de fk_categoryOrderItem e fk_revenue inválidos.");
    }
  },
}