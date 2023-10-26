import http from "../config";

export default {
  GetKanban: async (typeCard) => {
    return await http.get(`/control-production/kambam?order_type=${typeCard}`)
  },

  UpdateKanban: async (data) => {
    return await http.patch(`/control-production/kambam/production`, data)
  }

}
