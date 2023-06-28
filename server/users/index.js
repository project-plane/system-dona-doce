import http from "../config"

export default {
  CreateUser: async (data) => {
    return await http.post('/person', data)
  },
  ListUsers: async () => {
    return await http.get('/person')
  },
  UpdateUser: async (id, data) => {
    return await http.put(`/person/${id}`, data);
  }
}
