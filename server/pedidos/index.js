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

  OrderHistory: async (data = undefined, client = "undefined", orderType = "undefined", orderStatus = "undefined") => {
    return await http.get(`order/all?data=${data}&fk_client=${client}&statusOrder=${orderStatus}&orderType=${orderType}&skip=0&limit=10000`)
  },
  Orderspercustomer: async () => {
    return await http.get(`order/client?clientskip=0&limit=10000`)
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
  // o cliente adiciona o comprovante de pagamento
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

  PatchCancelOrderByClient: async (fk_order) => {
    return await http.patch(`/clients/order/${fk_order}`, {
      fk_order_status: "55b4c3a6-4e7f-31ee-be56-0242ac12000224fe4"
    })
  },
}
