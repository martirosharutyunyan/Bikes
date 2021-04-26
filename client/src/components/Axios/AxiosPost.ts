import axios, { AxiosResponse } from 'axios';

export default axios.create({
    baseURL:`${process.env.REACT_APP_API}/api`,
    headers:{
        'Content-type':'application/json'
    }
})