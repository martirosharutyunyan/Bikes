import axios, { AxiosResponse } from 'axios';

export default axios.create({
    baseURL:"http://localhost:8888/api",
    headers:{
        'Content-type':'application/json'
    }
})