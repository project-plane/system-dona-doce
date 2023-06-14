import http from "../config";

export default {
  CreateEmpresa: async(data) => {
    return await http.post('/clients', data)
  }
}