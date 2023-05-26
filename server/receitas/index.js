import http from "../config";

export default {
    CreateReceita: async(data) => {
        return await http.post('/revenue', data)
    }
}