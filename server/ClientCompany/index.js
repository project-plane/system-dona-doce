import http from "../config";

export default {
  GetFindClientCompany: async (id) => {
    return await http.get(`/clients_company/${id}`)
  },
  DeleteClientCompany: async (data) => {
    return await http.delete('/clients_company', { data })
  },
  CreateClientCompany: async (data) => {
    return await http.post('/clients_company', data)
  },
  getUnidades: async () => {
    return await http.get(`/company/clientsByToken`)
  },
}
