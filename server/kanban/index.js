import http from '../config'
import { async } from './../../.nuxt/utils'

export default {
  GetKanban: async (typeCard) => {
    return await http.get(`/control-production/kambam?mode_kambam=${typeCard}`)
  },

  UpdateKanban: async (data) => {
    return await http.patch(`/control-production/kambam/production`, data)
  },
  GetOrderRoute: async () => {
    return await http.get(`/order/kambamRoute?statusOrder=1`)
  },
  GetOrderRouteCompany: async () => {
    return await http.get(`/company/priority`)
  },
  UpdateOrder: async (id, data) => {
    return await http.patch(`/company/priority/${id}`, data)
  },
  GetAllTrayAndBoxes: async () => {
    return await http.get(`/order/findManyTrayAndBoxes?take=1000`)
  },
  updateBandejas: async (id, data) => {
    return await http.patch(`/order/tray/${id}`, data)
  },
}
