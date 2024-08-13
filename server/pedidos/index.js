import http from "../config";

export default {

  CreateNewOrder: async (data) => {
    return await http.post(`order/programmed`, data)
  },
  CreateNewOrderCoffe: async (data) => {
    return await http.post(`order/coffe`, data)
  },

  DeleteOrder: async (id) => {
    return await http.patch(`order/disabled/${id}`)
  },

  OrderHistory: async (data=undefined, rota) => {
    return await http.get(`order/all?data=${data}&${rota}skip=0&limit=10000`)
  },

  GetOrderCliente: async (data , client, orderType = "undefined", orderStatus = "undefined") => {
    return await http.get(`order/all?fk_client=${client}&statusOrder=${orderStatus}&orderType=${orderType}&skip=0&limit=10000`)
  },

  GetOrderCliente2: async (typeLotes, client, statusOrder) => {
    return await http.get(`/order/all2?listWithOrderBatchNull=${typeLotes}&fk_client=${client}&orderType=${statusOrder}&skip=0&limit=1000`)
  },

  GetProdutosLotes: async (fkUnity, client, type) => {
    return await http.get(`/order/allOrdersToBatch?fk_company=${fkUnity}&fk_client=${client}&statusOrder=1c69c120002-575f34-1c69-be56-0242ac1201c69&orderType=${type}&skip=0&limit=100`)
  },

  downloadExcelLotes: async (id) => {
    return await http.post(`/order_batch/csv/${id}`, {
      responseType: "blob",
    });
  },

  Orderspercustomer: async (rota) => {
    return await http.get(`order/client?${rota}`)
  },

  UpdateStatusOrder: async (id, data) => {
    return await http.patch(`order/${id}`, data)
  },
  UploadCautela: async (id, data) => {
    return await http.post(`order/caution/${id}`, data)
  },
  UploaQtdBandejas: async (id, data) => {
    return await http.patch(`order/tray/${id}`, data)
  },
  PostComprovante: async (id, data) => {
    return await http.patch(`/order/payment_voucher/${id}`, data)
  },
  PostNotaFiscal: async (id, data) => {
    return await http.patch(`/order/invoice/${id}`, data)
  },
  PostCommitClient: async (fk_order, data) => {
    return await http.patch(`/clients/order/${fk_order}`, data)
  },
  UpdateOrderItem: async (data) => {
    return await http.patch(`/orderitem/updateQuantity`, data)
  },

  PostLotes: async (data) => {
    return await http.post(`/order_batch`, data)
  },
  ListLotes: async (id, idCompany) => {
    return await http.get(`/order_batch?fk_company=${idCompany}&fk_client=${id}`);
  },
  PatchCancelOrderByClient: async (fk_order) => {
    return await http.patch(`/clients/order/${fk_order}`, {
      fk_order_status: "55b4c3a6-4e7f-31ee-be56-0242ac12000224fe4"
    })

  },
  comprovanteLotes:async (id,data) => {
    return await http.patch(`/order_batch/${id}`, data)
  },
  DeleteLote:async (id) => {
    return await http.delete(`/order_batch/${id}`)
  },
  updateNF:async (id, data) => {
    return await http.patch(`/order_batch/invoice/${id}`, data)
    // novo
  },
  findListExport:async (data) => {
    return await http.patch(`/order/findExportFaturamento`, data)
    // novo
  },
  downloadExcelFaturamentoAdmin: async (data) => {
    return await http.patch(`/order/exportCsvFat`, data, {
      responseType: "blob",
    });
  },
}
