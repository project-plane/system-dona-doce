import http from "../config";

export default {
    PostLogin: async(data) => {
        return http.post('auth', data);
    }
}