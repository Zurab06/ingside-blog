import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:3004',
})
axios.get('/posts')
export default instance