import http from '../config'

export default {
  CreateClient: async (data) => {
    return await http.post('/clients', data)
  },
  GetAllClients: async () => {
    return await http.get('/clients')
  },


}
