import http from "../config";

export default {
  CreateReceita: async (data) => {
    return await http.post('/revenue', data)
  },
  GetReceitas: async (offset=0, limit=100) => {
    return await http.get(`/revenue/?offset=${offset}&limit=${limit}`)
  },
  GetAllReceitas: async (offset=0, limit=100) => {
    return await http.get(`/revenue/v2/${id}?offset=${offset}&limit=${limit}`)
  },
  GetFindReceita: async (id, offset=0, limit=100) => {
    return await http.get(`/revenue/ingredients/${id}?offset=${offset}&limit=${limit}`)
  },
  DeleteReceita: async (id) => {
    return await http.delete(`/revenue/${id}`)
  },
  UpdateReceita: async (id, data) => {
    return await http.put(`/revenue/${id}`, data)
  },
  CreateReceitaPorCliente: async (data) => {
    return await http.post('revenue-per-client', data)
  },
  UpdateReceitaPorCliente: async (data) => {
    return await http.put('revenue-per-client', data)
  },
  GetAllReceitaPorCliente: async (fk_client) => {
    return await http.get(`revenue-per-client/inter?fk_client=${fk_client}`)
  }
}
