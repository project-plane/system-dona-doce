import axios from 'axios';

const http = axios.create({
    baseURL: 'https://rentx.gedroid.com/',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default http;