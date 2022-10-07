import axios from '../axios';
const recieveItemAPI = (data) => {
    return axios.put('/items/recieve', {
        ...data
    });
}
export default recieveItemAPI;
