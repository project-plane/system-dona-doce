import http from "../config";

export default {
  GetKanban: async () => {
    return await http.get(`/control-production/kambam`)
  },

  UpdateKanban: async (id, seq) => {
    return await http.patch(`/control-production/kambam/${id}/${seq}`)
  }

}
