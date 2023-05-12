import http from "../config";

export default {
    PostLogin: async(data) => {
        return http.post('session', data);
    }
}