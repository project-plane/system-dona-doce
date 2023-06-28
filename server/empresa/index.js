import http from '../config'

export default {
  CreateEmpresa: async (data) => {
    return await http.post('/company', data)
  },
  GetAllEmpresa: async () => {
    return await http.get('/company')
  },
  DeleteEmpresa: async (id) => {
    return await http.delete(`/company/${id}`)
  },
  GetFindEmpresa: async (id) => {
    return await http.get(`/company/${id}`)
  },
}
