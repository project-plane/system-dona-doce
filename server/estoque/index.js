import http from '../config'

export default {
  CreateEstoque: async (data) => {
    return await http.post('/ingredient-control', data)
  },
  GetAllEstoque: async (control) => {
    return await http.get(`/ingredient-control/${control}`)
  },
  updateEstoque: async (id, data) => {
  return await http.put(`/ingredients/${id}`, data)
  },
}
