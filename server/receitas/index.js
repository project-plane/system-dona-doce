import http from "../config";

export default {
  CreateReceita: async (data) => {
    return await http.post('/revenue', data)
  },
  GetReceitas: async () => {
    return await http.get('/revenue')
  },
  GetFindReceita: async (id) => {
    return await http.get(`/revenue/ingredients/${id}`)
  },
  DeleteReceita: async (id) => {
    return await http.delete(`/revenue/${id}`)
  },
  UpdateReceita: async (id, data) => {
    return await http.put(`/revenue/${id}`, data)
  }
}
