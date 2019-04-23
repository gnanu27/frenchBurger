import axios from 'axios';

const instance = axios.create({
    baseURL: {firebase app url}
})

export default instance;