import http from '../config'

export default {
  PostLogin: async (data) => {
    return await http.post('session', data)
  },
  PostRecoverEmail: async (data) => {
    return await http.post('session/send-email', data)
  },
  RedefinePassword: async (data) => {
    return await http.post('session/redefine-password', data)
  }
}
