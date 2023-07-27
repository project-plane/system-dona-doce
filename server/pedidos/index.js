import http from "../config";

export default {

    CreateNewOrder: async (data) => {
        return await http.post(`order`, data)
    }
}