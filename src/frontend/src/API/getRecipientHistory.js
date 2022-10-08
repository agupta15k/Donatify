import axios from '../axios';
const getRecipientHistoryAPI = (id) => {
	return axios.get(`/recipient/history?id=${id}`);
};
export default getRecipientHistoryAPI;
