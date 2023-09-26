import http from "../config";

export default {
  GetKanban: async (typeCard) => {
    return await http.get(`/control-production/kambam?order_type=${typeCard}`)
  },

  UpdateKanban: async (id, seq) => {
    return await http.patch(`/control-production/kambam/${id}/${seq}`)
  }

}
