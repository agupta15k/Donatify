import axios from '../axios';
const getProfleAPI = (id) => {
    return axios.get(`/profile?id=${id}`);
}
export default getProfleAPI;
