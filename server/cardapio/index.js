import http from "../config";

export default {
  GetMenu: async () => {
    return await http.get(`/menu?itensMenu=true`)
  },

  GetFindMenu: async (id) => {
    return await http.get(`/menu/${id}`)
  },

  SetNewMenu: async (data) => {
    return await http.post(`/menu`, data)
  },

  UpdateMenu: async (id, data) => {
    return await http.put(`/menu/${id}`, data)
  },

  DeleteMenu: async (id) => {
    return await http.delete(`/menu/${id}`)
  },


}
