import http from '../config'

export default {
  CreateEmpresa: async (data) => {
    return await http.post('/clients', data)
  },
  GetAllEmpresa: async () => {
    return await http.get('/clients')
  },
  DeleteEmpresa: async (id) => {
    return await http.delete(`/clients/${id}`)
  },
  GetFindEmpresa: async (id) => {
    return await http.get(`/clients/${id}`)
  },
}
