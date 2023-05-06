import http from "../config"

export default {
    CreateUser: async(data) => {
        return await http.post('/users', data)
    },
    ListUsers: async() => {
        return await http.get('/users')
    },
    UpdateUser: async(id, data) => {
        return await http.put(`/users/${id}`, data);
    }
}