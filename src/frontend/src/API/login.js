import axios from '../axios';
const loginAPI = (value) => {
    return axios.post('/login', {
        userName: value.userName,
        password: value.password
    });
}
export default loginAPI;
