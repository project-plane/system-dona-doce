import http from "../config";

export default {
    CreateReceita: async (data) => {
        return await http.post('/revenue', data)
    },
    GetReceitas: async () => {
        return await http.get('/revenue')
    },
    DeleteReceita: async (id) => {
        return await http.delete(`/revenue/${id}`)
    }
}