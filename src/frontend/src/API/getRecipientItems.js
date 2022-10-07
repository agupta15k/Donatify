import axios from '../axios';
const getRecipientItemsAPI = (id) => {
    return axios.get(`/items?page=1&id=${id}`);
}
export default getRecipientItemsAPI;
