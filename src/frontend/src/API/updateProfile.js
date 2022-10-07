import axios from '../axios';
const updateProfileAPI = (user) => {
    return axios.put('/profile', {
        ...user
    });
}
export default updateProfileAPI;
