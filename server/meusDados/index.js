import http from "../config";

export default {
    MeusDados: async () => {
        return await http.get(`users/my-data`)
    },
}