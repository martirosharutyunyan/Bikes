import axios, { AxiosResponse } from 'axios';

export default axios.create({
    // baseURL:"http://46.4.249.19:8888/api",
    baseURL:"http://localhost:8888/api",
    headers:{
        'Content-type':'application/json'
    }
})