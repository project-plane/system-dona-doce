import http from "../config";

export default {

    CreateNewOrder: async (data) => {
        return await http.post(`order`, data)
    },

    OrderHistory: async () => {
        return await http.get(`order/all?clientskip=0&limit=10000`)
    }
}