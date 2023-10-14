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

  OrderHistory: async () => {
    return await http.get(`order/all?clientskip=0&limit=10000`)
  },
  Orderspercustomer: async()=>{
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
}
