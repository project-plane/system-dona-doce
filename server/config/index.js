import axios from 'axios';

const http = axios.create({
  baseURL: 'https://api.doce.gedroid.com/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

http.interceptors.request.use(function (config) {
  let token = sessionStorage.getItem("token");

  if (!token) {
    token = "";
  }

  config.headers.Authorization = `Bearer ${token}`;
  return config;
},
  (error) => {
    return Promise.reject(error)
  }
)

export default http;
