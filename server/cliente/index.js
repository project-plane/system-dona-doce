import http from '../config'

export default {
  CreateClient: async (data) => {
    return await http.post('/clients', data)
  },
  GetAllClients: async () => {
    return await http.get('/clients')
  },
  UpdateCustomerData: async (id,data) => {
    return await http.put(`/clients/${id}`,data)
  },
  GetUsers: async () => {
    return await http.get(`/clients_company`)
  },
  GetUnidade: async (fk_client) => {
    return await http.get(`/clients_company/${fk_client}`)
  },
}
