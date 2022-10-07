import axios from '../axios';
const getRecipientItemsAPI = (id) => {
    return axios.get(`/items`);
}
export default getRecipientItemsAPI;
