import http from "../config";

export default {
  GetMenu: async () => {
    return await http.get(`/menu?itensMenu=true`)
  },

  SetNewMenu: async (data) => {
    return await http.post(`/menu`, data)
  },

  DeleteMenu: async (id) => {
    return await http.delete(`/menu/${id}`)
  }
}
