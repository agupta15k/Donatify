import axios from '../axios';
const getDonorHistoryAPI = (id) => {
	return axios.get(`/donor/history?id=${id}`);
};
export default getDonorHistoryAPI;
