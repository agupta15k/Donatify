/**@module getDonorHistoryAPI */

import axios from '../axios';

/**
 * API to get donor history from database
 * @param {Number} value Id of the donor
 * @returns {Promise} Response for axios GET request
 */
const getDonorHistoryAPI = (id) => {
	return axios.get(`/donor/history?id=${id}`);
};
export default getDonorHistoryAPI;
